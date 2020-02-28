import React, { Component } from "react";
import GameBoard from "./gameBoard";
import Player from "./player";
import TreasureChest from "./treasureChest";
import Inventory from "./inventory";
import Shop from "./shop";
import { potions } from "../constants/itemConstants";
import FightBoard from "./fightBoard";
import { cockRoach, worm } from "../constants/monsters";
import { player } from "../constants/playerConstant";
import { screen } from "../constants/showScreen";
import { sword } from "../constants/weapons";
import MovesInventory from "./movesInventory";
import { playerMoveArray } from "../constants/moves";
import { weaponArray } from "../constants/weapons";
import { tripleStrike, wall } from "../constants/moves";
import { treasure } from "../constants/treasure";
import { shop } from "../constants/shop";

/*
TODO:
add boss
random events
algorith to randomize floor
*/

class Game extends Component {
  state = {
    player: player,
    enemies: [cockRoach, worm, cockRoach],
    currentEnemy: null,
    screen: screen,
    gameBoard: Array(63).fill(""),
    chatMessage: "",
    treasure: treasure,
    shop: shop
  };

  handleChange = event => {
    let player = this.state.player;
    player.setPlayerName(event.target.value);
    this.setState({ player });
  };

  randomizer(itemArray) {
    for (let i = itemArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = itemArray[i];
      itemArray[i] = itemArray[j];
      itemArray[j] = temp;
    }
    return itemArray;
  }

  getDirections() {
    let directions = ["NE", "SE", "SW", "NW"];
    directions = this.randomizer(directions);
    directions.splice(3, 1);
    return directions;
  }

  createDirections(direction) {
    let stepDirections = [];
    for (let i = 0; i < 3; i++) {
      stepDirections.push(direction.substr(0, 1));
    }
    for (let i = 0; i < 4; i++) {
      stepDirections.push(direction.substr(1, 2));
    }
    stepDirections = this.randomizer(stepDirections);
    if (
      stepDirections[0] === direction.substr(1, 2) &&
      stepDirections[1] === direction.substr(1, 2) &&
      stepDirections[2] === direction.substr(1, 2)
    ) {
      let swapIndex = stepDirections.indexOf(direction.substr(0, 1));
      let temp = stepDirections[2];
      stepDirections[2] = stepDirections[swapIndex];
      stepDirections[swapIndex] = temp;
    }
    return stepDirections;
  }

  createPath(gameBoard, direction) {
    let stepDirections = this.createDirections(direction);
    console.log(stepDirections);
    let position = (gameBoard.length - 1) / 2;
    stepDirections.forEach(step => {
      switch (step) {
        case "N":
          position -= 9;
          gameBoard[position] = " p";
          break;
        case "S":
          position += 9;
          gameBoard[position] = " p";
          break;
        case "W":
          position -= 1;
          gameBoard[position] = " p";
          break;
        case "E":
          position += 1;
          gameBoard[position] = " p";
          break;
        default:
          break;
      }
    });
    return gameBoard;
  }

  connectPrimaries(gameBoard, primaryDirections) {
    if (primaryDirections.includes("NE") && primaryDirections.includes("NW")) {
      for (let i = 0; i < 9; i++) {
        gameBoard[i] = " p";
      }
    } else if (
      primaryDirections.includes("NE") &&
      primaryDirections.includes("SE")
    ) {
      for (let i = 8; i < 63; i += 9) {
        gameBoard[i] = " k";
      }
    } else if (
      primaryDirections.includes("SW") &&
      primaryDirections.includes("SE")
    ) {
      for (let i = 54; i < 63; i++) {
        gameBoard[i] = " k";
      }
    } else if (
      primaryDirections.includes("SW") &&
      primaryDirections.includes("NW")
    ) {
      for (let i = 0; i < 55; i += 9) {
        gameBoard[i] = " k";
      }
    }
    return gameBoard;
  }

