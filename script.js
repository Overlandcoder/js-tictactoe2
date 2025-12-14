Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const gameBoard = (function () {
  const boardArray = [];

  function addSymbol(index, symbol) {
    boardArray[index] = symbol;
  }

  const isBoardFull = () => boardArray.length === 9 && noEmptyCells();
  const symbolAt = index => boardArray.at(index);
  const showBoard = () => boardArray;

  function noEmptyCells() {
    for (let i = 0; i <= 8; i++) {
      if (boardArray[i] !== "X" && boardArray[i] !== "O") return false;
    }
    return true;
  }

  return { showBoard, addSymbol, isBoardFull, symbolAt };
})();

function createPlayer(name, symbol) {
  return { name, symbol };
}

const gameDisplay = (function () {
  const cells = document.querySelectorAll(".cell");
  const gameStatusDiv = document.querySelector("#game-status");

  function announceSymbols(player1Symbol, player2Symbol) {
    const symbolsInfoDiv = document.querySelector("#symbols-info");
    symbolsInfoDiv.textContent = `Player 1 is ${player1Symbol},
                                  Player 2 is ${player2Symbol}.`;
  }

  function announceTurn(playerName) {
    gameStatusDiv.textContent = `${playerName}, it's your turn.`;
  }

  function displaySymbol(cell, symbol) {
    cell.textContent = symbol;
  }

  function announceWinner(playerName) {
    gameStatusDiv.textContent = `${playerName} has won!`;
  }

  function announceTie() {
    gameStatusDiv.textContent = "Tie game.";
  }

  function addListenersToCells() {
    cells.forEach((cell) =>
      cell.addEventListener("click", () => game.handleMove(cell), { once: true })
    );
  }

  function disableCells() {
    cells.forEach(cell => cell.disabled = true)
  }

  return { cells, addListenersToCells, announceSymbols, announceTurn, displaySymbol, announceWinner, announceTie, disableCells };
})();

const game = (function () {
  const player1 = createPlayer("Player 1");
  const player2 = createPlayer("Player 2");
  const assignOtherSymbol = (symbol) => (symbol === "X" ? "O" : "X");
  const playButton = document.querySelector("#play");
  playButton.addEventListener("click", play);
  let currentPlayer;
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

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
    gameDisplay.addListenersToCells();
  }

  const chooseRandomPlayer = () => [player1, player2].random();

  function handleMove(cell) {
    gameBoard.addSymbol(cell.id, currentPlayer.symbol)
    gameDisplay.displaySymbol(cell, currentPlayer.symbol);
    if (isGameOver()) {
      gameDisplay.disableCells()
      return;
    }
    currentPlayer = switchTurn();
    gameDisplay.announceTurn(currentPlayer.name);
  }

  function isGameOver() {
    if (isGameWon()) {
      gameDisplay.announceWinner(currentPlayer.name)
      return true;
    } else if (gameBoard.isBoardFull()) {
      gameDisplay.announceTie();
      return true;
    }
  }

  function isGameWon() {
    return WINNING_COMBOS.some((combo) => areAllSameSymbol(combo))
  }

  function areAllSameSymbol(combo) {
    return combo.every(index => gameBoard.symbolAt(index) === currentPlayer.symbol)
  }

  const switchTurn = () => currentPlayer === player1 ? player2 : player1;

  return { handleMove };
})();
