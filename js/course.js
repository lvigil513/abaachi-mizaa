

///Check Answer

function checkAnswer(question, answer) {


    const choice = document.querySelector(`input[name="${question}"]:checked`);
    const result = document.getElementById(`result-${question}`);


    if (choice.value == "") {


        new Audio("../assets/sounds/sound_incorrect.wav").play();


        result.style.display = "flex";
        result.textContent = "Choose an answer.";
        result.style.color = "black";

    }


    if (choice.value === answer) {


        new Audio("../assets/sounds/sound_correct.wav").play();


        result.style.display = "flex";
        result.textContent = "Correct.";
        result.style.color = "green";

    } else {


        new Audio("../assets/sounds/sound_incorrect.wav").play();

        result.style.display = "flex";
        result.textContent = "Incorrect.";
        result.style.color = "red";

    }

}




// Select all inputs that should trigger output updates
document.querySelectorAll("input[text-output]").forEach(input => {


    const outputId = input.getAttribute("text-output");
    const output = document.getElementById(outputId);
    const textPlaceholder = input.getAttribute("placeholder");
    const textPrefix = input.getAttribute("text-prefix");
    const textSuffix = input.getAttribute("text-suffix");


    output.textContent = "";


    // Event listener
    input.addEventListener("input", () => {


        if (input.value.trim() === "" || input.value === null || input == null) {


            output.textContent = "";

        } else {


            if (textPrefix != null) {


                output.textContent = textPrefix + input.value;

            }

            if (textSuffix != null) {


                output.textContent = input.value + textSuffix;

            }


            if (textPrefix != null && textSuffix != null) {


                output.textContent = textPrefix + input.value + textSuffix;

            }

        }

    });

});

