import React, { Component } from "react";

class discardCard extends Component {
  state = {
    moveSelected: ""
  };

  getCardOutlineClass = moveName => {
    let cardOutlineClassname = "inside-card ";
    if (moveName === this.state.moveSelected) {
      cardOutlineClassname += "card-selected-outline";
    }
    return cardOutlineClassname;
  };

  getCardClass = moveType => {
    let cardClassName = "card-header-fight ";
    if (moveType === "Attack") {
      cardClassName += "attack-card";
    } else if (moveType === "Block") {
      cardClassName += "block-card";
    }
    return cardClassName;
  };

  selectCard = moveSelected => {
    this.setState({ moveSelected });
  };

  render() {
    return (
      <div>
        <div className=" flex-parent">
          <div className="weapon-info">
            <h2 className="info-title">Weapon</h2>
            <div className="inside-card weapon-details">
              <ul>
                <li className="card-header-fight weapon-reward">
                  {this.props.weapon.name}
                </li>
                <span>
                  <li>
                    Damage Multiplier:
                    {this.props.weapon.damageMultiplier}
                  </li>
                  <li>
                    Block Multiplier:
                    {this.props.weapon.blockMultiplier}
                  </li>
                </span>
              </ul>
            </div>
          </div>
          <div className="all-moves">
            <h2 className="info-title">Moves</h2>
            <div className="discard-one-move">
              {this.props.moves.map((move, index) => (
                <div
                  className={this.getCardOutlineClass(move.name)}
                  onClick={() => this.selectCard(move.name)}
                  key={index}
                >
                  <ul>
                    <li
                      className={this.getCardClass(
                        move.constructor.name,
                        move.name
                      )}
                    >
                      {move.name}
                    </li>
                    <span>
                      <li>
                        <span>Mana Cost: {move.manaCost}</span>
                      </li>
                      <li>
                        {move.constructor.name === "Attack" && (
                          <span>
                            Damage: {move.damage} X {move.amountOfHits}
                          </span>
                        )}
                        {move.constructor.name === "Block" && (
                          <span>Block: {move.blockAmount}</span>
                        )}
                      </li>
                      <li>
                        <span>Synergy: {move.synergyItem}</span>
                      </li>
                    </span>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => this.props.onDiscard(this.state.moveSelected)}>
          Click me
        </button>
      </div>
    );
  }
}

export default discardCard;
