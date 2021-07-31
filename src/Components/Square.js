import React from "react";

class Square extends React.Component {
  render() {
    // for each tile render a square with a unique id which is a letter for the row and then a number for
    // its column
    return (
      <button
        // initially give all the tiles a class of hidden
        className="square hidden"
        id={`${String.fromCharCode(this.props.rowIndex + 65)}${
          this.props.index
        }`}
        onClick={(event) => this.props.handleClick(event)}
        onContextMenu={(event) => this.props.handleContextClick(event)}
        // unique key which is the same as the id
        key={`${String.fromCharCode(this.props.rowIndex + 65)}${
          this.props.index
        }`}>
        {/* give the textContent the bomb emoji if it is a bomb, otherwise the number of bombs surrounding that block */}
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
