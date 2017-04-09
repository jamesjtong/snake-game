import Snake from './Snake';
import Food from './Food';
import setDirection from './setDirection';
import checkCollision from './checkCollision';

const gameSettings = {
  width: document.getElementById('snake-game').width,
  height: document.getElementById('snake-game').height,
  cellWidth: 10
};

const scoreMultiple = 50;

// used to pass changeable state around
let globalsObject = {
  direction: 'right',
  score: 0,
  food: null,
  snake: null
};

export default function initializeGame() {
  let canvasContext = createSnakeCanvas();

  globalsObject.snake = new Snake();
  globalsObject.food = new Food(gameSettings);

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
  canvasContext.fillRect(0, 0, gameSettings.width, gameSettings.height);

  paintCell(canvasContext, food.xCoordinate, food.yCoordinate, 'grey');

  const snakeBody = snake.body;
  for (let i = 0; i < snakeBody.length; i++) {
    const cell = snakeBody[i];
    paintCell(canvasContext, cell.xCoordinate, cell.yCoordinate, 'purple');
  }

  snake.move(globalsObject, successFn);

  let collision = checkCollision(snake, gameSettings)

  if (collision) {
    resetGame(globalsObject);
  }
}

function successFn() {
  globalsObject.score++;
    globalsObject.food = new Food(gameSettings);
}

function resetGame(globalsObject) {
  globalsObject.direction = 'right';
  globalsObject.score = 0;
  globalsObject.snake = new Snake();
  globalsObject.food = new Food(gameSettings);
}


// belongs in own file
function paintCell(canvasContext, xCoordinate, yCoordinate, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(xCoordinate*gameSettings.cellWidth,
    yCoordinate*gameSettings.cellWidth,
    gameSettings.cellWidth,
    gameSettings.cellWidth
  );
}

document.addEventListener('keydown', (event) => {
  setDirection(event, globalsObject)
});
