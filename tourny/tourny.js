const nameInput = document.querySelector(".names");
const namesSubmit = document.querySelector(".submit");
const scoreInput = document.querySelectorAll(".scoreInput");
const scoreSubmit = document.querySelectorAll(".scoreSubmit");

const rank = document.querySelectorAll("#rank");
const ID = document.querySelectorAll("#name");
const W = document.querySelectorAll("#W");
const L = document.querySelectorAll("#L");
const PF = document.querySelectorAll("#PF");
const PA = document.querySelectorAll("#PA");
const DIF = document.querySelectorAll("#DIF");
const GP = document.querySelectorAll("#GP");
let _ = window._;

let names;
let teams = [];
let games = [];
let stats = {};
let playTwice = [];
let alreadyPlayed = false;
window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  event.returnValue = "";
});
let randomizeArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

let numberOfTeams = (players) => {
  if (players === 1) return 1;
  return numberOfTeams(players - 1) + players;
};

let rotate = (players) => {
  let rotatedPlayers = [...players];
  let playerToMove = rotatedPlayers.splice(1, 1);
  return rotatedPlayers.concat(playerToMove);
};

let generateTeams = (players) => {
  let p1Idx = 0;
  let p2Idx = players.length - 1;
  let teamsToGenerate = numberOfTeams(players.length - 1);
  while (teams.length < teamsToGenerate) {
    while (p1Idx < Math.floor(players.length / 2)) {
      teams.push([players[p1Idx], players[p2Idx]]);
      p1Idx++;
      p2Idx--;
    }
    players = rotate(players);
    p1Idx = 0;
    p2Idx = players.length - 1;
  }
  teams = teams.filter((team) => !team.includes("---"));
  if (teams.length % 2 === 1) {
    playTwice = [teams[0]];
    teams = teams.concat(playTwice);
  }
  return teams;
};

let generateGames = (teams) => {
  for (let i = 0; i <= teams.length - 1; i += 2) {
    games.push([teams[i], teams[i + 1]]);
  }
  return randomizeArray(games);
};

let displaySchedule = () => {
  generateGames(generateTeams(names));
  let A = document.querySelectorAll(".A");
  let B = document.querySelectorAll(".B");
  for (let i = 0; i < games.length; i++) {
    A[i].innerText = games[i][0];
    B[i].innerText = games[i][1];
  }
};

namesSubmit.addEventListener("click", function () {
  names = nameInput.value
    .trim()
    .replace(/[\s+,]/g, " ")
    .split(" ");
  names = randomizeArray(names);
  if (names.length < 4) return (nameInput.value = "");
  nameInput.value = "";
  if (names.length % 2 === 1) {
    names = names.concat("---");
  }
  names.forEach((name) => {
    stats[name] = { name, W: 0, L: 0, PF: 0, PA: 0, DIF: 0, GP: 0 };
  });
  displaySchedule();
  return stats;
});
let adjustStatsWinner = (winner, score) => {
  for (let winningPlayer of winner) {
    stats[winningPlayer].GP--;
    stats[winningPlayer].W--;
    stats[winningPlayer].PF -= +score[0];
    stats[winningPlayer].PA -= +score[1];
    stats[winningPlayer].DIF =
      stats[winningPlayer].PF - stats[winningPlayer].PA;
  }

  return stats;
};

let adjustStatsLoser = (loser, score) => {
  for (let losingPlayer of loser) {
    stats[losingPlayer].GP--;
    stats[losingPlayer].L--;
    stats[losingPlayer].PF -= +score[1];
    stats[losingPlayer].PA -= +score[0];
    stats[losingPlayer].DIF = stats[losingPlayer].PF - stats[losingPlayer].PA;
  }

  return stats;
};
let isWinner = (winner, score) => {
  winner = winner.split(",");
  /* if (winner.join(",") === playTwice.join(",") && alreadyPlayed === true) {
    adjustStatsWinner(winner, score);
  } */
  for (let winningPlayer of winner) {
    stats[winningPlayer].GP++;
    stats[winningPlayer].W++;
    stats[winningPlayer].PF += +score[0];
    stats[winningPlayer].PA += +score[1];
    stats[winningPlayer].DIF =
      stats[winningPlayer].PF - stats[winningPlayer].PA;
    if (winner.join(",") === playTwice.join(",")) {
      alreadyPlayed = true;
    }
  }

  return stats;
};

