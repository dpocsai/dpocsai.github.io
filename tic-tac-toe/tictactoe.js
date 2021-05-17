const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("button");

let idx = 0;
let clicked = [];
let winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let chances = [...winningLines];

let move = (sq, player) => {
  chances = chances.map((line) =>
    line.map((el) => {
      if (el === sq && player === "user") {
        return (el = true);
      } else if (el === sq && player === "comp") {
        return (el = false);
      }
      return el;
    })
  );
};

let checkWinner = () => {
  for (let i = 0; i < winningLines.length; i++) {
    if (winningLines[i].every((sq) => boxes[sq].innerText === "X")) {
      return "X";
    } else if (winningLines[i].every((sq) => boxes[sq].innerText === "O")) {
      return "O";
    }
  }
  return null;
};

let winningBoard = () => {
  if (checkWinner() !== null) {
    let winner = checkWinner();
    boxes.forEach((box) => {
      if (box.innerText === "X") {
        box.style.color = winner === "X" ? "green" : "red";
      } else if (box.innerText === "O") {
        box.style.color = winner === "O" ? "green" : "red";
      }
    });
    return true;
  }
  if (clicked.length === 9) {
    for (let box of boxes) {
      box.innerText = "";
      boxes[4].innerText = "Tie";
    }
  }
  return false;
};
let nextTurn = () => {
  for (let line of chances) {
    if (line.filter((el) => el === false).length === 2) {
      if (
        !clicked.includes(String(line.find((el) => typeof el === "number")))
      ) {
        if (line.find((el) => typeof el === "number")) {
          return line.find((el) => typeof el === "number");
        }
      }
    }
  }
  for (let line of chances) {
    if (line.filter((el) => el === true).length === 2) {
      if (
        !clicked.includes(String(line.find((el) => typeof el === "number")))
      ) {
        if (line.find((el) => typeof el === "number")) {
          return line.find((el) => typeof el === "number");
        }
      }
    }
  }
  let num = 4;
  while (clicked.includes(String(num))) {
    num = Math.floor(Math.random() * 9);
  }
  return num;
};
let computerTurn = () => {
  let num = nextTurn();
  boxes[num].innerText = "O";
  boxes[num].classList.add("disabled");

  clicked.push(String(num));
  winningBoard();
  move(num, "comp");
};

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    box.innerText = "X";
    box.classList.add("disabled");

    clicked.push(box.id);
    winningBoard();
    move(+box.id, "user");
    if (clicked.length < 9 && !winningBoard()) {
      computerTurn();
    }
  });
});

reset.addEventListener("click", function () {
  boxes.forEach((box) => {
    box.innerText = "";
    box.classList.remove("disabled");
    box.style.color = "white";
    clicked = [];
    chances = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  });
  idx++;
  if (idx % 2 === 1) {
    computerTurn();
  }
});
