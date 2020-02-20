class Weapon {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
  }
}

export const dagger = new Weapon("Dagger", 1);
export const claws = new Weapon("Claws", 1);
export const sword = new Weapon("Sword", 2);
