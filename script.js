'use strict';

// Selecting elements from the HTML
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const diceBase = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initializing game state variables
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset UI elements for both players
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceBase.classList.remove('hidden');
  player0.classList.remove('player--winner', 'player--active');
  player1.classList.remove('player--winner', 'player--active');
  player0.classList.add('player--active');
};

init();

// Function to switch players
const switchPlayer = function () {
  // If the dice is 1, reset the current score and switch to the next player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Toggle active player and update UI
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Event listener for rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random number for the dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Displaying the rolled dice
    diceBase.classList.remove('hidden');
    diceBase.src = `dice-${dice}.png`;

    // Updating current score and UI based on the dice roll
    if (dice !== 1) {
      // If the dice is not 1, add the value to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Event listener for holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceBase.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
        .classList.remove('player--winner');
      // Inside your code where a player wins
      const winSound = document.getElementById('winSound');
      winSound.play();
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', function () {
  init;
});
