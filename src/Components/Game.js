import React from "react";
import Board from "./Board";
import Message from "./Message";
import Helpdialog from "./Helpdialog";
import Settingsdialog from "./Settingsdialog";

// generate a random array with Math.random, and the width, height and bombCount
// make sure that the second number is not the same as the first one
function makeGameArray(width, height, bombCount) {
  let bombArray = [];
  // make an array of the bombCount bombs in different places
  for (let i = 0; i < bombCount; i++) {
    let randomBomb = Math.floor(Math.random() * (width * height));

    // make sure we get a new bomb and no duplicate positions
    while (bombArray.indexOf(randomBomb) !== -1) {
      randomBomb = Math.floor(Math.random() * (width * height));
    }

    bombArray.push(randomBomb);
  }

  // initialise the gameArray
  let gameArray = [];

  // initially make the gameArray a h*w matrix with 0's
  for (let i = 0; i < height; i++) {
    let rowArray = new Array(width).fill(0);
    // debugging using JSON so that the variable at this point is logged to the console and not changed
    // console.log(JSON.parse(JSON.stringify(rowArray)));
    gameArray.push(rowArray);
  }

  // Put the bombs in the correct position in the gameArray
  for (let i = 0; i < bombArray.length; i++) {
    // get the index for the first part of the game array for the bomb
    let index1 = Math.floor(bombArray[i] / width);
    // console.log(index1, width);
    // get the index for the second part of the array for the random number
    let index2;
    if (index1 === 0) {
      // if the first index is 0 then it is in the first row of the matrix and the position in that row
      // is just its value i.e. if a 3*3 matrix, and the number is 0,1,2 its index1 will be 0 and then its position
      // willl just be itself
      index2 = bombArray[i];
    } else {
      // if it is in a different row then we need to modulus the number
      // with the number at the beginning of the row
      index2 = bombArray[i] % (index1 * width);
    }

    // push the bomb value (9) to the correct position in the array, 9 will represent a bomb as there is
    // no way a square can have 9 bombs around it
    gameArray[index1][index2] = 9;
  }

  // loop through the matrix and work out how many mines each cell is touching
  for (let i = 0; i < gameArray.length; i++) {
    for (let j = 0; j < gameArray[i].length; j++) {
      if (gameArray[i][j] !== 9) {
        let count = 0;

        // looping through the surrounding squares, checking undefined neighbours if it is an edge square
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
        // push the neighbouring bombCOunt to the gameArray in its position
        gameArray[i][j] = count;
      }
    }
  }

  // console.log(gameArray);

  return gameArray;
}

// give each of the squares a class of hidden to start with
// take the hidden class off of the element that has been clicked

// handleclick function which uses even.target to change the class after click

