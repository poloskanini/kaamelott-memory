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

let characters = [
"Arthur Pendragon 👑",
"Léodagan 🩸",
"Loth d’Orcanie ✨",
"Goustan le Cruel 👊🏼",
"Calogrenant 🏴󠁧󠁢󠁳󠁣󠁴󠁿",
"Perceval 🌌",
"Karadoc 🥓",
"Guenièvre 👸🏻",
"Dame Séli 👩🏻",
"Lancelot du Lac 🦎",
"Bohort 🧺",
"Caiüs Camillus 🛡️",
"Venec 🦊",
"Merlin 🧙🏼‍♂️",
"Yvain Chevalier au Lion 🦁",
"Le Tavernier 🍺",
"Grüdü 🦂",
"Dagonet 🔰",
"Le Roi Burgonde 🥄",
"Guethenoc 🐖",
"Roparzh 🐴",
"Kadoc 🐔"
]
console.log(characters.length)

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

  // Si hitNumber
  if(hitNumber < 2) {
    score.textContent = `Score : ${hitNumber} coup`;
    rankText.textContent += `Vous êtes ${characters[0]}`;
  } else {
    if(hitNumber > 8) {
      rankText.textContent = `Vous êtes ${characters[1]}`;
      rankText.style.color="#fed330"
    }
    if(hitNumber > 9) {
      rankText.textContent = `Vous êtes ${characters[2]}`;
    }
    if(hitNumber > 10) {
      rankText.textContent = `Vous êtes ${characters[3]}`;
    }
    if(hitNumber > 11) {
      rankText.textContent = `Vous êtes ${characters[4]}`;
    }
    if(hitNumber > 12) {
      rankText.textContent = `Vous êtes ${characters[5]}`;
    }
    if(hitNumber > 13) {
      rankText.textContent = `Vous êtes ${characters[6]}`;
    }
    if(hitNumber > 14) {
      rankText.textContent = `Vous êtes ${characters[7]}`;
    }
    if(hitNumber > 15) {
      rankText.textContent = `Vous êtes ${characters[8]}`;
    }
    if(hitNumber > 16) {
      rankText.textContent = `Vous êtes ${characters[9]}`;
    }
    if(hitNumber > 17) {
      rankText.textContent = `Vous êtes ${characters[10]}`;
    }
    if(hitNumber > 18) {
      rankText.textContent = `Vous êtes ${characters[11]}`;
    }
    if(hitNumber > 19) {
      rankText.textContent = `Vous êtes ${characters[12]}`;
      rankText.style.color="#fa8231"
    }
    if(hitNumber > 20) {
      rankText.textContent = `Vous êtes ${characters[13]}`;
    }
    if(hitNumber > 21) {
      rankText.textContent = `Vous êtes ${characters[14]}`;
    }
    if(hitNumber > 22) {
      rankText.textContent = `Vous êtes ${characters[15]}`;
    }
    if(hitNumber > 23) {
      rankText.textContent = `Vous êtes ${characters[16]}`;
    }
    if(hitNumber > 24) {
      rankText.textContent = `Vous êtes ${characters[17]}`;
    }
    if(hitNumber > 25) {
      rankText.textContent = `Vous êtes ${characters[18]}`;
    }
    if(hitNumber > 26) {
      rankText.textContent = `Vous êtes ${characters[19]}`;
    }
    if(hitNumber > 27) {
      rankText.textContent = `Vous êtes ${characters[20]}`;
    }
    if(hitNumber > 28) {
      rankText.textContent = `Vous êtes ${characters[21]}`;
    }
    if(hitNumber > 29) {
      rankText.textContent = '💁🏼‍♂️Bon...vous êtes un Sent-la-pisse...🤦🏼';
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
  if(matchNumber === 1) {     // Dés qu'on atteint 8 MATCHS :
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
  }, 900);
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
    youWon.style.display="block";
    youWon.classList.add('fade-in');
    youWon.textContent = `Vous avez gagné en ${hitNumber} coups.
    ${rankText.textContent}.`;
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
    youWon.style.display="none";
  });

  setTimeout(() => {
    memoryGame.classList.remove('fade-out');
    memoryGame.classList.add('fade-in');
  }, 200);
};

// Loop on cards with a forEach (querySelectorAll only not enough)
cards.forEach(card => card.addEventListener('click', flipCard));