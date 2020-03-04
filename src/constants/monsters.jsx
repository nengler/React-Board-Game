import {
  nullBoy,
  strike,
  slither,
  quickBlock,
  sideLunge
} from "../constants/moves";
import { claws } from "../constants/weapons";

class Monster {
  constructor(name, maxHealth, weapon, monsterMoves, level, isABoss) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.weapon = weapon;
    this.monsterMoves = monsterMoves;
    this.monsterMoveIndex = 0;
    this.level = level;
    this.isABoss = isABoss;
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

const cockRoach = new Monster(
  "CockRoach",
  10,
  claws,
  [nullBoy, strike],
  1,
  false
);
const worm = new Monster("Worm", 6, claws, [slither], 1, false);

export const enemies = [cockRoach, worm];

const redDevil = new Monster(
  "Red Devil",
  1,
  claws,
  [quickBlock, sideLunge],
  50,
  true
);
export const bosses = [redDevil];
