/*
  map.js - SVG campus map draw karta hai aur route highlight karta hai.
*/

var SVGNS = "http://www.w3.org/2000/svg";

function svgEl(name, attrs, parent) {
  var n = document.createElementNS(SVGNS, name);
  Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
  if (parent) parent.appendChild(n);
  return n;
}

/*
  drawMap(svg, campus) - footpaths, distance labels, green route line aur buildings banata hai.
  Returns { nodeEls, routeLine } jo app.js use karta hai.
*/
function drawMap(svg, campus) {
  var nodes = campus.nodes;

  // 1) footpaths
  var gEdges = svgEl("g", {}, svg);
  campus.edges.forEach(function (e) {
    var a = nodes[e[0]], b = nodes[e[1]];
    svgEl("line", { "class": "edge", x1: a.x, y1: a.y, x2: b.x, y2: b.y }, gEdges);
  });

  // 2) green route line (points are filled in by showRoute)
  var routeLine = svgEl("polyline", { "class": "route-line", pathLength: "1", points: "" }, svg);

  // 3) distance labels
  var gLabels = svgEl("g", {}, svg);
  campus.edges.forEach(function (e) {
    var a = nodes[e[0]], b = nodes[e[1]];
    var t = svgEl("text", {
      "class": "wlabel",
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2 + 4
    }, gLabels);
    t.textContent = e[2];
  });

  // 4) buildings
  var nodeEls = {};
  Object.keys(nodes).forEach(function (id) {
    var n = nodes[id];
    var g = svgEl("g", { "class": "node", transform: "translate(" + n.x + " " + n.y + ")" }, svg);
    svgEl("circle", { r: 11 }, g);
    var t = svgEl("text", { y: 30 }, g);
    t.textContent = n.name;
    nodeEls[id] = g;
  });

  return { nodeEls: nodeEls, routeLine: routeLine };
}

// Pichla highlight hata deta hai
function clearRoute(mapParts, campus) {
  Object.keys(campus.nodes).forEach(function (id) {
    mapParts.nodeEls[id].setAttribute("class", "node");
  });
  mapParts.routeLine.setAttribute("points", "");
  mapParts.routeLine.setAttribute("class", "route-line");
}

// Path ko green line se highlight karta hai (animate = true to line draw hoti dikhti hai)
function showRoute(mapParts, campus, path, animate) {
  var nodes = campus.nodes;
  var src = path[0], dst = path[path.length - 1];

  path.forEach(function (id) { mapParts.nodeEls[id].classList.add("on"); });
  mapParts.nodeEls[src].setAttribute("class", "node on start");
  mapParts.nodeEls[dst].setAttribute("class", "node on end");

  mapParts.routeLine.setAttribute("points", path.map(function (id) {
    return nodes[id].x + "," + nodes[id].y;
  }).join(" "));

  // animation dobara chalane ke liye reflow force karte hain
  void mapParts.routeLine.getBoundingClientRect();
  mapParts.routeLine.setAttribute("class", "route-line" + (animate ? " draw" : ""));
}