let isLoser = (loser, score) => {
  loser = loser.split(",");
  if (loser.join(",") === playTwice.join(",") && alreadyPlayed === true) {
    adjustStatsLoser(loser, score);
  }
  for (let losingPlayer of loser) {
    stats[losingPlayer].GP++;
    stats[losingPlayer].L++;
    stats[losingPlayer].PF += +score[1];
    stats[losingPlayer].PA += +score[0];
    stats[losingPlayer].DIF = stats[losingPlayer].PF - stats[losingPlayer].PA;
    if (loser.join(",") === playTwice.join(",")) {
      alreadyPlayed = true;
    }
  }
  return stats;
};
let rankTeams = () => {
  let statsArray = Object.entries(stats).map((el) => el[1]);
  let ranked = _.sortBy(statsArray, ["W", "DIF", "PF", "PA"]).reverse();
  rank.forEach((rank, idx) => (rank.innerText = idx + 1 || ""));
  ranked.map((row, idx) => (ID[idx].innerText = row["name"]));
  ranked.map((row, idx) => (W[idx].innerText = row["W"]));
  ranked.map((row, idx) => (L[idx].innerText = row["L"]));
  ranked.map((row, idx) => (PF[idx].innerText = row["PF"]));
  ranked.map((row, idx) => (PA[idx].innerText = row["PA"]));
  ranked.map((row, idx) => (DIF[idx].innerText = row["DIF"]));
  ranked.map((row, idx) => (GP[idx].innerText = row["GP"]));
};
let A = document.querySelectorAll(".A");
let B = document.querySelectorAll(".B");
let sendGameData = (score, idx) => {
  if (+score[0] > +score[1]) {
    isWinner(A[idx].innerText, score);
    isLoser(B[idx].innerText, score);
    A[idx].style.backgroundColor = "rgb(194, 240, 194)";
    A[idx].style.fontWeight = "600";
    B[idx].style.backgroundColor = "rgb(255, 179, 179)";
  } else if (+score[1] > +score[0]) {
    isWinner(B[idx].innerText, score.reverse());
    isLoser(A[idx].innerText, score);
    B[idx].style.backgroundColor = "rgb(194, 240, 194)";
    B[idx].style.fontWeight = "600";
    A[idx].style.backgroundColor = "rgb(255, 179, 179)";
  }
  rankTeams();
};
let revertGameData = (score, idx) => {
  if (+score[0] > +score[1]) {
    A[idx].style.backgroundColor = "white";
    A[idx].style.fontWeight = "500";
    B[idx].style.backgroundColor = "white";

    adjustStatsWinner(A[idx].innerText.split(","), score);
    adjustStatsLoser(B[idx].innerText.split(","), score);
  } else if (+score[1] > +score[0]) {
    B[idx].style.backgroundColor = "white";
    B[idx].style.fontWeight = "500";
    A[idx].style.backgroundColor = "white";
    adjustStatsWinner(B[idx].innerText.split(","), score.reverse());
    adjustStatsLoser(A[idx].innerText.split(","), score);
  }
  rankTeams();
};
scoreSubmit.forEach((submit, idx) => {
  submit.addEventListener("click", function () {
    if (/^\d+-\d+$/.test(scoreInput[idx].value)) {
      submit.disabled = true;

      sendGameData(scoreInput[idx].value.split("-"), idx);
    }
    scoreInput[idx].addEventListener("click", function () {
      submit.disabled = false;
      revertGameData(scoreInput[idx].value.split("-"), idx);
      scoreInput[idx].value = "";
    });
  });
});
