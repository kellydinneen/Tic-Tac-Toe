var gameBoard = document.querySelector('.game-board');

var game = new Game();
var playerOne = new Player(`🍎`);
var playerTwo = new Player(`🍊`);
game.assignPlayers(playerOne, playerTwo);

//Event Listeners
gameBoard.addEventListener('click', makeMove);

//Event Handlers
function makeMove() {
  game.updateGameBoard(event);
  game.checkForWinner();
  game.checkForDraw();
  displayUpdatedBoard();
};


//helpers that update DOM
function displayUpdatedBoard() {
  var board = game.gameBoard;
  for (var i = 0; i < board.length; i++) {
    var square = board.board.key[i];
    var squareDisplay = document.querySelector(`#${board.key[i]}`);
    displayTokenInSquare(square, squareDisplay);
  }
};

function displayTokenInSquare(data, display) {
  if (data) {
    display.innerText = game.playerOne.token;
  } else if (!data) {
    display.innerText = game.playerTwo.token;
  } else if (data === undefined) {
    display.innerText = '';
  }
};
