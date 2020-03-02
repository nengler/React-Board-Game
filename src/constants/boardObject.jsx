export class boardObject {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(width * height).fill("");
    this.bossPosition = 0;
  }

  changeBoardSquare(square, index) {
    this.board[index] = square;
  }

  setBossPosition(position) {
    this.bossPosition = position;
  }
}
