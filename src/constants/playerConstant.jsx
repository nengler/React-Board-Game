import { strike, defend } from "../constants/moves";
import { dagger } from "../constants/weapons";

class Player {
  constructor(
    playerName,
    maxHealth,
    playerInventory,
    playerMoves,
    playerPosition,
    weapon
  ) {
    this.playerName = playerName;
    this.currentHealth = maxHealth;
    this.maxHealth = maxHealth;
    this.playerInventory = playerInventory;
    this.playerMoves = playerMoves;
    this.playerPosition = playerPosition;
    this.weapon = weapon;
  }
  setPlayerName(playerName) {
    this.playerName = playerName;
  }
}

export const player = new Player("", 3, null, [strike, defend], 24, dagger);
