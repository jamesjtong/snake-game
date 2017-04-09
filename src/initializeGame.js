import Snake from './Snake'
import Food from './Food'
import setDirection from './setDirection'

const width = document.getElementById('snake-game').width;
const height = document.getElementById('snake-game').height;
const cellWidth = 10;

const scoreMultiple = 50;

// used to pass state around
let globalsObject = {
  direction: 'right',
  score: 0,
  food: null,
  snake: null
};

export default function initializeGame() {
  let canvasContext = createSnakeCanvas();

  globalsObject.snake = new Snake();
  globalsObject.food = new Food(width, height, cellWidth);

  let paintInterval = setInterval(() => {
    paintCanvas(globalsObject, canvasContext)
  }, 100);
}

function createSnakeCanvas() {
  const canvas = document.getElementById('snake-game');
  const canvasContext = canvas.getContext('2d');

  return canvasContext;
}

function paintCanvas({ snake, food }, canvasContext) {
  // need to paint to avoid snake trail
  canvasContext.fillStyle = 'orange';
  canvasContext.fillRect(0, 0, width, height);


  let collision = checkCollision(snake)

  console.log('collision val', collision);
  if (collision) {
    console.log('collision')
    resetGame(globalsObject);
  }


  const snakeBody = snake.body;
  for (let i = 0; i < snakeBody.length; i++) {
    const cell = snakeBody[i];
    paintCell(canvasContext, cell.xCoordinate, cell.yCoordinate, 'purple');
  }

  paintCell(canvasContext, food.xCoordinate, food.yCoordinate, 'grey');

  snake.move(globalsObject);
}

function resetGame(globalsObject) {
  console.log('resetting game');
  globalsObject.direction = 'right';
  globalsObject.score = 0;
  globalsObject.snake = new Snake();
  globalsObject.food = new Food();

}

function checkCollision(snake) {
  console.log('out of bounds', outOfBounds(snake.head));
  console.log('hitting itself', hittingItself(snake));

  return outOfBounds(snake.head) || hittingItself(snake)
}

function outOfBounds({ xCoordinate, yCoordinate }) {
  console.log(xCoordinate)
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

// belongs in own file
function paintCell(canvasContext, xCoordinate, yCoordinate, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(xCoordinate*cellWidth,
    yCoordinate*cellWidth,
    cellWidth,
    cellWidth
  );
}

document.addEventListener('keydown', (event) => {
  setDirection(event, globalsObject)
});
