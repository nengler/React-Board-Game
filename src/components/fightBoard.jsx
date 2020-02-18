import React, { Component } from "react";

class fightBoard extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <h3>{this.props.enemy.name}</h3>
        <b>Health</b> {this.props.enemy.currentHealth}/
        {this.props.enemy.maxHealth}
        {this.props.playerMoves.map((move, index) => (
          <div
            className="move-cards col-3"
            key={index}
            onClick={() =>
              this.props.onAttackClick(
                this.props.enemy,
                move,
                this.props.playerWeapon
              )
            }
          >
            <b>Move:{move.name}</b>
            <span>{move.description}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default fightBoard;
