var gameBoard = document.querySelector('.game-board');
var game = new Game();

//Event Listeners
gameBoard.addEventListener('click', makeMove)

//Event Handlers
makeMove() {
  game.updateGameBoard(event);
  game.checkForWinner();
  game.checkForDraw();
  displayUpdatedBoard();
}

//helpers that update DOM
function displayUpdatedBoard() {
  for (var i = 0; i < game.gameboard.length; i++) {
    
  }
}
