class Game {
  constructor() {
    this.playerOne = {};
    this.playerTwo = {};
    this.turn = {};
    this.winner = undefined;
    this.gameOver = false;
    this.gameBoard = {
      A1: '', A2: '', A3: '',
      B1: '', B2: '', B3: '',
      C1: '', C2: '', C3: ''
    };
  }

assignPlayers(playerOne, playerTwo) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.turn = this.playerOne;
}

updateGameBoard(event, board, squares) {
  for (var i = 0; i < squares.length; i++) {
    if(event.target.id === `${squares[i]}` && board[`${squares[i]}`] === '') {
      board[`${squares[i]}`] = this.turn.token;
    }
   }
 };

  toggleTurn() {
    if (this.turn === this.playerOne) {
      this.turn = this.playerTwo;
    } else if (this.turn === this.playerTwo)
      this.turn = this.playerOne;
  };

  checkForWinner(g) {
    var winningScenarios = [
      [g.A1, g.A2, g.A3], [g.B1, g.B2, g.B3], [g.C1, g.C2, g.C3],
      [g.A1, g.B1, g.C1], [g.A2, g.B2, g.C2], [g.A3, g.B3, g.C3],
      [g.A1, g.B2, g.C3], [g.A3, g.B2, g.C1]
    ]
    this.checkAllWinningScenarios(winningScenarios);
  };

  checkAllWinningScenarios(winningScenarios) {
    for (var i = 0; i < winningScenarios.length; i++) {
      var winningSquares = winningScenarios[i];
      this.checkPossibleThreeInARow(winningSquares[0], winningSquares[1], winningSquares[2]);
    }
  };

  checkPossibleThreeInARow(squareOne, squareTwo, squareThree) {
      var one = this.playerOne.token;
      var two = this.playerTwo.token;
      if (squareOne === one && squareTwo === one && squareThree === one) {
        this.winner = this.playerOne;
        this.gameOver = true;
      } else if (squareOne === two && squareTwo === two && squareThree === two) {
        this.winner = this.playerTwo;
        this.gameOver = true;
      }
    };

  checkForCatsGame(board, squares) {
    if (this.checkForGameOver(board, squares)) {
      this.winner = 'cat';
      this.gameOver = true;
      return true;
    }
  };

  checkForGameOver(board, squares) {
    var emptySquares = 0
    for (var i = 0; i < squares.length; i++) {
      if (board[`${squares[i]}`] === '') {
        emptySquares += 1;
      }
    }
    return emptySquares < 1 ? true : false;
  };

  saveWin() {
    this.winner.wins.push(this);
  };

  resetBoard() {
    this.gameBoard = {
      A1: '', A2: '', A3: '',
      B1: '', B2: '', B3: '',
      C1: '', C2: '', C3: ''
    };
  };

};
