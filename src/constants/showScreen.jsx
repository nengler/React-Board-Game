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
    this.characterDiscardCard = false;
  }
  makeAllValuesFalse() {
    Object.keys(this).forEach(key => {
      this[key] = false;
    });
  }
  moveCharacter() {
    this.makeAllValuesFalse();
    this.characterMoving = true;
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
    this.makeAllValuesFalse();
    this.characterShop = true;
  }
  leaveShop() {
    this.characterShop = false;
    this.characterMoving = true;
  }
  discardCard() {
    this.makeAllValuesFalse();
    this.characterDiscardCard = true;
  }
  characterDeath() {
    this.makeAllValuesFalse();
    this.createCharacter = true;
  }
}

export var screen = new ShowScreen(true, false, false, false, false);
