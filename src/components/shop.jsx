import React, { Component } from "react";

class Shop extends Component {
  state = {};

  getCostClassForItem = (itemCost, playersMoney) => {
    let itemClass = "shop-item-cost ";
    if (itemCost > playersMoney) {
      itemClass += "cant-afford";
    } else if (itemCost <= playersMoney) {
      itemClass += "can-afford";
    }
    return itemClass;
  };

  render() {
    const showcaseShop = this.props.shop.getShopItems();
    return (
      <div className="shop-container">
        <div className="shop-item-flex">
          {showcaseShop.map((shopItem, index) => (
            <div
              key={index}
              onClick={() => this.props.onShopClick(shopItem, index)}
            >
              {shopItem.constructor.name === "Attack" && (
                <div className="inside-card ">
                  <ul>
                    <li className="card-header-fight attack-card">
                      {shopItem.name}
                    </li>
                    <span>
                      <li
                        className={this.getCostClassForItem(
                          shopItem.cost,
                          this.props.playersMoney
                        )}
                      >
                        {shopItem.cost}
                      </li>
                      <li>Mana Cost: {shopItem.manaCost}</li>
                      <li>
                        Damage: {shopItem.damage} X {shopItem.amountOfHits}
                      </li>
                      <li>Synergy: {shopItem.synergyItem}</li>
                      <li>Conflict: {shopItem.conflictCategory}</li>
                    </span>
                  </ul>
                </div>
              )}
              {shopItem.constructor.name === "Block" && (
                <div className="inside-card ">
                  <ul>
                    <li className="card-header-fight block-card">
                      {shopItem.name}
                    </li>
                    <span>
                      <li
                        className={this.getCostClassForItem(
                          shopItem.cost,
                          this.props.playersMoney
                        )}
                      >
                        {shopItem.cost}
                      </li>
                      <li>
                        <span>Mana Cost: {shopItem.manaCost}</span>
                      </li>
                      <li>
                        <span>Block: {shopItem.blockAmount}</span>
                      </li>
                      <li>
                        <span>Synergy: {shopItem.synergyItem}</span>
                      </li>
                      <li>Conflict: {shopItem.conflictCategory}</li>
                    </span>
                  </ul>
                </div>
              )}
              {shopItem.constructor.name === "Weapon" && (
                <div className="inside-card ">
                  <ul>
                    <li className="card-header-fight weapon-reward">
                      {shopItem.name}
                    </li>
                    <span>
                      <li
                        className={this.getCostClassForItem(
                          shopItem.cost,
                          this.props.playersMoney
                        )}
                      >
                        {shopItem.cost}
                      </li>
                      <li>Damage Multiplier: {shopItem.damageMultiplier}</li>
                      <li>Block Multiplier: {shopItem.blockMultiplier}</li>
                      <li>Category: {shopItem.category}</li>
                    </span>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="leave-shop">
          <button className="btn btn-primary" onClick={this.props.exitShop}>
            Exit Shop
          </button>
        </div>
      </div>
    );
  }
}

export default Shop;
