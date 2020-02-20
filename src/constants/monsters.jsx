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
    let retMove = this.monsterMoves[this.monsterMoveIndex];
    if (retMove == null) {
      this.monsterMoveIndex = 0;
      retMove = this.monsterMoves[this.monsterMoveIndex];
    }
    this.monsterMoveIndex++;
    return retMove;
  }
}

export const cockRoach = new Monster("CockRoach", 10, claws, [nullBoy, strike]);
export const worm = new Monster("Worm", 6, claws, [slither]);
