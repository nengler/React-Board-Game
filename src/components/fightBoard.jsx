import React, { Component } from "react";
import sword from "../assets/imgs/sword5.png";
import shield from "../assets/imgs/shield3.png";

class fightBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 1,
    };
  }

  componentDidMount() {
    this.props.handleChatBox("--- TURN " + this.state.turn + " ---");
  }

  getSynergyClassName = (moveSynergy) => {
    if (moveSynergy === this.props.playerWeapon.name) {
      return "synergy-item";
    }
  };

  getConflictClassName = (moveConflict) => {
    if (moveConflict === this.props.playerWeapon.category) {
      return "conflict-item";
    }
  };

  getManaClassForCard(manaCost) {
    let manaClass = "card-mana-cost ";
    if (manaCost > this.props.currentMana) {
      manaClass += "not-useable";
    } else {
      manaClass += "useable";
    }
    return manaClass;
  }

  getTextStyle = (lengthOfHealthBar) => {
    try {
      let lengthOfTextDiv = document.getElementById("text-health-id")
        .offsetWidth;
      let textPosition = lengthOfHealthBar / 2 - lengthOfTextDiv / 2;
      const textDivPosition = {
        left: textPosition,
      };
      return textDivPosition;
    } catch {}
  };

  getEnemyMoveStyle = (moveType) => {
    let typeStyle = {};
    switch (moveType) {
      case "Attack":
        typeStyle.color = "#ff3333";
        break;
      case "Block":
        typeStyle.color = "#0080ff";
        break;
      default:
        break;
    }
    return typeStyle;
  };

  getActualDamage = (moveAmount, multiplier, moveSynergy, moveConflict) => {
    let damage = Math.floor(moveAmount * multiplier);
    if (this.props.playerWeapon.name === moveSynergy) {
      damage = Math.ceil(damage * 1.5);
      return <span className="increased-damage"> {damage} </span>;
    } else if (this.props.playerWeapon.category === moveConflict) {
      damage = Math.floor(damage * 0.75);
      return <span className="decreased-damage"> {damage} </span>;
    }
    return <span> {damage} </span>;
  };

  handleDefendClick = (move) => {
    if (move.manaCost <= this.props.currentMana) {
      let shield = document.getElementById(move.name);
      shield.style.opacity = "1";
      this.props.onBlockCardClick(
        move,
        this.props.playerWeapon,
        this.props.currentMana
      );
      setTimeout(() => {
        shield.style.opacity = "0";
      }, 300);
    } else {
      this.props.handleChatBox("not enough mana");
    }
  };

  handleAttackClick = (move) => {
    if (move.manaCost <= this.props.currentMana) {
      let sword = document.getElementById(move.name);
      //sword.style.display = "block";
      sword.style.opacity = "1";
      this.props.onAttackCardClick(
        this.props.enemy,
        move,
        this.props.playerWeapon,
        this.props.currentMana
      );
      setTimeout(() => {
        sword.style.opacity = "0";
      }, 300);
    } else {
      this.props.handleChatBox("not enough mana");
    }
  };

  handleEndTurn = (enemyMove) => {
    this.props.onEnemyAttack(
      enemyMove,
      this.props.block,
      this.props.enemy.weapon
    );
    this.setState({ turn: this.state.turn + 1 }, () =>
      this.props.handleChatBox("--- TURN " + this.state.turn + " ---")
    );
  };

  render() {
    let enemyMove = this.props.enemy.getCurrentMove();
    const lengthOfHealthBar = 200;
    let hpWidth =
      (this.props.enemy.currentHealth / this.props.enemy.maxHealth) *
      lengthOfHealthBar;
    let color = "#526f35";
    if (this.props.enemy.currentHealth < this.props.enemy.maxHealth / 2) {
      color = "#e80000";
    }
    let healthBarWidth = {
      width: hpWidth,
      backgroundColor: color,
    };

    return (
      <div className="text-center">
        <div className="enemy-info container">
          <ul>
            <li className="text-center">
              <span className="enemy-name">{this.props.enemy.name}</span>
              <div className="flex-test justify-center">
                <div className="health-outline text-center">
                  <div className="health-bar" style={healthBarWidth}></div>

                  <div
                    className="enemy-health-text"
                    id="text-health-id"
                    style={this.getTextStyle(lengthOfHealthBar)}
                  >
                    {this.props.enemy.currentHealth}/
                    {this.props.enemy.maxHealth}
                  </div>
                </div>
                <div className="enemy-block">
                  <b>Block:</b> {this.props.enemy.block}
                </div>
              </div>
            </li>
            <li>
              <span className="next-enemy-move">Enemy Move: </span>
              <span
                className="next-enemy-move"
                style={this.getEnemyMoveStyle(enemyMove.constructor.name)}
              >
                {enemyMove.name}
              </span>
            </li>
          </ul>
        </div>
        <div className=" flex-parent">
          <div className="weapon-info">
            <h2 className="info-title">Weapon</h2>
            <div className="inside-card weapon-details">
              <ul>
                <li className="card-header-fight weapon-reward">
                  {this.props.playerWeapon.name}
                </li>
                <li>
                  Dmg Multiplier: {this.props.playerWeapon.damageMultiplier}
                </li>
                <li>
                  Block Multiplier: {this.props.playerWeapon.blockMultiplier}
                </li>
                <li>Cateogry: {this.props.playerWeapon.category}</li>
              </ul>
            </div>
          </div>
          <div className="all-moves">
            <h2 className="info-title">Moves</h2>
            <div className="discard-one-move">
              {this.props.playerMoves.map((move, index) =>
                move.constructor.name === "Attack" ? (
                  <div
                    className="inside-card move-details"
                    key={move.name}
                    onClick={() => this.handleAttackClick(move)}
                  >
                    <ul>
                      <li className="card-header-fight attack-card">
                        {move.name}
                      </li>
                      <span>
                        <li className={this.getManaClassForCard(move.manaCost)}>
                          {move.manaCost}
                        </li>
                        <li>
                          <span>
                            Damage:
                            {this.getActualDamage(
                              move.damage,
                              this.props.playerWeapon.damageMultiplier,
                              move.synergyItem,
                              move.conflictCategory
                            )}
                            X {move.amountOfHits}
                          </span>
                        </li>
                        <li>
                          Synergy:{" "}
                          <span
                            className={this.getSynergyClassName(
                              move.synergyItem
                            )}
                          >
                            {move.synergyItem}
                          </span>
                        </li>
                        <li>
                          Conflict:{" "}
                          <span
                            className={this.getConflictClassName(
                              move.conflictCategory
                            )}
                          >
                            {move.conflictCategory}
                          </span>
                        </li>
                      </span>
                    </ul>
                    <img
                      alt=""
                      src={sword}
                      id={move.name}
                      className="animation-sword"
                    />
                  </div>
                ) : (
                  <div
                    className="inside-card move-details"
                    key={index}
                    onClick={() => this.handleDefendClick(move)}
                  >
                    <ul>
                      <li className="card-header-fight block-card">
                        {move.name}
                      </li>
                      <span>
                        <li className={this.getManaClassForCard(move.manaCost)}>
                          {move.manaCost}
                        </li>
                        <li>
                          <span>
                            Block:
                            {this.getActualDamage(
                              move.blockAmount,
                              this.props.playerWeapon.blockMultiplier,
                              move.synergyItem,
                              move.conflictCategory
                            )}
                          </span>
                        </li>
                        <li>
                          Synergy:{" "}
                          <span
                            className={this.getSynergyClassName(
                              move.synergyItem
                            )}
                          >
                            {move.synergyItem}
                          </span>
                        </li>
                        <li>
                          Conflict:{" "}
                          <span
                            className={this.getConflictClassName(
                              move.conflictCategory
                            )}
                          >
                            {move.conflictCategory}
                          </span>
                        </li>
                      </span>
                    </ul>
                    <img
                      alt=""
                      src={shield}
                      id={move.name}
                      className="animation-sword"
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="end-turn-button">
            <button
              className="btn btn-primary end-turn-button"
              onClick={() => this.handleEndTurn(enemyMove)}
            >
              End turn
            </button>
          </div>
        </div>

        <div className="mana-and-block">
          <span
            className={`${
              this.props.currentMana > 0 ? "useable" : "not-useable"
            }`}
          >
            <b>Mana:</b> {this.props.currentMana} / {this.props.maxMana}
          </span>
          <span className="blocking ml-4">
            <b>Block:</b> {this.props.block}
          </span>
        </div>
      </div>
    );
  }
}

export default fightBoard;
