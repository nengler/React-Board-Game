import React, { Component } from "react";

class fightBoard extends Component {
  state = {};

  getManaClassForCard(manaCost) {
    let manaClass = "card-mana-cost ";
    if (manaCost > this.props.currentMana) {
      manaClass += "not-useable";
    } else {
      manaClass += "useable";
    }
    return manaClass;
  }

  render() {
    let enemyMove = this.props.enemy.getCurrentMove();
    return (
      <div className="text-center">
        <div className="enemy-info">
          <ul>
            <li>
              <h3 className="enemy-name">{this.props.enemy.name}</h3>
            </li>
            <li>
              <b>Health</b> {this.props.enemy.currentHealth}/
              {this.props.enemy.maxHealth}
            </li>
            <li>
              <b>Next Enemy Move:</b> {enemyMove.name}
            </li>
          </ul>
        </div>
        <div className=" flex-parent">
          {this.props.playerMoves.map((move, index) =>
            move.constructor.name === "Attack" ? (
              <div
                className="inside-card "
                key={index}
                onClick={() =>
                  this.props.onAttackCardClick(
                    this.props.enemy,
                    move,
                    this.props.playerWeapon,
                    this.props.currentMana
                  )
                }
              >
                <ul>
                  <li className="card-header-fight attack-card">{move.name}</li>
                  <span>
                    <li className={this.getManaClassForCard(move.manaCost)}>
                      {move.manaCost}
                    </li>
                    <li>
                      <span>
                        Damage: {move.damage} X {move.amountOfHits}
                      </span>
                    </li>
                    <li>
                      <span>Synergy: {move.synergyItem}</span>
                    </li>
                  </span>
                </ul>
              </div>
            ) : (
              <div
                className="inside-card "
                key={index}
                onClick={() =>
                  this.props.onBlockCardClick(
                    move,
                    this.props.playerWeapon,
                    this.props.currentMana
                  )
                }
              >
                <ul>
                  <li className="card-header-fight block-card">{move.name}</li>
                  <span>
                    <li className={this.getManaClassForCard(move.manaCost)}>
                      {move.manaCost}
                    </li>
                    <li>
                      <span>Block: {move.blockAmount}</span>
                    </li>
                    <li>
                      <span>Synergy: {move.synergyItem}</span>
                    </li>
                  </span>
                </ul>
              </div>
            )
          )}
          <div className="end-turn-button">
            <button
              className="btn btn-primary end-turn-button"
              onClick={() =>
                this.props.onEnemyAttack(
                  enemyMove,
                  this.props.block,
                  this.props.enemy.weapon.damageMultiplier
                )
              }
            >
              End turn
            </button>
          </div>
        </div>

        <div>
          <span
            className={`${
              this.props.currentMana > 0 ? "useable" : "not-useable"
            }`}
          >
            <b>Mana:</b> {this.props.currentMana} / {this.props.maxMana}
          </span>
          <br />
          Current Block: {this.props.block}
        </div>
      </div>
    );
  }
}

export default fightBoard;
