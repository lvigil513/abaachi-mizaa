



audioPlayer = new Audio


var revisedDate = "10/18/25";


var inputSearchDictionary = "";
var inputSearchPhrase = "";


var displayType = "normal";


var deviceType = "mobile";


var currentType = "word";
var currentCategory = "animals";


var searchPhrase = "";


var enableLightMode = false;


var listCategories = [];


///List: Header

const listHeader = [


    { page: "Home", url: "index.html" },
    { page: "Dictionary", url: "dictionary.html" },
    { page: "Information", url: "information.html" },
    { page: "Games", url: "games.html" },
    { page: "Resources", url: "resources.html" },

]




///Toggle Category

function toggleCategory(input) {


    const element = document.getElementById(input);

    if (element.style.display === 'none') {


        element.style.display = 'block';

    } else {


        element.style.display = 'none';

    }

}




///Change category

function changeCategory(input) {


    const tabWords = document.getElementById('tab-words');
    const tabPhrases = document.getElementById('tab-phrases');
    const tabVerbs = document.getElementById('tab-verbs');


    const contentBackground = document.getElementById('list-category-background');
    const contentDictionary = document.getElementById('list-dictionary-content');


    if (input == "words") {


        currentCategory = "word";


        tabWords.style.zIndex = 2;
        tabPhrases.style.zIndex = 1;
        tabVerbs.style.zIndex = 1;

        contentDictionary.style.backgroundColor = "#C83232";
        contentBackground.style.backgroundColor = "#E49999";

        document.getElementById('list-bottom').style.backgroundImage = "url('assets/ui/ui_folder_bottom_words.png')";

        loadContent();

    }


    if (input == "phrases") {


        currentCategory = "phrase";


        tabWords.style.zIndex = 1;
        tabPhrases.style.zIndex = 2;
        tabVerbs.style.zIndex = 1;

        contentDictionary.style.backgroundColor = "#FF8032";
        contentBackground.style.backgroundColor = "#FFBF98";

        document.getElementById('list-bottom').style.backgroundImage = "url('assets/ui/ui_folder_bottom_phrases.png')";

        loadContent();

    }


    if (input == "verbs") {


        currentCategory = "verb";


        tabWords.style.zIndex = 1;
        tabPhrases.style.zIndex = 1;
        tabVerbs.style.zIndex = 2;

        contentDictionary.style.backgroundColor = "#32C832";
        contentBackground.style.backgroundColor = "#99E49A";

        document.getElementById('list-bottom').style.backgroundImage = "url('assets/ui/ui_folder_bottom_verbs.png')";

        loadContent();

    }

}




///Change type

function changeType(input) {


    const tabWords = document.getElementById('tab-words');
    const tabPhrases = document.getElementById('tab-phrases');
    const tabVerbs = document.getElementById('tab-verbs');


    const contentStyle = document.getElementById('list-dictionary-content').style;


    currentType = input;


    if (currentType == "word") {


        tabWords.style.zIndex = 2;
        tabPhrases.style.zIndex = 1;
        tabVerbs.style.zIndex = 1;

        contentStyle.backgroundColor = "#C83232";

        document.getElementById('list-bottom').style.backgroundImage = "url('assets/ui/ui_folder_bottom_words.png')";

        loadContent();

    }

    if (currentType == "phrase") {


        tabWords.style.zIndex = 1;
        tabPhrases.style.zIndex = 2;
        tabVerbs.style.zIndex = 1;

        contentStyle.backgroundColor = "#FF8032";

        document.getElementById('list-bottom').style.backgroundImage = "url('assets/ui/ui_folder_bottom_phrases.png')";

        loadContent();

    }

    if (currentType == "verb") {


        tabWords.style.zIndex = 1;
        tabPhrases.style.zIndex = 1;
        tabVerbs.style.zIndex = 2;

        contentStyle.backgroundColor = "#32C832";

        document.getElementById('list-bottom').style.backgroundImage = "url('assets/ui/ui_folder_bottom_verbs.png')";

        loadContent();

    }

}




