import React, { Component } from "react";

class restChoice extends Component {
  state = {
    playerCurrentHealth: this.props.player.currentHealth,
    playerMaxHealth: this.props.player.maxHealth
  };

  showFullHealth = () => {
    let playerCurrentHealth = this.props.player.maxHealth;
    this.setState({ playerCurrentHealth });
  };

  showCurrentHealth = () => {
    let playerCurrentHealth = this.props.player.currentHealth;
    this.setState({ playerCurrentHealth });
  };

  componentDidMount() {
    document
      .getElementById("player-health-id")
      .addEventListener("mouseover", this.showFullHealth);
    document
      .getElementById("player-health-id")
      .addEventListener("mouseout", this.showCurrentHealth);
  }

  componentWillUnmount() {
    document
      .getElementById("player-health-id")
      .removeEventListener("mouseover", this.showFullHealth);
    document
      .getElementById("player-health-id")
      .removeEventListener("mouseout", this.showCurrentHealth);
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <h2>Full Heal</h2>
          <div className="row">
            <div className="col-3"></div>
            <div
              className="rest-choice-heal col-6"
              id="player-health-id"
              onClick={() => this.props.onRestClick(this.props.player)}
            >
              <ul className="player-health-padding">
                <li>
                  {this.state.playerCurrentHealth} /{" "}
                  {this.state.playerMaxHealth}
                </li>
              </ul>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <div className="col-6">
          <h2 className="rest-choice">Smith Weapon</h2>
          <div className="row">
            <div
              className="col-5 increase-attack"
              onClick={() =>
                this.props.onSmithClick(
                  this.props.player,
                  "Attack",
                  this.props.weapon.name
                )
              }
            >
              <ul>
                <li>Increase attack by .2</li>
                <li>Decrease block by .15</li>
              </ul>
            </div>
            <div className="col-2"></div>
            <div
              className="col-5 increase-block"
              onClick={() =>
                this.props.onSmithClick(
                  this.props.player,
                  "Block",
                  this.props.weapon.name
                )
              }
            >
              <ul>
                <li>Increase block by .2</li>
                <li>Decrease attack by .15</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default restChoice;
