export class RandomEventEnemyContainer {
  constructor() {
    this.enemies = {};
  }
  addEnemies(enemies) {
    enemies.forEach(enemy => {
      this.enemies[enemy.level] = enemy;
    });
  }
  getEnemy(level) {
    return this.enemies[level];
  }
}
