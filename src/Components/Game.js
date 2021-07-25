import React from "react";
import Board from "./Board";

// give each of the squares a class of hidden to start with
// take the hidden class off of the element that has been clicked

// could use state to give each square a class of hidden or not hidden?
// or a handleclick function which uses even.target to change the class after click

// doing the timer, set the date to now on first click and then update the clock

class Game extends React.Component {
  constructor(props) {
    super(props);

    // generate a random array with Math.random, for now lets do 2 bombs and get a number between
    // 0 and 8 and then we can modulus that number to get where in the array it should go
    // make sure that the second number is not the same as the first one

    let bombArray = [];

    let bomb1 = Math.floor(Math.random() * 9);
    let bomb2 = Math.floor(Math.random() * 9);

    // make sure the two bombs are in different positions in the array
    while (bomb1 === bomb2) {
      bomb2 = Math.floor(Math.random() * 9);
    }

    bombArray.push(bomb1, bomb2);

    console.log(bomb1, bomb2, bombArray);

    // make a random array of n * m
    //  initialise the game array
    let game = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    for (let i = 0; i < bombArray.length; i++) {
      // get the index for the first part of the game array for the random number
      let index1 = Math.floor(bombArray[i] / 3);

      // get the index for the second part of the array for the random number
      let index2 = bombArray[i] % 3;

      // push the bomb value (9) to the correct position in the array
      game[index1][index2] = 9;
    }

    console.log(game);

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
          // console.log(count);
          game[i][j] = count;
        }
      }
    }

    console.log(game);

    // initialise the state of the game, use array within an array so we can distinguish the rows for styling
    this.state = {
      gameMatrix: game,
      elapsedTime: null,
      lost: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countUp = this.countUp.bind(this);
    this.handleContextClick = this.handleContextClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  startTimer() {
    setInterval(this.countUp, 1000);
  }

  countUp() {
    if (this.state.lost !== true) {
      this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }));
    }
  }

  handleRestart() {
    window.location.reload();
  }

  // handle the onContextMenu click, for each square to give the square a flag
  handleContextClick(event) {
    event.preventDefault();

    // give variable square the dom element of the appropriate square
    let square = event.target;
    // check what class the square has and then add question mark or red flag or nothing
    // check if hidden, if not do nothing
    // classlist is a DOM tokenlist not an array
    let squareClassArray = [...square.classList];
    if (squareClassArray.indexOf("hidden") !== -1) {
      // add the class of the flag
      square.classList.remove("hidden");
      square.classList.add("flag");
    } else if (squareClassArray.indexOf("flag") !== -1) {
      square.classList.remove("flag");
      square.classList.add("hidden");
    }

    console.log(square);
  }

  handleClick(event) {
    // handle the start if it is the first click and maybe the timer doesn't exist in setstate
    if (this.state.elapsedTime === null) {
      this.startTimer();
    }
    // handle if it is a bomb
    let clickedSquare = document.getElementById(event.target.id);
    if (event.target.textContent === "💣") {
      // alert("You hit a bomb");
      clickedSquare.classList.add("losing-bomb");

      // loop through all of the squares and take away the hidden class
      for (let i = 0; i < this.state.gameMatrix.length; i++) {
        for (let j = 0; j < this.state.gameMatrix[i].length; j++) {
          let square = document.getElementById(`${i}${j}`);
          square.classList.remove("hidden");
        }
      }

      this.setState({ lost: true });
      // pop up with restart as an option and then it just reloads the page?
    } else if (event.target.textContent === "") {
      // recursively open up all the tiles connected to this one that are also zero
    }
    // testing to see if this works for changing of the class

    clickedSquare.classList.remove("hidden");
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div>{this.state.elapsedTime}</div>
          <div>{this.state.lost ? "You lose!" : "Good luck!"}</div>
          <button onClick={this.handleRestart}>Restart</button>
          {/* pass down the state of the gameMatrix down to the board */}
          <Board
            gameMatrix={this.state.gameMatrix}
            handleClick={this.handleClick}
            handleContextClick={this.handleContextClick}
          />
        </div>
      </div>
    );
  }
}

export default Game;
