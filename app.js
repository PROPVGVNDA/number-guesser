'use strict'

// Game values
let minValue = 1,
  maxValue = 10,
  winningNumber = getRandomNumber(minValue, maxValue),
  guessesLeft = 3;

// UI elements
const gameWrapper = document.querySelector("#game"),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max numbers
minNum.textContent = minValue;
maxNum.textContent = maxValue;

// Play again event
gameWrapper.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
  	window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < minValue || guess > maxValue) {
    setMessage(`Please enter a number between ${minValue} and ${maxValue}!`, 'red');
  }

  // Check if won
  if (guess === winningNumber) {
    // Game over - won
    gameOver(true, `${winningNumber} is correct, YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Correct number was ${winningNumber}, YOU LOST!`);
    } else {
      // Game continues - wrong answer

      // Make border green
      guessInput.style.borderColor = 'red';

      // Inform user number is wrong ans how many guesses left he has
      setMessage(`Incorret number, ${guessesLeft} guesses left!`, 'red');

      // Clear input
      guessInput.value = '';
    }
  }
})

// Game over
function gameOver(won, msg) {
  // Disable input
  guessInput.disabled = true;
  // Make border green
  guessInput.style.borderColor = won ? 'green' : 'red';
  // Set message
  setMessage(msg, won ? 'green' : 'red');

  // Play again?
  guessBtn.value = 'Play again';
  guessBtn.className = 'play-again';
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Create random winning number
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}