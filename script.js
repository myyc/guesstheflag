let flags = [];
let currentFlag;

document.addEventListener('DOMContentLoaded', () => {
    loadFlags();
    document.getElementById('guess-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
    setFocusOnInput();
});

function loadFlags() {
    fetch('countries.json')
        .then(response => response.json())
        .then(data => {
            flags = data.map(country => ({
                emoji: countryCodeToFlag(country.cca2),
                answers: [
                    country.name.common.toLowerCase(),
                    country.name.official.toLowerCase(),
                    country.cca2.toLowerCase()
                ]
            }));
            displayNewFlag();
        })
        .catch(error => {
            console.error('Failed to load flags:', error);
        });
}


function countryCodeToFlag(countryCode) {
    return String.fromCodePoint(...countryCode.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0)));
}

function displayNewFlag() {
    if (flags.length > 0) {
        currentFlag = flags[Math.floor(Math.random() * flags.length)];
        document.getElementById('flag-display').textContent = currentFlag.emoji;
    }
}

function checkGuess() {
    const userInput = document.getElementById('guess-input');
    const userGuess = normalizeString(userInput.value); // Normalize user input to remove accents
    const resultDiv = document.getElementById('result');

    if (currentFlag && currentFlag.answers.includes(userGuess)) {
        resultDiv.textContent = 'Correct!';
        resultDiv.className = 'correct';
        setTimeout(() => {
            resultDiv.textContent = ''; // Clear the message after 2 seconds
        }, 1000);
        displayNewFlag(); // Only change the flag on a correct guess
    } else {
        resultDiv.textContent = 'Incorrect, try again!';
        resultDiv.className = 'incorrect';
        setTimeout(() => {
            resultDiv.textContent = ''; // Clear the message after 2 seconds
        }, 1000);
    }
    userInput.value = ''; // Reset the input field after a guess
    setFocusOnInput(); // Refocus on the input field after each guess
}

function setFocusOnInput() {
    document.getElementById('guess-input').focus();
}

function normalizeString(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("-", " ").toLowerCase();
}

function searchEmoji() {
    const emoji = document.getElementById('flag-display').textContent; // Get the emoji from the div
    const query = encodeURIComponent(emoji); // Encode the emoji for URL use
    const url = `https://duckduckgo.com/?q=${query}&t=hy&ia=web`;
    window.open(url, '_blank'); // Open the search in a new tab
    setFocusOnInput(); // Refocus on the input field
}
