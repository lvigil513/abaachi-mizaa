

var icons = [];


var gameIcons = [...icons, ...icons]; // 8 pairs


var teamList = []; // 8 pairs


const gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard;
let lockBoard = false;
let matchesFound = 0;
var cardsFlipped = 0;


var enableFlip = true;


///Game Settings

var gameType = "normal";

var enableSheepMode = false;
var scoreMultipler = 200;


var showAnswer = false;
var enableAnswer = false;


///Stats

var teamAName = "";
var teamAScore = 0;

var teamBName = "";
var teamBScore = 0;

var totalQuestionsAnswered = 0;


///Game Data

var categoryNames = [];
var categoryNamesFiltered = [];

var categoryAWords = [];
var categoryBWords = [];
var categoryCWords = [];
var categoryDWords = [];
var categoryEWords = [];



var currentEntry;
var currentWord = "";
var currentQuestion = "";


var questionID = 0;


///Start Game

function startGame() {


    new Audio("assets/sounds/sound_accept.wav").play();

    document.getElementById('view-menu').style.display = 'none';
    document.getElementById('view-gamesetup').style.display = 'flex';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-question').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

}


///Exit Game

function exitGame() {


    window.location.href = "../index.html";

}


///Reset Game

function resetGame() {


    teamAName = "";
    teamAScore = 0;

    teamBName = "";
    teamBScore = 0;


    totalQuestionsAnswered = 25;


    document.getElementById('team-a-name').innerHTML = teamAName;
    document.getElementById('team-a-score').innerHTML = teamAScore;

    document.getElementById('team-b-name').innerHTML = teamBName;
    document.getElementById('team-b-name').innerHTML = teamBScore;


    document.getElementById('view-menu').style.display = 'flex';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-question').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

}


///Init Game

