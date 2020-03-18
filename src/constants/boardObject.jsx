export class boardObject {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(width * height).fill("");
    this.bossPosition = 0;
    this.level = 1;
  }

  changeBoardSquare(square, index) {
    this.board[index] = square;
  }

  setBossPosition(position) {
    this.bossPosition = position;
  }

  increaseLevel() {
    this.level += 1;
    this.increaseDimensions();
  }

  increaseDimensions() {
    if (this.level === 2) {
      this.width = 7;
      this.height = 5;
    } else if (this.level === 3) {
      this.width = 7;
      this.height = 7;
    } else if (this.level === 4) {
      this.width = 9;
      this.height = 7;
    }
  }
}
