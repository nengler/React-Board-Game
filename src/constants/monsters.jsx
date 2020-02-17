class Monster {
  constructor(name, maxHealth, damage) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.damage = damage;
  }
}

export const cockRoach = new Monster("CockRoach", 5, 1);
