class ShowScreen {
  constructor(
    createCharacter,
    characterMoving,
    characterFighting,
    characterEvent,
    characterRewards,
    characterShop
  ) {
    this.createCharacter = createCharacter;
    this.characterMoving = characterMoving;
    this.characterFighting = characterFighting;
    this.characterEvent = characterEvent;
    this.characterRewards = characterRewards;
    this.characterShop = characterShop;
  }
  moveCharacter() {
    this.characterMoving = true;
    this.createCharacter = false;
  }
  fightScreen() {
    this.characterMoving = false;
    this.characterFighting = true;
  }
  endFightScreen() {
    this.characterFighting = false;
    this.characterMoving = true;
  }
  showRewads() {
    this.characterRewards = true;
    this.characterMoving = false;
  }
  endRewards() {
    this.characterRewards = false;
    this.characterMoving = true;
  }
  showShop() {
    this.characterShop = true;
    this.characterMoving = false;
  }
  leaveShop() {
    this.characterShop = false;
    this.characterMoving = true;
  }
  characterDeath() {
    this.createCharacter = true;
    this.characterMoving = false;
    this.characterFighting = false;
    this.characterEvent = false;
    this.characterRewards = false;
    this.characterShop = false;
  }
}

export var screen = new ShowScreen(true, false, false, false, false);
