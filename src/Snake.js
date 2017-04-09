export default class Snake {
  constructor(length = 5) {
    this.length = length;
    this.body = [];

    for (let i = 0; i < length; i++) {
      this.body.push({
        xCoordinate: i + 1,
        yCoordinate: 0
      });
    }
  }

  eat() {
    this.length++
  }

  move(globalsObject, successFn) {
    let { direction, food } = globalsObject;


    const oldHead = this.head;
    const newHead = Object.assign({}, oldHead)

    if (direction == 'right') {
      newHead.xCoordinate++;
    } else if(direction === 'left') {
      newHead.xCoordinate--;
    } else if(direction === 'up') {
      newHead.yCoordinate--;
    } else if(direction === 'down') {
      newHead.yCoordinate++;
    }
    

    if (newHead.xCoordinate === food.xCoordinate && newHead.yCoordinate === food.yCoordinate) {
      let oldTail = this.body[0];
      let newTail = Object.assign({}, oldTail)

      if (direction == 'right') {
        newTail.xCoordinate--;
      } else if(direction == 'left') {
        newTail.xCoordinate++;
      } else if(direction == 'up') {
        newTail.yCoordinate++;
      } else if(direction == 'down') {
        newTail.yCoordinate--;
      }
      this.body.unshift(newTail);
      successFn();

    } else {
      this.body.shift();
      this.body.push(newHead);
    }
  }

  get head() {
    return this.getHead();
  }

  getHead() {
    return this.body[this.body.length - 1];
  }
}