  createBoard(primaryDirections, secondaryDirection, gameBoard) {
    primaryDirections.forEach(direction => {
      console.log("hel");
      gameBoard = this.createPath(gameBoard, direction);
    });
    gameBoard = this.connectPrimaries(gameBoard, primaryDirections);
    gameBoard = this.createPath(gameBoard, secondaryDirection);
    return gameBoard;
  }

  createFloor(gameBoard) {
    let boardDirections = this.getDirections();
    let primaryDirections = [];
    primaryDirections.push(boardDirections.splice(0, 1).toString());

    switch (primaryDirections[0]) {
      case "NE":
        if (boardDirections.includes("SE") && boardDirections.includes("NW")) {
          let randomNumberOneOrTwo = Math.floor(Math.random() * 2);
          primaryDirections.push(
            boardDirections.splice(randomNumberOneOrTwo, 1).toString()
          );
        } else if (boardDirections.includes("SE")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("SE"), 1).toString()
          );
        } else if (boardDirections.includes("NW")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("NW"), 1).toString()
          );
        }
        break;
      case "SE":
        if (boardDirections.includes("SW") && boardDirections.includes("NE")) {
          let randomNumberOneOrTwo = Math.floor(Math.random() * 2);
          primaryDirections.push(
            boardDirections.splice(randomNumberOneOrTwo, 1).toString()
          );
        } else if (boardDirections.includes("SW")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("SW"), 1).toString()
          );
        } else if (boardDirections.includes("NE")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("NE"), 1).toString()
          );
        }
        break;
      case "SW":
        if (boardDirections.includes("SE") && boardDirections.includes("NW")) {
          let randomNumberOneOrTwo = Math.floor(Math.random() * 2);
          console.log(randomNumberOneOrTwo);

          primaryDirections.push(
            boardDirections.splice(randomNumberOneOrTwo, 1).toString()
          );
        } else if (boardDirections.includes("SE")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("SE"), 1).toString()
          );
        } else if (boardDirections.includes("NW")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("NW"), 1).toString()
          );
        }
        break;
      case "NW":
        if (boardDirections.includes("SW") && boardDirections.includes("NE")) {
          let randomNumberOneOrTwo = Math.floor(Math.random() * 2);
          console.log(randomNumberOneOrTwo);
          primaryDirections.push(
            boardDirections.splice(randomNumberOneOrTwo, 1).toString()
          );
        } else if (boardDirections.includes("SW")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("SW"), 1).toString()
          );
        } else if (boardDirections.includes("NE")) {
          primaryDirections.push(
            boardDirections.splice(boardDirections.indexOf("NE"), 1).toString()
          );
        }
        break;
    }
    let secondaryDirection = boardDirections[0];
    gameBoard = this.createBoard(
      primaryDirections,
      secondaryDirection,
      gameBoard
    );
    return gameBoard;
  }

  startGame = () => {
    let player = this.state.player;
    let screen = this.state.screen;
    let treasure = this.state.treasure;
    let shop = this.state.shop;
    treasure.itemsToAddToTreasure(playerMoveArray);
    treasure.itemsToAddToTreasure(weaponArray);
    shop.itemsToAddToShop(playerMoveArray);
    shop.itemsToAddToShop(weaponArray);
    screen.moveCharacter();
    let gameBoard = this.state.gameBoard;
    player.playerPosition = (gameBoard.length - 1) / 2;
    gameBoard = this.createFloor(gameBoard);
    gameBoard[player.playerPosition] = "🧑";
    /*for (let i = 0; i < gameBoard.length; i++) {
      if (i === player.playerPosition) {
        gameBoard[i] = "🧑";
      } else if (i % 10 === 0) {
        gameBoard[i] = "?";
      } else if (i % 12 === 0) {
        gameBoard[i] = "⚔";
      } else if (i % 15 === 0) {
        gameBoard[i] = "👑";
      } else if (i % 5 === 0) {
        gameBoard[i] = "💰";
      } else if (i === gameBoard.length - 2 || i === 1) {
        gameBoard[i] = "🛍️";
      }
    }*/
    this.setState({ screen, treasure, shop, player, gameBoard });
  };

  addToChatBox = message => {
    let chatMessage = this.state.chatMessage;
    chatMessage += message + "\n";
    this.setState({ chatMessage }, () => {
      var textarea = document.getElementById("chat_id");
      textarea.scrollTop = textarea.scrollHeight;
    });
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
      case "🛍️":
        screen.showShop();
        this.setState({ screen });
        break;
      default:
        break;
    }
  };

  checkIfLegalMove = (proposedPosition, playerPosition, square) => {
    if (
      proposedPosition === playerPosition + 1 ||
      proposedPosition === playerPosition - 1 ||
      proposedPosition === playerPosition + 9 ||
      (proposedPosition === playerPosition - 9 && square !== "")
    ) {
      return true;
    }
    return false;
  };

  movePlayer(position, square) {
    this.handleSquareProperty(square);
    let gameBoard = this.state.gameBoard;
    let player = this.state.player;
    gameBoard[player.playerPosition] = " ";
    gameBoard[position] = "🧑";
    player.movePlayer(position);
    this.setState({ gameBoard, player });
  }

  handleMovement = (position, square) => {
    let isLegalSquare = false;
    isLegalSquare = this.checkIfLegalMove(
      position,
      this.state.player.playerPosition,
      square
    );
    if (isLegalSquare) {
      this.movePlayer(position, square);
    }
  };

  checkIfLegalSquare = position => {
    let gameBoard = this.state.gameBoard;
    if (position < 0 || position >= gameBoard.length) {
      return false;
    } else if (gameBoard[position] === "") {
      return false;
    }
    return true;
  };

  arrowKeyMovement = e => {
    if (this.state.screen.characterMoving === true) {
      let position = this.state.player.playerPosition;
      let square = "";
      switch (e.key) {
        case "ArrowUp":
          position -= 9;
          if (this.checkIfLegalSquare(position)) {
            square = this.state.gameBoard[position];
            this.movePlayer(position, square);
          }
          break;
        case "ArrowDown":
          position += 9;
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

  handleEnemyAttack = (enemyMove, block, currentEnemyDamage) => {
    let player = this.state.player;
    let currentEnemy = this.state.currentEnemy;
    block -= currentEnemyDamage * enemyMove.damage * enemyMove.amountOfHits;
    if (block < 0) {
      player.currentHealth += block;
      //this.addToChatBox("Player was hit for " + block * -1 + " damage");
    } else {
      //this.addToChatBox("Player blocked all damage");
    }
    let isPlayerDead = this.checkIfDead(player.currentHealth);
    if (isPlayerDead) {
      let screen = this.state.screen;
      screen.characterDeath();
      player.handlePlayerDeath();
      this.setState({ player, currentEnemy });
    } else {
      player.endTurn();
      currentEnemy.goToNextMove();
      this.setState({ player, currentEnemy });
    }
  };

  calculateBlock(move, weapon) {
    let block = move.blockAmount * weapon.blockMultiplier;
    if (weapon === move.synergyItem) {
      block *= 1.5;
    }
    return Math.floor(block);
  }

  handleBlockCardClick = (playerMove, playerWeapon, currentMana) => {
    if (currentMana >= playerMove.manaCost) {
      let player = this.state.player;
      let block = this.calculateBlock(playerMove, playerWeapon);
      player.addBlock(block);
      let message = "Player increased block by " + block;
      player.decreaseCurrentMana(playerMove.manaCost);
      this.setState({ player });
      this.addToChatBox(message);
    } else if (currentMana < playerMove.manaCost) {
      this.addToChatBox("not enough mana");
    }
  };

  handleEnemyDeath(currentEnemy) {
    currentEnemy = "";
    let screen = this.state.screen;
    screen.endFightScreen();
    this.setState({
      screen,
      currentEnemy
    });
  }

  calculateDamage(playerMove, playerWeapon) {
    let damage =
      playerMove.damage *
      playerMove.amountOfHits *
      playerWeapon.damageMultiplier;
    if (playerWeapon.name === playerMove.synergyItem) {
      damage = damage * 1.5;
    }
    return Math.floor(damage);
  }

  handleAttackCardClick = (
    currentEnemy,
    playerMove,
    playerWeapon,
    currentMana
  ) => {
    if (currentMana >= playerMove.manaCost) {
      let player = this.state.player;
      let message = "";
      player.decreaseCurrentMana(playerMove.manaCost);
      let damage = this.calculateDamage(playerMove, playerWeapon);
      message += "player hit " + currentEnemy.name + " for " + damage;
      currentEnemy.currentHealth -= damage;
      let isEnemyDead = this.checkIfDead(currentEnemy.currentHealth);
      if (isEnemyDead) {
        this.handleEnemyDeath(currentEnemy);
        player.endTurn();
        message += "\n" + currentEnemy.name + " was slain";
      } else {
        this.setState({ currentEnemy });
      }
      this.addToChatBox(message);
    } else if (currentMana < playerMove.manaCost) {
      this.addToChatBox("not enough mana");
    }
  };

  handleTreasureClick = treasureItem => {
    let player = this.state.player;
    let screen = this.state.screen;
    let treasure = this.state.treasure;
    if (
      treasureItem.constructor.name === "Attack" ||
      treasureItem.constructor.name === "Block"
    ) {
      player.addMove(treasureItem);
    } else if (treasureItem.constructor.name === "Weapon") {
      player.changeWeapon(treasureItem);
    }
    screen.endRewards();
    treasure.increaseIndex();
    this.setState({ player, screen, treasure });
  };

  handleShopClick = (shopItem, index) => {
    if (this.state.player.gold >= shopItem.cost) {
      let player = this.state.player;
      let shop = this.state.shop;
      switch (shopItem.constructor.name) {
        case "Attack":
          player.addMove(shopItem);
          break;
        case "Block":
          player.addMove(shopItem);
          break;
        case "Weapon":
          player.changeWeapon(shopItem);
          break;
      }
      shop.shopItems.splice(index, 1);
      shop.decreaseItemsToShow();
      console.log(shop);
      this.setState({ player, shop });
    } else {
      this.addToChatBox("Cant afford " + shopItem.name);
    }
  };

  handleExitShopClick = () => {
    let screen = this.state.screen;
    let shop = this.state.shop;
    shop.resetItemsToShow();
    screen.leaveShop();
    this.setState({ screen });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.arrowKeyMovement);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.arrowKeyMovement);
  }

  render() {
    const disabledOption = this.state.playerName === "";
    return (
      <div className="container-fluid" ref="nv">
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
                />
              </div>
            </div>
            {this.state.screen.characterFighting ? (
              <div className="row">
                <div className="col-12 fightBoard-div">
                  <FightBoard
                    enemy={this.state.currentEnemy}
                    onAttackCardClick={this.handleAttackCardClick}
                    onBlockCardClick={this.handleBlockCardClick}
                    onEnemyAttack={this.handleEnemyAttack}
                    playerMoves={this.state.player.playerMoves}
                    playerWeapon={this.state.player.weapon}
                    currentMana={this.state.player.currentMana}
                    maxMana={this.state.player.maxMana}
                    block={this.state.player.block}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="row gameplay">
                  <div className="col-2">
                    <MovesInventory
                      weapon={this.state.player.weapon}
                      moves={this.state.player.playerMoves}
                    />
                  </div>
                  <div className="col-8 main-component">
                    {this.state.screen.characterMoving && (
                      <GameBoard
                        gameBoard={this.state.gameBoard}
                        playerMovement={this.handleMovement}
                      />
                    )}
                    {this.state.screen.characterRewards && (
                      <TreasureChest
                        treasure={this.state.treasure}
                        onTreasureClick={this.handleTreasureClick}
                      />
                    )}
                    {this.state.screen.characterShop && (
                      <Shop
                        shop={this.state.shop}
                        playersMoney={this.state.player.gold}
                        onShopClick={this.handleShopClick}
                        exitShop={this.handleExitShopClick}
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
              </div>
            )}
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
