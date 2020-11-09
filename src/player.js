class Player {
  constructor(token, id) {
    this.id = id;
    this.token = token;
    this.wins = [];

  }
  savePlayerToStorage() {
    var stringifiedWins = JSON.stringify(this);
    var storedWins = localStorage.setItem(`${this.id}`, stringifiedPlayer);
  }
  deletePlayerFromStorage() {
    localStorage.removeItem(`${this.id}`);
  }
  updateLocallyStoredPlayer() {
      this.deletePlayerFromStorage();
      this.savePlayerToStorage();
  }
};
