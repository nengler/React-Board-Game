class Treasure {
  constructor(commonTreasure, commonIndex, rareTreasure, rareIndex) {
    this.commonTreasure = commonTreasure;
    this.commonIndex = commonIndex;
    this.rareTreasure = rareTreasure;
    this.rareIndex = rareIndex;
  }
  itemsToAddToTreasure(items) {
    items.forEach(item => {
      if (item.rarity === "Common") {
        this.commonTreasure.push(item);
      } else if (item.rarity === "Rare") {
        this.rareTreasure.push(item);
      }
    });
    this.commonTreasure = this.shuffleTreasure(this.commonTreasure);
    this.rareTreasure = this.shuffleTreasure(this.rareTreasure);
  }
  shuffleTreasure(treasureArray) {
    for (let i = treasureArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = treasureArray[i];
      treasureArray[i] = treasureArray[j];
      treasureArray[j] = temp;
    }
    return treasureArray;
  }
  addToCommonTreasure(treasure) {
    this.commonTreasure.push(treasure);
  }
  addToRareTreasure(treasure) {
    this.rareTreasure.push(treasure);
  }
  getTreasure() {
    var retTreasure = [];
    let index = this.commonIndex;
    for (let i = 0; i <= 2; i++) {
      if (this.commonTreasure[index] !== undefined) {
        retTreasure.push(this.commonTreasure[index]);
      } else {
        index = 0;
        retTreasure.push(this.commonTreasure[index]);
      }
      index++;
    }
    console.log(retTreasure);
    return retTreasure;
  }
  increaseIndex() {
    this.commonIndex += 3;
    if (this.commonIndex > this.commonTreasure.length - 1) {
      this.commonIndex = 0;
    }
  }
}

export var treasure = new Treasure([], 0, [], 0);
