import React from "react";
import Square from "./Square";

class Board extends React.Component {
  render() {
    // we do a map within a map here, with each row of the matrix being its own array which creates
    // the game squares
    // We want to pass it the handleClick function
    // testing to see if I can git push

    const gameSquares = this.props.gameMatrix.map((row, rowIndex) => (
      <div className="board-row">
        {row.map((square, index) => (
          <Square
            value={square}
            rowIndex={rowIndex}
            index={index}
            handleClick={this.props.handleClick}
          />
        ))}{" "}
      </div>
    ));

    // console.log(gameSquares)

    return <div>{gameSquares}</div>;
  }
}

export default Board;
