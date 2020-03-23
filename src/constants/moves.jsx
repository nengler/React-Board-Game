class Move {
  constructor(
    name,
    description,
    manaCost,
    synergyItem,
    conflictCategory,
    rarity,
    cost
  ) {
    this.name = name;
    this.description = description;
    this.manaCost = manaCost;
    this.synergyItem = synergyItem;
    this.conflictCategory = conflictCategory;
    this.rarity = rarity;
    this.cost = cost;
  }
}

class Attack extends Move {
  constructor(
    name,
    description,
    manaCost,
    synergyItem,
    conflictCategory,
    rarity,
    cost,
    damage,
    amountOfHits
  ) {
    super(
      name,
      description,
      manaCost,
      synergyItem,
      conflictCategory,
      rarity,
      cost
    );
    this.damage = damage;
    this.amountOfHits = amountOfHits;
  }
}

class Block extends Move {
  constructor(
    name,
    description,
    manaCost,
    synergyItem,
    conflictCategory,
    rarity,
    cost,
    blockAmount
  ) {
    super(
      name,
      description,
      manaCost,
      synergyItem,
      conflictCategory,
      rarity,
      cost
    );
    this.blockAmount = blockAmount;
  }
}

//ATTACKS

export const nullBoy = new Attack(
  "Null Boy",
  "Relaxing time :)",
  1,
  "",
  "",
  "Common",
  0,
  3,
  1
);

export const slither = new Attack(
  "Slither",
  "we slithering",
  1,
  "",
  "",
  "Common",
  0,
  1,
  4
);

export const strike = new Attack(
  "Strike",
  "description for strike Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem dolorem eaque quam cumque minus, omnis consequuntur sequi modi illum",
  1,
  "Sword",
  "Big Shield",
  "Starting-Card",
  0,
  5,
  1
);

export const tripleStrike = new Attack(
  "Triple Strike",
  "Strikes the opponent 3 times in quick succession",
  2,
  "Dagger",
  "Big Sword",
  "Rare",
  100,
  4,
  3
);

export const lowBlow = new Attack(
  "Low Blow",
  "sweep the legs baby",
  1,
  "Dagger",
  "Big Shield",
  "Common",
  55,
  5,
  1
);

export const stab = new Attack(
  "Stab",
  "Stabby stabby",
  2,
  "Sword",
  "Small Weapon",
  "Common",
  50,
  10,
  1
);

export const elbow = new Attack("Elbow", "", 1, "", "Common", 25, 5, 1);

export const sideLunge = new Attack(
  "Side Lunge",
  "longSword",
  1,
  "Long Sword",
  "Small Weapon",
  "Rare",
  125,
  7,
  1
);

export const runningLunge = new Attack(
  "Running Lunge",
  "longSword",
  2,
  "Long Sword",
  "Big Shield",
  "Rare",
  125,
  13,
  1
);

export const crossSwipe = new Attack(
  "Cross Swipe",
  "longSword",
  1,
  "Long Sword",
  "Small Weapon",
  "Common",
  45,
  5,
  1
);

export const weaponBash = new Attack(
  "Weapon Bash",
  "bashing them with shield :)",
  1,
  "Big Shield",
  "Small Weapon",
  "Common",
  50,
  5,
  1
);

export const kneeBreaker = new Attack(
  "Knee Breaker",
  "quick check to the knees",
  1,
  "Small Shield",
  "Big Wepaon",
  "Common",
  40,
  3,
  2
);

export const bruteCharge = new Attack(
  "Brute Charge",
  "Running through enemy",
  2,
  "Small Shield",
  "Big Shield",
  "Common",
  90,
  9,
  1
);

export const quickScratch = new Attack(
  "Quick Scratch",
  "claws",
  1,
  "Claws",
  "Big Shield",
  "Common",
  45,
  6,
  1
);

export const bloodyMess = new Attack(
  "Bloody Mess",
  "claws",
  2,
  "Claws",
  "Small Shield",
  "Rare",
  110,
  3,
  5
);

//BLOCKS
export const defend = new Block(
  "Defend",
  "defend description",
  1,
  "Big Shield",
  "Big Weapon",
  "Starting-Card",
  0,
  4
);

export const blockStance = new Block(
  "Block Stance",
  "blockstance description",
  1,
  "Sword",
  "Big Weapon",
  "Common",
  30,
  5
);

export const wall = new Block(
  "Wall",
  "user hides behind shield",
  2,
  "Big Shield",
  "Small Weapon",
  "Common",
  30,
  10
);

export const quickBlock = new Block(
  "Quick Block",
  "qb",
  1,
  "Small Shield",
  "Big Shield",
  "Rare",
  75,
  7
);

export const parry = new Block(
  "Parry",
  "pp",
  1,
  "Dagger",
  "Big Weapon",
  "Rare",
  95,
  7
);

export const barricade = new Block(
  "Barricade",
  "pp",
  2,
  "Big shield",
  "Medium Weapon",
  "Rare",
  100,
  11
);

export const dualHandedBlock = new Block(
  "Dual Handed Block",
  "dhb",
  2,
  "Sword",
  "Small Weapon",
  "Rare",
  100,
  11
);

export const playerMoveArray = [
  tripleStrike,
  stab,
  lowBlow,
  elbow,
  sideLunge,
  runningLunge,
  crossSwipe,
  weaponBash,
  kneeBreaker,
  bruteCharge,
  quickScratch,
  bloodyMess,
  blockStance,
  wall,
  quickBlock,
  parry,
  barricade,
  dualHandedBlock
];
