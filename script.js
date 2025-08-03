
let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let isGameActive = false;

function startGame() {
  const playerX = document.getElementById("playerX").value.trim();
  const playerO = document.getElementById("playerO").value.trim();
  if (!playerX || !playerO) {
    alert("Enter both player names!");
    return;
  }
  document.getElementById("playerInfo").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  createBoard();
  document.getElementById("status").textContent = playerX + "'s turn";
}

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  gameBoard = Array(9).fill("");
  isGameActive = true;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
  }
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (!isGameActive || gameBoard[index]) return;
  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());
  if (checkWin()) {
    document.getElementById("status").textContent = currentPlayer + " wins!";
    isGameActive = false;
    return;
  } else if (!gameBoard.includes("")) {
    document.getElementById("status").textContent = "It's a draw!";
    isGameActive = false;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").textContent = currentPlayer + "'s turn";
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
  });
}

function resetGame() {
  currentPlayer = "X";
  createBoard();
  document.getElementById("status").textContent = currentPlayer + "'s turn";
}
