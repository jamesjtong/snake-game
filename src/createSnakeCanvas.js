export default function createSnakeCanvas() {
  const canvas = document.getElementById('snake-game');
  const canvasContext = canvas.getContext('2d');

  return canvasContext;
}

