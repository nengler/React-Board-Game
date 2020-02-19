import React, { Component } from "react";

class fightBoard extends Component {
  state = {};
  render() {
    return (
      <div className="">
        <h3>{this.props.enemy.name}</h3>
        <b>Health</b> {this.props.enemy.currentHealth}/
        {this.props.enemy.maxHealth}
        <div className="row ll">
          {this.props.playerMoves.map((move, index) => (
            <div
              className="col-3 outer-card"
              key={index}
              onClick={() =>
                this.props.onAttackClick(
                  this.props.enemy,
                  move,
                  this.props.playerWeapon
                )
              }
            >
              <div className="inside-card">
                <ul>
                  <li className="card-title">{move.name}</li>
                  {move.constructor.name === "Attack" ? (
                    <span>
                      <li>
                        <span>
                          Damage: {move.damage} X {move.amountOfHits}
                        </span>
                      </li>
                      <li>
                        <span>Synergy Weapon: {move.synergyWeapon}</span>
                      </li>
                    </span>
                  ) : (
                    <span>
                      <li>
                        <span>Block: {move.blockAmount}</span>
                      </li>
                      <li>
                        <span>Synergy Shield: {move.synergyShield}</span>
                      </li>
                    </span>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default fightBoard;
