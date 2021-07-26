import React from "react";
import Board from "./Board";
import Message from "./Message";
import Helpdialog from "./Helpdialog";

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

    let bombArrayTen = [];
    // make an array of ten bombs in different places
    for (let i = 0; i < 10; i++) {
      let randomBomb = Math.floor(Math.random() * 81);

      // make sure we get a new bomb and no duplicate positions
      while (bombArrayTen.indexOf(randomBomb) !== -1) {
        randomBomb = Math.floor(Math.random() * 81);
      }

      bombArrayTen.push(randomBomb);
    }

    console.log(bombArrayTen);

    // make a random array of 9*9
    let gameArray = [];
    for (let i = 0; i < 9; i++) {
      let rowArray = new Array(9).fill(0);
      gameArray.push(rowArray);
    }

    console.log(gameArray);

    for (let i = 0; i < bombArrayTen.length; i++) {
      // get the index for the first part of the game array for the random number
      let index1 = Math.floor(bombArrayTen[i] / 9);

      // get the index for the second part of the array for the random number
      let index2 = bombArrayTen[i] % 9;

      // push the bomb value (9) to the correct position in the array
      gameArray[index1][index2] = 9;
    }

    console.log(gameArray);

    // loop through the matrix and work out how many mines each cell is touching
    for (let i = 0; i < gameArray.length; i++) {
      for (let j = 0; j < gameArray[i].length; j++) {
        if (gameArray[i][j] !== 9) {
          let count = 0;

          for (let k = -1; k < 2; k++) {
            if (gameArray[i + k] !== undefined) {
              for (let l = -1; l < 2; l++) {
                if (gameArray[i + k][j + l] !== undefined) {
                  // console.log(game[i + k][0 + l])
                  if (gameArray[i + k][j + l] === 9) {
                    count++;
                  }
                }
              }
            }
          }
          // console.log(count);
          gameArray[i][j] = count;
        }
      }
    }

    console.log(gameArray);

    // initialise the state of the game, use array within an array so we can distinguish the rows for styling
    this.state = {
      gameMatrix: gameArray,
      elapsedTime: null,
      lost: null,
      won: null,
      bombCount: 10,
      message: "Enjoy the game!",
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
    if (this.state.lost !== true && this.state.won !== true) {
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
      this.setState({ bombCount: this.state.bombCount - 1 });
    } else if (squareClassArray.indexOf("flag") !== -1) {
      square.classList.remove("flag");
      square.classList.add("hidden");
      this.setState({ bombCount: this.state.bombCount + 1 });
    }

    // check if none of the squares have the hidden class then they have won
    // initialise the boolean
    let gameWon = true;
    console.log(gameWon);

    for (let i = 0; i < this.state.gameMatrix.length; i++) {
      for (let j = 0; j < this.state.gameMatrix[i].length; j++) {
        let square = document.getElementById(`${i}${j}`);
        if (square.classList.contains("hidden")) {
          gameWon = false;
        }
      }
    }

    // if gameWon is true then the player won and the timer should be stopped and should
    // say you win with the time it took

    if (gameWon) {
      this.setState({
        won: true,
        message: `You won in ${this.state.elapsedTime} seconds!`,
      });
    }

    console.log(gameWon);
    console.log(square);
  }

  handleClick(event) {
    // handle the start if it is the first click and maybe the timer doesn't exist in setstate
    if (this.state.elapsedTime === null) {
      this.startTimer();
    }
    // handle if it is a bomb
    let clickedSquare = document.getElementById(event.target.id);

    // check if it has already been flagged so that it should not explode
    if (!clickedSquare.classList.contains("flag")) {
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

        this.setState({
          lost: true,
          message: `You lose! Click restart to play again!`,
        });
        // pop up with restart as an option and then it just reloads the page?
      } else if (event.target.textContent === "") {
        // recursively open up all the tiles connected to this one that are also zero
        // and open up all the tiles surrounding it
        let gameMatrix = this.state.gameMatrix;
        let alreadyChecked = [];
        // create a function to change the class of those around it
        function removeAround(i, j) {
          // let i = locationId.split("")[0];
          // let j = locationId.split("")[1];
          console.log(gameMatrix, i, j, gameMatrix[i][j]);
          console.log("what");
          for (let k = -1; k < 2; k++) {
            // console.log("is", k, gameMatrix[i + k], i + k);
            if (gameMatrix[i + k] !== undefined) {
              // console.log("hello");
              for (let l = -1; l < 2; l++) {
                if (gameMatrix[i + k][j + l] !== undefined) {
                  // remove the hidden class for the square with this id
                  let index1 = String(i + k);
                  let index2 = String(j + l);

                  let id = index1 + index2;

                  let square = document.getElementById(id);

                  square.classList.remove("hidden");
                  console.log(index1, index2, id, square);

                  //
                  if (
                    gameMatrix[i + k][j + l] === 0 &&
                    alreadyChecked.indexOf(id) === -1
                  ) {
                    // submit it to the removeAround Function
                    alreadyChecked.push(id);
                    removeAround(i + k, j + l);
                    // add this id to an array of already checked and if already checked,
                    // don't run removearound for that square
                  }
                }
              }
            }
          }
        }

        console.log(event.target.id[0], event.target.id[1]);
        // then while removing the classes if textContent of that id is nothing
        // submit the id to the function
        removeAround(
          parseInt(event.target.id[0]),
          parseInt(event.target.id[1])
        );
      }
    }

    // testing to see if this works for changing of the class

    clickedSquare.classList.remove("hidden");

    // check if none of the squares have the hidden class then they have won
    // initialise the boolean
    let gameWon = true;

    for (let i = 0; i < this.state.gameMatrix.length; i++) {
      for (let j = 0; j < this.state.gameMatrix[i].length; j++) {
        let square = document.getElementById(`${i}${j}`);

        // if any tile contains hiddden then the game is not over, if they are all
        // unhidden but one of the tiles has the losing bomb class then the game was lost
        if (
          square.classList.contains("hidden") ||
          square.classList.contains("losing-bomb")
        ) {
          gameWon = false;
        }
      }
    }

    // if gameWon is true then the player won and the timer should be stopped and should
    // say you win with the time it took

    if (gameWon) {
      this.setState({
        won: true,
        message: `You won in ${this.state.elapsedTime} seconds!`,
      });
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Message message={this.state.message} />

          <div id="information">
            <div>🕙 {this.state.elapsedTime}</div>
            <button id="restartButton" onClick={this.handleRestart}>
              Restart
            </button>
            <div>💣{this.state.bombCount}</div>
          </div>

          {/* pass down the state of the gameMatrix down to the board */}
          <Board
            gameMatrix={this.state.gameMatrix}
            handleClick={this.handleClick}
            handleContextClick={this.handleContextClick}
          />

          <Helpdialog />
        </div>
      </div>
    );
  }
}

export default Game;
