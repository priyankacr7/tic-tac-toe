// Select all 9 boxes and reset button
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rst-btn");

let turn = "X"; // current player
let gameOver = false;

// Winning patterns (indexes of boxes)
let winPatterns = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6]  // diagonal
];

// Add click event to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && !gameOver) {
      box.innerText = turn;
      box.style.color = turn === "X" ? "red" : "blue"; // different colors
      checkWinner();
      turn = turn === "X" ? "O" : "X"; // switch turn
    }
  });
});

// Function to check winner
function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      gameOver = true;
      highlightWinner(pattern);
      setTimeout(() => alert(`${val1} Wins! 🎉`), 200);
      return;
    }
  }

  // Check draw
  if ([...boxes].every((box) => box.innerText !== "") && !gameOver) {
    gameOver = true;
    setTimeout(() => alert("It's a Draw! 🤝"), 200);
  }
}

// Highlight winning boxes
function highlightWinner(pattern) {
  pattern.forEach((index) => {
    boxes[index].style.backgroundColor = "#90ee90"; // light green
  });
}

// Reset game
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "#e3e3e3ff";
  });
  turn = "X";
  gameOver = false;
});
