class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOnesTurn = true;
    this.winner = undefined;
    this.gameBoard = {
      A1: undefined, A2: undefined, A3: undefined,
      B1: undefined, B2: undefined, B3: undefined,
      C1: undefined, C2: undefined, C3: undefined
    };
    //another Option
    // this.boardPositions = {
    //   playerOne: [],
    //   playerTwo: []
    // }
  }

  // A way to keep track of the data for the game board
updateGameBoard() {
  var boardSquare = event.target.id;
  for (var i = 0; i < gameBoard.length; i++) {
    if(boardSquareID === gameBoard.key(i)) {
      //assigns value of key in gameBoard model corresponding to clicked square in DOM to true or false
      gameBoard.gameBoard.key(i) = this.playerOnesTurn;
    }
  }
}

  // A way to keep track of which player’s turn it currently is
  toggleTurn() {
    this.playerOnesTurn = !this.playerOnesTurn;
  }

  // A way to check the Game’s board data for win conditions
  // A way to detect when a game is a draw (no one has won)
  checkForWinner() {
    for (var i = 0; i < gameBoard.length; i++) {
      var board = gameBoard.gameBoard
      //assigning vriables to boolean values of every winning board state
      var oneHasHorizontal = (i === 0 || 3 || 6) && (board.key(i) && board.key(i+1) && board.key(i+2))
      var twoHasHorizontal = (i === 0 || 3 || 6) && (!board.key(i) && !board.key(i+1) && !board.key(i+2))
      var oneHasVertical = (board.key(i) && board.key(i+3) && board.key(i+6))
      var twoHasVertical = (!board.key(i) && !board.key(i+3) && !board.key(i+6))
      var oneHasDiagnonalL2R = (board.key(i) && board.key(i+4) && board.key(i+8))
      var twoHasDiagonalL2R = (!board.key(i) && !board.key(i+4) && !board.key(i+8))
      var oneHasDiagnonalR2L = (i === 2) && (board.key(i) && board.key(i+2) && board.key(i+4))
      var twoHasDiagonalR2L = (i === 2) && (!board.key(i) && !board.key(i+2) && !board.key(i+4))
      //
      if (oneHasHorizontal || oneHasVertical || oneHasDiagnonalL2R || oneHasDiagnonalR2L) {
        this.winner = this.playerOne;
      } else if (twoHasHorizontal || twoHasVertical || twoHasDiagnonalL2R || twoHasDiagnonalR2L) {
        this.winner = this.playerTwo;
      }
      //don't need else, can update
    }
    //var rowA = board.A1 && board.A2 && board.a


    // var board = this.gameBoard;
    // var playerOneHasRowA = (board.A1 && board.A2 && board.A3)
    // var playerOneHasRowB = (this.gameBoard.A1 && this.gameBoard.A2 && this.gameBoard.A3)
    //
    // var playerTwoThreeVertical =
    // var playerOneThreeAcross = ((A1 && A2 && A3) || (B1 && B2 && B3) || (C1 && C2 && C3))
    // var playerTwoThreeAcross = ((!A1 && !A2 && !A3) || (!B1 && !B2 && !B3) || (!C1 && !C2 && !C3))
    // var playerOneThreeDiagonal =
    // var playerTwoThreeDiagonal =
    // if(
    //     (A1 && A2 && A3) ||
    //     (B1 && B2 && B3) ||
    //     (C1 && C2 && C3) ||
    //     (A1 && B1 && C1) ||
    //     (A2 && B2 && C2) ||
    //     (A3 && B3 && C3) ||
    //     (A1 && B2 && C3) ||
    //     (C1 && B2 && A3)
    //   )
//Option B: Conditional with every
//if(boardPositions.playerOne.includes
  }

  // A way to save a winning Game’s board data to the correct player’s wins array
  saveWin() {
    //push game into winner.wins array
  }

// A way to reset the Game’s board to begin a new game
  resetBoard() {

  }

}
