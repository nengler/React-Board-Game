import React, { Component } from "react";
import GameBoard from "./gameBoard";
import Player from "./player";
import TreasureChest from "./treasureChest";
import Inventory from "./inventory";
import Shop from "./shop";
import DiscardCard from "./discardCard";
import { potions } from "../constants/itemConstants";
import FightBoard from "./fightBoard";
import { enemies, bosses } from "../constants/monsters";
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

/*
TODO:
add boss reword
add monster reword
if player has more than 4 cards in hand
random events
*/

class Game extends Component {
  state = {
    player: player,
    enemiesContainer: null,
    currentEnemy: null,
    screen: screen,
    gameBoard: null,
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
    let stepDirections = this.createDirections(
      direction,
      gameBoard.width,
      gameBoard.height
    );
    let position = (gameBoard.board.length - 1) / 2;
    stepDirections.forEach(step => {
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
    activitiesObject.addToArrayXTimes(" ", 2);
    activitiesObject.addToArrayXTimes("?", 2);
    activitiesObject.addToArrayXTimes("🗡️", 4);
    activitiesObject.addToArrayXTimes("💰", 2);
    bigActivities = this.randomizer(bigActivities);
    primaryDirections.forEach(direction => {
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
    enemiesContainer.addMonsters(enemies);
    enemiesContainer.addBosses(bosses);
    const itemsArray = [...playerMoveArray, ...weaponArray];
    treasure.itemsToAddToTreasure(itemsArray);
    shop.itemsToAddToShop(itemsArray);
    screen.moveCharacter();
    let gameBoard = new boardObject(5, 7);
    player.playerPosition = (gameBoard.board.length - 1) / 2;
    gameBoard = this.createFloor(gameBoard);
    this.setState({
      screen,
      treasure,
      shop,
      player,
      gameBoard,
      enemiesContainer
    });
  };

  addToChatBox = message => {
    let chatMessage = this.state.chatMessage;
    chatMessage += message + "\n";
    this.setState({ chatMessage }, () => {
      try {
        var textarea = document.getElementById("chat_id");
        textarea.scrollTop = textarea.scrollHeight;
      } catch {}
    });
  };

  handleSquareProperty = square => {
    let player = this.state.player;
    let screen = this.state.screen;
    let enemiesContainer = this.state.enemiesContainer;
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
      case "🗡️":
        screen.fightScreen();
        let currentEnemy = enemiesContainer.getMonster(
          this.state.player.getCurrentLevel()
        );
        currentEnemy.currentHealth = currentEnemy.maxHealth;
        this.setState({ currentEnemy, screen });
        break;
      case "🎊":
        screen.showRewads();
        this.addToChatBox("Player found lootations ");
        this.setState({ screen });
        break;
      case "🛒":
        screen.showShop();
        this.addToChatBox("Player found a shop");
        this.setState({ screen });
        break;
      case "🛏️":
        player.fullHeal();
        this.addToChatBox("player healed to full");
        this.setState({ screen });
        break;
      case "⚔️":
        screen.fightScreen();
        let boss = enemiesContainer.getBoss(
          this.state.player.getCurrentLevel()
        );
        boss.currentHealth = boss.maxHealth;
        this.setState({ currentEnemy: boss, screen });
        break;
      case "🚪":
        console.log("heyo");
        break;
      default:
        break;
    }
  };

  checkIfLegalMovement = (proposedPosition, playerPosition, square) => {
    console.log("init");
    if (
      (proposedPosition === playerPosition + 1 ||
        proposedPosition === playerPosition - 1 ||
        proposedPosition === playerPosition + this.state.gameBoard.width ||
        proposedPosition === playerPosition - this.state.gameBoard.width) &&
      square !== ""
    ) {
      return true;
    }
    console.log("false");
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

  checkIfLegalSquare = position => {
    let gameBoard = this.state.gameBoard;
    if (position < 0 || position >= gameBoard.board.length) {
      return false;
    } else if (gameBoard.board[position] === "") {
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

      //ADD BACK INNNNNNNNNN
      this.addToChatBox("Player was hit for " + block * -1 + " damage");
    } else {
      this.addToChatBox("Player blocked all damage");
    }
    let isPlayerDead = this.checkIfDead(player.currentHealth);
    if (isPlayerDead) {
      let screen = this.state.screen;
      screen.characterDeath();
      player.handlePlayerDeath();
      this.setState({ screen, player, currentEnemy });
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

  handleDiscard = moveToDiscard => {
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
    let shop = this.state.shop;
    let screen = this.state.screen;
    screen.discardCard();
    shop.stillInShop();
    this.setState({ shop, screen });
  }

  handleTreasureClick = treasureItem => {
    let player = this.state.player;
    let screen = this.state.screen;
    let treasure = this.state.treasure;
    if (
      treasureItem.constructor.name === "Attack" ||
      treasureItem.constructor.name === "Block"
    ) {
      player.addMove(treasureItem);
      if (player.playerMoves.length > 4) {
        this.handlePlayerInventory();
      }
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
          player.changeWeapon(shopItem);
          break;
        default:
          break;
      }
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
                />
              </div>
            </div>
            {this.state.screen.characterFighting ||
            this.state.screen.characterDiscardCard ? (
              <div className="row">
                <div className="col-12 fightBoard-div">
                  {this.state.screen.characterFighting && (
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
                        gameBoard={this.state.gameBoard.board}
                        boardWidth={this.state.gameBoard.width}
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
