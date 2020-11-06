class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.isPlayerOnesTurn = true;
    this.isPlayerTwosTurn = false;
    this.winner = undefined;
    this.gameBoard = {
      A1: undefined, A2: undefined, A3: undefined,
      B1: undefined, B2: undefined, B3: undefined,
      C1: undefined, C2: undefined, C3: undefined
    };

updateGameBoard() {
  var squareID = event.target.id;
  for (var i = 0; i < gameBoard.length; i++) {
    if(squareID === gameBoard.key(i)) {
      gameBoard.gameBoard.key(i) = this.playerOnesTurn;
    }
  }
};

  toggleTurn() {
    this.playerOnesTurn = !this.playerOnesTurn;
    this.playerTwosTurn = !this.playerTwosTurn;
  };

  checkForWinner() {
    var g = this.gameBoard;
    var winningScenarios = [
      [g.A1, g.A2, g.A3], [g.B1, g.B2, g.B3], [g.C1, g.C2, g.C3],
      [g.A1, g.B1, g.C1], [g.A2, g.B2, g.C2], [g.A3, g.B3, g.C3],
      [g.A1, g.B2, g.C3], [g.A3, g.B2, g.C1]
    ]
    for (var i = 0; i < winningScenarios.length; i++) {
      var winningSquares = winningScenarios[i];
      this.checkForWinningScenario(winningSquares[0], winningSquares[1], winningSquares[2]);
    }
  };

  checkForWinningScenario(squareOne, squareTwo, squareThree) {
      if (squareOne && squareTwo && squareThree) {
        this.winner = this.playerOne;
      } else if (!squareOne && !squareTwo && !squareThree) {
        this.winner = this.playerTwo;
      }
    };

  checkForDraw() {
    if (!gameOver() && this.winner === undefined) {
      return "You haven't filled in all the spaces!";
  } else if (this.winner === undefined) {
      return "Cat's Game!"
  }

  gameOver() {
    for (var i = 0; i < gameBoard.length; i++) {
      if(gameBoard.gameBoard.key(i) === undefined) {
        return false;
      }
  }

  saveWin() {
  }

  resetBoard() {
  }

};
