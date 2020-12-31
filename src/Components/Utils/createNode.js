export const createNode = (row, col, NodesContext) => {
  return {
    row,
    col,
    isVisited: false,
    // isStart: row === Start_Node_row && col === Start_Node_col,
    // isFinish: row === End_Node_row && col === End_Node_col,
    isStart: false,
    isFinish: false,
    isWall: false,
    distance: Infinity,
    previousNode: null,
    isWeight: false,
  };
};
