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

  // canvasContext.fillStyle = 'orange';
  // canvasContext.fillRect(0, 0, width, height);
  // canvasContext.strokeStyle = 'black';
  // canvasContext.strokeRect(0, 0, width, height);

  return canvasContext;
}

function paintCanvas(snake, food, canvasContext) {
  // need to paint to avoid snake trail
  canvasContext.fillStyle = 'orange';
  canvasContext.fillRect(0, 0, width, height);
  

  const snakeBody = snake.body;

  // console.log('snakeBody', snakeBody);
  // let newX = snakeBody[0].xCoordinate;
  // let newY = snakeBody[0].yCoordinate;

  snakeBody.shift();
  const oldHead = snakeBody[snakeBody.length-1];
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
  snakeBody.push(newHead);

  // snake.shiftBody(direction);
  // check for collision
  //

  // paint cell
  //

  for (let i = 0; i < snakeBody.length; i++) {
    const cell = snakeBody[i];
    paintCell(canvasContext, cell.xCoordinate, cell.yCoordinate, 'purple');
  }

  // debugger
  // paintFood (make sure snake isn't in it)
  paintCell(canvasContext, food.xCoordinate, food.yCoordinate, 'grey');
}

function checkForCollision() {

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
  // console.log('key', key);
  let newDirection = keyMap[key]
  if (validNewDirection(newDirection)) {
    direction = newDirection;
    console.log('setting new direction', direction)
  }
}

function validNewDirection(newDirection) {
  return newDirection && (opposingDirectionMap[newDirection] !== direction);
}
