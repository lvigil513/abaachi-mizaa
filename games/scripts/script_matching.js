

var icons = [];


var gameIcons = [...icons, ...icons]; // 8 pairs


const gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard;
let lockBoard = false;
let matchesFound = 0;


///Game Stats

var cardsFlipped = 0;
var cardStreak = 0;
var cardStreakTotal = 0;


var enableFlip = true;


var gameStyle = "default";


var currentGameCategory = "none";


function shuffle(array) {


    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

}


function createCard(icon) {


    const card = document.createElement('div');
    
    card.classList.add('card');
    card.id = crypto.randomUUID();
    card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">${icon}</div>
    </div>
  `;

    card.addEventListener('click', () => flipCard(card, icon));

    return card;

}


///Delay Card Flip

function delayFlip() {


    enableFlip = false;

    setTimeout(() => {


        enableFlip = true;

    }, 600);

}


///Card Flip Actions

function flipCard(card, icon) {


    if (enableFlip == true) {


        cardsFlipped++;

        delayFlip();

        if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

        card.classList.add('flip');

        if (!firstCard) {


            new Audio("assets/sounds/sound_cardflip.wav").play();

            firstCard = card;

            return;

        }


        secondCard = card;
        lockBoard = true;


        const firstIcon = firstCard.querySelector('.card-back').textContent;
        const secondIcon = secondCard.querySelector('.card-back').textContent;


        if (firstIcon === secondIcon) {


            new Audio("assets/sounds/sound_cardflip.wav").play();

            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchesFound += 1;

            cardStreak++;

            if (cardStreak >= cardStreakTotal)
                cardStreakTotal = cardStreak;


            resetTurn();


            if (matchesFound != icons.length) {


                setTimeout(() => {


                    ///new Audio("assets/sounds/sound_correct.wav").play();

                    if (cardStreak >= 3) {


                        new Audio("assets/sounds/sound_correct2.wav").play();

                    } else {


                        new Audio("assets/sounds/sound_correct.wav").play();

                    }

                }, 500);

            }


            if (matchesFound === icons.length) {


                setTimeout(() => {


                    new Audio("assets/sounds/sound_completed.wav").play();

                    console.log("Cards flipped: " + cardsFlipped);

                    document.getElementById('view-gameboard').style.display = 'none';
                    document.getElementById('view-results').style.display = 'flex';

                    document.getElementById('info-game-title').innerHTML = currentGameCategory;

                    document.getElementById('info-cards-flipped').innerHTML = "No. of Cards Flipped: " + cardsFlipped;
                    document.getElementById('info-card-streak').innerHTML = "Highest Card Matching Streak: " + cardStreakTotal;

                }, 500);

            }

        } else {


            new Audio("assets/sounds/sound_cardflip.wav").play();

            setTimeout(() => {


                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');

                cardStreak = 0;

                if (cardsFlipped > 80) {

                    new Audio("assets/sounds/sound_incorrect2.wav").play();

                } else {

                    new Audio("assets/sounds/sound_incorrect.wav").play();

                }
                resetTurn();
            }, 750);

        }


    }

}


function scrollToTop() {


    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

}


function scrollToBoard() {


    const element = document.getElementById("gameBoard");

    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
    });

}

function resetTurn() {


    [firstCard, secondCard] = [null, null];
    lockBoard = false;

}


///Start Game

function startGame() {


    new Audio("assets/sounds/sound_accept.wav").play();

    document.getElementById('view-menu').style.display = 'none';
    document.getElementById('view-game-setup').style.display = 'flex';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

    icons = [];

    cardsFlipped = 0;
    cardStreak = 0;
    cardStreakTotal = 0;

}


///Exit Game

function exitGame() {


    window.location.href = "../index.html";

}


///Reset Game

function resetGame() {


    scrollToTop();

    document.getElementById('view-menu').style.display = 'flex';
    document.getElementById('view-game-setup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

}


///Set Game Category

function setGameCategory(input) {


    scrollToTop();

    new Audio("assets/sounds/sound_accept.wav").play();

    currentGameCategory = input;

    indexGameList.forEach(item => {


        if (item.category == currentGameCategory)
            icons.push(item.jicarilla);

    })

    gameIcons = [...icons, ...icons];


    document.getElementById('view-game-setup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'flex';


    document.getElementById('game-title').innerHTML = currentGameCategory;


    initGame();

}


///Init Game

function initGame() {


    matchesFound = 0;


    document.getElementById('view-gameboard').style.display = 'flex';

    document.getElementById('gameBoard').innerHTML = '';

    shuffle(gameIcons);

    gameIcons.forEach(icon => {
        const card = createCard(icon);
        document.getElementById('gameBoard').appendChild(card);
    });

    scrollToTop();

}


///Init

function init() {


    document.getElementById('view-menu').style.display = 'flex';
    document.getElementById('view-game-setup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

    icons = [];

}


window.onload = function () {


    init();

};