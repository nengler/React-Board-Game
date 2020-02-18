import React, { Component } from "react";
import GameBoard from "./gameBoard";
import Player from "./player";
import Inventory from "./inventory";
import { potions } from "../constants/itemConstants";
import FightBoard from "./fightBoard";
import { cockRoach } from "../constants/monsters";
import { player } from "../constants/playerConstant";
import { screen } from "../constants/showScreen";
import { tripleStrike, stab, wall } from "../constants/moves";

class Game extends Component {
  state = {
    player: player,
    enemies: [cockRoach, cockRoach, cockRoach],
    currentEnemy: null,
    screen: screen,
    gameBoard: Array(49),
    chatMessage: ""
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
        gameBoard[i] = "Player";
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
  };

  addToChatBox = message => {
    let chatMessage = this.state.chatMessage;
    chatMessage += message + "\n";
    this.setState({ chatMessage });
    var textarea = document.getElementById("chat_id");
    textarea.scrollTop = textarea.scrollHeight;
  };

  squareProperty = square => {
    let player = this.state.player;
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
        let screen = this.state.screen;
        screen.fightScreen();
        let enemies = this.state.enemies;
        let currentEnemy = enemies.shift();
        currentEnemy.currentHealth = currentEnemy.maxHealth;
        this.setState({ enemies, currentEnemy, screen });
        break;
      default:
        break;
    }
  };

  handleMovement = (position, square) => {
    if (
      position === this.state.player.playerPosition + 1 ||
      position === this.state.player.playerPosition - 1 ||
      position === this.state.player.playerPosition + 7 ||
      position === this.state.player.playerPosition - 7
    ) {
      this.squareProperty(square);
      let gameBoard = this.state.gameBoard;
      let player = this.state.player;
      gameBoard[player.playerPosition] = "";
      gameBoard[position] = "Player";
      player.movePlayer(position);
      this.setState({ gameBoard, player });
    }
  };

  handleInventoryClick = (item, index) => {
    let player = this.state.player;
    if (item.constructor.name === "Potion") {
      player.drinkPotion(item, index);
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
      playerMove.damage * playerMove.amountOfHits * playerWeapon.damage;
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

  handleEnemyAttack(currentHealth, block, currentEnemyDamage) {
    block -= currentEnemyDamage;
    if (block < 0) {
      currentHealth += block;
      this.addToChatBox("Player was hit for " + block * -1 + " damage");
      return currentHealth;
    }
    this.addToChatBox("Player blocked all damage");
    return currentHealth;
  }

  handleAttackClick = (currentEnemy, playerMove, playerWeapon) => {
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
        block,
        currentEnemy.damage
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
            <Player
              playerName={this.state.player.playerName}
              maxHealth={this.state.player.maxHealth}
              currentHealth={this.state.player.currentHealth}
              gold={this.state.player.gold}
              weaponName={this.state.player.weapon.name}
            />
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                {this.state.screen.characterMoving && (
                  <GameBoard
                    gameBoard={this.state.gameBoard}
                    playerMovement={this.handleMovement}
                  />
                )}
                {this.state.screen.characterFighting && (
                  <FightBoard
                    enemy={this.state.currentEnemy}
                    onAttackClick={this.handleAttackClick}
                    playerMoves={this.state.player.playerMoves}
                    playerWeapon={this.state.player.weapon}
                  />
                )}
              </div>
              <div className="col-3">
                <Inventory
                  playerInventory={this.state.player.playerInventory}
                  onInventoryClick={this.handleInventoryClick}
                />
              </div>
            </div>
            <div className="chat">
              <h3>Messages</h3>
              <textarea
                value={this.state.chatMessage}
                disabled
                rows="4"
                cols="100"
                id="chat_id"
              ></textarea>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Game;
