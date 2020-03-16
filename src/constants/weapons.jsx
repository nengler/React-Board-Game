class Weapon {
  constructor(name, damageMultiplier, blockMultiplier, rarity, cost) {
    this.name = name;
    this.damageMultiplier = damageMultiplier;
    this.blockMultiplier = blockMultiplier;
    this.rarity = rarity;
    this.cost = cost;
  }
}

export const dagger = new Weapon("Dagger", 0.85, 0.65, "Common", 0);
export const claws = new Weapon("Claws", 1, 0.5, "Common", 90);
export const sword = new Weapon("Sword", 0.9, 0.7, "Common", 100);
export const longSword = new Weapon("Long Sword", 1.25, 0.5, "Rare", 200);
export const bigShield = new Weapon("Big Shield", 0.5, 1.25, "Rare", 220);
export const smallShield = new Weapon("Small Shield", 0.6, 1.0, "Common", 120);

export const weaponArray = [claws, sword, longSword, bigShield, smallShield];
