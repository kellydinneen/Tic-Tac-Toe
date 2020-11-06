class Game {
  constructor() {
    this.playerOne = {};
    this.playerTwo = {};
    this.isPlayerOnesTurn = true;
    this.isPlayerTwosTurn = false;
    this.winner = undefined;
    this.gameBoard = {
      A1: undefined, A2: undefined, A3: undefined,
      B1: undefined, B2: undefined, B3: undefined,
      C1: undefined, C2: undefined, C3: undefined
    };
  }

assignPlayers(playerOne, playerTwo) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo
}

updateGameBoard(event, board, squares) {
  for (var i = 0; i < squares.length; i++) {
    if(event.target.id === `${squares[i]}`) {
      board[`${squares[i]}`] = this.isPlayerOnesTurn;
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
    if (!this.gameOver() && this.winner === undefined) {
      return "You haven't filled in all the spaces!";
  } else if (this.winner === undefined) {
      return "Cat's Game!"
  }
};

  gameOver() {
    for (var i = 0; i < gameBoard.length; i++) {
      if(gameBoard.gameBoard.key(i) === undefined) {
        return false;
      }
    }
  };

  saveWin() {
    this.winner.wins.push(this);
  };

  resetBoard() {
    this.gameBoard = {
      A1: undefined, A2: undefined, A3: undefined,
      B1: undefined, B2: undefined, B3: undefined,
      C1: undefined, C2: undefined, C3: undefined
    };
  };

};
