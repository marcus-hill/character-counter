let mainTextBox = document.getElementById("text-input");
let excludeSpaces = document.getElementById("exclude-spaces");
let characterLimit = document.getElementById("character-limit");
let characterWarning = document.getElementById("character-warning");
let characterLimitWarning = document.getElementById("character-limit-warning");
let setCharacterLimit = document.getElementById("set-character-limit");
let characterLimitLabel = document.getElementById("character-limit-label");

let alphabet = [["A"], ["B"], ["C"], ["D"], ["E"], ["F"], ["G"], ["H"], ["I"], ["J"], ["K"], ["L"], ["M"], ["N"], ["O"], ["P"], ["Q"], ["R"], ["S"], ["T"], ["U"], ["V"], ["W"], ["X"], ["Y"], ["Z"]];

let lightMode = false

document.getElementById("sun-icon").addEventListener("click", () => {
    var els = document.querySelectorAll("*");
    if (lightMode) {
        for (var i=0; i < els.length; i++) {
            els[i].setAttribute('data-theme', 'dark');
        }
        lightMode = false
    } else {
        for (var i=0; i < els.length; i++) {
            els[i].setAttribute('data-theme', 'light');
        }
        lightMode = true
    }
});


characterLimitLabel.addEventListener("mouseover", () => {
    mainTextBox.classList.add("input-limit");
});

characterLimitLabel.addEventListener("mouseout", () => {
    mainTextBox.classList.remove("input-limit");
});

function activateMode() {
    var els = document.querySelectorAll("*");
    if (lightMode) {
        for (var i=0; i < els.length; i++) {
            els[i].setAttribute('data-theme', 'light');
        }
    } else {
        for (var i=0; i < els.length; i++) {
            els[i].setAttribute('data-theme', 'dark');
        }
    }
}

function removeOldStatistics() {
    alphabet.forEach(function(currentValue, index, arr) {
        console.log(alphabet[index][2])
        if (alphabet[index][2] !== null && alphabet[index][2] !== undefined) {

            let childElement = alphabet[index][2].firstChild;

            while (childElement.firstChild) {
                childElement.removeChild(childElement.lastChild);
            };

            childElement.remove();

            alphabet[index][2].remove();
        }

        alphabet[index] = [currentValue[0], 0]
    });
};

function generateFrontPageStatistics() {

    let mainTextBoxText = mainTextBox.value;

    let textBoxLength = mainTextBoxText.length

    console.log("Current Length: " + textBoxLength);

    if (excludeSpaces.checked) {
        textBoxLength = mainTextBoxText.replace(/\s/g, '').length;
        console.log(textBoxLength + "length");
    }

    document.getElementById("characters-statistic").innerHTML = textBoxLength;

    let numberOfWords = mainTextBox.value.trim().split(/\s+/).length;
    
    document.getElementById("words-statistic").innerHTML = numberOfWords;

    let numberOfSentences = mainTextBox.value.trim().split(/[.!?]/).length - 1;

    if (numberOfSentences < 1 && textBoxLength > 0) {
        numberOfSentences = 1;
    } else if (numberOfSentences < 0) {
        numberOfSentences = 0;
    }

    document.getElementById("sentences-statistic").innerHTML = numberOfSentences;
};

function calculateStatistics() {
    alphabet.sort(function(a, b) {
        return b[1] - a[1];
    });

    if (mainTextBox.value.length > 0) {
        if (showingMore) {
            seeMoreButton.classList.add("hidden");
            seeLessButton.classList.remove("hidden");   
        } else {
            seeMoreButton.classList.remove("hidden");
            seeLessButton.classList.add("hidden");   
        }
        document.getElementById("no-text").classList.add("hidden");
    } else {
        document.getElementById("no-text").classList.remove("hidden");

        seeMoreButton.classList.add("hidden");
        seeLessButton.classList.add("hidden");
    };

    let currentDiv = document.getElementById("letter-density-title");

    alphabet.forEach(function(currentValue, index, arr) {
        console.log((!showingMore && index < 5) || showingMore);
        
        console.log(currentValue[1]);
        if (currentValue[1] > 0 && ((!showingMore && index < 5) || showingMore)) {
            console.log("creating element.....")
            let statisticsDiv = document.createElement("div");
            statisticsDiv.classList.add("density-statistics");

            if (index == 0) {
                statisticsDiv.style.marginTop = "1rem";
            }
    
            currentDiv.appendChild(statisticsDiv);
    
            let holderDiv = document.createElement("div");
            holderDiv.classList.add("statistic-letter-holder");
    
            statisticsDiv.appendChild(holderDiv);
    
            let para = document.createElement("p");
            para.classList.add("statistic-letter-title");
    
            let titleText = document.createTextNode(currentValue[0]);
            para.appendChild(titleText);
    
            holderDiv.appendChild(para);
    
    
            let progressBar = document.createElement("progress");
            progressBar.classList.add("statistic-letter-progress")
            progressBar.id = currentValue[0];
            progressBar.max = mainTextBox.value.length;
            progressBar.value = currentValue[1];
    
            holderDiv.appendChild(progressBar);
    
            let label = document.createElement("p");
            label.classList.add("statistic-letter-percentage");
    
            let labelText = document.createTextNode(currentValue[0].toString() + " (" + ((Number(currentValue[1]) / Number(mainTextBox.value.length)) * 100).toFixed(2) + "%)");
            label.appendChild(labelText);
    
            holderDiv.appendChild(label);
    
            alphabet[index] = [alphabet[index][0], alphabet[index][1], statisticsDiv]

            activateMode();
        }
    });
}

