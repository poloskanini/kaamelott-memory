const cards = document.querySelectorAll('.memory-card');
const memoryGame = document.querySelector('.memory-game');
let youWon = document.querySelector('.youwon');
let reboot = document.querySelector('.reboot');
let header = document.querySelector('header');
const score = document.querySelector('.score');
let playAgain = document.querySelector('.play-again');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchNumber = 0;
let hitNumber = 0;

// Flip Card
function flipCard() {
  if (lockBoard) return;
  if(this === firstCard) return;

  this.classList.toggle('flip');

  if(!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
    // Second click
    secondCard = this;
    hitNumber++;
    checkForMatch();   // -> Lance la fonction de vérification
}

//Check for match FUNCTION
function checkForMatch() {
  let isMatch = firstCard.dataset.cover === secondCard.dataset.cover;
  isMatch ? disableCards() : unflipCards();

  // Adding score

  // Si hitNumber <
  if(hitNumber < 2) {
    console.log(`${hitNumber} coup`)
    score.textContent = `${hitNumber} coup`;
  } else {
    console.log(`${hitNumber} coups`)
    score.textContent = `${hitNumber} coups`;
  }
};

// Disable cards (It's a match !)
function disableCards() {
  firstCard.style.border="3px solid lime";
  secondCard.style.border="3px solid lime";
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchNumber++;
  if(matchNumber === 1) {
    setTimeout(() => {
      winGame();
    }, 500);
  };
  resetBoard();
}

// Unflip cards (Not a match)
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.style.border="3px solid red";
    secondCard.style.border="3px solid red";
  }, 200);

  setTimeout(() => {
    firstCard.style.border="none";
    secondCard.style.border="none";
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1100);
}

// Reset Board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  })
})();

// Wingame
function winGame() {
  // cards.forEach(card => {
  //   setTimeout(() => {
  //     card.classList.add('fade-out');
  //   }, 1000);
  // })
  memoryGame.classList.add('fade-out');

  setTimeout(() => {
    reboot.classList.add('fade-in');
    youWon.classList.add('fade-in');
    youWon.textContent = `Vous avez gagné en ${hitNumber} coups`;
    console.log(`Vous avez gagné en ${hitNumber} coups`);
  }, 1000);
}

function restart() {
  
}

// Loop on cards with a forEach (querySelectorAll only not enough)
cards.forEach(card => card.addEventListener('click', flipCard))