///Reformat Category Titles

function categoryTitleFormat(input) {


    let result = input
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");


    ///Replace

    if (result == "Body Parts Animals")
        result = "Body Parts (Animals)";


    if (result == "Days Of The Week")
        result = "Days of the Week";


    if (result == "Picking Pinon")
        result = "Picking (Piñon)";


    if (result == "Picking Plant")
        result = "Picking (Plant)";


    if (result == "Pick Up Object")
        result = "Pick Up (Object)";


    if (result == "Time Of Day")
        result = "Time of Day";


    return result;

}




///Load Categories

function loadCategories() {


    const root = document.getElementById('content-main');


    listCategories = [];


    root.innerHTML = "";


    index.forEach(item => {


        if (item.type == currentType) {


            if (listCategories.includes(item.category) == false)
                listCategories.push(item.category);

        }

    })


    listCategories.forEach(item => {


        const categoryMain = document.createElement('div');
        categoryMain.className = "content-list-category";


        var textCategory = item;


        if (currentType == "word")
            categoryMain.style.backgroundColor = "#771E1E";

        if (currentType == "phrase")
            categoryMain.style.backgroundColor = "#984C1D";

        if (currentType == "verb")
            categoryMain.style.backgroundColor = "#1D771E";


        const contentTitle = document.createElement('div');
        contentTitle.className = "content-category-title";
        contentTitle.setAttribute("onclick", "toggleCategory('index-" + textCategory + "')");

        const contentTitleText = document.createElement('h2');
        contentTitleText.className = "text-content-category";
        contentTitleText.innerHTML = categoryTitleFormat(textCategory);

        const contentTitleIcon = document.createElement('img');
        contentTitleIcon.src = "assets/ui/ui_list_dropdown.png";


        const contentList = document.createElement('div');
        contentList.id = "index-" + textCategory;
        contentList.style.display = "none";




        contentTitle.appendChild(contentTitleText);
        contentTitle.appendChild(contentTitleIcon);


        categoryMain.appendChild(contentTitle);
        categoryMain.appendChild(contentList);




        root.appendChild(categoryMain);

    })



    loadEntries();

}







///Load Content

function loadContent() {


    const input = document.getElementById('input-search');

    if (input.value == "") {


        loadCategories();

    } else {


        loadSearch();

    }

}




///Load Entries

function loadEntries() {




    index.forEach(item => {


        const root = document.getElementById('index-' + item.category);


        ///Normal

        if (displayType == "normal") {




            if (item.type == currentType) {




                const container = document.createElement('div');

                const containerTextTitle = document.createElement('p');
                const containerTextTranslation = document.createElement('p');


                container.className = "content";
                containerTextTitle.innerHTML = item.english;
                containerTextTitle.className = "text-content-heading";
                containerTextTranslation.innerHTML = item.jicarilla;
                containerTextTranslation.className = "text-content-body";


                container.appendChild(containerTextTitle);
                container.appendChild(containerTextTranslation);


                root.appendChild(container);

            }

        }


        ///Index Cards

        if (displayType == "index-card") {


            if (item.type == currentType) {


                const container = document.createElement('div');

                const containerTextTitle = document.createElement('h2');
                const containerTextTranslation = document.createElement('p');


                container.className = "index-card";


                containerTextTitle.innerHTML = item.english;
                containerTextTitle.className = "text-indexcard-heading";
                containerTextTranslation.innerHTML = item.jicarilla;
                containerTextTranslation.className = "text-indexcard-body";


                container.appendChild(containerTextTitle);
                container.appendChild(containerTextTranslation);


                content.appendChild(container);

            }

        }

    })


    updateEntriesCount();

}




///Load Search

