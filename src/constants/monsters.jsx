import {
  nullBoy,
  strike,
  defend,
  slither,
  quickBlock,
  sideLunge
} from "../constants/moves";
import { claws } from "../constants/weapons";

export class Monster {
  constructor(
    name,
    maxHealth,
    weapon,
    monsterMoves,
    level,
    isABoss,
    moneyDropRange
  ) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.weapon = weapon;
    this.monsterMoves = monsterMoves;
    this.monsterMoveIndex = 0;
    this.level = level;
    this.isABoss = isABoss;
    this.block = 0;
    this.moneyDropRange = moneyDropRange;
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
  increaseBlock(blockAmount) {
    this.block += blockAmount;
  }
  resetBlock() {
    this.block = 0;
  }
  setBlock(newBlock) {
    this.block = newBlock;
  }
  getMoneyDropped() {
    return Math.floor(
      Math.random() * (this.moneyDropRange[1] - this.moneyDropRange[0] + 1) +
        this.moneyDropRange[0]
    );
  }
}

//MONSTERS

const cockRoach = new Monster(
  "CockRoach",
  25,
  claws,

  [strike, nullBoy, defend],
  1,
  false,
  [10, 30]
);
const worm = new Monster("Worm", 17, claws, [slither], 1, false, [1, 25]);

export const enemies = [cockRoach, worm];

//BOSSES

const redDevil = new Monster(
  "Red Devil",
  50,
  claws,
  [quickBlock, sideLunge],
  1,
  true,
  [50, 100]
);
export const bosses = [redDevil];
