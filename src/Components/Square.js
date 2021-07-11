import React from "react";

class Square extends React.Component {
  render() {
    console.log(this.props);
    return (
      <button
        className="square"
        id={`${this.props.rowIndex}${this.props.index}`}
        onClick={(event) => this.props.handleClick(event)}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
