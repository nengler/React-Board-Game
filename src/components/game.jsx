import React, { Component } from "react";
import GameBoard from "./gameBoard";
import Player from "./player";
import Inventory from "./inventory";
import { potions } from "../constants/itemConstants";
import { dagger } from "../constants/weapons";
import FightBoard from "./fightBoard";
import { cockRoach } from "../constants/monsters";
import { strike, defend } from "../constants/moves";

class Game extends Component {
  state = {
    playerName: "",
    maxHealth: 3,
    currentHealth: 3,
    strength: 1,
    gold: 0,
    weapon: dagger,
    playerInventory: [],
    playerMoves: [strike, defend],
    enemies: [cockRoach, cockRoach, cockRoach],
    currentEnemy: null,
    createCharacter: true,
    moveCharacter: false,
    characterFighting: false,
    characterEvent: false,
    gameBoard: Array(49),
    playerPosition: 24,
    chatMessage: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  startGame = () => {
    let createCharacter = this.state.createCharacter;
    createCharacter = !createCharacter;
    let moveCharacter = true;
    let gameBoard = this.state.gameBoard;
    for (let i = 0; i < gameBoard.length; i++) {
      if (i === this.state.playerPosition) {
        gameBoard[i] = "Player";
      } else if (i % 10 === 0) {
        gameBoard[i] = "?";
      } else if (i % 12 === 0) {
        gameBoard[i] = "!";
      } else {
        gameBoard[i] = "x";
      }
    }

    this.setState({ createCharacter, moveCharacter });
  };

  addToChatBox = message => {
    let chatMessage = this.state.chatMessage;
    chatMessage += message + "\n";
    this.setState({ chatMessage });
    var textarea = document.getElementById("chat_id");
    textarea.scrollTop = textarea.scrollHeight;
  };

  squareProperty = square => {
    switch (square) {
      case "x":
        let gold = this.state.gold;
        gold += 15;
        this.setState({ gold });
        this.addToChatBox("found gold");
        break;
      case "?":
        let playerInventory = this.state.playerInventory;
        let potion = potions[Math.floor(Math.random() * 2)];
        playerInventory.push(potion);
        this.setState({ playerInventory });
        this.addToChatBox("found " + potion.name);
        break;
      case "!":
        this.setState({ characterFighting: true, moveCharacter: false });
        let enemies = this.state.enemies;
        let currentEnemy = enemies.shift();
        currentEnemy.currentHealth = currentEnemy.maxHealth;
        this.setState({ enemies, currentEnemy });
        break;
      default:
        break;
    }
  };

  handleMovement = (position, square) => {
    if (
      position === this.state.playerPosition + 1 ||
      position === this.state.playerPosition - 1 ||
      position === this.state.playerPosition + 7 ||
      position === this.state.playerPosition - 7
    ) {
      this.squareProperty(square);
      let gameBoard = this.state.gameBoard;
      let playerPosition = this.state.playerPosition;
      gameBoard[playerPosition] = "";
      gameBoard[position] = "Player";
      playerPosition = position;
      this.setState({ gameBoard, playerPosition });
    }
  };

  handleInventoryClick = (item, index) => {
    if (item.category === "health") {
      let currentHealth = this.state.currentHealth;
      currentHealth += item.affect;
      if (currentHealth > this.state.maxHealth) {
        currentHealth = this.state.maxHealth;
      }
      this.setState({ currentHealth });
    } else if (item.category === "strength") {
      let strength = this.state.strength;
      strength += item.affect;
      this.setState({ strength });
    }
    let playerInventory = this.state.playerInventory;
    playerInventory.splice(index, 1);
    this.setState({ playerInventory });
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
    this.setState({
      characterFighting: false,
      moveCharacter: true,
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
        this.state.currentHealth,
        block,
        currentEnemy.damage
      );

      let isDead = this.checkIfDead(currentHealth);
      if (isDead) {
        console.log("gameOver");
      }
      this.setState({ currentEnemy, currentHealth });
    }
  };

  render() {
    const disabledOption = this.state.playerName === "";
    return (
      <div className="container-fluid">
        {this.state.createCharacter ? (
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
              playerName={this.state.playerName}
              maxHealth={this.state.maxHealth}
              currentHealth={this.state.currentHealth}
              gold={this.state.gold}
              weaponName={this.state.weapon.name}
            />
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                {this.state.moveCharacter && (
                  <GameBoard
                    gameBoard={this.state.gameBoard}
                    playerMovement={this.handleMovement}
                  />
                )}
                {this.state.characterFighting && (
                  <FightBoard
                    enemy={this.state.currentEnemy}
                    onAttackClick={this.handleAttackClick}
                    playerMoves={this.state.playerMoves}
                    playerWeapon={this.state.weapon}
                  />
                )}
              </div>
              <div className="col-3">
                <Inventory
                  playerInventory={this.state.playerInventory}
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
