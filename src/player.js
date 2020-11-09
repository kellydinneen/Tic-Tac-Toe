class Player {
  constructor(token, id) {
    this.id = id;
    this.token = token;
    this.wins = {
      ticTacToe: 0,
      misere: 0,
      notakto: 0,
      morris: 0,
    };

  }
  saveWinsToStorage() {
    var stringifiedWins = JSON.stringify(this.wins);
    var storedWins = localStorage.setItem(`${this.id}Wins`, stringifiedWins);
  }
  deleteWinsFromStorage() {
    localStorage.removeItem(`${this.id}Wins`);
  }
  updateLocallyStoredWins() {
      this.deleteWinsFromStorage();
      this.saveWinsToStorage();
  }
};
