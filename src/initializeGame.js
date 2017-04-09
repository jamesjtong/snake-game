import Snake from './Snake';
import Food from './Food';
import setDirection from './setDirection';
import checkCollision from './checkCollision';
import paintCell from './paintCell';

const gameSettings = {
  width: document.getElementById('snake-game').width,
  height: document.getElementById('snake-game').height,
  cellWidth: 10
};

const scoreMultiple = 50;
const squareSpaceBlack = '#121212';

// used to pass changeable state around
const gameState = {
  direction: 'right',
  score: 0,
  food: null,
  snake: null,
  paused: false
};

export default function initializeGame() {
  document.addEventListener('keydown', event => setDirection(event, gameState));

  gameState.snake = new Snake();
  gameState.food = new Food(gameSettings);
  gameState.canvasContext = createSnakeCanvas();

  let paintInterval = setInterval(() => {
    gameLoop(gameState)
  }, 100);


  document.getElementById('pause-button').addEventListener('click', event => {
    clearInterval(paintInterval);
    gameState.paused = true;
  })

  document.addEventListener('keydown', ({ key }) => {
    if (key === " ") {
      if (gameState.paused === false) {
        clearInterval(paintInterval);
        gameState.paused = true;
      } else {
        paintInterval = setInterval(() => gameLoop(gameState), 100);
        gameState.paused = false;
      }
    }
  })

  document.getElementById('play-button').addEventListener('click', event => {
    paintInterval = setInterval(() => gameLoop(gameState), 100);
    gameState.paused = false;
  })
}

function createSnakeCanvas() {
  const canvas = document.getElementById('snake-game');
  const canvasContext = canvas.getContext('2d');

  return canvasContext;
}

function gameLoop(gameState) {
  const { snake, food, canvasContext } = gameState;

  // need to repaint over snake trail
  canvasContext.fillStyle = squareSpaceBlack;
  canvasContext.fillRect(0, 0, gameSettings.width, gameSettings.height);

  paintCell(canvasContext, food.xCoordinate, food.yCoordinate, 'grey', gameSettings);

  const snakeBody = snake.body;
  for (let i = 0; i < snakeBody.length; i++) {
    const cell = snakeBody[i];
    paintCell(canvasContext, cell.xCoordinate, cell.yCoordinate, 'white', gameSettings);
  }

  snake.move(gameState, successFn);

  const collision = checkCollision(snake, gameSettings)

  if (collision) {
    resetGame(gameState);
  }
  updateScore(gameState);
}

function successFn(gameState) {
  gameState.score++;
  gameState.food = new Food(gameSettings);
}

function updateScore({ score, canvasContext }) {
  const { width, height, cellWidth } = gameSettings;
  canvasContext.fillText(`SCORE ${score*scoreMultiple}`, width - 100, 50 )
}

function resetGame(gameState) {
  gameState.direction = 'right';
  gameState.score = 0;
  gameState.snake = new Snake();
  gameState.food = new Food(gameSettings);
}
