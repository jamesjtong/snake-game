export default function paintCell(canvasContext, xCoordinate, yCoordinate, color, gameSettings) {
  const rectArguments = [
    xCoordinate*gameSettings.cellWidth,
    yCoordinate*gameSettings.cellWidth,
    gameSettings.cellWidth,
    gameSettings.cellWidth
  ];
  canvasContext.fillStyle = color;
  canvasContext.fillRect(...rectArguments);

  canvasContext.strokeStyle = 'red';
  canvasContext.strokeRect(...rectArguments);
}
