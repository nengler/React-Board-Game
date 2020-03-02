export class boardObject {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(width * height).fill("");
  }

  changeBoardSquare(square, index) {
    this.board[index] = square;
  }
}
