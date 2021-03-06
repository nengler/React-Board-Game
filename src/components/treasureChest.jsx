import React, { Component } from "react";

class TreasureChest extends Component {
  state = {};
  render() {
    const showcaseTreasure = this.props.treasure.getTreasure();
    console.log(showcaseTreasure);
    return (
      <div>
        <h2>Claim a Reward</h2>
        <div className="treasure-flex">
          {showcaseTreasure.map((treasure, index) => (
            <div
              key={index}
              onClick={() => this.props.onTreasureClick(treasure)}
            >
              {treasure.type === "Attack" && (
                <div className="inside-card ">
                  <ul>
                    <li className="card-header-fight attack-card">
                      {treasure.name}
                    </li>
                    <span>
                      <li>
                        <span>Mana Cost: {treasure.manaCost}</span>
                      </li>
                      <li>
                        <span>
                          Damage: {treasure.damage} X {treasure.amountOfHits}
                        </span>
                      </li>
                      <li>
                        <span>Synergy: {treasure.synergyItem}</span>
                      </li>
                      <li>
                        <span>Conflict: {treasure.conflictCategory}</span>
                      </li>
                    </span>
                  </ul>
                </div>
              )}
              {treasure.type === "Block" && (
                <div className="inside-card ">
                  <ul>
                    <li className="card-header-fight block-card">
                      {treasure.name}
                    </li>
                    <span>
                      <li>
                        <span>Mana Cost: {treasure.manaCost}</span>
                      </li>
                      <li>
                        <span>Block: {treasure.blockAmount}</span>
                      </li>
                      <li>
                        <span>Synergy: {treasure.synergyItem}</span>
                      </li>
                      <li>
                        <span>Conflict: {treasure.conflictCategory}</span>
                      </li>
                    </span>
                  </ul>
                </div>
              )}
              {treasure.type === "Weapon" && (
                <div className="inside-card ">
                  <ul>
                    <li className="card-header-fight weapon-reward">
                      {treasure.name}
                    </li>
                    <span>
                      <li>Damage Multiplier: {treasure.damageMultiplier}</li>
                      <li>Block Multiplier: {treasure.blockMultiplier}</li>
                      <li>Category: {treasure.category}</li>
                    </span>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          className="btn btn-danger"
          onClick={() => this.props.onNoTreasure()}
        >
          Maybe not...
        </button>
      </div>
    );
  }
}

export default TreasureChest;
