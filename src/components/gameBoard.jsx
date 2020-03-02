import React, { Component } from "react";
import Square from "./square";

import "bootstrap/dist/css/bootstrap.css";

class GameBoard extends Component {
  state = {};

  renderBoard = () => {
    let rows = [];
    var ct = 1;
    for (const square of this.props.gameBoard) {
      rows.push(
        <Square
          key={ct - 1}
          square={square}
          location={ct - 1}
          handleClick={this.props.playerMovement}
        />
      );
      if (ct % 7 === 0) {
        rows.push(<br />);
      }
      ct++;
    }
    return rows.map(row => row);
  };

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
