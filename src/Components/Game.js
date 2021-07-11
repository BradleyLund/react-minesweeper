import React from "react";
import Board from "./Board";

// give each of the squares a class of hidden to start with
// take the hidden class off of the element that has been clicked

// could use state to give each square a class of hidden or not hidden?
// or a handleclick function which uses even.target to change the class after click

class Game extends React.Component {
  constructor(props) {
    super(props);

    // make a random array of n * m
    let game = [
      [0, 0, 0],
      [9, 0, 0],
      [9, 0, 0],
    ];

    let unhiddenSquare = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.handleClick = this.handleClick.bind(this);

    // loop through the matrix and work out how many mines each cell is touching
    for (let i = 0; i < game.length; i++) {
      for (let j = 0; j < game[i].length; j++) {
        if (game[i][j] !== 9) {
          let count = 0;

          for (let k = -1; k < 2; k++) {
            if (game[i + k] !== undefined) {
              for (let l = -1; l < 2; l++) {
                if (game[i + k][j + l] !== undefined) {
                  // console.log(game[i + k][0 + l])
                  if (game[i + k][j + l] === 9) {
                    count++;
                  }
                }
              }
            }
          }
          console.log(count);
          game[i][j] = count;
        }
      }
    }

    console.log(game);

    // initialise the state of the game, use array within an array so we can distinguish the rows for styling
    this.state = {
      gameMatrix: game,
      hiddenMatrix: unhiddenSquare,
    };
  }

  handleClick(event) {
    // testing to see if this works for changing of the class
    let clickedSquare = document.getElementById(event.target.id);
    clickedSquare.classList.add("hidden");
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          {/* pass down the state of the gameMatrix down to the board */}
          <Board
            gameMatrix={this.state.gameMatrix}
            hiddenMatrix={this.state.hiddenMatrix}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default Game;