class Game extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state of the game, use array within an array so we can distinguish the rows for styling
    this.state = {
      gameMatrix: makeGameArray(9, 9, 10),
      elapsedTime: null,
      lost: null,
      won: null,
      bombCount: 10,
      message: "Enjoy the game!",
      width: 9,
      height: 9,
    };

    // bind all the functions to this

    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countUp = this.countUp.bind(this);
    this.handleContextClick = this.handleContextClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
  }

  // start the elapsed time clock
  startTimer() {
    // run the countup function which adds one to the elapsedtime and setinterval to run every second
    setInterval(this.countUp, 1000);
  }

  // add 1 second to the clock after each second
  countUp() {
    // check if game is lost already, then don't count up otherwise carry on ticking
    if (this.state.lost !== true && this.state.won !== true) {
      this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }));
    }
  }

  // easiest way to restart is to just reload the page and reinitialise everything
  handleRestart() {
    window.location.reload();
  }

  // handleThe state of the height and width and bombcount
  handleSettingsChange(event) {
    // I had huge issues that took ages to resolve by using valueAsNumber
    if (event.target.id === "width") {
      this.setState({ width: event.target.valueAsNumber });
    } else if (event.target.id === "height") {
      this.setState({ height: event.target.valueAsNumber });
    } else {
      this.setState({ bombCount: event.target.valueAsNumber });
    }
  }

  // handler for when the user clicks on the submit button after changing the height, width, bombcount
  handleSettingsSubmit() {
    // use the gamearray function to make a new array with the new settings
    let settingsGameArray = makeGameArray(
      this.state.width,
      this.state.height,
      this.state.bombCount
    );

    // console.log(JSON.parse(JSON.stringify(settingsGameArray)));
    this.setState({
      gameMatrix: settingsGameArray,
    });
  }

  // handle the onContextMenu click, for each square to give the square a flag
  handleContextClick(event) {
    // prevent the normal right click menu to arrive
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

      // lower the amount of bombs to find
      this.setState({ bombCount: this.state.bombCount - 1 });
    } else if (squareClassArray.indexOf("flag") !== -1) {
      square.classList.remove("flag");
      square.classList.add("hidden");

      // if the user takes away a flag, increase the bombCount again
      this.setState({ bombCount: this.state.bombCount + 1 });
    }

    // check if none of the squares have the hidden class then they have won
    // initialise the boolean
    let gameWon = true;

    for (let i = 0; i < this.state.gameMatrix.length; i++) {
      for (let j = 0; j < this.state.gameMatrix[i].length; j++) {
        let square = document.getElementById(
          `${String.fromCharCode(i + 65)}${j}`
        );
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
  }

  // handler function for clicking on a square
  handleClick(event) {
    // handle the start if it is the first click
    if (this.state.elapsedTime === null) {
      this.startTimer();
    }
    // handle if it is a bomb
    let clickedSquare = document.getElementById(event.target.id);

    // check if it has already been flagged so that it should not explode
    if (!clickedSquare.classList.contains("flag")) {
      if (event.target.textContent === "????") {
        // add the losing bomb styling
        clickedSquare.classList.add("losing-bomb");

        // loop through all of the squares and take away the hidden class

        // I can just select all the elements of class square and remove the hidden class
        let allSquares = document.getElementsByClassName("square");

        for (let i = 0; i < allSquares.length; i++) {
          allSquares[i].classList.remove("hidden");
        }

        this.setState({
          lost: true,
          message: `You lose! Click restart to play again!`,
        });
      } else if (event.target.textContent === "") {
        // recursively open up all the tiles connected to this one that are also zero
        // and open up all the tiles surrounding it
        let gameMatrix = this.state.gameMatrix;

        // make this array to push every one that has been checked already so that two blanks next to each other
        // dont infinitely call removearound function on each other
        let alreadyChecked = [];

        // create a function to change the class of those around it
        function removeAround(i, j) {
          // check the squares around the one clicked on
          for (let k = -1; k < 2; k++) {
            if (gameMatrix[i + k] !== undefined) {
              for (let l = -1; l < 2; l++) {
                if (gameMatrix[i + k][j + l] !== undefined) {
                  // remove the hidden class for the square with this id
                  let index1 = String.fromCharCode(i + k + 65);
                  let index2 = String(j + l);

                  // console.log(index1, index2);

                  let id = index1 + index2;

                  let square = document.getElementById(id);

                  square.classList.remove("hidden");

                  // if a neighbour is blank and it has not been checked already then call the removearound function on it
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

        // we need to submit two integer indexes of where the element clicked is
        // the id has been constructed that it is a letter and then its position in the array
        // use slice because the number could be more that one digit
        removeAround(
          parseInt(event.target.id[0].charCodeAt(0) - 65),
          parseInt(event.target.id.slice(1))
        );
      }
    }

    // remove hidden for the square selected

    clickedSquare.classList.remove("hidden");

    // check if none of the squares have the hidden class then they have won
    // initialise the boolean
    let gameWon = true;

    for (let i = 0; i < this.state.gameMatrix.length; i++) {
      for (let j = 0; j < this.state.gameMatrix[i].length; j++) {
        let square = document.getElementById(
          `${String.fromCharCode(i + 65)}${j}`
        );

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
            <div>???? {this.state.elapsedTime}</div>
            <button id="restartButton" onClick={this.handleRestart}>
              Restart
            </button>
            <div>????{this.state.bombCount}</div>
          </div>

          {/* pass down the state of the gameMatrix down to the board */}
          <div id="board">
            <Board
              gameMatrix={this.state.gameMatrix}
              handleClick={this.handleClick}
              handleContextClick={this.handleContextClick}
            />
          </div>

          <div id="bottomDiv">
            <Helpdialog />
            {/* Make a settings dialog here with a form input that only allows up to 20*20 and as 
          many bombs as the n*m that has been selected */}
            <Settingsdialog
              bombCount={this.state.bombCount}
              height={this.state.height}
              width={this.state.width}
              handleSettingsChange={this.handleSettingsChange}
              handleSettingsSubmit={this.handleSettingsSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
