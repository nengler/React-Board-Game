import React, { Component } from "react";

class inventory extends Component {
  state = {};
  render() {
    return (
      <ul className="inventory-item">
        {this.props.playerInventory.map((item, index) => (
          <li
            key={index}
            onClick={() => this.props.onInventoryClick(item, index)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default inventory;
