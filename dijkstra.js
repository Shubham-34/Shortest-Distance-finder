/*
  dijkstra.js - sirf algorithm, DOM se koi lena dena nahi.
  Isko alag se test bhi kar sakte ho (Node mein).
*/

// Edges list se adjacency list banata hai: { gate: [{to:"admin", w:150}, ...], ... }
function buildGraph(campus) {
  var adj = {};
  Object.keys(campus.nodes).forEach(function (id) { adj[id] = []; });
  campus.edges.forEach(function (e) {
    adj[e[0]].push({ to: e[1], w: e[2] });
    adj[e[1]].push({ to: e[0], w: e[2] });
  });
  return adj;
}

/*
  dijkstra(adj, src, dst) returns:
    dist  - shortest distance in metres (Infinity if unreachable)
    path  - array of node ids from src to dst
    order - buildings in the order they were settled (for the explanation table)
*/
function dijkstra(adj, src, dst) {
  var ids = Object.keys(adj);
  var dist = {}, prev = {}, done = {}, order = [];

  ids.forEach(function (id) {
    dist[id] = Infinity;
    prev[id] = null;
    done[id] = false;
  });
  dist[src] = 0;

  while (true) {
    // pick the unsettled node with the smallest distance
    var u = null;
    ids.forEach(function (id) {
      if (!done[id] && dist[id] < Infinity && (u === null || dist[id] < dist[u])) u = id;
    });
    if (u === null) break;

    done[u] = true;
    order.push({ id: u, d: dist[u], from: prev[u] });
    if (u === dst) break;

    // relax every neighbour
    adj[u].forEach(function (nb) {
      if (!done[nb.to] && dist[u] + nb.w < dist[nb.to]) {
        dist[nb.to] = dist[u] + nb.w;
        prev[nb.to] = u;
      }
    });
  }

  var path = [];
  if (dist[dst] < Infinity) {
    for (var c = dst; c !== null; c = prev[c]) path.unshift(c);
  }
  return { dist: dist[dst], path: path, order: order };
}
