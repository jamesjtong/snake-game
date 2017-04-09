export default class Snake {
  constructor(length = 20) {
    this.length = length;
    this.body = [];

    for (let i = 0; i < length; i++) {
      this.body.push({
        xCoordinate: i + 1,
        yCoordinate: 0
      });
    }
  }

  eat(food) {
    this.length += food.length
  }

  move({ direction, food: {} }) {
    this.body.shift();
    const oldHead = this.body[this.body.length-1];
    const newHead = Object.assign({}, oldHead)

    if (direction == 'right') {
      newHead.xCoordinate++;
    } else if(direction == 'left') {
      newHead.xCoordinate--;
    } else if(direction == 'up') {
      newHead.yCoordinate--;
    } else if(direction == 'down') {
      newHead.yCoordinate++;
    }
    this.body.push(newHead);
  }

  get head() {
    return this.getHead();
  }

  getHead() {
    return this.body[this.length - 1];
  }
}
