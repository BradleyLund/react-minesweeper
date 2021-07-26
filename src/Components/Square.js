import React from "react";

class Square extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <button
        className="square hidden"
        id={`${this.props.rowIndex}${this.props.index}`}
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
