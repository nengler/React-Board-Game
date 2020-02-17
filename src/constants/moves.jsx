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
  "description for strike",
  3,
  "Dagger",
  1
);
export const defend = new Block(
  "defend",
  "defend description",
  2,
  "Big Shield"
);
