export default function setDirection({key}, gameState) {
  let newDirection = keyMap[key]
  if (validNewDirection(newDirection, gameState.direction)) {
    gameState.direction = newDirection;
  }
}

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


function validNewDirection(newDirection, direction) {
  return newDirection && (opposingDirectionMap[newDirection] !== direction);
}
