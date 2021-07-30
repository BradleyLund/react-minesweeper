import React from "react";
const { v4: uuidv4 } = require("uuid");

class Square extends React.Component {
  render() {
    console.log(String.fromCharCode(this.props.rowIndex + 65));
    return (
      <button
        className="square hidden"
        id={`${String.fromCharCode(this.props.rowIndex + 65)}${
          this.props.index
        }`}
        onClick={(event) => this.props.handleClick(event)}
        onContextMenu={(event) => this.props.handleContextClick(event)}>
        {this.props.value === 9
          ? "💣"
          : this.props.value === 0
          ? ""
          : this.props.value}
      </button>
    );
  }
}

export default Square;
