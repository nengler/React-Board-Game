import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import GameBoard from "./gameBoard";
import Player from "./player";
import TreasureChest from "./treasureChest";
import Inventory from "./inventory";
import Shop from "./shop";
import DiscardCard from "./discardCard";
import RestChoice from "./restChoice";
import RandomEvent from "./randomEvent";
import FightBoard from "./fightBoard";
import { enemies, bosses, randomEventMonsters } from "../constants/monsters";
import { player } from "../constants/playerConstant";
import { screen } from "../constants/showScreen";
import MovesInventory from "./movesInventory";
import { playerMoveArray } from "../constants/moves";
import { weaponArray } from "../constants/weapons";
import { treasure } from "../constants/treasure";
import { shop } from "../constants/shop";
import { boardObject } from "../constants/boardObject";
import { activityObject } from "../constants/activityObject";
import { MonsterContainerObject } from "../constants/monsterContainerObject";
import { BossContainerObject } from "../constants/bossContainerObject";
import { RandomEventEnemyContainer } from "../constants/randomEventEnemyContainer";
import { randomEventHolder } from "../constants/randomEvents";

/*
TODO:
monsters shoudl be strong or weak against moves or categories
might have to make enemies more powerful
*/

class Game extends Component {
  state = {
    player: player,
    enemiesContainer: null,
    bossContainer: null,
    randomEventEnemiesContainer: null,
    currentEnemy: null,
    screen: screen,
    gameBoard: null,
    chatMessage: "",
    treasure: treasure,
    shop: shop,
    randomEvents: randomEventHolder,
  };

  handleChange = (event) => {
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
    let directions = ["NE", "NW", "SW", "SE"];
    directions = this.randomizer(directions);
    directions.splice(3, 1);
    return directions;
  }

