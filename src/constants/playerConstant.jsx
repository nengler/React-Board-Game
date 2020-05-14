import { strike, defend } from "../constants/moves";
import { dagger } from "../constants/weapons";

/*
const playerStartingHealth = 25;
const playerStartingMana = 2;
const playerStartingGold = 30;
const playerStartingWeapon = dagger;
const playerStartingMoves = [strike, defend];
*/

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
  decreaseGold(goldToRemove) {
    this.gold -= goldToRemove;
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
  decreaseBlock(blockAmont) {
    this.block -= blockAmont;
  }
  refundMana(manaAmount) {
    this.currentMana += manaAmount;
  }
  endTurn() {
    this.block = 0;
    this.currentMana = this.maxMana;
  }
  decreaseCurrentMana(manaCost) {
    this.currentMana -= manaCost;
  }
  handlePlayerDeath() {
    this.playerName = "";
    this.currentHealth = 25;
    this.maxHealth = 25;
    this.maxMana = 2;
    this.currentMana = 2;
    this.playerInventory = [];
    this.playerMoves = [strike, defend];
    this.playerPosition = 24;
    this.weapon = dagger;
    this.gold = 0;
    this.block = 0;
  }
  fullHeal() {
    this.currentHealth = this.maxHealth;
  }

  discardCard(moveToDiscard) {
    this.playerMoves.splice(moveToDiscard, 1);
  }

  improveWeapon(category) {
    if (category === "Attack") {
      this.weapon.blockMultiplier -= 0.05;
      this.weapon.damageMultiplier += 0.15;
    } else if (category === "Block") {
      this.weapon.damageMultiplier -= 0.05;
      this.weapon.blockMultiplier += 0.15;
    }

    this.weapon.blockMultiplier = parseFloat(
      this.weapon.blockMultiplier.toFixed(2)
    );
    this.weapon.damageMultiplier = parseFloat(
      this.weapon.damageMultiplier.toFixed(2)
    );
  }

  heavySmith(category) {
    if (category === "Attack") {
      this.weapon.blockMultiplier -= 0.2;
      this.weapon.damageMultiplier += 0.15;
    } else if (category === "Block") {
      this.weapon.damageMultiplier -= 0.2;
      this.weapon.blockMultiplier += 0.15;
    }
    this.weapon.blockMultiplier = parseFloat(
      this.weapon.blockMultiplier.toFixed(2)
    );
    this.weapon.damageMultiplier = parseFloat(
      this.weapon.damageMultiplier.toFixed(2)
    );
  }

  increaseHealth(healthIncreasedBy) {
    this.currentHealth += healthIncreasedBy;
    if (this.currentHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }
  }
}

export const player = new Player("", 25, 2, [strike, defend], 24, dagger, 30);
