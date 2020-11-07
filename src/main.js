var gameBoard = document.querySelector('#gameboard');
var newGameButton = document.querySelector(`#new-game`);

var game = new Game();

//Event Listeners
newGameButton.addEventListener('click', startGame);
gameBoard.addEventListener('click', makeMove);

//Event Handlers

function startGame() {
  game.resetBoard();
  var board = game.gameBoard;
  var squares = Object.keys(board);
  displayUpdatedBoard(board, squares);
  var playerOne = new Player(`🍎`);
  var playerTwo = new Player(`🍊`);
  game.assignPlayers(playerOne, playerTwo);
  toggleNewGameButton();
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
  console.log(`Game Over! ${winner} has it.`)
  toggleNewGameButton();
};

function toggleNewGameButton() {
  newGameButton.classList.toggle('hidden');
}
