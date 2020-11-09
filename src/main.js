var gameBoard = document.querySelector('#gameboard');
var newGameButton = document.querySelector(`#new-game`);
var gameCommentary = document.querySelector(`#game-commentary`);
var playerOneWinsTally = document.querySelector(`#player-one-wins`);
var playerTwoWinsTally = document.querySelector(`#player-two-wins`);
var getStartedButton = document.querySelector(`#get-started`);
var gameCustomizationForm = document.querySelector(`#game-customization-form`);
var submitCustomizationsButton = document.querySelector('.submit-customizations');
var squares = document.querySelectorAll(`.game-board-square`);
var gameBox = document.querySelector('.hide-box');
var welcomeMessage = document.querySelector('.welcome');
var welcomeInstructions = document.querySelector('.welcome-instructions');
var gameBox = document.querySelector('.gameboard-hide-box');
var playerOneHeading = document.querySelector('#player-one-token');
var playerTwoHeading = document.querySelector('#player-two-token');
var game = {};

//Event Listeners
newGameButton.addEventListener('click', startGame);
gameBoard.addEventListener('click', makeMove);
getStartedButton.addEventListener('click', showCustomizationOptions);
submitCustomizationsButton.addEventListener('click', startPlay);

//Event Handlers
function showCustomizationOptions() {
  gameCustomizationForm.showModal();
}


function startPlay () {
  gameCustomizationForm.close();
  getStartedButton.hidden = true;
  welcomeMessage.hidden = true;
  welcomeInstructions.hidden = true;
  createGame();
  openGameBoard();
}

function createGame() {
  game = new Game();
  var playerOne = new Player(`🍎`, 'playerOne');
  var playerTwo = new Player(`🍊`, 'playerTwo');
  game.assignPlayers(playerOne, playerTwo);
}

function openGameBoard() {
  gameBox.hidden = false;
  playerOneHeading.hidden = false;
  playerTwoHeading.hidden = false;
  playerOneWinsTally.hidden = false;
  playerTwoWinsTally.hidden = false;
  setTheme();
  var board = game.gameBoard;
  var squares = Object.keys(board);
  displayUpdatedBoard(board, squares);
}

function setTheme() {

}

function startGame() {
  gameBoard.classList.add('reset-board');
  gameBoard.classList.add('spin-board');
  newGameButton.classList.toggle('spin-button');
  game.resetBoard();
  gameCommentary.innerText = '';
  var board = game.gameBoard;
  var squares = Object.keys(board);
  displayUpdatedBoard(board, squares);
  //toggleNewGameButton();
};


function makeMove() {
  newGameButton.hidden = false;
  var board = game.gameBoard;
  var squares = Object.keys(board);
  gameBoard.classList.remove('reset-board');
  gameBoard.classList.remove('spin-board');
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
