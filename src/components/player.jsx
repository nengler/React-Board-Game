import React, { Component } from "react";

class Player extends Component {
  state = {};

  getClassName = () => {
    let healthClassName = "player-health ";
    if (this.props.currentHealth > this.props.maxHealth / 2) {
      healthClassName += "good-health";
    } else {
      healthClassName += "bad-health";
    }
    return healthClassName;
  };

  render() {
    return (
      <div className="player-info">
        <span>
          <b>Name:</b> {this.props.playerName}
        </span>
        <span className={this.getClassName()}>
          <b>Health:</b> {this.props.currentHealth} / {this.props.maxHealth}
        </span>
        <span className="player-gold">
          <b>Gold:</b> {this.props.gold}
        </span>
        <span>
          <b>Level:</b> {this.props.level}
        </span>
      </div>
    );
  }
}

export default Player;
