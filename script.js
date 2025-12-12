Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const gameBoard = (function () {
  const boardArray = [];

  function addSymbol(index, symbol) {
    boardArray[index] = symbol;
  }

  return { boardArray, addSymbol };
})();

function createPlayer(name, symbol) {
  return { name, symbol };
}

const gameDisplay = (function () {
  function announceSymbols(player1Symbol, player2Symbol) {
    const symbolsInfoDiv = document.querySelector("#symbols-info");
    symbolsInfoDiv.textContent = `Player 1 is ${player1Symbol},
                                  Player 2 is ${player2Symbol}.`;
  }

  function announceTurn(playerName) {
    const turnInfoDiv = document.querySelector("#turn-info");
    turnInfoDiv.textContent = `${playerName}, it's your turn.`;
  }

  function displaySymbol(cell, symbol) {
    cell.textContent = symbol;
  }

  return { announceSymbols, announceTurn, displaySymbol };
})();

const game = (function () {
  const player1 = createPlayer("Player 1");
  const player2 = createPlayer("Player 2");
  const assignOtherSymbol = (symbol) => (symbol === "X" ? "O" : "X");
  const playButton = document.querySelector("#play");
  playButton.addEventListener("click", play);
  let currentPlayer;

  const assignRandomSymbol = () => ["X", "O"].random();

  function assignSymbols() {
    player1.symbol = assignRandomSymbol();
    player2.symbol = assignOtherSymbol(player1.symbol);
  }

  function play() {
    assignSymbols();
    currentPlayer = chooseRandomPlayer();
    gameDisplay.announceSymbols(player1.symbol, player2.symbol);
    gameDisplay.announceTurn(currentPlayer.name);
    const cells = document.querySelectorAll(".cell");
    addListenersToCells(cells);
  }

  const chooseRandomPlayer = () => [player1, player2].random();

  function addListenersToCells(cells, symbol) {
    cells.forEach((cell) =>
      cell.addEventListener("click", () => handleMove(cell), { once: true })
    );
  }

  function handleMove(cell) {
    gameBoard.addSymbol(cell.id, currentPlayer.symbol)
    gameDisplay.displaySymbol(cell, currentPlayer.symbol);
    currentPlayer = switchTurn();
  }

  const switchTurn = () => (currentPlayer === player1 ? player2 : player1);
})();
