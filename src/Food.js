export default class Food {
  constructor(xMax, yMax, cellWidth) {
    this.xCoordinate = Math.round(Math.random() * (xMax-cellWidth)/cellWidth);
    this.yCoordinate = Math.round(Math.random() * (yMax-cellWidth)/cellWidth);

    // so that food never starts on the same row as the snake
    this.adjustYcoordinate();
  }

  adjustYcoordinate() {
    if (this.yCoordinate === 0) {
      this.yCoordinate++
    }

  }
}
