export class MonsterContainerObject {
  constructor() {
    this.monsterArray = [];
    this.lastMonster = "";
    this.bossArray = [];
  }
  addMonsters(monsters) {
    monsters.forEach(monster => {
      if (!(monster.level in this.monsterArray)) {
        this.monsterArray[monster.level] = Array(monster);
      } else {
        this.monsterArray[monster.level].push(monster);
      }
    });
  }
  getMonster(level) {
    let isUniqueMonster = false;
    let retMonster = "";
    while (!isUniqueMonster) {
      retMonster = this.monsterArray[level][
        Math.floor(Math.random() * this.monsterArray[level].length)
      ];
      if (this.lastMonster !== retMonster.name) {
        isUniqueMonster = true;
      }
    }
    this.lastMonster = retMonster.name;
    return retMonster;
  }
  addBosses(bosses) {
    bosses.forEach(boss => {
      if (!(boss.level in this.bossArray)) {
        this.bossArray[boss.level] = Array(boss);
      } else {
        this.bossArray[boss.level].push(boss);
      }
    });
  }
  getBoss(level) {
    return this.bossArray[level][
      Math.floor(Math.random() * this.bossArray[level].length)
    ];
  }
}
