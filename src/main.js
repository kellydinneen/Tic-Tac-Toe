var gameBoard = document.querySelector('#gameboard');
var newGameButton = document.querySelector(`#new-game`);
var gameCommentary = document.querySelector(`#game-commentary`);

var game = new Game();
var playerOne = new Player(`🍎`);
var playerTwo = new Player(`🍊`);
game.assignPlayers(playerOne, playerTwo);

//Event Listeners
newGameButton.addEventListener('click', startGame);
gameBoard.addEventListener('click', makeMove);

//Event Handlers

function startGame() {
  game.resetBoard();
  gameCommentary.innerText = '';
  var board = game.gameBoard;
  var squares = Object.keys(board);
  displayUpdatedBoard(board, squares);
  //toggleNewGameButton();
}


function makeMove() {
  var board = game.gameBoard;
  var squares = Object.keys(board);
  game.updateGameBoard(event, board, squares);
  displayUpdatedBoard(board, squares);
  checkGameOutcome(board, squares);
};

//helpers that update DOM
function displayUpdatedBoard(board, squares) {
  for (var i = 0; i < squares.length; i++) {
    var squareDisplay = document.querySelector(`#${squares[i]}`);
    squareDisplay.innerText = board[`${squares[i]}`];
  }
};

function checkGameOutcome(board, squares) {
  game.checkForWinner(board);
  if (game.winner != undefined) {
    announceWinner(game.winner.token);
    game.saveWin();
  } else if (game.checkForCatsGame(board, squares)) {
    announceWinner("The CAT");
  } else {
    game.toggleTurn();
  }
};

function announceWinner(winner) {
  gameCommentary.innerText = (`Game Over! ${winner} has it.`)
  toggleNewGameButton();
};

function toggleNewGameButton() {
  newGameButton.classList.toggle('hidden');
}
