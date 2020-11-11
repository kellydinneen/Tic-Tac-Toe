class Game {
  constructor() {
    this.rules = 'classic';
    this.theme = 'sherbet';
    this.themes = {
      sherbet:['🆇','🅾', '◾️', '😹', 'Cat'],
      fruit:['🍎','🍊', '🍍', '🥦', 'Vegetable'],
      wormhole:['👽','👾','🌚', '🤖', 'Borg'],
      medieval:['♞', '♘', '⚔', '🐲', 'Dragon']};
    this.catToken = '😹';
    this.cat = 'Cat';
    this.playerOne = {};
    this.playerTwo = {};
    this.turn = {};
    this.nextPlayer = {};
    this.playerWithThreeInARow = undefined;
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
  this.nextPlayer = this.playerTwo;
}

updateGameBoard(event, board, squares) {
  for (var i = 0; i < squares.length; i++) {
    if(event.target.id === `${squares[i]}` && board[`${squares[i]}`] === '') {
      board[`${squares[i]}`] = this.turn.token;
    }
   }
 };

  toggleTurn() {

    if (this.turn == this.playerOne) {
      this.turn = this.playerTwo;
      this.nextPlayer = this.playerOne;
    } else if (this.turn == this.playerTwo) {
      this.turn = this.playerOne;
      this.nextPlayer = this.playerTwo;
    }
  };

  checkForWinner(g) {
    var winningScenarios = [
      [g.A1, g.A2, g.A3], [g.B1, g.B2, g.B3], [g.C1, g.C2, g.C3],
      [g.A1, g.B1, g.C1], [g.A2, g.B2, g.C2], [g.A3, g.B3, g.C3],
      [g.A1, g.B2, g.C3], [g.A3, g.B2, g.C1]
    ]
    this.checkAllWinningScenarios(winningScenarios);
    this.assignWinnerDependingOnRules();
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
        this.playerWithThreeInARow = this.playerOne;
        this.gameOver = true;
      } else if (squareOne === two && squareTwo === two && squareThree === two) {
        this.playerWithThreeInARow = this.playerTwo;
        this.gameOver = true;
      }
    };

  assignWinnerDependingOnRules() {
    if (this.rules === 'classic' && this.playerWithThreeInARow != undefined) {
      this.winner = this.playerWithThreeInARow;
      this.gameOver = true;
    } else if (this.rules === 'misere' && this.playerWithThreeInARow != undefined) {
      this.winner = this.playerWithThreeInARow === this.playerTwo? this.playerOne : this.playerTwo;
      this.gameOver = true;
    } else if (this.rules === 'notakto' && this.playerWithThreeInARow != undefined) {
      this.winner = this.nextPlayer;
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
    this.winner.wins.push(this.gameBoard);
  };

  resetBoard() {
    this.gameBoard = {
      A1: '', A2: '', A3: '',
      B1: '', B2: '', B3: '',
      C1: '', C2: '', C3: ''
    };
    this.winner = undefined;
    this.playerWithThreeInARow = undefined;
    this.gameOver = false;
  };

  setTokens() {
    var themeTokens = this.themes[`${this.theme}`];
    this.playerOne.token = themeTokens[0];
    this.playerTwo.token = themeTokens[1];
    this.neutralToken = themeTokens[2];
    this.catToken = themeTokens[3];
    this.cat = themeTokens[4];
    if (game.rules === 'notakto') {
      game.playerOne.token = this.neutralToken;
      game.playerTwo.token = this.neutralToken;
    }
  }

};
