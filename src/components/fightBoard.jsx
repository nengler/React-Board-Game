import React, { Component } from "react";

class fightBoard extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3>{this.props.enemy.name}</h3>
        <b>Health</b> {this.props.enemy.currentHealth}/
        {this.props.enemy.maxHealth}
        {this.props.playerMoves.map((move, index) => (
          <button
            key={index}
            onClick={() =>
              this.props.onAttackClick(
                this.props.enemy,
                move,
                this.props.playerWeapon
              )
            }
          >
            {move.name}
          </button>
        ))}
      </div>
    );
  }
}

export default fightBoard;
