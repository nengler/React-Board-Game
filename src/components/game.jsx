import React, { Component } from "react";
import GameBoard from "./gameBoard";
import Player from "./player";
import TreasureChest from "./treasureChest";
import Inventory from "./inventory";
import { potions } from "../constants/itemConstants";
import FightBoard from "./fightBoard";
import { cockRoach, worm } from "../constants/monsters";
import { player } from "../constants/playerConstant";
import { screen } from "../constants/showScreen";
import { tripleStrike, stab, wall } from "../constants/moves";
import { sword } from "../constants/weapons";
import MovesInventory from "./movesInventory";

/*
TODO:
cleanup fight screen and messages
shop
decorate treasure items
add rarity to items/weapons
add boss
random events
algorith to randomize floor
death mechanic
*/

class Game extends Component {
  state = {
    player: player,
    enemies: [cockRoach, worm, cockRoach],
    currentEnemy: null,
    screen: screen,
    gameBoard: Array(49).fill(""),
    chatMessage: "",
    chestRewards: [tripleStrike, wall, sword]
  };

  handleChange = event => {
    let player = this.state.player;
    player.setPlayerName(event.target.value);
    this.setState({ player });
  };

  startGame = () => {
    let screen = this.state.screen;
    screen.moveCharacter();
    let gameBoard = this.state.gameBoard;
    for (let i = 0; i < gameBoard.length; i++) {
      if (i === this.state.player.playerPosition) {
        gameBoard[i] = "You";
      } else if (i % 10 === 0) {
        gameBoard[i] = "?";
      } else if (i % 12 === 0) {
        gameBoard[i] = "⚔";
      } else if (i % 15 === 0) {
        gameBoard[i] = "👑";
      } else if (i % 5 === 0) {
        gameBoard[i] = "💰";
      }
    }
    this.setState({ screen });
    //document.getElementById("charMove").focus();
  };

  addToChatBox = message => {
    let chatMessage = this.state.chatMessage;
    chatMessage += message + "\n";
    this.setState({ chatMessage });
    var textarea = document.getElementById("chat_id");
    textarea.scrollTop = textarea.scrollHeight;
  };

  handleSquareProperty = square => {
    let player = this.state.player;
    let screen = this.state.screen;
    switch (square) {
      case "💰":
        player.increaseGold(15);
        this.setState({ player });
        this.addToChatBox("found gold");
        break;
      case "?":
        let potion = potions[Math.floor(Math.random() * 2)];
        player.addToInventory(potion);
        this.setState({ player });
        this.addToChatBox("found " + potion.name);
        break;
      case "⚔":
        screen.fightScreen();
        let enemies = this.state.enemies;
        let currentEnemy = enemies.shift();
        currentEnemy.currentHealth = currentEnemy.maxHealth;
        this.setState({ enemies, currentEnemy, screen });
        break;
      case "👑":
        screen.showRewads();
        this.setState({ screen });
        break;
      default:
        break;
    }
  };

  checkIfLegalMove = (proposedPosition, playerPosition) => {
    console.log("he");
    if (
      proposedPosition === playerPosition + 1 ||
      proposedPosition === playerPosition - 1 ||
      proposedPosition === playerPosition + 7 ||
      proposedPosition === playerPosition - 7
    ) {
      return true;
    }
    return false;
  };

  movePlayer(position, square) {
    this.handleSquareProperty(square);
    let gameBoard = this.state.gameBoard;
    let player = this.state.player;
    gameBoard[player.playerPosition] = "";
    gameBoard[position] = "You";
    player.movePlayer(position);
    this.setState({ gameBoard, player });
  }

  handleMovement = (position, square) => {
    let isLegalSquare = false;
    isLegalSquare = this.checkIfLegalMove(
      position,
      this.state.player.playerPosition
    );
    if (isLegalSquare) {
      this.movePlayer(position, square);
    }
  };

  checkIfLegalSquare = position => {
    let gameBoard = this.state.gameBoard;
    if (position < 0 || position > gameBoard.length) {
      return false;
    }
    return true;
  };

  arrowKeyMovement = e => {
    console.log(e.key);
    let position = this.state.player.playerPosition;
    let square = "";
    switch (e.key) {
      case "ArrowUp":
        position -= 7;
        if (this.checkIfLegalSquare(position)) {
          square = this.state.gameBoard[position];
          this.movePlayer(position, square);
        }
        break;
      case "ArrowDown":
        position += 7;
        if (this.checkIfLegalSquare(position)) {
          square = this.state.gameBoard[position];
          this.movePlayer(position, square);
        }
        break;
      case "ArrowLeft":
        position -= 1;
        if (this.checkIfLegalSquare(position)) {
          square = this.state.gameBoard[position];
          this.movePlayer(position, square);
        }
        break;
      case "ArrowRight":
        position += 1;
        if (this.checkIfLegalSquare(position)) {
          square = this.state.gameBoard[position];
          this.movePlayer(position, square);
        }
        break;
      default:
        break;
    }
  };

  handleInventoryClick = (item, index) => {
    let player = this.state.player;
    if (item.constructor.name === "Potion") {
      player.drinkPotion(item, index);
    } else if (item.constructor.name === "Weapon") {
      player.changeWeaponFromMenu(item, index);
    }
    this.setState({ player });
  };

