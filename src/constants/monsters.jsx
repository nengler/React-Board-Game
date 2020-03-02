import {
  nullBoy,
  strike,
  slither,
  quickBlock,
  sideLunge
} from "../constants/moves";
import { claws } from "../constants/weapons";

class Monster {
  constructor(name, maxHealth, weapon, monsterMoves, level) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.weapon = weapon;
    this.monsterMoves = monsterMoves;
    this.monsterMoveIndex = 0;
    this.level = level;
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

const cockRoach = new Monster("CockRoach", 10, claws, [nullBoy, strike], 1);
const worm = new Monster("Worm", 6, claws, [slither], 1);

export const enemies = [cockRoach, worm];

const redDevil = new Monster(
  "Red Devil",
  50,
  claws,
  [quickBlock, sideLunge],
  1
);
export const bosses = [redDevil];
