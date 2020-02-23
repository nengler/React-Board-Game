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
          <b>Weapon:</b>
        </li>
        <li className="movePreview Weapon">
          <span>
            {this.props.weapon.name}
            <br />
            Dmg Multiplier: {this.props.weapon.damageMultiplier}
          </span>
        </li>
        <li>
          <b>Moves:</b>
        </li>
        <ul>
          {this.props.moves.map((move, index) => (
            <li key={index} className={this.getClassName(move)}>
              {move.name}
              <br />
              Mana Cost: {move.manaCost}
              <br />
              Synergy: {move.synergyItem}
            </li>
          ))}
        </ul>
      </ul>
    );
  }
}

export default MovesInventory;
