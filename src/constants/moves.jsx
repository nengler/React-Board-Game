class Move {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

class Attack extends Move {
  constructor(name, description, damage, synergyWeapon, amountOfHits) {
    super(name, description);
    this.damage = damage;
    this.synergyWeapon = synergyWeapon;
    this.amountOfHits = amountOfHits;
  }
}

class Block extends Move {
  constructor(name, description, blockAmount, synergyShield) {
    super(name, description);
    this.blockAmount = blockAmount;
    this.synergyShield = synergyShield;
  }
}

export const strike = new Attack(
  "strike",
  "description for strike Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem dolorem eaque quam cumque minus, omnis consequuntur sequi modi illum",
  3,
  "Sword",
  1
);
export const tripleStrike = new Attack(
  "Triple Strike",
  "Strikes the opponent 3 times in quick succession",
  3,
  "Dagger",
  3
);
export const stab = new Attack("Stab", "Stabby stabby", 6, "Sword", 1);
export const defend = new Block(
  "defend",
  "defend description",
  2,
  "Big Shield"
);
export const wall = new Block(
  "Wall",
  "user hides behind shield",
  10,
  "Big shield"
);
export const nullBoy = new Attack("Null Boy", "Relaxing time :)", 0, "", 0);
export const slither = new Attack("Slither", "we slithering", 1, "", 1);
