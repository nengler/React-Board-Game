class Weapon {
  constructor(name, damageMultiplier) {
    this.name = name;
    this.damageMultiplier = damageMultiplier;
  }
}

export const dagger = new Weapon("Dagger", 1);
export const claws = new Weapon("Claws", 1);
export const sword = new Weapon("Sword", 1.25);
