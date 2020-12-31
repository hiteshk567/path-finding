import React from "react";

import SubHeading from "./subheading";

const Header = (props) => {
  return (
    <header>
      <SubHeading resetGrid={props.resetGrid} />
      <div className="flex">
        <p className="instruction">
          <span className="symbol1">wa</span>Click to add Walls
        </p>
        <p className="instruction">
          <span className="symbol2">we</span>Press Alt and Click to add Weights
        </p>
        <p className="instruction">
          <span className="symbol3">we</span>Press S and click to change the
          Starting Point
        </p>
        <p className="instruction">
          <span className="symbol4">we</span>Press E and click to change the End
          Point
        </p>
      </div>
    </header>
  );
};

export default Header;
