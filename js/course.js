


function checkAnswer(question, answer) {


    const choice = document.querySelector(`input[name="${question}"]:checked`);
    const result = document.getElementById(`result-${question}`);

    if (choice == false) {

        result.style.display = "flex";
        result.textContent = "Choose an answer.";
        result.style.color = "black";
        return;
    }

    if (choice.value === answer) {

        result.style.display = "flex";
        result.textContent = "Correct.";
        result.style.color = "green";
        new Audio("../assets/sounds/sound_correct.wav").play();

    } else {

        result.style.display = "flex";
        result.textContent = "Incorrect.";
        result.style.color = "red";
        new Audio("../assets/sounds/sound_incorrect.wav").play();

    }

}

