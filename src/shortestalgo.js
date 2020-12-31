// const PriorityQueue = require("priority-queue-heap");

// const comparator = (a, b) => {
//   if (a.distance < b.distance) return false;
//   return true;
// };

// const putAllNodes = (grid) => {
//   const priorityQueue = new PriorityQueue(comparator);
//   for (let row of grid) {
//     for (let node of row) {
//       //   nodes.push(node);
//       priorityQueue.push(node);
//     }
//   }
//   return priorityQueue;
// };

const putAllNodes = (grid) => {
  const nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortByDistance = (grid) => {
  grid.sort((x, y) => x.distance - y.distance);
};

const getUnvisitedNodes = (grid, node) => {
  const neighbours = [];
  const { row, col } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
};

const updateUnvisitedNodes = (grid, closestNode) => {
  const unvisitedNodes = getUnvisitedNodes(grid, closestNode);
  for (const neighbour of unvisitedNodes) {
    neighbour.distance = closestNode.distance + 1;
    neighbour.previousNode = closestNode;
  }
};

// export const algo = (grid, startNode, endNode) => {
//   const visitedNodes = [];
//   const unvisitedNodes = putAllNodes(grid);
//   startNode.distance = 0;
//   while (!!unvisitedNodes.length) {
//     sortByDistance(unvisitedNodes);
//     const closestNode = unvisitedNodes.shift();
//     if (closestNode.isWall) continue;
//     if (closestNode.distance === Infinity) return visitedNodes;

//     if (closestNode.isWeight) {
//       closestNode.distance += 10;
//     }
//     closestNode.isVisited = true;
//     visitedNodes.push(closestNode);
//     if (closestNode === endNode) return visitedNodes;
//     updateUnvisitedNodes(grid, closestNode);
//   }
// };

export const algo = (grid, startNode, endNode) => {
  const visitedNodes = [];
  const unvisitedNodes = putAllNodes(grid);
  startNode.distance = 0;
  while (!!unvisitedNodes.length) {
    sortByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodes;

    if (closestNode.isWeight) {
      closestNode.distance += 10;
    }
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    updateUnvisitedNodes(grid, closestNode);
  }
};

export const nodesOfShortestPath = (finishNode) => {
  const shortestPathNodes = [];
  let currentNode = finishNode;
  while (currentNode != null) {
    shortestPathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathNodes;
};
