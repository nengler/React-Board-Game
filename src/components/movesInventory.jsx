import React, { Component } from "react";

class MovesInventory extends Component {
  state = {};

  getClassName = move => {
    let moveClass = "movePreview " + move.constructor.name;
    return moveClass;
  };

  render() {
    return (
      <ul>
        <li>
          <b>Weapon:</b> {this.props.weaponName}
        </li>
        <li>
          <b>Moves:</b>
        </li>
        {this.props.moves.map((move, index) => (
          <span key={index} className={this.getClassName(move)}>
            {move.name}
          </span>
        ))}
      </ul>
    );
  }
}

export default MovesInventory;
