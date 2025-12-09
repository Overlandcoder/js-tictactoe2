const gameBoard = (function () {
  const boardArray = [];

  return { boardArray };
})();

function createPlayer(name, symbol) {
  return { name, symbol };
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};


const game = (function () {
  const player1 = createPlayer("A");
  const player2 = createPlayer("B");
  const assignOtherSymbol = (symbol) => (symbol === "X" ? "O" : "X");
  assignSymbols()

  function assignRandomSymbol() {
    const symbols = ["X", "O"];
    return symbols.random();
  }

  function assignSymbols() {
    player1.symbol = assignRandomSymbol();
    player2.symbol = assignOtherSymbol(player1.symbol);
  }
})();
