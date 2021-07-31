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

class Settingsdialog extends React.Component {
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
      <div id="settingsDiv">
        <button id="settingsButton" onClick={this.handleClickToOpen}>
          Settings
        </button>
        <Dialog open={this.state.open} onClose={this.handleToClose}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div id="settings">
                <div className="inputs">
                  <label for="bombs">Bombs: </label>
                  {/* min and max for the following is calculated by the width and height values in state */}
                  <input
                    type="number"
                    id="bombs"
                    name="bombs"
                    min="10"
                    max={this.props.height * this.props.width}
                    value={this.props.bombCount}
                    onChange={(event) =>
                      this.props.handleSettingsChange(event)
                    }></input>
                </div>

                <div className="inputs">
                  <label for="width">Width: </label>
                  <input
                    type="number"
                    id="width"
                    name="width"
                    min="9"
                    max="20"
                    value={this.props.width}
                    onChange={(event) =>
                      this.props.handleSettingsChange(event)
                    }></input>
                </div>

                <div className="inputs">
                  <label for="height">Height: </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    min="9"
                    max="20"
                    value={this.props.height}
                    onChange={(event) =>
                      this.props.handleSettingsChange(event)
                    }></input>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.handleSettingsSubmit()}
              color="primary"
              autoFocus>
              Submit
            </Button>
            <Button onClick={this.handleToClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Settingsdialog;

// let the number select manipulate the state of the form and then only on submit does the gameMatrix update
// with the function using the height and width from the state
