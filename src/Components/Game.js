import React from "react";
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
        super(props)

        // initialise the state of the game, use array within an array so we can distinguish the rows for styling
        this.state = {
            gameMatrix: [[0, 0, 0], [9, 0, 0], [9, 0, 0]]
        }

        let game = [[0, 0, 0], [9, 0, 0], [9, 0, 0]]

        for (let i = 0; i < game.length; i++) {
            for (let j = 0; j < game[i].length; j++) {
                if (game[i][j] !== 9) {
                    let count = 0

                    for (let k = -1; k < 2; k++) {
                        if (game[i + k] !== undefined) {
                            for (let l = -1; l < 2; l++) {
                                if (game[i + k][j + l] !== undefined) {
                                    // console.log(game[i + k][0 + l])
                                    if (game[i + k][j + l] === 9) {
                                        count++
                                    }

                                }
                            }
                        }
                    }
                    console.log(count)
                    game[i][j] = count;
                }
            }



        }

        console.log(game)


        // loop through the matrix and work out how many mines each cell is touching
        // for (let i = 0; i < game.length; i++) {
        //     for (let j = 0; j < game[i].length; j++) {
        //         if (game[i][j] !== 9) {

        //             let count = 0
        //             console.log(game[i][j])
        //             for (let k = -1; k < 2; k++) {
        //                 // console.log(k)

        //                 if (game[i + k] !== undefined) {

        //                     if (game[i + k][j + k] !== undefined) {
        //                         // if (game[i + k][j + k] === 9) {
        //                         //     count++
        //                         // }
        //                         // console.log(game[i + k][j + k])
        //                     }
        //                 }

        //                 // console.log(game[i + k][j + k])
        //                 // if (game[i + k][j + k] !== undefined) {
        //                 //     
        //                 // }


        //             }
        //             // console.log(count)


        //         }
        //     }
        // }

        // make a random array with a certain number of bombs in it (nines) then loop through it and work out how many 
        // bombs each square is touching and then give that square the value 

    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    {/* pass down the state of the gameMatrix down to the board */}
                    <Board gameMatrix={this.state.gameMatrix} />
                </div>
            </div>
        )
    }
}

export default Game