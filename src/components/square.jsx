import React, { Component } from "react";

class square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.square
    };
  }
  getSquareClass = () => {
    let squareClassName = "square ";
    if (this.state.name === "") {
      squareClassName += "transparent-box";
    } else {
      squareClassName += "primary-box";
    }
    return squareClassName;
  };
  render() {
    return (
      <span>
        <button
          className={this.getSquareClass()}
          onClick={() => {
            this.props.handleClick(this.props.location, this.props.square);
          }}
        >
          {this.props.square}
        </button>
        {(this.props.location + 1) % 9 === 0 && <br />}
      </span>
    );
  }
}

export default square;
