import { strike, defend } from "../constants/moves";
import { dagger } from "../constants/weapons";

class Player {
  constructor(
    playerName,
    maxHealth,
    playerMoves,
    playerPosition,
    weapon,
    gold
  ) {
    this.playerName = playerName;
    this.currentHealth = maxHealth;
    this.maxHealth = maxHealth;
    this.playerInventory = [];
    this.playerMoves = playerMoves;
    this.playerPosition = playerPosition;
    this.weapon = weapon;
    this.gold = gold;
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
      console.log("heyo");
    }
    this.playerInventory.splice(index, 1);
  }
}

export const player = new Player("", 10, [strike, defend], 24, dagger, 0);
