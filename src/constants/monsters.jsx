import { nullBoy, strike, slither } from "../constants/moves";
import { claws } from "../constants/weapons";

class Monster {
  constructor(name, maxHealth, weapon, monsterMoves) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.weapon = weapon;
    this.monsterMoves = monsterMoves;
    this.monsterMoveIndex = 0;
  }
  getCurrentMove() {
    return this.monsterMoves[this.monsterMoveIndex];
  }
  goToNextMove() {
    this.monsterMoveIndex++;
    if (this.monsterMoves[this.monsterMoveIndex] == null) {
      this.monsterMoveIndex = 0;
    }
  }
}

export const cockRoach = new Monster("CockRoach", 10, claws, [nullBoy, strike]);
export const worm = new Monster("Worm", 6, claws, [slither]);
