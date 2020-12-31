import { createNode } from "./createNode";

const initialGrid = (NodesContext) => {
  console.log("grid called");
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 45; col++) {
      currentRow.push(createNode(row, col, NodesContext));
    }
    grid.push(currentRow);
  }

  return grid;
};

export default initialGrid;
