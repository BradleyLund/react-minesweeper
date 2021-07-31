import React from "react";
import Square from "./Square";

class Board extends React.Component {
  render() {
    // we do a map within a map here, with each row of the matrix being its own array which creates
    // the game squares
    // We want to pass it the handleClick function

    const gameSquares = this.props.gameMatrix.map((row, rowIndex) => (
      <div className="board-row" key={`${String.fromCharCode(rowIndex + 65)}`}>
        {row.map((square, index) => (
          <Square
            value={square}
            rowIndex={rowIndex}
            index={index}
            handleClick={this.props.handleClick}
            handleContextClick={this.props.handleContextClick}
          />
        ))}
      </div>
    ));

    return <div>{gameSquares}</div>;
  }
}

export default Board;
