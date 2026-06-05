

///Game Stats

var maxRightGuesses = 0;
var maxWrongGuesses = 6;

var currentWord = "";
var currentWordOriginal = "";
var currentWordSplit = [];
var currentWordDisplay = [];
var currentLetter = "";
var guessedLetters = [];

var wordList = [];

var rightGuesses = 0;
var wrongGuesses = 0;


var level = 0;
var experience = 0;
var points = 0;


var currentGameCategory = "none";


///Start Game

function startGame() {


    new Audio("assets/sounds/sound_accept.wav").play();

    document.getElementById('view-menu').style.display = 'none';
    document.getElementById('view-game-setup').style.display = 'flex';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

}


///Exit Game

function exitGame() {


    window.location.href = "../index.html";

}


///Reset Game

function resetGame() {


    document.getElementById('view-menu').style.display = 'flex';
    document.getElementById('view-game-setup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

}


///Show Game Results

function showResults() {


    document.getElementById('view-menu').style.display = 'none';
    document.getElementById('view-game-setup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-results').style.display = 'flex';

    document.getElementById('info-results-gametitle').innerHTML = currentGameCategory;

    if (currentGameCategory == "Useful Phrases") {

        document.getElementById('info-results-currentEntry').innerHTML = `The current phrase was ${currentWordOriginal}`;

    } else {

        document.getElementById('info-results-currentEntry').innerHTML = `The current word was ${currentWordOriginal}`;

    }

    document.getElementById('info-results-wrongGuesses').innerHTML = `Total wrong guesses: ${wrongGuesses} / ${maxWrongGuesses}`;

}


///Set Game Category

function setGameCategory(input) {


    new Audio("assets/sounds/sound_accept.wav").play();

    currentGameCategory = input;

    wordList = [];

    indexHangmanList.forEach(item => {


        if (item.category == currentGameCategory)
            wordList.push(item.jicarilla);

    })

    document.getElementById('view-game-setup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'flex';

    document.getElementById('game-title').innerHTML = currentGameCategory;

    initGame();

}


///Get Current Word

function getCurrentWord() {


    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    currentWordOriginal = currentWord;
    currentWord = currentWord.toLowerCase();

    currentWordSplit = currentWord.split("");
    
    currentWordDisplay = currentWordSplit.filter(item => (item !== `’` && item !== `.` && item !== `?` && item !== `/` ));

}


///Guess Letter

function guessLetter(letter) {


    if (guessedLetters.includes(letter))
        return;

    const button = document.getElementById('button-' + letter);

    currentLetter = letter;

    guessedLetters.push(letter);

    if (wrongGuesses <= 6) {


        if (currentWord.includes(letter)) {


            if (rightGuesses != maxRightGuesses)
                new Audio("assets/sounds/sound_correct3.wav").play();

            updateLetterDisplay(letter);

        } else {


            new Audio("assets/sounds/sound_incorrect3.wav").play();

            wrongGuesses++;

            if (wrongGuesses > 5) {


                setTimeout(() => {


                    showResults();

                }, 1000);

            }

        }

    }

    getCurrentState();
    updateGameboard();

}


///Update Letters

function updateLetters() {


    const buttons = document.querySelectorAll('[id^="button-"]');

    buttons.forEach(button => {


        const letter = button.id.replace("button-", "");

        if (guessedLetters.includes(letter)) {


            button.className = "button-key-pressed";

        } else {


            button.className = "button-key";

        }

    });

}


///Generate Letter Display

function generateLetterDisplay() {


    const root = document.getElementById('gameboard-currentword');

    root.innerHTML = "";

    currentWordSplit.forEach(item => {


        if (item == ` ` || item == `’` || item == `.` || item == `?` || item == `/`) {


            if (item == ` `) {


                const obj = document.createElement('div');
                obj.className = "gameboard-word-space";
                obj.id = "letter-space";
                obj.innerHTML = ``;

                root.appendChild(obj);

            }

            if (item == `’`) {

                const obj = document.createElement('div');
                obj.className = "gameboard-word-apostrophe";
                obj.id = "letter-apostrophe";
                obj.innerHTML = `’`;

                root.appendChild(obj);

            }

            if (item == `.`) {

                const obj = document.createElement('div');
                obj.className = "gameboard-word-period";
                obj.id = "letter-period";
                obj.innerHTML = `.`;

                root.appendChild(obj);

            }

            if (item == `?`) {

                const obj = document.createElement('div');
                obj.className = "gameboard-word-period";
                obj.id = "letter-period";
                obj.innerHTML = `?`;

                root.appendChild(obj);

            }

            if (item == `/`) {

                const obj = document.createElement('div');
                obj.className = "gameboard-word-period";
                obj.id = "letter-period";
                obj.innerHTML = `/`;

                root.appendChild(obj);

            }

        } else {


            const obj = document.createElement('div');
            obj.className = "gameboard-word";
            obj.id = `letter-${item}`;
            obj.innerHTML = "";

            maxRightGuesses++;

            root.appendChild(obj);

        }

    })

}


///Update Letter Display

function updateLetterDisplay(letter) {


    const elements = document.querySelectorAll("#letter-" + letter);

    elements.forEach(item => {


        if (item.innerHTML == "") {


            item.innerHTML = letter.toUpperCase();
            rightGuesses++;

        }

    });

}


///Get Current State

function getCurrentState() {


    if (rightGuesses == maxRightGuesses) {


        new Audio("assets/sounds/sound_completed.wav").play();

        setTimeout(() => {


            showResults();

        }, 1500);

    }

}


///Update Gameboard

function updateGameboard() {


    updateLetters();

    document.getElementById('gameboardDisplay').style.backgroundImage = `url("assets/hangman/gameboard_hangman${wrongGuesses}.png")`;
    document.getElementById('info-guesses').innerHTML = `Wrong guesses: ${wrongGuesses} / ${maxWrongGuesses}`;

}


///Initialize Game

function initGame() {


    document.getElementById('view-gameboard').style.display = 'flex';

    maxRightGuesses = 0;

    currentWord = "";
    currentWordSplit = [];
    currentWordDisplay = [];
    guessedLetters = [];

    rightGuesses = 0;
    wrongGuesses = 0;

    getCurrentWord();
    generateLetterDisplay();
    updateGameboard();

}


///Init

function init() {


    document.getElementById('view-menu').style.display = 'flex';
    document.getElementById('view-game-setup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

}


window.onload = function () {


    init();

};