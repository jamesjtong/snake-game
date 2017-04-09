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
    this.body.shift();
    const oldHead = this.body[this.body.length-1];
    const newHead = Object.assign({}, oldHead)

    if (direction == 'right') {
      newHead.xCoordinate++;
    } else if(direction == 'left') {
      newHead.xCoordinate--;
    //   newX--;
    } else if(direction == 'up') {
    //   newY--;
      newHead.yCoordinate--;
    } else if(direction == 'down') {
      newHead.yCoordinate++;
    //   newY++;
    }
    this.body.push(newHead);

  }
}
