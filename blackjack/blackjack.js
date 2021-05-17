const dealerHand = document.querySelector("#dealer");
const playerHand = document.querySelector("#player");
const hitBtn = document.querySelector(".hit");
const stayBtn = document.querySelector(".stay");
const dealBtn = document.querySelector(".deal");
const h1 = document.querySelector("h1");
const h2p = document.querySelector(".h2p");
const h2d = document.querySelector(".h2d");

const cards = [
  "AS",
  "KS",
  "QS",
  "JS",
  "10S",
  "9S",
  "8S",
  "7S",
  "6S",
  "5S",
  "4S",
  "3S",
  "2S",
  "AC",
  "KC",
  "QC",
  "JC",
  "10C",
  "9C",
  "8C",
  "7C",
  "6C",
  "5C",
  "4C",
  "3C",
  "2C",
  "AD",
  "KD",
  "QD",
  "JD",
  "10D",
  "9D",
  "8D",
  "7D",
  "6D",
  "5D",
  "4D",
  "3D",
  "2D",
  "AH",
  "KH",
  "QH",
  "JH",
  "10H",
  "9H",
  "8H",
  "7H",
  "6H",
  "5H",
  "4H",
  "3H",
  "2H",
];
const backOfCard = "RED_BACK";
let deck = [...cards, ...cards, ...cards];
let tens = "KQJ10";
let ones = "23456789";
let playerValue = [];
let dealerValue = [];
let flipped;
let hiddenCard;

let setButtons = (a, b, c) => {
  hitBtn.disabled = a;
  stayBtn.disabled = b;
  dealBtn.disabled = c;
};
let shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

let getCard = (card, hand) => {
  let _card = document.createElement("img");
  _card.src = `cards/${card}.svg`;
  _card.classList.add("card");
  hand.appendChild(_card);
  return _card;
};

let getHandValue = (hand) => {
  let sum = hand.reduce((val, card) => {
    if (tens.includes(card)) {
      val += 10;
    } else if (ones.includes(card)) {
      val += +card;
    } else {
      val += 11;
    }
    return val;
  }, 0);
  hand.forEach((card) => {
    if (sum > 21 && card === "A") {
      sum -= 10;
    }
  });
  return sum;
};
let checkWinner = () => {
  let pVal = getHandValue(playerValue);
  let dVal = getHandValue(dealerValue);
  h1.classList.remove("hidden");

  if (pVal > 21) {
    return (h1.innerText = "You Lose.");
  } else if (dVal > 21) {
    return (h1.innerText = "You Win!");
  } else if (pVal === 21 && playerValue.length === 2) {
    if (dVal === 21 && dealerValue.length === 2) {
      return (h1.innerText = "Push.");
    } else {
      return (h1.innerText = "You Win!");
    }
  } else if (pVal === 21 && playerValue.length > 2) {
    if (dVal === 21 && dealerValue.length > 2) {
      return (h1.innerText = "Push.");
    } else if (dVal === 21 && dealerValue.length === 2) {
      return (h1.innerText = "You lose.");
    } else {
      return (h1.innerText = "You Win!");
    }
  } else if (dVal < pVal) {
    return (h1.innerText = "You Win!");
  }
  return (h1.innerText = dVal > pVal ? "You Lose." : "Push.");
};
let dealDealer = () => {
  setTimeout(function () {
    if (!dealerValue.length) {
      flipped = getCard(backOfCard, dealerHand);
      hiddenCard = deck.shift();
      dealerValue.push(hiddenCard.slice(0, hiddenCard.length - 1));
      dealDealer();
    } else if (dealerValue.length < 2) {
      let card = deck.shift();
      dealerValue.push(card.slice(0, card.length - 1));
      return getCard(card, dealerHand);
    } else if (
      hitBtn.disabled === true &&
      getHandValue(dealerValue) < 17 &&
      getHandValue(playerValue) !== 21
    ) {
      let card = deck.shift();
      dealerValue.push(card.slice(0, card.length - 1));
      h2d.innerText = getHandValue(dealerValue);
      getCard(card, dealerHand);
      return dealDealer();
    } else {
      return checkWinner();
    }
  }, 500);
};

let dealPlayer = () => {
  setTimeout(function () {
    let card = deck.shift();
    playerValue.push(card.slice(0, card.length - 1));
    getCard(card, playerHand);
    if (getHandValue(playerValue) > 21) {
      h2p.innerText = getHandValue(playerValue);
      checkWinner();
      setButtons(true, true, false);
      flipped.src = `cards/${hiddenCard}.svg`;
      h2d.innerText = getHandValue(dealerValue);
    } else if (getHandValue(playerValue) === 21) {
      flipped.src = `cards/${hiddenCard}.svg`;
      dealDealer();
    } else if (playerValue.length >= 2) {
      h2p.innerText = getHandValue(playerValue);
      setButtons(false, false, true);
    } else if (playerValue.length < 2) {
      dealPlayer();
    }
  }, 500);
};

let deal = () => {
  dealDealer();
  setTimeout(function () {
    dealPlayer();
  }, 250);
  stayBtn.addEventListener("click", function () {
    setButtons(true, true, false);
    flipped.src = `cards/${hiddenCard}.svg`;
    h2d.innerText = getHandValue(dealerValue);
    setTimeout(function () {
      dealDealer();
    }, 250);
  });
};
hitBtn.addEventListener("click", function () {
  dealPlayer();
});
dealBtn.addEventListener("click", function () {
  shuffleDeck(deck);
  playerValue = [];
  dealerValue = [];
  h2p.innerText = "";
  h2d.innerText = "";
  h1.classList.add("hidden");

  let dealtCards = document.querySelectorAll("img");
  dealtCards.forEach((card) => card.remove());
  if (deck.length < 15) {
    deck = [...cards, ...cards, ...cards];
    shuffleDeck(deck);
  }
  deal();
});
setButtons(true, true, false);
