import React, { Component } from "react";

class inventory extends Component {
  state = {};
  render() {
    return (
      <ul>
        {this.props.playerInventory.map((item, index) => (
          <li
            key={index}
            className="inventory-item"
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
