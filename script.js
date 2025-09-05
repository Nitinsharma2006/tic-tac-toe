const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize game
statusText.textContent = `Player ${currentPlayer}'s turn`;
board.addEventListener("click", handleCellClick);

function handleCellClick(event) {
  const clickedCell = event.target;

  // Ensure only cells are clickable
  if (!clickedCell.classList.contains("cell")) return;

  const cellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[cellIndex] !== "" || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      gameActive = false;
      highlightWinningCells(condition);
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells(condition) {
  condition.forEach(index => {
    const cell = document.querySelector(`.cell[data-index='${index}']`);
    cell.classList.add("winner");
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}

// Optional: Hook up a reset button
const resetButton = document.getElementById("reset");
if (resetButton) {
  resetButton.addEventListener("click", resetGame);
}
