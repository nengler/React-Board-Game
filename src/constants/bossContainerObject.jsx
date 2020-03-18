export class BossContainerObject {
  constructor() {
    this.enemies = [];
  }
  addEnemies(enemies) {
    enemies.forEach(enemy => {
      if (!(enemy.level in this.enemies)) {
        this.enemies[enemy.level] = Array(enemy);
      } else {
        this.enemies[enemy.level].push(enemy);
      }
    });
  }
  getEnemy(level) {
    return this.enemies[level][
      Math.floor(Math.random() * this.enemies[level].length)
    ];
  }
}