  createDirections(direction, width, height) {
    let stepDirections = [];
    for (let i = 0; i < height / 2 - 1; i++) {
      stepDirections.push(direction.substr(0, 1));
    }
    for (let i = 0; i < width / 2 - 1; i++) {
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

  createPath(gameBoard, direction, activitiesObject) {
    activitiesObject.activityArray = this.randomizer(
      activitiesObject.activityArray
    );
    let stepDirections = this.createDirections(
      direction,
      gameBoard.width,
      gameBoard.height
    );
    let position = (gameBoard.board.length - 1) / 2;
    stepDirections.forEach((step) => {
      switch (step) {
        case "N":
          position -= gameBoard.width;
          break;
        case "S":
          position += gameBoard.width;
          break;
        case "W":
          position -= 1;
          break;
        case "E":
          position += 1;
          break;
        default:
          break;
      }
      gameBoard.changeBoardSquare(activitiesObject.getActivity(), position);
    });
    gameBoard.changeBoardSquare(activitiesObject.getBigActivity(), position);
    activitiesObject.resetActivitiesIndex();
    return gameBoard;
  }

  handlePrimaryIterations(
    gameBoard,
    startingValue,
    greaterThanValue,
    iterationValue,
    bossSpacer,
    activitiesObject
  ) {
    let bossPlacement = Math.floor(Math.random() * bossSpacer) + 1;
    let bossIndex = 0;
    for (let i = startingValue; i < greaterThanValue; i += iterationValue) {
      gameBoard.changeBoardSquare(activitiesObject.getActivity(), i);
      if (bossIndex === bossPlacement) {
        gameBoard.changeBoardSquare("⚔️", i);
        gameBoard.setBossPosition(i);
      }
      bossIndex++;
    }
    return gameBoard;
  }

  connectPrimaries(gameBoard, primaryDirections, activitiesObject) {
    if (primaryDirections.includes("NE") && primaryDirections.includes("NW")) {
      gameBoard = this.handlePrimaryIterations(
        gameBoard,
        1,
        gameBoard.width - 1,
        1,
        (gameBoard.width - 1) / 2,
        activitiesObject
      );
    } else if (
      primaryDirections.includes("NE") &&
      primaryDirections.includes("SE")
    ) {
      gameBoard = this.handlePrimaryIterations(
        gameBoard,
        gameBoard.width * 2 - 1,
        gameBoard.width * gameBoard.height - 1,
        gameBoard.width,
        (gameBoard.height - 1) / 2,
        activitiesObject
      );
    } else if (
      primaryDirections.includes("SW") &&
      primaryDirections.includes("SE")
    ) {
      gameBoard = this.handlePrimaryIterations(
        gameBoard,
        gameBoard.board.length - gameBoard.width + 1,
        gameBoard.board.length - 1,
        1,
        (gameBoard.width - 1) / 2,
        activitiesObject
      );
    } else if (
      primaryDirections.includes("SW") &&
      primaryDirections.includes("NW")
    ) {
      gameBoard = this.handlePrimaryIterations(
        gameBoard,
        gameBoard.width,
        gameBoard.width * (gameBoard.height - 1),
        gameBoard.width,
        (gameBoard.height - 1) / 2,
        activitiesObject
      );
    }
    return gameBoard;
  }

  createBoard(primaryDirections, secondaryDirection, gameBoard) {
    let bigActivities = ["🛏️", "🎊", "🛒"];
    let activitiesObject = new activityObject(bigActivities);
    let spacesPerDirection =
      Math.floor(gameBoard.width / 2) + Math.floor(gameBoard.height / 2);
    //activitiesObject.addToArrayXTimes(" ", 1);
    activitiesObject.addToArrayXTimes("?", Math.floor(spacesPerDirection / 2));
    activitiesObject.addToArrayXTimes("🗡️", spacesPerDirection);
    activitiesObject.addToArrayXTimes(
      "💰",
      Math.floor(spacesPerDirection / 2) - 1
    );
    bigActivities = this.randomizer(bigActivities);
    primaryDirections.forEach((direction) => {
      gameBoard = this.createPath(gameBoard, direction, activitiesObject);
    });
    gameBoard = this.connectPrimaries(
      gameBoard,
      primaryDirections,
      activitiesObject
    );
    gameBoard = this.createPath(
      gameBoard,
      secondaryDirection,
      activitiesObject
    );
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
      default:
        break;
    }
    let secondaryDirection = boardDirections[0];
    gameBoard = this.createBoard(
      primaryDirections,
      secondaryDirection,
      gameBoard
    );
    gameBoard.changeBoardSquare("🧑", player.playerPosition);
    return gameBoard;
  }

  startGame = () => {
    let player = this.state.player;
    let screen = this.state.screen;
    let treasure = this.state.treasure;
    let shop = this.state.shop;
    let enemiesContainer = new MonsterContainerObject();
    let bossContainer = new BossContainerObject();
    let randomEventEnemiesContainer = new RandomEventEnemyContainer();
    let randomEvents = this.state.randomEvents;
    enemiesContainer.addMonsters(enemies);
    bossContainer.addEnemies(bosses);
    randomEventEnemiesContainer.addEnemies(randomEventMonsters);
    const itemsArray = [...playerMoveArray, ...weaponArray];
    treasure.itemsToAddToTreasure(itemsArray);
    shop.itemsToAddToShop(itemsArray);
    screen.moveCharacter();
    let gameBoard = new boardObject(5, 5);
    player.playerPosition = (gameBoard.board.length - 1) / 2;
    gameBoard = this.createFloor(gameBoard);
    randomEvents.randomizeEvents();
    this.setState({
      screen,
      treasure,
      shop,
      player,
      gameBoard,
      enemiesContainer,
      bossContainer,
      randomEventEnemiesContainer,
      randomEvents,
      chatMessage: "",
    });
  };

  addToChatBox = (message) => {
    let chatMessage = this.state.chatMessage;
    chatMessage += message + "\n";
    this.setState({ chatMessage }, () => {
      try {
        var textarea = document.getElementById("chat_id");
        textarea.scrollTop = textarea.scrollHeight;
      } catch {}
    });
  };

  handleSquareProperty = (square) => {
    let player = this.state.player;
    let screen = this.state.screen;
    switch (square) {
      case "💰":
        player.increaseGold(15);
        this.setState({ player });
        this.addToChatBox("found gold");
        break;
      case "?":
        screen.showRandomEvent();
        break;
      case "🗡️":
        screen.fightScreen();
        let currentEnemy = cloneDeep(
          this.state.enemiesContainer.getMonster(
            this.state.gameBoard.getCurrentLevel()
          )
        );
        this.setState({ currentEnemy, screen });
        break;
      case "🎊":
        screen.showRewads();
        let treasure = this.state.treasure;
        treasure.showCommon();
        treasure.amountToBeShown(3);
        this.addToChatBox(player.playerName + " found lootations ");
        this.setState({ screen, treasure });
        break;
      case "🛒":
        screen.showShop();
        this.addToChatBox(player.playerName + " found a shop");
        this.setState({ screen });
        break;
      case "🛏️":
        screen.characterRestChoice();
        this.setState({ screen });
        break;
      case "⚔️":
        screen.fightScreen();
        let boss = cloneDeep(
          this.state.bossContainer.getEnemy(
            this.state.gameBoard.getCurrentLevel()
          )
        );
        this.setState({ currentEnemy: boss, screen });
        break;
      case "🚪":
        screen.showOptionToGoToNextFloor();
        this.setState({ screen });
        break;
      default:
        break;
    }
  };

  checkIfLegalMovement = (proposedPosition, playerPosition, square) => {
    if (
      (proposedPosition === playerPosition + 1 ||
        proposedPosition === playerPosition - 1 ||
        proposedPosition === playerPosition + this.state.gameBoard.width ||
        proposedPosition === playerPosition - this.state.gameBoard.width) &&
      square !== ""
    ) {
      return true;
    }
    return false;
  };

  movePlayer(position, square) {
    this.handleSquareProperty(square);
    let gameBoard = this.state.gameBoard;
    let player = this.state.player;
    if (player.playerPosition === this.state.gameBoard.bossPosition) {
      gameBoard.changeBoardSquare("🚪", player.playerPosition);
    } else {
      gameBoard.changeBoardSquare(" ", player.playerPosition);
    }
    gameBoard.changeBoardSquare("🧑", position);
    player.movePlayer(position);
    this.setState({ gameBoard, player });
  }

  handleMovement = (position, square) => {
    if (
      this.checkIfLegalMovement(
        position,
        this.state.player.playerPosition,
        square
      )
    ) {
      this.movePlayer(position, square);
    }
  };

  checkIfLegalSquare = (position) => {
    let gameBoard = this.state.gameBoard;
    if (position < 0 || position >= gameBoard.board.length) {
      return false;
    } else if (gameBoard.board[position] === "") {
      return false;
    }
    return true;
  };

  arrowKeyMovement = (e) => {
    if (this.state.screen.characterMoving === true) {
      let position = this.state.player.playerPosition;
      let square = "";
      switch (e.key) {
        case "ArrowUp":
          position -= this.state.gameBoard.width;
          break;
        case "ArrowDown":
          position += this.state.gameBoard.width;
          break;
        case "ArrowLeft":
          position -= 1;
          break;
        case "ArrowRight":
          position += 1;
          break;
        default:
          break;
      }
      if (this.checkIfLegalSquare(position)) {
        square = this.state.gameBoard.board[position];
        this.movePlayer(position, square);
      }
    }
  };

  handleInventoryClick = (item, index) => {
    let player = this.state.player;
    if (item.type === "Potion") {
      player.drinkPotion(item, index);
    } else if (item.type === "Weapon") {
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

  handleEnemyAttack(enemyMove, playersBlock, enemyWeapon) {
    let player = this.state.player;
    let currentEnemy = this.state.currentEnemy;
    let message = "";
    currentEnemy.resetBlock();
    let damage = this.calculateDamage(enemyMove, enemyWeapon);
    playersBlock -= damage;
    if (playersBlock < 0) {
      player.currentHealth += playersBlock;
      message +=
        player.playerName +
        " was hit for " +
        playersBlock * -1 +
        " damage by " +
        this.state.currentEnemy.name +
        "'s " +
        enemyMove.name;
    } else {
      message += player.playerName + " blocked all damage";
    }
    let isPlayerDead = this.checkIfDead(player.currentHealth);
    if (isPlayerDead) {
      let screen = this.state.screen;
      screen.characterDeath();
      this.setState({ screen, currentEnemy });
      message +=
        "\n" + player.playerName + " was slain by " + currentEnemy.name;
    } else {
      player.endTurn();
      currentEnemy.goToNextMove();
      this.setState({ player, currentEnemy });
    }
    this.addToChatBox(message);
  }

  handleEnemyBlock(enemyMove, enemyWeapon) {
    let currentEnemy = this.state.currentEnemy;
    let enemyBlock = this.calculateBlock(enemyMove, enemyWeapon);
    currentEnemy.resetBlock();
    currentEnemy.increaseBlock(enemyBlock);
    player.endTurn();
    currentEnemy.goToNextMove();
    this.addToChatBox(currentEnemy.name + " Increased block by " + enemyBlock);
    this.setState({ player, currentEnemy });
  }

  handleEnemyCard = (enemyMove, playersBlock, enemyWeapon) => {
    switch (enemyMove.type) {
      case "Attack":
        this.handleEnemyAttack(enemyMove, playersBlock, enemyWeapon);
        break;
      case "Block":
        this.handleEnemyBlock(enemyMove, enemyWeapon);
        break;
      default:
        break;
    }
  };

  calculateBlock(move, weapon) {
    let block = Math.floor(move.blockAmount * weapon.blockMultiplier);
    if (weapon.name === move.synergyItem) {
      block = Math.ceil(block * 1.5);
    } else if (weapon.category === move.conflictCategory) {
      block = Math.floor(block * 0.75);
    }
    return block;
  }

  handleBlockCardClick = (playerMove, playerWeapon) => {
    let player = this.state.player;
    let block = this.calculateBlock(playerMove, playerWeapon);
    player.addBlock(block);
    let message = player.playerName + " increased block by " + block;
    player.decreaseCurrentMana(playerMove.manaCost);
    this.setState({ player });
    this.addToChatBox(message);
  };

  handleEnemyDeath(currentEnemy, message) {
    let screen = this.state.screen;
    let treasure = this.state.treasure;
    let player = this.state.player;
    let money = currentEnemy.getMoneyDropped();
    player.increaseGold(money);
    this.addToChatBox(message + " and Dropped " + money + " coints");
    if (currentEnemy.isABoss) {
      screen.showRewads();
      treasure.showRare();
      treasure.amountToBeShown(3);
    } else {
      screen.showRewads();
      treasure.showCommon();
      treasure.amountToBeShown(2);
    }
    currentEnemy = "";
    this.setState({
      screen,
      currentEnemy,
      treasure,
      player,
    });
  }

  calculateDamage(move, weapon) {
    let damage = Math.floor(move.damage * weapon.damageMultiplier);
    if (weapon.name === move.synergyItem) {
      damage = Math.ceil(damage * 1.5);
    } else if (weapon.category === move.conflictCategory) {
      damage = Math.floor(damage * 0.75);
    }
    return Math.floor(damage * move.amountOfHits);
  }

  handleAttackCardClick = (currentEnemy, playerMove, playerWeapon) => {
    let player = this.state.player;
    let message = "";
    player.decreaseCurrentMana(playerMove.manaCost);
    let damage = this.calculateDamage(playerMove, playerWeapon);
    let enemyBlock = currentEnemy.block;
    enemyBlock -= damage;
    if (enemyBlock < 0) {
      currentEnemy.currentHealth += enemyBlock;
      message +=
        this.state.player.playerName +
        " hit " +
        currentEnemy.name +
        " for " +
        enemyBlock * -1;
      currentEnemy.resetBlock();
    } else {
      message += "Enemy blocked attack";
      currentEnemy.setBlock(enemyBlock);
    }
    let isEnemyDead = this.checkIfDead(currentEnemy.currentHealth);
    if (isEnemyDead) {
      message += "\n" + currentEnemy.name + " was slain";
      this.handleEnemyDeath(currentEnemy, message);
      player.endTurn();
    } else {
      this.setState({ currentEnemy });
      this.addToChatBox(message);
    }
  };

  handleDiscard = (moveToDiscard) => {
    let player = this.state.player;
    let screen = this.state.screen;
    player.discardCard(moveToDiscard);
    if (this.state.shop.isStillInShop) {
      screen.showShop();
    } else {
      screen.moveCharacter();
    }
    this.setState({ player, screen });
  };

  handlePlayerInventory() {
    let screen = this.state.screen;
    screen.discardCard();
    this.setState({ screen });
  }

  handleTreasureClick = (treasureItem) => {
    let player = this.state.player;
    let screen = this.state.screen;
    let treasure = this.state.treasure;
    if (treasureItem.type === "Attack" || treasureItem.type === "Block") {
      player.addMove(treasureItem);
      if (player.playerMoves.length > 4) {
        this.handlePlayerInventory();
      }
    } else if (treasureItem.type === "Weapon") {
      let weapon = cloneDeep(treasureItem);
      player.changeWeapon(weapon);
    }
    screen.endRewards();
    treasure.increaseIndex();
    this.setState({ player, screen, treasure });
  };

  handleNoTreasureClick = () => {
    let screen = this.state.screen;
    let treasure = this.state.treasure;
    screen.endRewards();
    treasure.increaseIndex();
    this.setState({ screen, treasure });
  };

  handleShopClick = (shopItem, index) => {
    if (this.state.player.gold >= shopItem.cost) {
      let player = this.state.player;
      let shop = this.state.shop;
      switch (shopItem.type) {
        case "Attack":
          player.addMove(shopItem);
          if (player.playerMoves.length > 4) {
            shop.stillInShop();
            this.handlePlayerInventory();
          }
          break;
        case "Block":
          player.addMove(shopItem);
          if (player.playerMoves.length > 4) {
            shop.stillInShop();
            this.handlePlayerInventory();
          }
          break;
        case "Weapon":
          let weapon = cloneDeep(shopItem);
          player.changeWeapon(weapon);
          break;
        default:
          break;
      }
      player.decreaseGold(shopItem.cost);
      shop.shopItems.splice(index, 1);
      shop.decreaseItemsToShow();
      this.setState({ player, shop });
    } else {
      this.addToChatBox("Cant afford " + shopItem.name);
    }
  };

  handleExitShopClick = () => {
    let screen = this.state.screen;
    let shop = this.state.shop;
    shop.resetItemsToShow();
    shop.exitShop();
    screen.leaveShop();
    this.setState({ screen, shop });
  };

  handleRestClick = (player) => {
    player.fullHeal();
    let screen = this.state.screen;
    screen.moveCharacter();
    this.addToChatBox(Player.playerName + " healed for full");
    this.setState({ screen, player });
  };

  handleSmithClick = (player, category, weaponName) => {
    player.improveWeapon(category);
    let screen = this.state.screen;
    screen.moveCharacter();
    this.addToChatBox(Player.playerName + " Improved " + weaponName);
    this.setState({ screen, player });
  };

  handleRandomEventClick = (eventAction, eventCategory) => {
    let screen = this.state.screen;
    let randomEvents = this.state.randomEvents;
    let player = this.state.player;
    let backToBoard = true;
    let stayInEvent = false;
    if (eventAction !== "WalkAway") {
      switch (eventCategory) {
        case "HeavySmither":
          if (eventAction === "HeavyDamageIncrease") {
            player.heavySmith("Attack");
          } else if (eventAction === "HeavyBlockIncrease") {
            player.heavySmith("Block");
          } else if (eventAction === "FightSmither") {
            let currentEnemy = this.state.randomEventEnemiesContainer.getEnemy(
              "Smith"
            );
            screen.fightScreen();
            backToBoard = false;
            this.setState({ currentEnemy });
          }
          break;
        case "HpLossForWeapon":
          player.changeWeapon(eventAction);
          player.currentHealth -= eventAction.cost / 10;
          if (this.checkIfDead(player.currentHealth)) {
            player.handlePlayerDeath();
            screen.characterDeath();
            backToBoard = false;
          }
          break;
        case "FreeMove":
          player.addMove(eventAction);
          if (player.playerMoves.length > 4) {
            this.handlePlayerInventory();
            backToBoard = false;
          }
          break;
        case "HealingForCoins":
          if (eventAction === "quarterHeal" && player.gold >= 50) {
            player.increaseHealth(Math.floor(player.maxHealth / 4));
          } else if (eventAction === "halfHeal" && player.gold >= 50) {
            player.increaseHealth(Math.floor(player.maxHealth / 2));
          } else {
            this.addToChatBox("Item too expensive");
            backToBoard = false;
            stayInEvent = true;
          }
          break;
        case "FreePotion":
          player.addToInventory(eventAction);
          break;
        default:
          break;
      }
    }
    if (!stayInEvent) {
      randomEvents.increaseRandomEventCounter();
    }
    if (backToBoard) {
      screen.moveCharacter();
    }
    this.setState({ screen, randomEvents, player });
  };

  handleGoToNextFloor = () => {
    let gameBoard = this.state.gameBoard;
    let player = this.state.player;
    let screen = this.state.screen;
    gameBoard.nextLevel();
    player.fullHeal();
    player.playerPosition = (gameBoard.board.length - 1) / 2;
    gameBoard = this.createFloor(gameBoard);
    screen.moveCharacter();
    this.setState({ gameBoard, player, screen });
  };

  handleCancelGoingToNextFloor = () => {
    let screen = this.state.screen;
    screen.moveCharacter();
    this.setState({ screen });
  };

  contactMe = () => {
    window.open("mailto:englernathan@gmail.com");
  };

  playAgain = () => {
    let player = this.state.player;
    let screen = this.state.screen;
    player.handlePlayerDeath();
    screen.startANewGame();
    this.setState({ player, screen });
  };

  undoLastMove = (move, weapon) => {
    let player = this.state.player;
    let enemy = this.state.currentEnemy;
    let message = player.playerName + " Undid move " + move.name + ", ";
    player.refundMana(move.manaCost);
    if (move.type === "Attack") {
      let damage = this.calculateDamage(move, weapon);
      enemy.increaseHealth(damage);
      message += enemy.name + " gained " + damage + " health";
    } else if (move.type === "Block") {
      let block = this.calculateBlock(move, weapon);
      player.decreaseBlock(block);
      message += player.playerName + " lost " + block + " block";
    }
    this.setState({ player, currentEnemy: enemy });
    this.addToChatBox(message);
  };

  componentDidMount() {
    document.addEventListener("keydown", this.arrowKeyMovement);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.arrowKeyMovement);
  }

  render() {
    const disableStart = this.state.player.playerName === "";
    return (
      <div className="container-fluid">
        {this.state.screen.createCharacter ? (
          <div className="homepage-centering">
            <div>
              <h1>GAME NAME</h1>
            </div>
            <div className="player-name-input ">
              <input
                type="text"
                name="playerName"
                className="form-control"
                value={this.state.playerName}
                onChange={this.handleChange}
                placeholder="Enter Name And Start Game"
                onKeyPress={(event) => {
                  if (event.key === "Enter" && !disableStart) {
                    this.startGame();
                  }
                }}
              ></input>
              <div className="home-buttons">
                <button
                  onClick={this.startGame}
                  disabled={disableStart}
                  className="btn btn-danger mr-2"
                >
                  Start Game
                </button>
                <button
                  onClick={this.contactMe}
                  className="btn btn-primary ml-2"
                >
                  Contact Me!
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container">
            <div className="row first-row">
              <div className="col-12 player-header">
                <Player
                  playerName={this.state.player.playerName}
                  maxHealth={this.state.player.maxHealth}
                  currentHealth={this.state.player.currentHealth}
                  gold={this.state.player.gold}
                  level={this.state.gameBoard.level}
                />
              </div>
            </div>

            {this.state.screen.characterFighting ||
            this.state.screen.characterDiscardCard ? (
              <div className="row second-row">
                <div className="col-12 fightBoard-div">
                  {this.state.screen.characterFighting && (
                    <FightBoard
                      enemy={this.state.currentEnemy}
                      onAttackCardClick={this.handleAttackCardClick}
                      onBlockCardClick={this.handleBlockCardClick}
                      onEnemyAttack={this.handleEnemyCard}
                      playerMoves={this.state.player.playerMoves}
                      playerWeapon={this.state.player.weapon}
                      currentMana={this.state.player.currentMana}
                      maxMana={this.state.player.maxMana}
                      block={this.state.player.block}
                      handleChatBox={this.addToChatBox}
                      undoLastMove={this.undoLastMove}
                    />
                  )}
                  {this.state.screen.characterDiscardCard && (
                    <DiscardCard
                      weapon={this.state.player.weapon}
                      moves={this.state.player.playerMoves}
                      onDiscard={this.handleDiscard}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="row gameplay second-row">
                <div className="col-2">
                  <MovesInventory
                    weapon={this.state.player.weapon}
                    moves={this.state.player.playerMoves}
                  />
                </div>
                <div className="col-md-8 main-component">
                  {this.state.screen.characterMoving && (
                    <div className="flexit">
                      <GameBoard
                        gameBoard={this.state.gameBoard.board}
                        boardWidth={this.state.gameBoard.width}
                        playerMovement={this.handleMovement}
                      />
                    </div>
                  )}
                  {this.state.screen.characterRewards && (
                    <TreasureChest
                      treasure={this.state.treasure}
                      onTreasureClick={this.handleTreasureClick}
                      onNoTreasure={this.handleNoTreasureClick}
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
                  {this.state.screen.characterRest && (
                    <RestChoice
                      player={this.state.player}
                      weapon={this.state.player.weapon}
                      onRestClick={this.handleRestClick}
                      onSmithClick={this.handleSmithClick}
                    />
                  )}
                  {this.state.screen.randomEvent && (
                    <RandomEvent
                      randomEvent={this.state.randomEvents}
                      onEventClick={this.handleRandomEventClick}
                    />
                  )}
                  {this.state.screen.characterDied && (
                    <div className="death-screen">
                      <div>
                        <div className="death-header">
                          <h1>{this.state.player.playerName} Died</h1>
                        </div>
                        <div>
                          <button
                            onClick={() => this.playAgain()}
                            className="btn btn-primary"
                          >
                            Play Again
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.screen.goToNextFloor && (
                    <div className="show-floor-options">
                      <div
                        className="floor-choice"
                        onClick={this.handleGoToNextFloor}
                      >
                        Go TO Next Floor
                      </div>
                      <div
                        className="floor-choice"
                        onClick={this.handleCancelGoingToNextFloor}
                      >
                        Cancel
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-2 inventory">
                  <Inventory
                    playerInventory={this.state.player.playerInventory}
                    onInventoryClick={this.handleInventoryClick}
                  />
                </div>
              </div>
            )}
            <div className="row third-row">
              <div className="col-3"></div>
              <div className="col-6">
                <textarea
                  value={this.state.chatMessage}
                  disabled
                  rows="4"
                  id="chat_id"
                  className="chatbox"
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
