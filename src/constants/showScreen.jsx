class ShowScreen {
  constructor(
    createCharacter,
    characterMoving,
    characterFighting,
    characterEvent,
    characterRewards
  ) {
    this.createCharacter = createCharacter;
    this.characterMoving = characterMoving;
    this.characterFighting = characterFighting;
    this.characterEvent = characterEvent;
    this.characterRewards = characterRewards;
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
}

export var screen = new ShowScreen(true, false, false, false, false);
