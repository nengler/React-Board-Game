class Shop {
  constructor(shopItems, itemIndex, itemsToShow) {
    this.shopItems = shopItems;
    this.itemIndex = itemIndex;
    this.itemsToShow = itemsToShow;
    this.isStillInShop = false;
  }
  itemsToAddToShop(items) {
    items.forEach(item => {
      this.shopItems.push(item);
    });
    this.shopItems = this.shuffleShop(this.shopItems);
  }
  shuffleShop(itemArray) {
    for (let i = itemArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = itemArray[i];
      itemArray[i] = itemArray[j];
      itemArray[j] = temp;
    }
    return itemArray;
  }
  getShopItems() {
    var retItems = [];
    let index = this.itemIndex;
    for (let i = 0; i <= this.itemsToShow - 1; i++) {
      if (this.shopItems[index] !== undefined) {
        retItems.push(this.shopItems[index]);
      } else if (this.shopItems.length < 4) {
        return retItems;
      } else {
        index = 0;
        retItems.push(this.shopItems[index]);
      }
      index++;
    }
    return retItems;
  }
  increaseIndex() {
    this.itemIndex += 4;
    if (this.itemIndex > this.shopItems.length - 1) {
      this.itemIndex = 0;
    }
  }
  decreaseItemsToShow() {
    this.itemsToShow--;
  }
  resetItemsToShow() {
    this.itemsToShow = 4;
  }
  stillInShop() {
    this.isStillInShop = true;
  }
}

export const shop = new Shop([], 0, 4);
