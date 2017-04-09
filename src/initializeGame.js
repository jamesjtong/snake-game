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
  }, 50);
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
  canvasContext.fillStyle = "orange";
  canvasContext.fillRect(0, 0, width, height);
  

  let snakeBody = snake.body;

  // console.log('snakeBody', snakeBody);
  // let newX = snakeBody[0].xCoordinate;
  // let newY = snakeBody[0].yCoordinate;

  // if (direction == 'right') {
  //   snakeBody[0].xCoordinate++
  // } else if(direction == 'left') {
  //   newX--;
  // } else if(direction == 'up') {
  //   newY--;
  // } else if(direction == 'down') {
  //   newY++;
  // }

  snake.shiftBody(direction);
  // check for collision
  //

  // paint cell
  //

  for (let i = 0; i < snakeBody.length; i++) {
    let cell = snakeBody[i];
    //Lets paint 10px wide cells
    paintCell(canvasContext, cell.xCoordinate, cell.yCoordinate, 'purple');
  }

  // debugger
  // paintFood (make sure snake isn't in it)
  console.log('adding food');
  paintCell(canvasContext, food.xCoordinate, food.yCoordinate, 'grey');
}

function checkForCollision() {

}

// belongs in own file
function paintCell(canvasContext, xCoordinate, yCoordinate, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(xCoordinate*cellWidth,
    yCoordinate*cellWidth,
    cellWidth
    cellWidth
  );
}
