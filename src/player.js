class Player {
  constructor(token, id) {
    this.id = id;
    this.token = token;
    this.wins = [];

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
