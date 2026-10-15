/*
  app.js - page ka main logic: dropdowns, button, result aur explanation table.
*/

(function () {
  var adj = buildGraph(CAMPUS);
  var ids = Object.keys(CAMPUS.nodes);

  var fromSel = document.getElementById("from");
  var toSel = document.getElementById("to");
  var resultBox = document.getElementById("result");
  var traceTable = document.getElementById("trace");
  var mapParts = drawMap(document.getElementById("map"), CAMPUS);

  function name(id) { return CAMPUS.nodes[id].name; }

  function walkTime(metres) {
    var min = Math.max(1, Math.round(metres / WALK_METRES_PER_MIN));
    return "about " + min + " min walk";
  }

  // Dropdowns bharo
  ids.forEach(function (id) {
    [fromSel, toSel].forEach(function (sel) {
      var o = document.createElement("option");
      o.value = id;
      o.textContent = name(id);
      sel.appendChild(o);
    });
  });
  fromSel.value = DEFAULT_ROUTE.from;
  toSel.value = DEFAULT_ROUTE.to;

  function distanceBetween(a, b) {
    var w = 0;
    adj[a].forEach(function (nb) { if (nb.to === b) w = nb.w; });
    return w;
  }

  function render(animate) {
    var src = fromSel.value, dst = toSel.value;
    clearRoute(mapParts, CAMPUS);

    if (src === dst) {
      mapParts.nodeEls[src].setAttribute("class", "node start");
      resultBox.innerHTML =
        '<div><div class="label">Minimum distance</div><div class="big">0<small>m</small></div></div>' +
        '<p class="msg">Start aur destination same hain. Koi alag destination chuno.</p>';
      traceTable.innerHTML = "";
      return;
    }

    var r = dijkstra(adj, src, dst);

    if (r.dist === Infinity) {
      resultBox.innerHTML = '<p class="msg">In dono buildings ke beech koi path nahi mila.</p>';
      traceTable.innerHTML = "";
      return;
    }

    showRoute(mapParts, CAMPUS, r.path, animate);

    // path chips
    var chips = r.path.map(function (id, i) {
      return '<li>' + (i ? '<span class="arrow" aria-hidden="true">→</span>' : '') +
             '<span class="chip">' + name(id) + '</span></li>';
    }).join("");

    // leg-by-leg distances
    var legs = "";
    for (var i = 1; i < r.path.length; i++) {
      var a = r.path[i - 1], b = r.path[i];
      legs += '<li><span>' + name(a) + ' → ' + name(b) + '</span><b>' + distanceBetween(a, b) + ' m</b></li>';
    }

    resultBox.innerHTML =
      '<div><div class="label">Minimum distance</div>' +
      '<div class="big">' + r.dist + '<small>m</small></div>' +
      '<p class="sub">' + walkTime(r.dist) + '</p></div>' +
      '<div><div class="label">Shortest route</div>' +
      '<ol class="path">' + chips + '</ol><ul class="legs">' + legs + '</ul></div>';

    // explanation table: order in which Dijkstra settled the buildings
    var rows = r.order.map(function (s, i) {
      var last = i === r.order.length - 1;
      return '<tr' + (last ? ' class="final"' : '') + '>' +
        '<td class="num">' + (i + 1) + '</td>' +
        '<td>' + name(s.id) + '</td>' +
        '<td class="num">' + s.d + ' m</td>' +
        '<td>' + (s.from ? name(s.from) : "Start") + '</td></tr>';
    }).join("");

    traceTable.innerHTML =
      '<thead><tr><th>Step</th><th>Settled building</th><th>Shortest distance</th><th>Came from</th></tr></thead>' +
      '<tbody>' + rows + '</tbody>';
  }

  // Events
  document.getElementById("form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    render(true);
  });

  document.getElementById("swap").addEventListener("click", function () {
    var t = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = t;
    render(true);
  });

  // First load
  render(true);
})();