function initGame() {


    new Audio("assets/sounds/sound_jeopardy_startgame.wav").play();


    totalQuestionsAnswered = 0;


    document.getElementById('view-menu').style.display = 'none';
    document.getElementById('view-gamesetup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'flex';
    document.getElementById('view-question').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';


    setTeamName();

    loadData();

    loadGameboard();

    updateScore();

}


///Set Team Name

function setTeamName() {


    new Audio("assets/sounds/sound_game_confirm.wav").play();


    const inputNameA = document.getElementById('input-teama-name').value;
    const inputNameB = document.getElementById('input-teamb-name').value;

    if (inputNameA.length == 0)
        teamAName = "Team A";

    if (inputNameA.length != 0)
        teamAName = inputNameA;


    if (inputNameB.length == 0)
        teamBName = "Team B";

    if (inputNameB.length != 0)
        teamBName = inputNameB;

}


///Select Question

function selectQuestion(input) {


    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-question').style.display = 'flex';

    document.getElementById('answer-controls').style.display = 'none';

    document.getElementById('text-teamA-name').innerHTML = teamAName;
    document.getElementById('text-teamB-name').innerHTML = teamBName;


    enableAnswer = false;


    currentWord = input;


    const number = currentWord.match(/\d+/g) - 1;


    if (currentWord.startsWith("A"))
        currentEntry = categoryAWords[number];


    if (currentWord.startsWith("B"))
        currentEntry = categoryBWords[number];


    if (currentWord.startsWith("C"))
        currentEntry = categoryCWords[number];


    if (currentWord.startsWith("D"))
        currentEntry = categoryDWords[number];


    if (currentWord.startsWith("E"))
        currentEntry = categoryEWords[number];


    generateQuestion();


    setTimeout(() => {


        document.getElementById('answer-controls').style.display = 'flex';

    }, 100);

}


///Reveal Answer

function revealAnswer() {


    showAnswer = true;

    if (questionID == 10) {


        document.getElementById('game-question').innerHTML = currentEntry.english;

    } else {


        document.getElementById('game-question').innerHTML = currentEntry.jicarilla;

    }

}


///Team A Scored

function teamAScored() {


    new Audio("assets/sounds/sound_game_correct.wav").play();


    var currentItem = currentWord + "-" + gameType;


    document.getElementById(currentItem).innerHTML = "";
    document.getElementById(currentItem).removeAttribute("onclick");
    document.getElementById(currentItem).className = "content-word-answered";

    teamAScore += Number(document.getElementById(currentItem).getAttribute("value")) * scoreMultipler;

    totalQuestionsAnswered++;

    if (totalQuestionsAnswered == 25) {


        setTimeout(() => {


            showResults();

        }, 500);

    } else {


        updateScore();

        document.getElementById('view-gameboard').style.display = 'flex';
        document.getElementById('view-question').style.display = 'none';

    }

}


///Team B Scored

function teamBScored() {


    new Audio("assets/sounds/sound_game_correct.wav").play();


    var currentItem = currentWord + "-" + gameType;


    document.getElementById(currentItem).innerHTML = "";
    document.getElementById(currentItem).removeAttribute("onclick");
    document.getElementById(currentItem).className = "content-word-answered";

    teamBScore += Number(document.getElementById(currentItem).getAttribute("value")) * scoreMultipler;

    totalQuestionsAnswered++;

    if (totalQuestionsAnswered == 25) {


        setTimeout(() => {


            showResults();

        }, 500);

    } else {


        updateScore();

        document.getElementById('view-gameboard').style.display = 'flex';
        document.getElementById('view-question').style.display = 'none';

    }

}


///Show Results

function showResults() {


    var results = "";

    if (teamAScore > teamBScore) {


        if (gameType == "normal")
            results = teamAName + " won with " + teamAScore;

        if (gameType == "sheep")
            results = teamAName + " won with " + teamAScore + " 🐑";

    } else {


        if (gameType == "normal")
            results = teamBName + " won with " + teamBScore;

        if (gameType == "sheep")
            results = teamBName + " won with " + teamBScore + " 🐑";

    }

    document.getElementById('text-team-winner').innerHTML = results;

    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-question').style.display = 'none';
    document.getElementById('view-results').style.display = 'flex';

}


///Update Score

function updateScore() {


    if (enableSheepMode) {


        document.getElementById("team-a-name").innerHTML = teamAName;
        document.getElementById("team-a-score").innerHTML = teamAScore + " 🐑";

        document.getElementById("team-b-name").innerHTML = teamBName;
        document.getElementById("team-b-score").innerHTML = teamBScore + " 🐑";

    } else {


        document.getElementById("team-a-name").innerHTML = teamAName;
        document.getElementById("team-a-score").innerHTML = "$" + teamAScore;

        document.getElementById("team-b-name").innerHTML = teamBName;
        document.getElementById("team-b-score").innerHTML = "$" + teamBScore;

    }

}


///Get Category Names

function getCategoryNames() {


    ///Get Category Names

    indexJeopardyList.forEach(item => {


        if (categoryNames.includes(item.category) == false)
            categoryNames.push(item.category);

    });


    ///Filter Category Names

    categoryNames.forEach(item => {


        if (categoryNamesFiltered.length < 5) {


            var randomItem = categoryNames[Math.floor(Math.random() * categoryNames.length)];

            if (categoryNamesFiltered.includes(randomItem) == false)
                categoryNamesFiltered.push(randomItem);

        }

    });

}


///Get Category Words

function getCategoryWords(input) {


    var tempList = [];

    ///Get Category Words

    indexJeopardyList.forEach(item => {


        if (input == "A") {


            if (item.category == categoryNamesFiltered[0])
                tempList.push(item);

        }

        if (input == "B") {


            if (item.category == categoryNamesFiltered[0]) {


                var randomItem = listA[Math.floor(Math.random() * listA.length)];

                if (categoryAWords.includes(randomItem) == false)
                    categoryAWords.push(randomItem);

            }

        }

    });

}


///Load Data

function loadData() {


    getCategoryNames();


    loadCategoryWords();


    document.getElementById('category-a').innerHTML = categoryNamesFiltered[0];
    document.getElementById('category-b').innerHTML = categoryNamesFiltered[1];
    document.getElementById('category-c').innerHTML = categoryNamesFiltered[2];
    document.getElementById('category-d').innerHTML = categoryNamesFiltered[3];
    document.getElementById('category-e').innerHTML = categoryNamesFiltered[4];

}


///Get 5 Words Per Category

function loadCategoryWords() {


    categoryAWords = [];
    categoryBWords = [];
    categoryCWords = [];
    categoryDWords = [];
    categoryEWords = [];


    const categoryLists = categoryNamesFiltered.slice(0, 5).map(categoryName => {


        return indexJeopardyList.filter(item => item.category === categoryName);

    });


    categoryAWords = getRandomItems(categoryLists[0], 5);
    categoryBWords = getRandomItems(categoryLists[1], 5);
    categoryCWords = getRandomItems(categoryLists[2], 5);
    categoryDWords = getRandomItems(categoryLists[3], 5);
    categoryEWords = getRandomItems(categoryLists[4], 5);


    console.log(categoryAWords);
    console.log(categoryBWords);
    console.log(categoryCWords);
    console.log(categoryDWords);
    console.log(categoryEWords);

}


///Get Random Items from List

function getRandomItems(list, amount) {


    const shuffled = [...list];

    for (let i = shuffled.length - 1; i > 0; i--) {


        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];

    }


    return shuffled.slice(0, amount);

}


///Generate Question

