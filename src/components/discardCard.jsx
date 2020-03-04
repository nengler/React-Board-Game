import React, { Component } from "react";

class discardCard extends Component {
  state = {
    moveSelectedByIndex: ""
  };

  getCardOutlineClass = moveIndex => {
    let cardOutlineClassname = "inside-card discard-card ";
    if (moveIndex === this.state.moveSelectedByIndex) {
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

  selectCard = moveSelectedByIndex => {
    this.setState({ moveSelectedByIndex });
  };

  render() {
    const disabled = this.state.moveSelected === "";
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
                <div key={index}>
                  {index === 3 && <div className="break"></div>}
                  <div
                    className={this.getCardOutlineClass(index)}
                    onClick={() => this.selectCard(index)}
                  >
                    <ul>
                      <li className={this.getCardClass(move.constructor.name)}>
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
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                this.props.onDiscard(this.state.moveSelectedByIndex)
              }
              disabled={disabled}
              className="text-center btn btn-primary ml-2 mt-2"
            >
              Click me
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default discardCard;
