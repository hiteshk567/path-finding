import React from "react";

import "./Node.css";

const Node = (props) => {
  // const startClass = props.isStart ? "start" : "";
  // const finishClass = props.isFinish ? "finish" : "";
  const startClass =
    props.row === props.startRow && props.col === props.startCol ? "start" : "";
  const finishClass =
    props.row === props.endRow && props.col === props.endCol ? "finish" : "";

  const wallClass = props.isWall ? "wall" : "";
  const weightCLass = props.isWeight ? "weight" : "";
  // console.log(props.resetStatus);
  if (props.resetStatus) {
    // console.log("hi");
    console.log(
      document
        .getElementById(`node-${props.row}-${props.col}`)
        .getAttribute("class")
    );
  }

  return (
    <div
      className={
        !props.resetStatus
          ? `node ${startClass} ${finishClass} ${wallClass} ${weightCLass}`
          : `node ${startClass} ${finishClass}`
      }
      id={`node-${props.row}-${props.col}`}
      onMouseDown={() => props.onMouseDown(props.row, props.col)}
      onMouseUp={() => props.onMouseUp()}
      onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
    ></div>
  );
};

export default Node;
