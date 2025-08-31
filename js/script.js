



//Play Audio

function playAudio(url) {

    new Audio("assets/sounds/" + url).play();

}


///Toggle Sections

function toggleSection(input) {


    const element = document.getElementById(input);

    if (element.style.display === 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }

}


///Check Text

function inputText(id, out, prefix, suffix) {


    const input = document.getElementById(id);
    const output = document.getElementById("output");
    const placeholder = "Enter text here...";
    

    input.addEventListener("input", () => {


        if (input == "") {


            output.textContent = placeholder;

        } else {


            output.textContent = prefix + input.value + suffix;

        }

    });

}
