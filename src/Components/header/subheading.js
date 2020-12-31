import React from "react";

import Button from "../UIElements/Button";

const SubHeading = (props) => {
  const handleClick = () => {
    props.resetGrid();
  };

  return (
    <div>
      <h1 className="heading">PATH WITH MINIMUM COST</h1>
    </div>
  );
};

export default SubHeading;
