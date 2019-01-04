let cardSymbols = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube",
];
let table = document.querySelector(".deck");
let openedCards = [];
let moves = 0;
let movesCounter = document.querySelector(".moves");
let finalStars = document.querySelector(".stars");
let star = '<li><i class="fa fa-star"></i></li>';
let resetButton = document.querySelector(".restart");
let matched = [];
let gameOn = true;
let timeIsTicking = true;
const clock = document.querySelector(".clock");
let totalTime = 0;
let liveTimer, minutes, seconds;
let popUp = document.querySelector(".done-container");
let popupTime = document.getElementById("popup-time");
let popupStars = document.getElementById("popup-stars");
let playAgain = document.getElementById("play-again");

newGame();

resetButton.addEventListener("click", function() {
  reset();
  });

playAgain.addEventListener("click", function() {
  reset();
  });

function newGame() {
    popUp.style.display = "none";
    gameOn = true;
    shuffle(cardSymbols);
    for (let i = 0; i < cardSymbols.length; i++) {

        const listOfCards = document.createElement('li');
        listOfCards.classList.add('card');
        listOfCards.innerHTML = `<i class="${cardSymbols[i]}"></i>`;
        table.appendChild(listOfCards);
        listOfCards.addEventListener('click', playing, false);

        }
    }

function playing() {

      if (openedCards.length === 1) {
        this.classList.add("open", "show", "disable");
        openedCards.push(this);
        compare(openedCards[0], openedCards[1]);
        moves++;
        movesCounter.textContent = moves;
        rating();
        setTimeout(function() {
          if (matched.length === 16) {
            popUp.style.display = "flex";
            popupTime.innerHTML = `<i>Your time was:</i> <br> ${minutes} : ${seconds}`;
            popupStars.innerHTML = finalStars.innerHTML;
            gameOn = false;
            clearInterval(liveTimer);
          }
        }, 400);
        } else if (openedCards.length === 0) {
        this.classList.add("open", "show", "disable");
        rating();
        openedCards.push(this);
        if (timeIsTicking) {
          timer();
          timeIsTicking = false;
          }
        }
     }


function reset() {
  openedCards = [];
  matched = [];
  table.innerHTML = "";
  moves = 0;
  movesCounter.innerHTML = moves;
  finalStars.innerHTML = star + star + star;
  clearInterval(liveTimer);
  timeIsTicking = true;
  totalTime = 0;
  clock.innerHTML = `0 : 0`;
  newGame();
  }


function timer() {
  clock.innerHTML = `0 : 0`;
  popupTime.textContent = `0 : 0`;
  liveTimer = setInterval(function() {
    totalTime += 1;
    minutes = Math.floor((totalTime / 60) % 60);
    seconds = totalTime % 60;
    clock.innerHTML = `${minutes} : ${seconds}`;
    popupTime.innerHTML = `${minutes} : ${seconds}`;
    }, 1000);
  }


function rating() {
  switch (gameOn) {
    case moves > 20:
      finalStars.innerHTML = star;
      break;
    case moves > 14:
      finalStars.innerHTML = star + star;
      break;
    default:
      finalStars.innerHTML = star + star + star;
    }
  }

function compare(firstCard, secondCard) {
  if (firstCard.innerHTML === secondCard.innerHTML) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    matched.push(firstCard, secondCard);
    openedCards = [];
    } else {
    setTimeout(function() {
      firstCard.classList.remove("open", "show", "disable");
      secondCard.classList.remove("open", "show", "disable");
      openedCards = [];
      }, 700);
    }
  }


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    } return array;
  }
