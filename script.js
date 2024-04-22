let flags = [];
let currentFlag;

document.addEventListener('DOMContentLoaded', () => {
    loadFlags();
    document.getElementById('search-input').focus(); // Set focus on the input field when the page loads
});

document.getElementById('search-input').addEventListener('keydown', function (event) {
    let suggestions = document.getElementById('autocomplete-list').children;
    let active = document.querySelector('.autocomplete-active');

    if (event.key === 'ArrowDown') {
        event.preventDefault(); // Prevent the cursor from moving
        if (!active || active.nextSibling == null) {
            // If no item is active or the active item is the last one, focus the first item
            suggestions[0].classList.add('autocomplete-active');
        } else {
            // Move the active class to the next item
            active.classList.remove('autocomplete-active');
            active.nextSibling.classList.add('autocomplete-active');
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent the cursor from moving and scrolling the page
        if (!active || active.previousSibling == null) {
            // If no item is active or the active item is the first one, focus the last item
            suggestions[suggestions.length - 1].classList.add('autocomplete-active');
        } else {
            // Move the active class to the previous item
            active.classList.remove('autocomplete-active');
            active.previousSibling.classList.add('autocomplete-active');
        }
    } else if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        if (active) {
            // Simulate a click on the active item
            active.click();
        } else if (suggestions.length > 0) {
            // If no item is active but suggestions exist, click the first one
            suggestions[0].click();
        } else {
            // Perform the standard guess check if no suggestions are active
            checkGuess(this.value);
        }
    }
});

// Utility function to clear any previously active suggestions
function clearActive(suggestions) {
    for (let i = 0; i < suggestions.length; i++) {
        suggestions[i].classList.remove('autocomplete-active');
    }
}