function loadSearch() {




    const input = document.getElementById('input-search');


    if (input.value != "") {


        const root = document.getElementById('content-main');


        const formattedText = input.value.toLowerCase().replaceAll(" ", "_");


        root.innerHTML = "";


        searchPhrase = input.value;


        index.forEach(item => {


            const formattedItem = item.english.toLowerCase().replaceAll(" ", "_");

            if (item.type == currentType) {


                if (formattedItem.includes(formattedText)) {


                    const container = document.createElement('div');

                    const containerTextTitle = document.createElement('p');
                    const containerTextTranslation = document.createElement('p');


                    container.className = "content";
                    containerTextTitle.innerHTML = item.english;
                    containerTextTitle.className = "text-content-heading";
                    containerTextTranslation.innerHTML = item.jicarilla;
                    containerTextTranslation.className = "text-content-body";


                    container.appendChild(containerTextTitle);
                    container.appendChild(containerTextTranslation);


                    root.appendChild(container);

                }

            }

        })


        updateEntriesCount();

    }

}




///Loads the Header

function loadHeader() {




    const container = document.getElementById('nav-header');


    const textDateRevised = document.getElementById('text-date-revised');


    if (textDateRevised != null)
        textDateRevised.innerHTML = "Last revised: " + revisedDate;


    const container_img = document.createElement('img');
    const container_nav = document.createElement('div');


    container.innerHTML = "";


    container_img.className = "img-header";
    container_img.src = "assets/header/header_logo.png";


    container_nav.className = "list-header";
    container_nav.setAttribute("id", "nav-header");


    container.appendChild(container_img);
    container.appendChild(container_nav);

    listHeader.forEach(item => {


        const root = document.getElementById('nav-header');


        const obj = document.createElement('div');
        const obj_text = document.createElement('p');


        obj.className = "button-header";
        obj_text.className = "text-header";
        obj_text.innerHTML = item.page;


        const newDiv = obj;


        newDiv.setAttribute("onclick", "openLink('" + item.url + "')");


        newDiv.appendChild(obj_text);


        container_nav.appendChild(newDiv);

    });

}




function clearSearch() {


    const input = document.getElementById('input-search');
    input.value = "";


    loadContent();

}




///Go to Page

function openLink(input) {


    window.location.href = input;

}




//Play Audio

function playAudio(url) {


    if (audioPlayer().play == false) {


        new Audio("assets/sounds/" + url).play();

    }

}




function countIndexList(input) {


    const text = document.getElementById('data-index-count-list');


    const list = [];


    if (input != "") {


        index.forEach(item => {


            if (item.category == input) {


                list.push(item);

                text.innerHTML = "Entries (" + input + "): " + list.length;

            }

        })

    }


    if (input == "")
        text.innerHTML = "Entries: " + index.length;

}




///Update Entries Count

function updateEntriesCount() {




    var indexAll = [];
    var indexCurrent = [];


    const output = document.getElementById('data-index-count');


    index.forEach(item => {


        indexAll.push(item);

        if (item.type == currentType)
            indexCurrent.push(item);

    })


    if (indexCurrent.length > 0) {


        if (currentType == "word")
            output.innerHTML = "Dictionary contains " + indexAll.length + " total entries. There are " + indexCurrent.length + " entries for words.";


        if (currentType == "phrase")
            output.innerHTML = "Dictionary contains " + indexAll.length + " total entries. There are " + indexCurrent.length + " entries for phrases.";


        if (currentType == "verb")
            output.innerHTML = "Dictionary contains " + indexAll.length + " total entries. There are " + indexCurrent.length + " entries for verbs.";

    }


    if (indexCurrent.length == 0)
        output.innerHTML = "Dictionary contains " + indexAll.length + ".";

}




///Screen Size

function getScreenSize() {


    const element = document.getElementById('output-screensize');


    if (element != null) {


        if (window.innerWidth > 800)
            deviceType = "";


        if (window.innerWidth < 800)
            deviceType = "mobile";

    }

}




///Run Functions

window.onload = function () {


    getScreenSize();


    loadHeader();


    changeType(currentType);

};
