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

  getTextStyle = lengthOfHealthBar => {
    try {
      let lengthOfTextDiv = document.getElementById("text-health-id")
        .offsetWidth;
      let textPosition = lengthOfHealthBar / 2 - lengthOfTextDiv / 2;
      const textDivPosition = {
        left: textPosition
      };
      return textDivPosition;
    } catch {}
  };

  getEnemyMoveStyle = moveType => {
    let typeStyle = {};
    switch (moveType) {
      case "Attack":
        typeStyle.textDecorationColor = "#ff3333";
        break;
      case "Block":
        typeStyle.textDecorationColor = "#0080ff";
        break;
      default:
        break;
    }
    return typeStyle;
  };

  getActualDamage = (moveAmount, multiplier) => {
    let damage = Math.floor(moveAmount * multiplier);
    return " " + damage + " ";
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
      backgroundColor: color
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
                  Block: {this.props.enemy.block}
                </div>
              </div>
            </li>
            <li>
              <b>Next Enemy Move:</b>
              <span
                className="enemy-move-name"
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
                <span>
                  <li>
                    Damage Multiplier:
                    {this.props.playerWeapon.damageMultiplier}
                  </li>
                  <li>
                    Block Multiplier:
                    {this.props.playerWeapon.blockMultiplier}
                  </li>
                </span>
              </ul>
            </div>
          </div>
          <div className="all-moves">
            <h2 className="info-title">Moves</h2>
            <div className="discard-one-move">
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
                              this.props.playerWeapon.damageMultiplier
                            )}
                            X {move.amountOfHits}
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
                              this.props.playerWeapon.blockMultiplier
                            )}
                          </span>
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
                      this.props.enemy.weapon
                    )
                  }
                >
                  End turn
                </button>
              </div>
            </div>
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
          <span className="blocking">
            <b>Block:</b> {this.props.block}
          </span>
        </div>
      </div>
    );
  }
}

export default fightBoard;
