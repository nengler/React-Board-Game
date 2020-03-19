import React, { Component } from "react";
import Square from "./square";

import "bootstrap/dist/css/bootstrap.css";

class GameBoard extends Component {
  state = {};

  render() {
    return (
      <div>
        {this.props.gameBoard.map((square, index) => (
          <Square
            key={index}
            square={square}
            location={index}
            boardWidth={this.props.boardWidth}
            handleClick={this.props.playerMovement}
          />
        ))}
      </div>
    );
  }
}

export default GameBoard;
