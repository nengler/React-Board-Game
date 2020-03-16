class Potion {
  constructor(name, category, affect) {
    this.name = name;
    this.category = category;
    this.affect = affect;
  }
}

export const healingPotion = new Potion("Healing Potion", "health", 2);
const strengthPotion = new Potion("Strength Potion", "strength", 2);

export const potions = [healingPotion, strengthPotion];
