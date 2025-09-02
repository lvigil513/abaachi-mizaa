



///Header List

const listHeader = [


    { page: "Home", url: "index.html" },
    { page: "Courses", url: "courses.html" },
    { page: "Dictionary", url: "dictionary.html" },
    { page: "Phrases", url: "phrases.html" },
    { page: "Games", url: "games.html" },
    { page: "Resources", url: "resources.html" },

]



///Loads the Header

function loadHeader() {




    const root = document.getElementById('nav-header');


    root.innerHTML = "";


    listHeader.forEach(item => {


        const container = document.createElement('div');
        const container_text = document.createElement('p');


        container.className = "button-header";
        container_text.className = "text-header";
        container_text.innerHTML = item.page;


        const newDiv = container;


        newDiv.setAttribute("onclick", "openLink('" + item.url + "')");


        newDiv.appendChild(container_text);


        root.appendChild(newDiv);

    });

}


///Go to Page

function openLink(input) {


    window.location.href = input;

}


//Play Audio

function playAudio(url) {


    new Audio("assets/sounds/" + url).play();

}


///Toggle Sections

function toggleSection(input) {


    const element = document.getElementById(input);
    const text = document.getElementById(input + '-toggle');

    if (element.style.display === 'block') {


        element.style.display = 'none';
        text.innerText = '(expand)';

    } else {


        element.style.display = 'block';
        text.innerText = '(collapse)';

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


///Run Functions

window.onload = function () {



    loadHeader();

};