function generateQuestion() {


    document.getElementById('game-question').innerHTML = "";

    currentQuestion = "";
    questionID = 0;

    var random = Math.floor(Math.random() * 10) + 1;

    questionID = random;


    if (random == 1)
        currentQuestion = `How do you say "` + currentEntry.english + `" in Jicarilla?`;

    if (random == 2)
        currentQuestion = `How do you say "` + currentEntry.english + `" in Jicarilla?`;

    if (random == 3)
        currentQuestion = `In Jicarilla, how do you say "` + currentEntry.english + `"?`;

    if (random == 4)
        currentQuestion = `In Jicarilla, how do you say "` + currentEntry.english + `"?`;

    if (random == 5)
        currentQuestion = `What is "` + currentEntry.english + `" in Jicarilla?`;

    if (random == 6)
        currentQuestion = `What is "` + currentEntry.english + `" in Jicarilla?`;

    if (random == 7)
        currentQuestion = `What's "` + currentEntry.english + `" in Jicarilla?`;

    if (random == 8)
        currentQuestion = `If someone were to ask you how to say "` + currentEntry.english + `". What would you say?`;

    if (random == 9)
        currentQuestion = `Dom forgot how to say "` + currentEntry.english + `" in Jicarilla. What would you tell him?`;

    if (random == 10)
        currentQuestion = `Mangááni mikeo, ha'dao "` + currentEntry.jicarilla + `" a ji ni?`;


    document.getElementById('game-question').innerHTML = currentQuestion;

}


///Return to Board

function returnToBoard() {


    document.getElementById('view-gameboard').style.display = 'flex';
    document.getElementById('view-question').style.display = 'none';

    updateScore();

}


///Switch to Sheep Mode

function toggleSheepMode() {


    new Audio("assets/sounds/sound_jeopardy_changegametype.wav").play();

    enableSheepMode = !enableSheepMode;

    if (enableSheepMode) {


        gameType = "sheep";

        document.getElementById('button-sheepmode').innerHTML = "🐑 Disable Sheep Mode 🐑";

        alert("Sheep Mode Enabled.");

    } else {


        gameType = "normal";

        document.getElementById('button-sheepmode').innerHTML = "🐑 Enable Sheep Mode 🐑";

        alert("Sheep Mode Disabled.");

    }

}


///Load Gameboard

function loadGameboard() {


    resetBoard();

    if (enableSheepMode) {


        scoreMultipler = 1;

        document.getElementById('gameboard-normal').style.display = 'none';
        document.getElementById('gameboard-sheep').style.display = 'flex';

    } else {


        scoreMultipler = 200;

        document.getElementById('gameboard-normal').style.display = 'flex';
        document.getElementById('gameboard-sheep').style.display = 'none';

    }

}


///Reset Button on Board

function resetButton(input) {


    var currentItem = input + "-" + gameType;

    if (gameType == "normal") {


        if (input.includes("1"))
            document.getElementById(currentItem).innerHTML = "$200";

        if (input.includes("2"))
            document.getElementById(currentItem).innerHTML = "$400";

        if (input.includes("3"))
            document.getElementById(currentItem).innerHTML = "$600";

        if (input.includes("4"))
            document.getElementById(currentItem).innerHTML = "$800";

        if (input.includes("5"))
            document.getElementById(currentItem).innerHTML = "$1000";

    }

    if (gameType == "sheep") {


        if (input.includes("1"))
            document.getElementById(currentItem).innerHTML = "1 🐑";

        if (input.includes("2"))
            document.getElementById(currentItem).innerHTML = "2 🐑";

        if (input.includes("3"))
            document.getElementById(currentItem).innerHTML = "3 🐑";

        if (input.includes("4"))
            document.getElementById(currentItem).innerHTML = "4 🐑";

        if (input.includes("5"))
            document.getElementById(currentItem).innerHTML = "5 🐑";

    }


    document.getElementById(currentItem).setAttribute("onclick", "selectQuestion('" + input + "')");
    document.getElementById(currentItem).className = "content-word";

}


///Reset Board

function resetBoard() {


    resetButton("A1");
    resetButton("A2");
    resetButton("A3");
    resetButton("A4");
    resetButton("A5");

    resetButton("B1");
    resetButton("B2");
    resetButton("B3");
    resetButton("B4");
    resetButton("B5");

    resetButton("C1");
    resetButton("C2");
    resetButton("C3");
    resetButton("C4");
    resetButton("C5");

    resetButton("D1");
    resetButton("D2");
    resetButton("D3");
    resetButton("D4");
    resetButton("D5");

    resetButton("E1");
    resetButton("E2");
    resetButton("E3");
    resetButton("E4");
    resetButton("E5");

}


///Init

function init() {


    document.getElementById('view-menu').style.display = 'flex';
    document.getElementById('view-gamesetup').style.display = 'none';
    document.getElementById('view-gameboard').style.display = 'none';
    document.getElementById('view-question').style.display = 'none';
    document.getElementById('view-results').style.display = 'none';

}


window.onload = function () {


    init();

};