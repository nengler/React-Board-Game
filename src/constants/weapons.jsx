class Weapon {
  constructor(name, damageMultiplier, blockMultiplier, rarity, cost, category) {
    this.name = name;
    this.damageMultiplier = damageMultiplier;
    this.blockMultiplier = blockMultiplier;
    this.rarity = rarity;
    this.cost = cost;
    this.category = category;
    this.type = "Weapon";
  }
}

//Enemy weapons only
export const teeth = new Weapon("Teeth", 1, 1, "Common", 0, "Small Weapon");

//enemy and player weapons
export const dagger = new Weapon(
  "Dagger",
  0.85,
  0.65,
  "Common",
  0,
  "Small Weapon"
);
export const claws = new Weapon("Claws", 1, 0.5, "Common", 90, "Small Weapon");
export const sword = new Weapon(
  "Sword",
  0.8,
  0.7,
  "Common",
  100,
  "Medium Weapon"
);
export const longSword = new Weapon(
  "Long Sword",
  1.25,
  0.5,
  "Rare",
  200,
  "Big Weapon"
);
export const kiteShield = new Weapon(
  "Kite Shield",
  0.5,
  1.25,
  "Rare",
  220,
  "Big Shield"
);
export const bucklerShield = new Weapon(
  "Buckler Shield",
  0.75,
  0.75,
  "Common",
  120,
  "Small Shield"
);
export const heaterShield = new Weapon(
  "Heater Shield",
  0.6,
  1.0,
  "Common",
  120,
  "Medium Shield"
);

export const weaponArray = [
  claws,
  sword,
  longSword,
  kiteShield,
  bucklerShield,
  heaterShield,
];
