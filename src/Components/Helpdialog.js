import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

// Using a some dialog modules from material UI to make the help dialog box

// This example was built on the structure that I found at this website:
//  https://www.geeksforgeeks.org/how-to-create-dialog-box-in-reactjs-2/

// I changed it from a functional component that was using hooks to a class component
// for state management because I understand this way better at the moment

class Helpdialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClickToOpen = this.handleClickToOpen.bind(this);
    this.handleToClose = this.handleToClose.bind(this);
  }

  handleClickToOpen() {
    this.setState({ open: true });
  }

  handleToClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div id="helpDiv">
        <button id="helpButton" onClick={this.handleClickToOpen}>
          Help
        </button>
        <Dialog open={this.state.open} onClose={this.handleToClose}>
          <DialogTitle>{"How to play the game"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>
                You need to find the ten bombs that are hidden in the mine
                field.
                <br></br>
                <br></br>
                Click on a tile to reveal what is underneath it. The number
                indicates how many bombs are in neighbouring tiles.
                <br></br>
                <br></br>
                Right click to 'flag' a bomb if you think you have found one.
                Once you find all ten bombs and clear the rest of the minefield
                you win!
                <br></br>
                <br></br>
                If you click on a mine you lose!
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Helpdialog;
