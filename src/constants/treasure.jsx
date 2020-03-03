class Treasure {
  constructor(commonTreasure, commonIndex, rareTreasure, rareIndex) {
    this.commonTreasure = commonTreasure;
    this.commonIndex = commonIndex;
    this.rareTreasure = rareTreasure;
    this.rareIndex = rareIndex;
    this.getTypeOfTreasure = "Common";
    this.amountToShow = 3;
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
    let index = 0;
    let treasureBySpecifiedType = [];
    if (this.getTypeOfTreasure === "Common") {
      index = this.commonIndex;
      treasureBySpecifiedType = this.commonTreasure;
    } else if (this.getTypeOfTreasure === "Rare") {
      index = this.rareIndex;
      treasureBySpecifiedType = this.rareTreasure;
    }
    for (let i = 0; i <= this.amountToShow - 1; i++) {
      if (treasureBySpecifiedType[index] !== undefined) {
        retTreasure.push(treasureBySpecifiedType[index]);
      } else {
        index = 0;
        retTreasure.push(treasureBySpecifiedType[index]);
      }
      index++;
    }
    return retTreasure;
  }
  increaseIndex() {
    if (this.getTypeOfTreasure === "Rare") {
      this.rareIndex += this.amountToShow;
      if (this.rareIndex > this.rareTreasure.length - 1) {
        this.rareIndex = 0;
      }
    } else if (this.getTypeOfTreasure === "Common") {
      this.commonIndex += this.amountToShow;
      if (this.commonIndex > this.commonTreasure.length - 1) {
        this.commonIndex = 0;
      }
    }
  }
  showCommon() {
    this.getTypeOfTreasure = "Common";
  }
  showRare() {
    this.getTypeOfTreasure = "Rare";
  }
  amountToBeShown(amount) {
    this.amountToShow = amount;
  }
}

export var treasure = new Treasure([], 0, [], 0);
