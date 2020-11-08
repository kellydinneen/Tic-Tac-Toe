var gameBoard = document.querySelector('#gameboard');
var newGameButton = document.querySelector(`#new-game`);
var gameCommentary = document.querySelector(`#game-commentary`);
var playerOneWinsTally = document.querySelector(`#player-one-wins`);
var playerTwoWinsTally = document.querySelector(`#player-two-wins`);
var squares = document.querySelectorAll(`.game-board-square`);

var game = new Game();
var playerOne = new Player(`🍎`, 'playerOne');
var playerTwo = new Player(`🍊`, 'playerTwo');
game.assignPlayers(playerOne, playerTwo);

//Event Listeners
newGameButton.addEventListener('click', startGame);
gameBoard.addEventListener('click', makeMove);

//Event Handlers

function startGame() {
  newGameButton.classList.toggle('spin');
  game.resetBoard();
  gameCommentary.innerText = '';
  var board = game.gameBoard;
  var squares = Object.keys(board);
  displayUpdatedBoard(board, squares);
  //toggleNewGameButton();
};


function makeMove() {
  var board = game.gameBoard;
  var squares = Object.keys(board);
  if (checkIfSquareIsAvailable(event)) {
    game.updateGameBoard(event, board, squares);
    checkGameOutcome(board, squares);
    displayUpdatedBoard(board, squares);
  }
};

function checkIfSquareIsAvailable(event) {
  if (event.target.innerText === '') {
    return true;
  } else {
    return false;
  }
}''

//helpers that update DOM
function displayUpdatedBoard(board, squares) {
  for (var i = 0; i < squares.length; i++) {
    var squareDisplay = document.querySelector(`#${squares[i]}`);
    squareDisplay.innerText = board[`${squares[i]}`];
  }
  toggleSquareHighlightColor();
};

function toggleSquareHighlightColor() {
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].innerText === "" && game.gameOver === false) {
      squares[i].classList.add(`${game.turn.name}Color`);
      squares[i].classList.remove(`${game.nextPlayer.name}Color`);
    } else {
      squares[i].classList.remove('playerOneColor');
      squares[i].classList.remove('playerTwoColor');
    }
  }
};

function checkGameOutcome(board, squares) {
  game.checkForWinner(board);
  if (game.winner != undefined) {
    game.saveWin();
    announceWinner(game.winner.token);
  } else if (game.checkForCatsGame(board, squares)) {
    announceWinner("The CAT");
  } else {
    game.toggleTurn();
  }
};

function announceWinner(winner) {
  gameCommentary.innerText = (`Game Over! ${winner} has it.`);
  playerOneWinsTally.innerText = `Wins: ${game.playerOne.wins.length}`;
  playerTwoWinsTally.innerText = `Wins: ${game.playerTwo.wins.length}`

  //toggleNewGameButton();
};

// function toggleNewGameButton() {
//   newGameButton.classList.toggle('hidden');
// }
