Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const gameBoard = (function () {
  const boardArray = [];

  return { boardArray };
})();

function createPlayer(name, symbol) {
  return { name, symbol };
}

const gameDisplay = (function() {
  function announceSymbols(player1Symbol, player2Symbol) {
    const symbolsInfoDiv = document.querySelector(".symbols-info")
    symbolsInfoDiv.textContent = `Player 1 is ${player1Symbol},
                                  Player 2 is ${player2Symbol}.`
  }

  return { announceSymbols }
})()

const game = (function () {
  const player1 = createPlayer("A");
  const player2 = createPlayer("B");
  const assignOtherSymbol = (symbol) => (symbol === "X" ? "O" : "X");
  const playButton = document.querySelector("#play")
  playButton.addEventListener("click", play)

  function assignRandomSymbol() {
    const symbols = ["X", "O"];
    return symbols.random();
    // refactor via arrow func
  }

  function assignSymbols() {
    player1.symbol = assignRandomSymbol();
    player2.symbol = assignOtherSymbol(player1.symbol);
  }

  function play() {
    assignSymbols()
    gameDisplay.announceSymbols(player1.symbol, player2.symbol)
    
  }
})();
