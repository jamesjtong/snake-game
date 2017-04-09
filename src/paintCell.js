export default function paintCell(canvasContext, xCoordinate, yCoordinate, color, gameSettings) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(xCoordinate*gameSettings.cellWidth,
    yCoordinate*gameSettings.cellWidth,
    gameSettings.cellWidth,
    gameSettings.cellWidth
  );
}
