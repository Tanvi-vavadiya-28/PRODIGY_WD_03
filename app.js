let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerBtn = document.querySelector("#player-btn");
let turnO = true; 
let count = 0; 
let isAIEnabled = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerText) {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;
      let isWinner = checkWinner();
      if (count === 9 && !isWinner) {
        gameDraw();
      } else if (isWinner) {
        return;
      } else if (isAIEnabled && !isWinner) {
        setTimeout(makeAIMove, 2000);
      }
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

const makeAIMove = () => {
  if (count >= 9) return; // Prevent AI move if the game is already a draw
  let availableBoxes = Array.from(boxes).filter((box) => !box.innerText);
  if (availableBoxes.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableBoxes.length);
    let aiMove = availableBoxes[randomIndex];
    aiMove.innerText = "X"; // AI moves with "X"
    aiMove.disabled = true;
    turnO = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
playerBtn.addEventListener("click", () => {
  isAIEnabled = !isAIEnabled;
  playerBtn.classList.toggle("play-ai");
  playerBtn.innerText = isAIEnabled ? "Play Against Human" : "Play Against AI";
  resetGame();
});