  checkIfDead(health) {
    if (health > 0) {
      return false;
    }
    return true;
  }

  handlePlayerAttack(enemyHealth, enemyName, playerMove, playerWeapon) {
    let damage =
      playerMove.damage *
      playerMove.amountOfHits *
      playerWeapon.damageMultiplier;
    console.log(playerWeapon.damageMultiplier);
    if (playerWeapon.name === playerMove.synergyWeapon) {
      damage = Math.floor(damage * 1.5);
    }
    this.addToChatBox("player hit " + enemyName + " for " + damage);
    return (enemyHealth -= damage);
  }

  handleEnemyDeath(currentEnemy) {
    this.addToChatBox(currentEnemy.name + " is dead");
    currentEnemy = "";
    let screen = this.state.screen;
    screen.endFightScreen();
    this.setState({
      screen,
      currentEnemy
    });
  }

  handleEnemyAttack(currentHealth, enemyMove, block, currentEnemyDamage) {
    block -= currentEnemyDamage * enemyMove.damage * enemyMove.amountOfHits;
    if (block < 0) {
      currentHealth += block;
      this.addToChatBox("Player was hit for " + block * -1 + " damage");
      return currentHealth;
    } else {
      this.addToChatBox("Player blocked all damage");
    }
    return currentHealth;
  }

  handleAttackClick = (currentEnemy, enemyMove, playerMove, playerWeapon) => {
    let isEnemyDead = false;
    let block = 0;
    if (playerMove.constructor.name === "Attack") {
      currentEnemy.currentHealth = this.handlePlayerAttack(
        currentEnemy.currentHealth,
        currentEnemy.name,
        playerMove,
        playerWeapon
      );
      isEnemyDead = this.checkIfDead(currentEnemy.currentHealth);
      if (isEnemyDead) {
        this.handleEnemyDeath(currentEnemy);
      }
    } else if (playerMove.constructor.name === "Block") {
      block += playerMove.blockAmount;
      this.addToChatBox("player blocked for " + block);
    }
    if (!isEnemyDead) {
      let currentHealth = this.handleEnemyAttack(
        this.state.player.currentHealth,
        enemyMove,
        block,
        currentEnemy.weapon.damageMultiplier
      );
      let isDead = this.checkIfDead(currentHealth);
      if (isDead) {
        console.log("gameOver");
      }
      let player = this.state.player;
      player.currentHealth = currentHealth;
      this.setState({ currentEnemy, currentHealth });
    }
  };

  handleTreasureClick = treasureItem => {
    let player = this.state.player;
    let screen = this.state.screen;
    if (
      treasureItem.constructor.name === "Attack" ||
      treasureItem.constructor.name === "Block"
    ) {
      player.addMove(treasureItem);
    } else if (treasureItem.constructor.name === "Weapon") {
      player.changeWeapon(treasureItem);
    }
    screen.endRewards();
    this.setState({ player, screen });
  };

  render() {
    const disabledOption = this.state.playerName === "";
    return (
      <div className="container-fluid">
        {this.state.screen.createCharacter ? (
          <div className="playerInfo ">
            <input
              type="text"
              name="playerName"
              className="form-control"
              value={this.state.playerName}
              onChange={this.handleChange}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.startGame();
                }
              }}
            ></input>
            <button
              onClick={this.startGame}
              disabled={disabledOption}
              className="btn btn-danger"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="game-container">
            <div className="row">
              <div className="col-12 player-header">
                <Player
                  playerName={this.state.player.playerName}
                  maxHealth={this.state.player.maxHealth}
                  currentHealth={this.state.player.currentHealth}
                  gold={this.state.player.gold}
                  weaponName={this.state.player.weapon.name}
                />
              </div>
            </div>
            <div className="row gameplay">
              <div className="col-2">
                <MovesInventory
                  weaponName={this.state.player.weapon.name}
                  moves={this.state.player.playerMoves}
                />
              </div>
              <div className="col-8 main-component">
                {this.state.screen.characterMoving && (
                  <div id="charMove" onKeyDown={e => this.arrowKeyMovement(e)}>
                    <GameBoard
                      gameBoard={this.state.gameBoard}
                      playerMovement={this.handleMovement}
                    />
                  </div>
                )}
                {this.state.screen.characterFighting && (
                  <FightBoard
                    enemy={this.state.currentEnemy}
                    onAttackClick={this.handleAttackClick}
                    playerMoves={this.state.player.playerMoves}
                    playerWeapon={this.state.player.weapon}
                  />
                )}
                {this.state.screen.characterRewards && (
                  <TreasureChest
                    treasures={this.state.chestRewards}
                    onTreasureClick={this.handleTreasureClick}
                  />
                )}
              </div>
              <div className="col-2 inventory">
                <Inventory
                  playerInventory={this.state.player.playerInventory}
                  onInventoryClick={this.handleInventoryClick}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <h3>Messages</h3>
                <textarea
                  value={this.state.chatMessage}
                  disabled
                  rows="4"
                  id="chat_id"
                  className="testt"
                ></textarea>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Game;
