import Snake from './Snake'
import Food from './Food'

const width = document.getElementById('snake-game').width;
const height = document.getElementById('snake-game').height;
const cellWidth = 10;

const scoreMultiple = 50;

let direction = 'right';
let score = 0;

export default function initializeGame() {
  let canvasContext = createSnakeCanvas();

  let snake = new Snake();
  let food = new Food(width, height, cellWidth);

  let paintInterval = setInterval(() => {
    paintCanvas(snake, food, canvasContext)
  }, 100);
}

function createSnakeCanvas() {
  const canvas = document.getElementById('snake-game');
  const canvasContext = canvas.getContext('2d');

  return canvasContext;
}

function paintCanvas(snake, food, canvasContext) {
  // need to paint to avoid snake trail
  canvasContext.fillStyle = 'orange';
  canvasContext.fillRect(0, 0, width, height);

  snake.move(direction);

  let collision = checkCollision(snake)


  const snakeBody = snake.body;
  for (let i = 0; i < snakeBody.length; i++) {
    const cell = snakeBody[i];
    paintCell(canvasContext, cell.xCoordinate, cell.yCoordinate, 'purple');
  }

  paintCell(canvasContext, food.xCoordinate, food.yCoordinate, 'grey');
}

function checkCollision(snake) {
  console.log('out of bounds', outOfBounds(snake.head));
  console.log('hitting itself', hittingItself(snake));

  return outOfBounds(snake.head) && hittingItself(snake)
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
    if (cell.xCoordinate === snakeHead.xCoordinate && cell.yCoordinate === snakeHead.yCoordinate) {
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

document.addEventListener('keydown', setDirection);

// belongs in own file
const keyMap = {
  'ArrowDown': 'down',
  'ArrowUp': 'up',
  'ArrowRight': 'right',
  'ArrowLeft': 'left',

  // VimStyle
  'j': 'down',
  'k': 'up',
  'l': 'right',
  'h': 'left'
};

const opposingDirectionMap = {
  'right': 'left',
  'left': 'right',
  'up': 'down',
  'down': 'up'
};

function setDirection({key}) {
  console.log('key', key);
  let newDirection = keyMap[key]
  if (validNewDirection(newDirection)) {
    direction = newDirection;
    console.log('setting new direction', direction)
  }
}

function validNewDirection(newDirection) {
  return newDirection && (opposingDirectionMap[newDirection] !== direction);
}
