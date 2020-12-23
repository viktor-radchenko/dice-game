"use strict";

// Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnRules = document.querySelector(".btn--rules");
const btnClose = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

// Variables
let scores, currentScore, activePlayer, gamePlaying;

// Starting conditions
const initGame = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const switchPlayer = () => {
  currentScore = document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (!gamePlaying) return;
  // Generate random dice number
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display dice img with proper dots
  diceEl.classList.remove("hidden");
  diceEl.src = `static/images/dice-${dice}.png`;

  // Verify dice != 1
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    // Swap players
    switchPlayer();
  }
});

btnHold.addEventListener("click", () => {
  if (!gamePlaying) return;

  // 1. Add current score to list;
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // 2. Check if score >= 100;
  if (scores[activePlayer] >= 100) {
    // Finish the game
    gamePlaying = false;
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    diceEl.classList.add("hidden");
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener("click", () => {
  initGame();
});

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnRules.addEventListener("click", () => {
  openModal();
});

btnClose.addEventListener("click", () => {
  closeModal();
});

overlay.addEventListener("click", () => {
  closeModal();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

initGame();
