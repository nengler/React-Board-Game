class Potion {
  constructor(name, category, affect) {
    this.name = name;
    this.category = category;
    this.affect = affect;
    this.type = "Potion";
  }
}

export const healingPotion = new Potion("Healing Potion", "health", 10);
const strengthPotion = new Potion("Strength Potion", "strength", 2);

export const potions = [healingPotion, strengthPotion];
