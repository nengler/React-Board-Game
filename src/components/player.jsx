import React, { Component } from "react";

class Player extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="player-header">
          <b>Name: {this.props.playerName}</b>
          Health: {this.props.currentHealth} / {this.props.maxHealth}
          Gold: {this.props.gold}
          Weapon: {this.props.weaponName}
        </div>
      </div>
    );
  }
}

export default Player;
