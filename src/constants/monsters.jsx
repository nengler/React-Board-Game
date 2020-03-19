import {
  nullBoy,
  quickScratch,
  defend,
  slither,
  quickBlock,
  sideLunge,
  kneeBreaker,
  lowBlow,
  crossSwipe
} from "../constants/moves";
import { claws, longSword } from "../constants/weapons";

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
  [quickScratch, nullBoy, defend],
  1,
  false,
  [10, 30]
);
const worm = new Monster("Worm", 17, claws, [slither], 1, false, [1, 25]);

export const enemies = [cockRoach, worm];

//BOSSES

const redDevil = new Monster(
  "Red Devil",
  1,
  claws,
  [quickBlock, sideLunge],
  1,
  true,
  [50, 100]
);
export const bosses = [redDevil];

//RANDOM EVENT ENEMIES

const smither = new Monster(
  "Smither",
  60,
  longSword,
  [lowBlow, crossSwipe, kneeBreaker],
  "Smith",
  true,
  [60, 80]
);

export const randomEventMonsters = [smither];
