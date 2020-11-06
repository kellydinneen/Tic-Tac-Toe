class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne
    this.playerTwo
    this.turn = this.playerOne;
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
//need event listener on board
//identify target and match to corresponding square A1-C3
}
  // A way to keep track of which player’s turn it currently is
  toggleTurn() {

  }

  // A way to check the Game’s board data for win conditions
  // A way to detect when a game is a draw (no one has won)
  checkForWinner() {
//winner is playerOne || winner is playerTwo || game is draw || winner is undefined (game incomplete)
//Option A: Conditional with every possible winning game state based on whole board
//if((A1 && A2 && A3) || (B1 && B2 && B3) || (C1 && C2 && C3) || (A1 && B2 && C3) || )
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
