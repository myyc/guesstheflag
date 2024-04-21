let flags = [];
let currentFlag;

document.addEventListener('DOMContentLoaded', () => {
    loadFlags();
    document.getElementById('search-input').focus(); // Set focus on the input field when the page loads
});

document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        let suggestions = document.getElementById('autocomplete-list').children;
        if (suggestions.length > 0) {
            suggestions[0].click();
        } else {
            checkGuess(this.value);
        }
    }
});

function normalizeString(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function loadFlags() {
    fetch('countries.json')
        .then(response => response.json())
        .then(data => {
            flags = data.map(country => ({
                emoji: countryCodeToFlag(country.cca2),
                commonName: normalizeString(country.name.common) // Normalize and store the common names
            }));
            selectRandomFlag();
        })
        .catch(error => console.error('Failed to load flags:', error));
}

document.getElementById('search-input').addEventListener('input', function () {
    const input = this.value.toLowerCase();
    const suggestions = document.getElementById('autocomplete-list');

    // Clear the autocomplete list and ensure it's visible
    suggestions.innerHTML = '';
    suggestions.style.display = 'block';

    if (!input) {
        // Hide the autocomplete list if the input is empty
        suggestions.style.display = 'none';
        return;
    }

    flags.forEach(flag => {
        if (flag.commonName.toLowerCase().includes(input)) {
            const item = document.createElement('div');
            item.textContent = flag.commonName;
            item.addEventListener('click', function () {
                document.getElementById('search-input').value = flag.commonName;
                checkGuess(flag.commonName);
                suggestions.innerHTML = '';
                suggestions.style.display = 'none'; // Hide after selection
            });
            suggestions.appendChild(item);
        }
    });

    if (suggestions.innerHTML === '') {
        suggestions.style.display = 'none'; // Hide if there are no suggestions
    }
});


function checkGuess(guessedName) {
    const normalizedGuess = guessedName.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    if (normalizedGuess === currentFlag.commonName) {
        resultDiv.textContent = 'Correct!';
        resultDiv.className = 'correct';
        selectRandomFlag(); // Immediately select a new flag upon a correct guess
    } else {
        resultDiv.textContent = 'Incorrect, try again!';
        resultDiv.className = 'incorrect';
    }
    setTimeout(() => {
        resultDiv.textContent = '';
        resultDiv.className = '';
    }, 300);
    document.getElementById('search-input').value = ''; // Clear input field
    document.getElementById('search-input').focus(); // Refocus on the input field after guess
}

function selectRandomFlag() {
    currentFlag = flags[Math.floor(Math.random() * flags.length)];
    document.getElementById('flag-display').textContent = currentFlag.emoji;
    document.getElementById('flag-display').onclick = () => searchFlagEmoji(currentFlag.emoji);
    document.getElementById('search-input').focus();
}

function searchFlagEmoji(emoji) {
    const url = `https://duckduckgo.com/?q=${encodeURIComponent(emoji)}&t=hy&ia=web`;
    window.open(url, '_blank');
    document.getElementById('search-input').focus();
}

function countryCodeToFlag(countryCode) {
    return String.fromCodePoint(...countryCode.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0)));
}
