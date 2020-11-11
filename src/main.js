var page = document.querySelector('body');
var gameBoard = document.querySelector('#gameboard');
var newGameButton = document.querySelector(`#new-game`);
var gameCommentary = document.querySelector(`#game-commentary`);
var customizePlayButton = document.querySelector(`#customize-play`);
var gameCustomizationForm = document.querySelector(`#game-customization-window`);
var submitCustomizationsButton = document.querySelector('.submit-customizations');
var squareElements = document.querySelectorAll(`.game-board-square`);
var welcomeMessage = document.querySelector('.welcome');
var welcomeInstructions = document.querySelector('.welcome-instructions');
var gameBox = document.querySelector('.gameboard-hide-box');
var playerOneWinsTally = document.querySelector(`#player-one-wins`);
var playerTwoWinsTally = document.querySelector(`#player-two-wins`);
var playerOneHeading = document.querySelector('#player-one-token');
var playerTwoHeading = document.querySelector('#player-two-token');
var playerOneSidebar = document.querySelector("#player-one-sidebar");
var playerTwoSidebar = document.querySelector("#player-two-sidebar");
var instructionsHeading = document.querySelector('#instructions-heading');
var gameInstructions = document.querySelector('#game-instructions');


var gameRulesOptions = document.getElementsByName("game");
var gameThemeOptions = document.getElementsByName("theme");
var game = {};

//Event Listeners
newGameButton.addEventListener('click', startGame);
gameBoard.addEventListener('click', makeMove);
customizePlayButton.addEventListener('click', showCustomizationOptions);
submitCustomizationsButton.addEventListener('click', customizePlay);
window.addEventListener('load', startPlay);

//Event Handlers
function startPlay () {
  createGame('🆇', '🅾');
  var board = game.gameBoard;
  var squares = Object.keys(board);
  displayUpdatedBoard(board, squares);
};

function createGame(tokenOne, tokenTwo) {
  game = new Game();
  var playerOne = new Player('playerOne', tokenOne, 'Player 1');
  var playerTwo = new Player('playerTwo', tokenTwo, 'Player 2');
  game.assignPlayers(playerOne, playerTwo);
  game.playerOne.saveWinsToStorage();
  game.playerTwo.saveWinsToStorage();
  game.saveCurrentGameToStorage();
};

function showCustomizationOptions() {
  toggleThemeStyling();
  gameCustomizationForm.showModal();
};

function customizePlay () {
  gameCustomizationForm.close();
  setGameRules();
  setGameTheme();
};

function setGameRules() {
  for(var i = 0; i < gameRulesOptions.length; i++) {
    if (gameRulesOptions[i].checked == true) {
      game.rules = gameRulesOptions[i].value;
    }
  }
  setInstructions(game.rules);
};

function setInstructions(rules) {
  if (rules === 'classic') {
    instructionsHeading.innerText = 'Remind me how to play';
    gameInstructions.innerHTML =
      "<h2>Don't worry - it's easy!</h2><p>Players take turns placing one piece on the board. The first player to line up three of their pieces in a row (horizontally, vertically, or diagonally) wins! If no spaces are left and neither player has three in a row, the game is a draw, otherwise known as a cat's game.<br><br>To place a piece on this board, just click an empty square. We'll let you know when someone has won (or if the game goes to the cat 😺... or the vegetable 🥦 or the borg 🤖 or the dragon 🐲)</p>";
  } else if (rules === 'misere') {
    instructionsHeading.innerText = "What's this 'Misere' game again?";
    gameInstructions.innerHTML =
      "<h2>It's just like Tic-Tac-Toe, but backwards!</h2><p>Like in Tic-Tac-Toe, players take turns placing one piece on the board. But in this game, the first player to line up three of their pieces in a row (horizontally, vertically, or diagonally) LOSES! So you want to avoid putting your pieces in a row and try to corner your opponent into doing so. If no spaces are left and neither player has three in a row, the game is a a cat's game, just like in regular tic-tac-toe.<br><br>To place a piece on this board, just click an empty square. We'll let you know when someone has won (or if the game goes to the cat 😺... or the vegetable 🥦 or the borg 🤖 or the dragon 🐲)</p>";
  } else if (rules === 'notakto') {
    instructionsHeading.innerText = "What's this 'Notakto' game again?";
    gameInstructions.innerHTML =
      "<h2>It's like tic-tac-toe, but backwards AND the game doesn't care which pieces belong to which players!</h2><p>Like in Tic-Tac-Toe, players take turns placing one piece on the board, but in this game, the players' pieces look identical. The player who makes the move that completes a three-in-a-row of any three pieces LOSES! So you want to avoid being the one to place the last of three pieces, no matter who placed the other two. In Notakto, there is no cat 😿.</p>";
  }
};

