var gameBoard = document.querySelector('.game-board');

var game = new Game();
var playerOne = new Player(`🍎`);
var playerTwo = new Player(`🍊`);
game.assignPlayers(playerOne, playerTwo);

//Event Listeners
gameBoard.addEventListener('click', makeMove);

//Event Handlers
function makeMove() {
  var boardData = game.gameBoard;
  game.updateGameBoard(event, boardData);
  // displayUpdatedBoard(boardData);
  // game.checkForWinner();
  // game.checkForDraw();
};


//helpers that update DOM
function displayUpdatedBoard(boardData) {
  var board = game.gameBoard;
  var boardSquares = Object.keys(board);
  for (var i = 0; i < boardSquares.length; i++) {
    var squareNumber = boardSquares[i];
    var square = board.squareKey;
    var squareDisplay = document.querySelector(`#${squareNumber}`);
    displayTokenInSquare(square, squareDisplay);
  }
};

function displayTokenInSquare(data, display) {
  if (data) {
    display.innerText = game.playerOne.token;
  } else if (!data) {
    display.innerText = game.playerTwo.token;
  }
};
