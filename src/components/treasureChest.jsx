import React, { Component } from "react";

class TreasureChest extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        {this.props.treasures.map((treasure, index) => (
          <div
            key={index}
            className="col-4"
            onClick={() => this.props.onTreasureClick(treasure)}
          >
            {treasure.name}
          </div>
        ))}
      </div>
    );
  }
}

export default TreasureChest;
