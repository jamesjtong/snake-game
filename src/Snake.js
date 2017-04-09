export default class Snake {
  constructor(length = 4) {
    this.length = length;
    this.body = [];

    for (let i = 0; i < length; i++) {
      this.body.push({
        xCoordinate: i + 1,
        yCoordinate: 0
      });
    }
  }

  eatFood(food) {
    this.length += food.length
  }

  shiftBody(direction) {
    for (let cell of this.body) {
      if (direction === 'right') {
        cell.xCoordinate++
      }
    }
  }
}
