import { strike, defend } from "../constants/moves";
import { dagger } from "../constants/weapons";

class Player {
  constructor(
    playerName,
    maxHealth,
    maxMana,
    playerMoves,
    playerPosition,
    weapon,
    gold
  ) {
    this.playerName = playerName;
    this.currentHealth = maxHealth;
    this.maxHealth = maxHealth;
    this.maxMana = maxMana;
    this.currentMana = maxMana;
    this.playerInventory = [];
    this.playerMoves = playerMoves;
    this.playerPosition = playerPosition;
    this.weapon = weapon;
    this.gold = gold;
    this.block = 0;
  }
  setPlayerName(newName) {
    this.playerName = newName;
  }
  addToInventory(item) {
    this.playerInventory.push(item);
  }
  increaseGold(goldAdded) {
    this.gold += goldAdded;
  }
  movePlayer(newPosition) {
    this.playerPosition = newPosition;
  }
  changeWeapon(newWeapon) {
    let oldWeapon = this.weapon;
    this.weapon = newWeapon;
    this.playerInventory.push(oldWeapon);
  }
  changeWeaponFromMenu(newWeapon, index) {
    let oldWeapon = this.weapon;
    this.weapon = newWeapon;
    this.playerInventory.push(oldWeapon);
    this.playerInventory.splice(index, 1);
  }
  addMove(newMove) {
    this.playerMoves.push(newMove);
  }
  drinkPotion(potion, index) {
    if (potion.category === "health") {
      this.currentHealth += potion.affect;
      if (this.currentHealth > this.maxHealth) {
        this.currentHealth = this.maxHealth;
      }
    } else if (potion.category === "strength") {
    }
    this.playerInventory.splice(index, 1);
  }
  addBlock(blockAmount) {
    this.block += blockAmount;
  }
  endTurn() {
    this.block = 0;
    this.currentMana = this.maxMana;
  }
  decreaseCurrentMana(manaCost) {
    this.currentMana -= manaCost;
  }
}

export const player = new Player(
  "",
  10,
  2,
  [strike, defend],
  24,
  dagger,
  10000
);
