import React, { useState, useEffect } from "react";

import Node from "./Node";
import { algo, nodesOfShortestPath } from "./shortestalgo";
import Button from "./Components/UIElements/Button";
import "./Pathfind.css";
import Header from "./Components/header/header";
import initialGrid from "./Components/Utils/initialGrid";

const Pathfind = () => {
  const [grid, setGrid] = useState({
    board: [],
    mouseIsPressed: false,
  });
  const [Start_Node_col, setStart_Node_col] = useState(1);
  const [Start_Node_row, setStart_Node_row] = useState(1);
  const [End_Node_row, setEnd_Node_row] = useState(14);
  const [End_Node_col, setEnd_Node_col] = useState(41);
  const [visualizationRunning, setVisualizationRunning] = useState(false);
  const [resetStatus, setResetStatus] = useState(false);
  // const [state, dispatch] = useReducer(reducer, {
  //   board: initialGrid(),
  //   mouseIsPressed: false,
  // });
  const [keyIsPressed, setKeyisPressed] = useState(false);
  const [startKeyPressed, setStartKeyPressed] = useState(false);
  const [endKeyPressed, setEndKeyPressed] = useState(false);

  document.addEventListener("keydown", (e) => {
    setKeyisPressed(true);
    if (e.key === "s" || e.key === "S") {
      setStartKeyPressed(true);
    }
    if (e.key === "e" || e.key === "E") {
      setEndKeyPressed(true);
    }
  });

  document.addEventListener("keyup", () => {
    setKeyisPressed(false);
    setStartKeyPressed(false);
    setEndKeyPressed(false);
  });

  useEffect(() => {
    let nodesContext = {
      Start_Node_col,
      Start_Node_row,
      End_Node_col,
      End_Node_row,
    };
    const board = initialGrid(nodesContext);
    setGrid((prevVal) => {
      return {
        ...prevVal,
        board: [...board],
      };
    });
  }, [Start_Node_col, Start_Node_row, End_Node_col, End_Node_row]);

  const gridWithWalls = (board, row, col) => {
    const newGrid = board.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const gridWithWeights = (board, row, col) => {
    const newGrid = board.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWeight: !node.isWeight,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const changeStartNode = (board, row, col) => {
    const newGrid = board.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isStart: true };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const changeEndNode = (board, row, col) => {
    const newGrid = board.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isFinish: true };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleMouseDown = (row, col, event) => {
    if (
      (row === Start_Node_row && col === Start_Node_col) ||
      (row === End_Node_row && col === End_Node_col)
    ) {
      return;
    }

    if (keyIsPressed) {
      if (startKeyPressed) {
        setStart_Node_row(row);
        setStart_Node_col(col);
        const newGrid = changeStartNode(grid.board, row, col);
        setGrid((prevVal) => {
          return { ...prevVal, board: newGrid };
        });
      } else if (endKeyPressed) {
        setEnd_Node_row(row);
        setEnd_Node_col(col);
        const newGrid = changeEndNode(grid.board, row, col);
        setGrid((prevVal) => {
          return { ...prevVal, board: newGrid };
        });
      } else {
        const newGrid = gridWithWeights(grid.board, row, col);
        setGrid((prevVal) => {
          return { ...prevVal, board: newGrid };
        });
      }
    } else {
      const newGrid = gridWithWalls(grid.board, row, col);
      setGrid((prevVal) => {
        return { ...prevVal, board: newGrid, mouseIsPressed: true };
      });
    }
  };
  // console.log(keyIsPressed)

  const handleMouseUp = () => {
    setGrid((prevVal) => {
      return {
        ...prevVal,
        mouseIsPressed: false,
      };
    });
  };

  const handleMouseEnter = (row, col, event) => {
    if (!grid.mouseIsPressed) return;
    if (keyIsPressed) {
      if (startKeyPressed) {
        setStart_Node_row(row);
        setStart_Node_col(col);
        const newGrid = changeStartNode(grid.board, row, col);
        setGrid((prevVal) => {
          return { ...prevVal, board: newGrid };
        });
      } else if (endKeyPressed) {
        setEnd_Node_row(row);
        setEnd_Node_col(col);
        const newGrid = changeEndNode(grid.board, row, col);
        setGrid((prevVal) => {
          return { ...prevVal, board: newGrid };
        });
      } else {
        const newGrid = gridWithWeights(grid.board, row, col);
        setGrid((prevVal) => {
          return { ...prevVal, grid: newGrid };
        });
      }
    } else {
      const newGrid = gridWithWalls(grid.board, row, col);
      setGrid((prevVal) => {
        return {
          ...prevVal,
          grid: newGrid,
        };
      });
    }
  };

  const animateShortestPath = (nodesOfminPath) => {
    for (let i = 0; i < nodesOfminPath.length; i++) {
      setTimeout(() => {
        const node = nodesOfminPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const animateAlgo = (visitedNodesSorted, nodesOfminPath) => {
    for (let i = 0; i <= visitedNodesSorted.length; i++) {
      if (i === visitedNodesSorted.length) {
        setTimeout(() => {
          animateShortestPath(nodesOfminPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesSorted[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const handleClick = () => {
    const { board } = grid;
    const startingNode = board[Start_Node_row][Start_Node_col];
    const endingNode = board[End_Node_row][End_Node_col];
    console.log(board, startingNode, endingNode);
    const visitedNodesSorted = algo(board, startingNode, endingNode);
    const nodesOfminPath = nodesOfShortestPath(endingNode);
    // console.log(nodesOfminPath);
    animateAlgo(visitedNodesSorted, nodesOfminPath);
  };

  const resetGrid = () => {
    setResetStatus(true);
    let nodesContext = {
      Start_Node_col,
      Start_Node_row,
      End_Node_col,
      End_Node_row,
    };
    const newGrid = initialGrid(nodesContext);

    setGrid((prevVal) => {
      return {
        ...prevVal,
        board: newGrid,
      };
    });
    // setResetStatus(false);
  };

  useEffect(() => {
    setResetStatus(false);
  }, [resetStatus]);

  return (
    <React.Fragment>
      <Header resetGrid={resetGrid} />
      <main>
        <Button inverse id="resetButton" onClick={handleClick}>
          RESET
        </Button>
        <Button onClick={handleClick}>Visualize</Button>
        <div className="grid">
          {grid.board.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    isWeight,
                  } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      row={row}
                      col={col}
                      resetStatus={resetStatus}
                      startRow={Start_Node_row}
                      startCol={Start_Node_col}
                      endRow={End_Node_row}
                      endCol={End_Node_col}
                      isWeight={isWeight}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Pathfind;