function checkCharacterLimit() {

    let mainTextBoxText = mainTextBox.value;

    let textBoxLength = mainTextBoxText.length

    console.log("Current Length: " + textBoxLength);

    if (excludeSpaces.checked) {
        textBoxLength = mainTextBoxText.replace(/\s/g, '').length;
        console.log(textBoxLength + "length");
    }

    if (textBoxLength > characterLimit.value && characterLimit.value !== "") {
        characterWarning.classList.remove("hidden");

        mainTextBox.classList.add("input-warning");
    } else {
        characterWarning.classList.add("hidden");

        mainTextBox.classList.remove("input-warning");
    };
};

function generateArray() {
    let mainTextBoxValue = mainTextBox.value;

    if (excludeSpaces.checked) {
        mainTextBoxValue = mainTextBox.value.replace(" ", "");
    }

    let upperCase = mainTextBoxValue.toUpperCase();

    for (let i in upperCase) {
        console.log("checking letter" + upperCase.charAt(i));
        alphabet.forEach(function(currentValue, index, arr) {
            console.log("Character AT is : " + upperCase.charAt(i));
            console.log("Current Letter iun Array: " + currentValue[0].toString())
            if (upperCase.charAt(i) === currentValue[0].toString()) {
                console.log("increasing value of letter " + currentValue[0])
                console.log(Number(currentValue[1]) + 1 + "HEREEE")
                alphabet[index][1] = Number(currentValue[1]) + 1
            };
        });
    };
};

let readingTimeMinutes = document.getElementById("reading-time-minutes");
let minutesTag = document.getElementById("minute-time");

mainTextBox.addEventListener("input", () => {
    checkCharacterLimit();

    if (mainTextBox.value.length > 300) {
        readingTimeMinutes.innerHTML = (Math.floor(mainTextBox.value.length / 300)).toString();
        minutesTag.innerHTML = "minutes";
    } else {
        readingTimeMinutes.innerHTML = "1";
        minutesTag.innerHTML = "minute";
    };
});

mainTextBox.addEventListener("change", () => {
    removeOldStatistics();

    generateArray();

    calculateStatistics();

    generateFrontPageStatistics();
});

let seeMoreButton = document.getElementById("toggle-letters-more");
let seeLessButton = document.getElementById("toggle-letters-less");

let showingMore = false

seeMoreButton.addEventListener("click", () => {
    showingMore = true

    seeMoreButton.classList.add("hidden");
    seeLessButton.classList.remove("hidden");

    removeOldStatistics();

    generateArray();

    calculateStatistics();
});

seeLessButton.addEventListener("click", () => {
    showingMore = false

    seeLessButton.classList.add("hidden");
    seeMoreButton.classList.remove("hidden");

    removeOldStatistics();

    generateArray();
    
    calculateStatistics();
});

setCharacterLimit.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
        console.log("test");
        characterLimit.classList.remove("hidden");
    } else {
        characterLimit.classList.add("hidden");
        characterWarning.classList.add("hidden");
        characterLimit.value = "";
    };
});

characterLimit.addEventListener("input", (event) => {
    if (mainTextBox.value.length > event.currentTarget.value && event.currentTarget.value !== "") {
        characterLimitWarning.innerHTML = event.currentTarget.value;
    }
    
    checkCharacterLimit();
});

excludeSpaces.addEventListener("change", (event) => {
    checkCharacterLimit();

    generateFrontPageStatistics();
});