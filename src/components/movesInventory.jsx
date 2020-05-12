import React, { Component } from "react";

class MovesInventory extends Component {
  state = {};

  getClassName = (move) => {
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
            <div className="hover-details">
              Dmg Multiplier: {this.props.weapon.damageMultiplier}
              <br />
              Block Multiplier: {this.props.weapon.blockMultiplier}
              <br />
              Category: {this.props.weapon.category}
            </div>
          </span>
        </li>
        <li>
          <b>Moves:</b>
        </li>
        <ul>
          {this.props.moves.map((move) => (
            <li key={move.name} className={this.getClassName(move)}>
              <span className="mana-cost">{move.manaCost}</span> {move.name}
              <br />
              {move.constructor.name === "Attack" ? (
                <span>
                  Damage: {move.damage}X{move.amountOfHits}
                </span>
              ) : (
                <span>Block: {move.blockAmount}</span>
              )}
              <div className="hover-details">
                Synergy: {move.synergyItem}
                <br />
                conflict: {move.conflictCategory}
              </div>
            </li>
          ))}
        </ul>
      </ul>
    );
  }
}

export default MovesInventory;
