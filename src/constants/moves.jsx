class Move {
  constructor(name, description, manaCost, synergyItem, rarity, cost) {
    this.name = name;
    this.description = description;
    this.manaCost = manaCost;
    this.synergyItem = synergyItem;
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
    rarity,
    cost,
    damage,
    amountOfHits
  ) {
    super(name, description, manaCost, synergyItem, rarity, cost);
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
    rarity,
    cost,
    blockAmount
  ) {
    super(name, description, manaCost, synergyItem, rarity, cost);
    this.blockAmount = blockAmount;
  }
}

//ATTACKS
export const strike = new Attack(
  "strike",
  "description for strike Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem dolorem eaque quam cumque minus, omnis consequuntur sequi modi illum",
  1,
  "Sword",
  "Starting-Card",
  0,
  3,
  1
);
export const tripleStrike = new Attack(
  "Triple Strike",
  "Strikes the opponent 3 times in quick succession",
  2,
  "Dagger",
  "Rare",
  100,
  3,
  3
);
export const stab = new Attack(
  "Stab",
  "Stabby stabby",
  2,
  "Sword",
  "Common",
  50,
  6,
  1
);

export const nullBoy = new Attack(
  "Null Boy",
  "Relaxing time :)",
  1,
  "",
  "Common",
  0,
  0,
  0
);
export const slither = new Attack(
  "Slither",
  "we slithering",
  1,
  "",
  "Common",
  0,
  1,
  1
);
export const elbow = new Attack("Elbow", "", 1, "Fists", "Common", 25, 5, 1);
export const sideLunge = new Attack(
  "Side Lunge",
  "longSword",
  1,
  "longSword",
  "Rare",
  125,
  9,
  1
);

//BLOCKS
export const defend = new Block(
  "defend",
  "defend description",
  1,
  "Big Shield",
  "Starting-Card",
  0,
  2
);
export const wall = new Block(
  "Wall",
  "user hides behind shield",
  2,
  "Big shield",
  "Common",
  30,
  10
);
export const quickBlock = new Block(
  "Quick Block",
  "qb",
  1,
  "Small Shield",
  "Rare",
  75,
  8
);

export const playerMoveArray = [
  tripleStrike,
  stab,
  elbow,
  sideLunge,
  wall,
  quickBlock
];
