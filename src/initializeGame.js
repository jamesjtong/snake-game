import Snake from './Snake';
import Food from './Food';
import setDirection from './setDirection';
import checkCollision from './checkCollision';
import paintCell from './paintCell';
import createSnakeCanvas from './createSnakeCanvas';

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
  intervalId: null,
  paused: false,
  speed: 7
};

export default function initializeGame() {
  gameState.snake = new Snake();
  gameState.food = new Food(gameSettings);
  gameState.canvasContext = createSnakeCanvas();
  addUserInteractivity(gameState);

  // START GAME HERE
  gameState.intervalId = window.setInterval(startGameLoop, gameState.speed * 20);
}

function startGameLoop() {
  if (!gameState.paused) {
    gameLoop(gameState)
  }
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

function addUserInteractivity(gameState) {
  document.addEventListener('keydown', event => setDirection(event, gameState));
  document.getElementById('pause-button').addEventListener('click', event => {
    gameState.paused = true;
  });
  document.addEventListener('keydown', ({ key }) => {
    if (key === " ") {
      gameState.paused = !gameState.paused;
    }
  });
  document.getElementById('play-button').addEventListener('click', event => {
    gameState.paused = false;
  });
  document.getElementById('speed-up-button').addEventListener('click', event => {
    window.clearInterval(gameState.intervalId);
    gameState.speed--;
    gameState.intervalId = window.setInterval(startGameLoop, gameState.speed * 20);
  });

  document.getElementById('slow-down-button').addEventListener('click', event => {
    window.clearInterval(gameState.intervalId);
    gameState.speed++;
    gameState.intervalid = window.setInterval(startGameLoop, gameState.speed * 20);
  });
}
