

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