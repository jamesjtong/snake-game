export default function checkCollision(snake, gameSettings) {
  return outOfBounds(snake.head, gameSettings) || hittingItself(snake)
}

function outOfBounds({ xCoordinate, yCoordinate }, { width, height, cellWidth }) {
  if (xCoordinate < -1 || (xCoordinate >= (width/cellWidth - 1))) {
    return true;
  } else if (yCoordinate < -1 || (yCoordinate >= (height/cellWidth - 1))) {
    return true;
  } else {
    return false;
  }
}

function hittingItself(snake) {
  const bodyWithoutHead = snake.body.slice(0,-1)
  const snakeHead = snake.head;

  for (let cell of bodyWithoutHead) {
    if (cell.xCoordinate === snakeHead.xCoordinate &&
        cell.yCoordinate === snakeHead.yCoordinate) {
      return true
    }
  }

  return false;
}
