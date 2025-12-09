function createPlayer(name, symbol) {
  return { name, symbol };
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const assignOtherSymbol = (symbol) => (symbol === "X" ? "O" : "X");

const game = (function () {
  const player1 = createPlayer("A");
  const player2 = createPlayer("B");
  player1.symbol = assignRandomSymbol();
  player2.symbol = assignOtherSymbol(player1.symbol);

  function assignRandomSymbol() {
    const symbols = ["X", "O"];
    return symbols.random();
  }
})();