function normalizeString(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function loadFlags() {
    let countries = [{ "f": "🇲🇩", "n": "moldova" }, { "f": "🇺🇸", "n": "united states" }, { "f": "🇾🇹", "n": "mayotte" }, { "f": "🇳🇷", "n": "nauru" }, { "f": "🇲🇿", "n": "mozambique" }, { "f": "🇧🇷", "n": "brazil" }, { "f": "🇨🇻", "n": "cape verde" }, { "f": "🇬🇶", "n": "equatorial guinea" }, { "f": "🇦🇱", "n": "albania" }, { "f": "🇻🇮", "n": "united states virgin islands" }, { "f": "🇳🇺", "n": "niue" }, { "f": "🇵🇼", "n": "palau" }, { "f": "🇳🇬", "n": "nigeria" }, { "f": "🇻🇬", "n": "british virgin islands" }, { "f": "🇬🇲", "n": "gambia" }, { "f": "🇸🇴", "n": "somalia" }, { "f": "🇾🇪", "n": "yemen" }, { "f": "🇲🇾", "n": "malaysia" }, { "f": "🇩🇲", "n": "dominica" }, { "f": "🇬🇧", "n": "united kingdom" }, { "f": "🇲🇬", "n": "madagascar" }, { "f": "🇪🇭", "n": "western sahara" }, { "f": "🇨🇾", "n": "cyprus" }, { "f": "🇦🇬", "n": "antigua and barbuda" }, { "f": "🇮🇪", "n": "ireland" }, { "f": "🇵🇾", "n": "paraguay" }, { "f": "🇱🇰", "n": "sri lanka" }, { "f": "🇿🇦", "n": "south africa" }, { "f": "🇰🇼", "n": "kuwait" }, { "f": "🇩🇿", "n": "algeria" }, { "f": "🇭🇷", "n": "croatia" }, { "f": "🇲🇶", "n": "martinique" }, { "f": "🇸🇱", "n": "sierra leone" }, { "f": "🇲🇵", "n": "northern mariana islands" }, { "f": "🇷🇼", "n": "rwanda" }, { "f": "🇸🇾", "n": "syria" }, { "f": "🇻🇨", "n": "saint vincent and the grenadines" }, { "f": "🇽🇰", "n": "kosovo" }, { "f": "🇱🇨", "n": "saint lucia" }, { "f": "🇭🇳", "n": "honduras" }, { "f": "🇯🇴", "n": "jordan" }, { "f": "🇹🇻", "n": "tuvalu" }, { "f": "🇳🇵", "n": "nepal" }, { "f": "🇱🇷", "n": "liberia" }, { "f": "🇭🇲", "n": "heard island and mcdonald islands" }, { "f": "🇦🇹", "n": "austria" }, { "f": "🇬🇬", "n": "guernsey" }, { "f": "🇨🇫", "n": "central african republic" }, { "f": "🇲🇷", "n": "mauritania" }, { "f": "🇩🇯", "n": "djibouti" }, { "f": "🇫🇯", "n": "fiji" }, { "f": "🇳🇴", "n": "norway" }, { "f": "🇱🇻", "n": "latvia" }, { "f": "🇫🇰", "n": "falkland islands" }, { "f": "🇰🇿", "n": "kazakhstan" }, { "f": "🇦🇽", "n": "åland islands" }, { "f": "🇹🇲", "n": "turkmenistan" }, { "f": "🇨🇨", "n": "cocos (keeling) islands" }, { "f": "🇧🇬", "n": "bulgaria" }, { "f": "🇹🇰", "n": "tokelau" }, { "f": "🇳🇨", "n": "new caledonia" }, { "f": "🇧🇧", "n": "barbados" }, { "f": "🇸🇹", "n": "são tomé and príncipe" }, { "f": "🇦🇶", "n": "antarctica" }, { "f": "🇧🇳", "n": "brunei" }, { "f": "🇧🇹", "n": "bhutan" }, { "f": "🇨🇲", "n": "cameroon" }, { "f": "🇦🇷", "n": "argentina" }, { "f": "🇦🇿", "n": "azerbaijan" }, { "f": "🇲🇽", "n": "mexico" }, { "f": "🇲🇦", "n": "morocco" }, { "f": "🇬🇹", "n": "guatemala" }, { "f": "🇰🇪", "n": "kenya" }, { "f": "🇲🇹", "n": "malta" }, { "f": "🇨🇿", "n": "czechia" }, { "f": "🇬🇮", "n": "gibraltar" }, { "f": "🇦🇼", "n": "aruba" }, { "f": "🇧🇱", "n": "saint barthélemy" }, { "f": "🇲🇨", "n": "monaco" }, { "f": "🇦🇪", "n": "united arab emirates" }, { "f": "🇸🇸", "n": "south sudan" }, { "f": "🇵🇷", "n": "puerto rico" }, { "f": "🇸🇻", "n": "el salvador" }, { "f": "🇫🇷", "n": "france" }, { "f": "🇳🇪", "n": "niger" }, { "f": "🇨🇮", "n": "ivory coast" }, { "f": "🇬🇸", "n": "south georgia" }, { "f": "🇧🇼", "n": "botswana" }, { "f": "🇮🇴", "n": "british indian ocean territory" }, { "f": "🇺🇿", "n": "uzbekistan" }, { "f": "🇹🇳", "n": "tunisia" }, { "f": "🇭🇰", "n": "hong kong" }, { "f": "🇲🇰", "n": "north macedonia" }, { "f": "🇸🇷", "n": "suriname" }, { "f": "🇧🇪", "n": "belgium" }, { "f": "🇦🇸", "n": "american samoa" }, { "f": "🇸🇧", "n": "solomon islands" }, { "f": "🇺🇦", "n": "ukraine" }, { "f": "🇫🇮", "n": "finland" }, { "f": "🇧🇫", "n": "burkina faso" }, { "f": "🇧🇦", "n": "bosnia and herzegovina" }, { "f": "🇮🇷", "n": "iran" }, { "f": "🇨🇺", "n": "cuba" }, { "f": "🇪🇷", "n": "eritrea" }, { "f": "🇸🇰", "n": "slovakia" }, { "f": "🇱🇹", "n": "lithuania" }, { "f": "🇲🇫", "n": "saint martin" }, { "f": "🇵🇳", "n": "pitcairn islands" }, { "f": "🇬🇼", "n": "guinea-bissau" }, { "f": "🇲🇸", "n": "montserrat" }, { "f": "🇹🇷", "n": "turkey" }, { "f": "🇵🇭", "n": "philippines" }, { "f": "🇻🇺", "n": "vanuatu" }, { "f": "🇧🇴", "n": "bolivia" }, { "f": "🇰🇳", "n": "saint kitts and nevis" }, { "f": "🇷🇴", "n": "romania" }, { "f": "🇰🇭", "n": "cambodia" }, { "f": "🇿🇼", "n": "zimbabwe" }, { "f": "🇯🇪", "n": "jersey" }, { "f": "🇰🇬", "n": "kyrgyzstan" }, { "f": "🇧🇶", "n": "caribbean netherlands" }, { "f": "🇬🇾", "n": "guyana" }, { "f": "🇺🇲", "n": "united states minor outlying islands" }, { "f": "🇦🇲", "n": "armenia" }, { "f": "🇱🇧", "n": "lebanon" }, { "f": "🇲🇪", "n": "montenegro" }, { "f": "🇬🇱", "n": "greenland" }, { "f": "🇵🇬", "n": "papua new guinea" }, { "f": "🇿🇲", "n": "zambia" }, { "f": "🇹🇹", "n": "trinidad and tobago" }, { "f": "🇹🇫", "n": "french southern and antarctic lands" }, { "f": "🇵🇪", "n": "peru" }, { "f": "🇸🇪", "n": "sweden" }, { "f": "🇸🇩", "n": "sudan" }, { "f": "🇵🇲", "n": "saint pierre and miquelon" }, { "f": "🇴🇲", "n": "oman" }, { "f": "🇮🇳", "n": "india" }, { "f": "🇹🇼", "n": "taiwan" }, { "f": "🇲🇳", "n": "mongolia" }, { "f": "🇸🇳", "n": "senegal" }, { "f": "🇹🇿", "n": "tanzania" }, { "f": "🇨🇦", "n": "canada" }, { "f": "🇨🇷", "n": "costa rica" }, { "f": "🇨🇳", "n": "china" }, { "f": "🇨🇴", "n": "colombia" }, { "f": "🇲🇲", "n": "myanmar" }, { "f": "🇷🇺", "n": "russia" }, { "f": "🇰🇵", "n": "north korea" }, { "f": "🇰🇾", "n": "cayman islands" }, { "f": "🇧🇻", "n": "bouvet island" }, { "f": "🇧🇾", "n": "belarus" }, { "f": "🇵🇹", "n": "portugal" }, { "f": "🇸🇿", "n": "eswatini" }, { "f": "🇵🇱", "n": "poland" }, { "f": "🇨🇭", "n": "switzerland" }, { "f": "🇨🇬", "n": "republic of the congo" }, { "f": "🇻🇪", "n": "venezuela" }, { "f": "🇵🇦", "n": "panama" }, { "f": "🇳🇱", "n": "netherlands" }, { "f": "🇼🇸", "n": "samoa" }, { "f": "🇩🇰", "n": "denmark" }, { "f": "🇱🇺", "n": "luxembourg" }, { "f": "🇫🇴", "n": "faroe islands" }, { "f": "🇸🇮", "n": "slovenia" }, { "f": "🇹🇬", "n": "togo" }, { "f": "🇹🇭", "n": "thailand" }, { "f": "🇼🇫", "n": "wallis and futuna" }, { "f": "🇧🇸", "n": "bahamas" }, { "f": "🇹🇴", "n": "tonga" }, { "f": "🇬🇷", "n": "greece" }, { "f": "🇸🇲", "n": "san marino" }, { "f": "🇷🇪", "n": "réunion" }, { "f": "🇻🇦", "n": "vatican city" }, { "f": "🇧🇮", "n": "burundi" }, { "f": "🇧🇭", "n": "bahrain" }, { "f": "🇲🇭", "n": "marshall islands" }, { "f": "🇹🇨", "n": "turks and caicos islands" }, { "f": "🇮🇲", "n": "isle of man" }, { "f": "🇭🇹", "n": "haiti" }, { "f": "🇦🇫", "n": "afghanistan" }, { "f": "🇮🇱", "n": "israel" }, { "f": "🇱🇾", "n": "libya" }, { "f": "🇺🇾", "n": "uruguay" }, { "f": "🇳🇫", "n": "norfolk island" }, { "f": "🇳🇮", "n": "nicaragua" }, { "f": "🇨🇰", "n": "cook islands" }, { "f": "🇱🇦", "n": "laos" }, { "f": "🇨🇽", "n": "christmas island" }, { "f": "🇸🇭", "n": "saint helena, ascension and tristan da cunha" }, { "f": "🇦🇮", "n": "anguilla" }, { "f": "🇫🇲", "n": "micronesia" }, { "f": "🇩🇪", "n": "germany" }, { "f": "🇬🇺", "n": "guam" }, { "f": "🇰🇮", "n": "kiribati" }, { "f": "🇸🇽", "n": "sint maarten" }, { "f": "🇪🇸", "n": "spain" }, { "f": "🇯🇲", "n": "jamaica" }, { "f": "🇵🇸", "n": "palestine" }, { "f": "🇬🇫", "n": "french guiana" }, { "f": "🇦🇩", "n": "andorra" }, { "f": "🇨🇱", "n": "chile" }, { "f": "🇱🇸", "n": "lesotho" }, { "f": "🇦🇺", "n": "australia" }, { "f": "🇬🇩", "n": "grenada" }, { "f": "🇬🇭", "n": "ghana" }, { "f": "🇸🇨", "n": "seychelles" }, { "f": "🇦🇴", "n": "angola" }, { "f": "🇧🇲", "n": "bermuda" }, { "f": "🇵🇰", "n": "pakistan" }, { "f": "🇲🇱", "n": "mali" }, { "f": "🇸🇦", "n": "saudi arabia" }, { "f": "🇨🇼", "n": "curaçao" }, { "f": "🇰🇷", "n": "south korea" }, { "f": "🇪🇹", "n": "ethiopia" }, { "f": "🇬🇵", "n": "guadeloupe" }, { "f": "🇧🇩", "n": "bangladesh" }, { "f": "🇳🇿", "n": "new zealand" }, { "f": "🇰🇲", "n": "comoros" }, { "f": "🇧🇿", "n": "belize" }, { "f": "🇺🇬", "n": "uganda" }, { "f": "🇸🇬", "n": "singapore" }, { "f": "🇱🇮", "n": "liechtenstein" }, { "f": "🇭🇺", "n": "hungary" }, { "f": "🇮🇸", "n": "iceland" }, { "f": "🇹🇯", "n": "tajikistan" }, { "f": "🇳🇦", "n": "namibia" }, { "f": "🇹🇱", "n": "timor-leste" }, { "f": "🇪🇬", "n": "egypt" }, { "f": "🇷🇸", "n": "serbia" }, { "f": "🇲🇺", "n": "mauritius" }, { "f": "🇲🇴", "n": "macau" }, { "f": "🇵🇫", "n": "french polynesia" }, { "f": "🇲🇻", "n": "maldives" }, { "f": "🇮🇩", "n": "indonesia" }, { "f": "🇨🇩", "n": "dr congo" }, { "f": "🇪🇪", "n": "estonia" }, { "f": "🇻🇳", "n": "vietnam" }, { "f": "🇮🇹", "n": "italy" }, { "f": "🇬🇳", "n": "guinea" }, { "f": "🇹🇩", "n": "chad" }, { "f": "🇪🇨", "n": "ecuador" }, { "f": "🇬🇪", "n": "georgia" }, { "f": "🇲🇼", "n": "malawi" }, { "f": "🇮🇶", "n": "iraq" }, { "f": "🇸🇯", "n": "svalbard and jan mayen" }, { "f": "🇧🇯", "n": "benin" }, { "f": "🇯🇵", "n": "japan" }, { "f": "🇩🇴", "n": "dominican republic" }, { "f": "🇶🇦", "n": "qatar" }, { "f": "🇬🇦", "n": "gabon" }]

    flags = countries.map(country => ({
        emoji: country.f,
        commonName: normalizeString(country.n)
    }));

    selectRandomFlag();
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
