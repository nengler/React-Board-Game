import { playerMoveArray } from "./moves";
import { weaponArray } from "./weapons";
import { player } from "./playerConstant";
import { healingPotion } from "./itemConstants";

class RandomEventHolder {
  constructor(randomEvents) {
    this.randomEvents = randomEvents;
    this.randomEventIndex = 0;
  }
  getRandomEvent() {
    return this.randomEvents[this.randomEventIndex];
  }
  increaseRandomEventCounter() {
    this.randomEventIndex += 1;
    if (this.randomEventIndex >= this.randomEvents.length) {
      this.randomEventIndex = 0;
    }
  }
  randomizeEvents() {
    for (let i = this.randomEvents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.randomEvents[i];
      this.randomEvents[i] = this.randomEvents[j];
      this.randomEvents[j] = temp;
    }
  }
}

class RandomEvents {
  constructor(description, options, effects, category) {
    this.description = description;
    this.options = options;
    this.effects = effects;
    this.category = category;
  }
}

const heavySmither = new RandomEvents(
  "A Smith Lord from the far region area offers you the chance to enhance your weapon " +
    "greatly in one category, but will vastly impact your weapon performance in the other category",
  [
    "Increase Damage Multiplier by 0.15, Decrease Block Multiplier by 0.20",
    "Increase Block Multiplier by 0.15, Decrease Damage Multiplier by 0.20",
    "Walk Away",
    "Fight him for his sword"
  ],
  ["HeavyDamageIncrease", "HeavyBlockIncrease", "WalkAway", "FightSmither"],
  "HeavySmither"
);

let randomWeaponNumbers = getRandomNumbers(weaponArray.length);

const salesMan = new RandomEvents(
  "A Bargener from the local shop wants to sell you a weapon... for some of your blood",
  [
    "Take " +
      weaponArray[randomWeaponNumbers[0]].name +
      " for " +
      weaponArray[randomWeaponNumbers[0]].cost / 10 +
      " health",
    "Take " +
      weaponArray[randomWeaponNumbers[1]].name +
      " for " +
      weaponArray[randomWeaponNumbers[1]].cost / 10 +
      " health",
    "Walk Away"
  ],
  [
    weaponArray[randomWeaponNumbers[0]],
    weaponArray[randomWeaponNumbers[1]],
    "WalkAway"
  ],
  "HpLossForWeapon"
);

let randomMoveNumbers = getRandomNumbers(playerMoveArray.length);

const freeMove = new RandomEvents(
  "Its your lucky day! choose one move for free :)",
  [
    "Attain " + playerMoveArray[randomMoveNumbers[0]].name,
    "Attain " + playerMoveArray[randomMoveNumbers[1]].name,
    "Walk Away"
  ],
  [
    playerMoveArray[randomMoveNumbers[0]],
    playerMoveArray[randomMoveNumbers[1]],
    "WalkAway"
  ],
  "FreeMove"
);

const travelingBed = new RandomEvents(
  "A Traveling Bed approaches you with the chance to heal, but with a hefty fine baby",
  [
    "Heal " + Math.floor(player.maxHealth * 0.25) + " health for 50 coins",
    "Heal " + Math.floor(player.maxHealth * 0.5) + " health for 100 coins",
    "Walk Away"
  ],
  ["quarterHeal", "halfHeal", "WalkAway"],
  "HealingForCoins"
);

const freePotion = new RandomEvents(
  "A free potion, literally",
  ["Take FREE Health Potion", "Walk Away"],
  [healingPotion, "WalkAway"],
  "FreePotion"
);

function getRandomNumbers(lengthOfArray) {
  let keepLooping = true;

  let randomNumbers = [];
  while (keepLooping) {
    let randomNumber = Math.floor(Math.random() * Math.floor(lengthOfArray));
    if (randomNumbers[0] !== null && randomNumbers[0] !== randomNumber) {
      randomNumbers.push(randomNumber);
      if (randomNumbers.length === 2) {
        keepLooping = false;
      }
    }
  }
  return randomNumbers;
}

const randomEvents = [
  freeMove,
  heavySmither,
  salesMan,
  travelingBed,
  freePotion
];

export const randomEventHolder = new RandomEventHolder(randomEvents);
