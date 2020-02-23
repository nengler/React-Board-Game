class Move {
  constructor(name, description, manaCost, synergyItem) {
    this.name = name;
    this.description = description;
    this.manaCost = manaCost;
    this.synergyItem = synergyItem;
  }
}

class Attack extends Move {
  constructor(name, description, manaCost, synergyItem, damage, amountOfHits) {
    super(name, description, manaCost, synergyItem);
    this.damage = damage;
    this.amountOfHits = amountOfHits;
  }
}

class Block extends Move {
  constructor(name, description, manaCost, synergyItem, blockAmount) {
    super(name, description, manaCost, synergyItem);
    this.blockAmount = blockAmount;
  }
}

export const strike = new Attack(
  "strike",
  "description for strike Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem dolorem eaque quam cumque minus, omnis consequuntur sequi modi illum",
  1,
  "Sword",
  3,
  1
);
export const tripleStrike = new Attack(
  "Triple Strike",
  "Strikes the opponent 3 times in quick succession",
  2,
  "Dagger",
  3,
  3
);
export const stab = new Attack("Stab", "Stabby stabby", 2, 6, "Sword", 1);
export const defend = new Block(
  "defend",
  "defend description",
  1,
  "Big Shield",
  2
);
export const wall = new Block(
  "Wall",
  "user hides behind shield",
  2,
  "Big shield",
  10
);
export const nullBoy = new Attack("Null Boy", "Relaxing time :)", 1, "", 0, 0);
export const slither = new Attack("Slither", "we slithering", 1, "", 1, 1);
