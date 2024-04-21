document.addEventListener('DOMContentLoaded', () => {
    loadFlags();
    document.getElementById('guess-button').addEventListener('click', checkGuess);
    document.getElementById('guess-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
});

let flags = [];
let currentFlag;

function loadFlags() {
    fetch('countries.json')
        .then(response => response.json())
        .then(data => {
            flags = data.map(country => ({
                emoji: getFlagEmoji(country.cca2),
                answers: [country.name.common.toLowerCase(), country.name.official.toLowerCase()]
            }));
            displayNewFlag();
        })
        .catch(error => console.error('Failed to load flags:', error));
}

function getFlagEmoji(cca2) {
    return String.fromCodePoint(...cca2.split('').map(c => 127397 + c.charCodeAt(0)));
}

function displayNewFlag() {
    if (flags.length > 0) {
        currentFlag = flags[Math.floor(Math.random() * flags.length)];
        document.getElementById('flag-display').textContent = currentFlag.emoji;
    }
}

function normalizeString(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function checkGuess() {
    const userInput = document.getElementById('guess-input');
    const userGuess = normalizeString(userInput.value); // Normalize user input to remove accents
    const resultDiv = document.getElementById('result');

    if (currentFlag && (currentFlag.answers.includes(userGuess) || currentFlag.answers.some(answer => normalizeString(answer) === userGuess))) {
        resultDiv.textContent = 'Correct!';
        resultDiv.className = 'correct'; // Apply correct class for styling
        displayNewFlag(); // Change to a new flag only if the guess is correct
    } else {
        resultDiv.textContent = 'Incorrect, try again!';
        resultDiv.className = 'incorrect'; // Apply incorrect class for styling
    }
    userInput.value = ''; // Reset the input field after a guess
}