function setGameTheme() {
  for(var i = 0; i < gameThemeOptions.length; i++) {
    if (gameThemeOptions[i].checked == true) {
      game.theme = gameThemeOptions[i].value;
    }
  }
  game.setGameTokens();
  setThemeText();
  toggleThemeStyling();
};

function setThemeText() {
  playerOneHeading.innerText = game.playerOne.token;
  playerTwoHeading.innerText = game.playerTwo.token;
  gameCommentary.innerText = `First to three in a row wins. Otherwise, be prepared to feed the ${game.cat} ${game.catToken}`
};

function toggleThemeStyling() {
  page.classList.toggle(`${game.theme}-background`);
  gameBoard.classList.toggle(`${game.theme}-board`);
  gameCommentary.classList.toggle(`${game.theme}-text`);
  playerOneSidebar.classList.toggle(`${game.theme}-text`);
  playerTwoSidebar.classList.toggle(`${game.theme}-text`);
  newGameButton.classList.toggle(`${game.theme}-button`);
  for (var i = 0; i < squareElements.length; i++) {
    squareElements[i].classList.toggle(`${game.theme}-square`);
    squareElements[i].classList.remove(`${game.theme}-playerOne-turn`);
    squareElements[i].classList.remove(`${game.theme}-playerTwo-turn`);
  }
};


function startGame() {
  styleStartOfGame();
  game.resetBoard();
  gameCommentary.innerText = '';
  var board = game.gameBoard;
  var squares = Object.keys(board);
  displayUpdatedBoard(board, squares);
};

function styleStartOfGame() {
  gameBoard.classList.add('reset-board');
  gameBoard.classList.add('spin-board');
  newGameButton.classList.toggle('spin-button');
  playerOneWinsTally.classList.remove('winner')
  playerOneHeading.classList.remove('winner')
  playerTwoWinsTally.classList.remove('winner')
  playerTwoHeading.classList.remove('winner')
}


function makeMove() {
  var board = game.gameBoard;
  var squares = Object.keys(board);
  gameBoard.classList.remove('reset-board');
  gameBoard.classList.remove('spin-board');
  if (checkIfSquareIsAvailable(event)) {
    game.updateGameBoard(event, board, squares);
    displayUpdatedBoard(board, squares);
    checkGameOutcome(board, squares);
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
  for (var i = 0; i < squareElements.length; i++) {
    if (squareElements[i].innerText === "" && game.gameOver === false) {
      squareElements[i].classList.add(`${game.theme}-${game.turn.id}-turn`);
      squareElements[i].classList.remove(`${game.theme}-${game.nextPlayer.id}-turn`);
    } else {
      squareElements[i].classList.remove(`${game.theme}-playerOne-turn`);
      squareElements[i].classList.remove(`${game.theme}-playerTwo-turn`);
    }
  }
};


function checkGameOutcome(board, squares) {
  game.checkForWinner(board);
  if (game.winner != undefined) {
    // game.winner.updateLocallyStoredWins();
    game.saveWin();
    announceWinner(game.winner.name);
  } else if (game.checkForCatsGame(board, squares)) {
    announceWinner(`The ${game.cat}`);
    for (var i = 0; i < squareElements.length; i++) {
      squareElements[i].innerText = game.catToken;
    }
  } else {
    game.toggleTurn();
  }
};

function announceWinner(winner) {
  gameCommentary.innerText = (`Game Over! ${winner} has it.`);
  playerOneWinsTally.innerText = `Wins: ${game.playerOne.wins.length}`;
  playerTwoWinsTally.innerText = `Wins: ${game.playerTwo.wins.length}`;
  if (game.winner === game.playerOne) {
    playerOneWinsTally.classList.add('winner')
    playerOneHeading.classList.add('winner')
  } else if (game.winner === game.playerTwo) {
    playerTwoWinsTally.classList.add('winner')
    playerTwoHeading.classList.add('winner')
  }
};
