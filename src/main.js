var gameBoard = document.querySelector('.game-board');

var game = new Game();
var playerOne = new Player(`🍎`);
var playerTwo = new Player(`🍊`);
game.assignPlayers(playerOne, playerTwo);

//Event Listeners
gameBoard.addEventListener('click', makeMove);

//Event Handlers
function makeMove() {
  var board = game.gameBoard;
  var squares = Object.keys(board);
  game.updateGameBoard(event, board, squares);
  displayUpdatedBoard(board, squares);
  // game.checkForWinner();
  // game.checkForDraw();
  game.toggleTurn();
};


//helpers that update DOM
function displayUpdatedBoard(board, squares) {
  for (var i = 0; i < squares.length; i++) {
    var squareKey = squares[i];
    var squareValue = board[`${squareKey}`];
    var squareDisplay = document.querySelector(`#${squareKey}`);
    displayPlayerTokenInSquare(squareValue, squareDisplay);
  }
};

function displayPlayerTokenInSquare(playerOneHasSquare, display) {
  if (playerOneHasSquare === undefined) {
    display.innerText = '';
  } else if (playerOneHasSquare) {
    display.innerText = game.playerOne.token;
  } else if (!playerOneHasSquare) {
    display.innerText = game.playerTwo.token;
  }
};
