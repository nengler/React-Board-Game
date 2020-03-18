export class MonsterContainerObject {
  constructor() {
    this.monsterArray = [];
    this.lastMonster = "";
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
}
