const cards = document.querySelectorAll('.memory-card');
const memoryGame = document.querySelector('.memory-game');
let youWon = document.querySelector('.youwon');
let reboot = document.querySelector('.reboot');
let header = document.querySelector('header');
const score = document.querySelector('.score');
let playAgain = document.querySelector('.play-again');
let rankText = document.querySelector('.rank-text');

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
    score.textContent = `Score : ${hitNumber} coup`;
    rankText.textContent = 'Rang: Vous êtes un Chevalier🤴🏼';
  } else {
    if(hitNumber > 9) {
      rankText.textContent = 'Rang: Vous êtes un Petit pédestre🦶🏼';
      rankText.style.color="#fed330"
    }
    if(hitNumber > 14) {
      rankText.textContent = 'Rang: Vous êtes un Pécore🐄';
      rankText.style.color="#fa8231"
    }
    if(hitNumber > 19) {
      rankText.textContent = 'Bon...vous êtes un Sent-la-pisse...🤦🏼';
      rankText.style.color="red"
    }
    score.textContent = `Score: ${hitNumber} coups`;
  }
};

// Disable cards (It's a match !)
function disableCards() {
  firstCard.style.border="3px solid lime";
  secondCard.style.border="3px solid lime";
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchNumber++;
  if(matchNumber === 8) {     // Dés qu'on atteint 8 MATCHS :
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
  memoryGame.classList.add('fade-in');
  memoryGame.classList.add('fade-out');

  setTimeout(() => {
    reboot.classList.add('fade-in');
    youWon.classList.add('fade-in');
    youWon.textContent = `Vous avez gagné en ${hitNumber} coups`;
    console.log(`Vous avez gagné en ${hitNumber} coups`);
  }, 1000);
}

function resetAll() {
  cards.forEach(card => {
    card.classList.remove('flip');
    card.style.border="none";
    card.addEventListener('click', flipCard);
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
    hitNumber = 0;
    matchNumber = 0;
    score.textContent = "";
    rankText.textContent = "";
    rankText.style.color="";
    youWon.textContent = "";
  });

  setTimeout(() => {
    memoryGame.classList.remove('fade-out');
    memoryGame.classList.add('fade-in');
  }, 200);
};

// Loop on cards with a forEach (querySelectorAll only not enough)
cards.forEach(card => card.addEventListener('click', flipCard));