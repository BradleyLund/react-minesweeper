import "./App.css";
import React from "react";
import Game from "./Components/Game";

class App extends React.Component {
  render() {
    return (
      <div id="everything">
        <h2>Welcome to Minesweeper</h2>
        <Game />
      </div>
    );
  }
}

export default App;
