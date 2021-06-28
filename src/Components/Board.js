import React from "react";
import Square from "./Square";

class Board extends React.Component {



    render() {

        // we do a map within a map here, with each row of the matrix being its own array which creates
        // the game squares
        const gameSquares = this.props.gameMatrix.map((row) =>
            <div className="board-row">{row.map((square) => <Square value={square} />)} </div>)

        // console.log(gameSquares)

        return (
            <div>
                {gameSquares}
            </div>
        )
    }
}

export default Board