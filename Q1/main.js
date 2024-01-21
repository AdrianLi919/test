// main.js 
/**
 * This function uses recursion to find all paths from the start node to the end node in a graph.
 *
 * @param {Object} graph - The graph object with nodes and edges.
 * @param {string} start - The start node.
 * @param {string} end - The end node.
 * @param {Array} path - An array to store the current path.
 * @returns {Array} An array of all paths from the start node to the end node.
 */
function findAllPaths(graph, start, end, path = []) {
  // Add the start node to the current path
  path.push(start);

  // If the start node is the end node, return the path
  if (start === end) {
    return [path];
  }

  // Initialize an array to store all paths
  let allPaths = [];

  // For each neighbor of the start node, find all paths from the neighbor to the end node
  for (let neighbor of graph[start]) {
    // If the neighbor is not in the current path, find all paths from the neighbor
    if (!path.includes(neighbor)) {
      let newPaths = findAllPaths(graph, neighbor, end, [...path]);
      allPaths.push(...newPaths);
    }
  }

  return allPaths;
}


/**
 * This function uses breadth-first search to find the shortest path from the start node to the end node in a graph.
 *
 * @param {Object} graph - The graph object with nodes and edges.
 * @param {string} start - The start node.
 * @param {string} end - The end node.
 * @returns {Array} The shortest path from the start node to the end node.
 */
function findShortestPath(graph, start, end) {
  let queue = [[start]];
  let visited = {};

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (node === end) {
      return path;
    }

    if (!visited[node]) {
      for (let neighbour of graph[node]) {
        queue.push([...path, neighbour]);
      }
      visited[node] = true;
    }
  }
}


// The graph object with nodes and edges
const graph = {
  A: ['B', 'D'],
  B: ['A', 'C', 'D'],
  C: ['B', 'F'],
  D: ['A', 'B', 'E'],
  E: ['D', 'H'],
  F: ['C', 'G', 'H'],
  G: ['F'],
  H: ['E', 'F']
};
//main : {


let allPaths = findAllPaths(graph, 'A', 'H');
let shortestPath = findShortestPath(graph, 'A', 'H');

document.getElementById('allPaths').innerHTML = allPaths.join('<br>');
document.getElementById('shortestPath').innerHTML = shortestPath.join(' -> ');


//}
