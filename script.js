// Example: Fetch CSV data from Google Sheets
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMBoWYSHdXHICSbvzdazS5Cn59lx81TPPyXK0H9e158G_zTe2AeGkmFPnULA1O-X7VdGJYvJGrJrKi/pub?gid=2114190030&single=true&output=csv';

// Fetch and process CSV data
function fetchCSVData() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n");
            const heroBuffs = {};
            let currentHero = null;
            let buffCategories = [];

            rows.forEach((row, index) => {
                const cells = row.split(",");

                // Identify the hero name (rows with hero names)
                if (cells[0].trim()) {
                    currentHero = cells[0].trim();  // Hero's name is the first cell in each section
                    heroBuffs[currentHero] = {}; // Initialize an empty object for the hero's buffs
                }

                // The second row after the hero name contains the buff categories (Stat Boost, etc.)
                if (index === 1 && currentHero) {
                    buffCategories = cells.slice(1); // Buff categories start from the second column onward
                }

                // The next row (after the buff categories) contains the values for each hero's buffs
                if (index > 1 && currentHero && cells[0].trim() === "") {
                    for (let i = 1; i < cells.length; i++) {
                        if (buffCategories[i - 1] && cells[i].trim()) {
                            heroBuffs[currentHero][buffCategories[i - 1]] = cells[i].trim();
                        }
                    }
                }
            });

            // After parsing the CSV, populate the hero dropdowns
            populateHeroDropdown(Object.keys(heroBuffs));
        });
}

// Populate hero dropdowns dynamically
function populateHeroDropdown(heroNames) {
    const hero1Dropdown = document.getElementById("hero1");
    const hero2Dropdown = document.getElementById("hero2");

    heroNames.forEach(hero => {
        const option1 = document.createElement("option");
        option1.value = hero;
        option1.text = hero;
        hero1Dropdown.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = hero;
        option2.text = hero;
        hero2Dropdown.appendChild(option2);
    });
}

// Calculate the buffs for the selected heroes
function calculateBuffs() {
    const hero1 = document.getElementById('hero1').value;
    const hero2 = document.getElementById('hero2').value;

    const selectedHeroes = [hero1, hero2];
    const buffs = {};

    selectedHeroes.forEach(hero => {
        if (heroBuffs[hero]) {
            for (const [buffType, value] of Object.entries(heroBuffs[hero])) {
                if (!buffs[buffType]) buffs[buffType] = 0;
                buffs[buffType] += parseFloat(value) || 0;  // Handle empty or invalid values
            }
        }
    });

    // Display the calculated buffs
    let resultHTML = '';
    for (const [buffType, totalBuff] of Object.entries(buffs)) {
        resultHTML += `<p><strong>${buffType}:</strong> ${totalBuff}</p>`;
    }

    document.getElementById('buffs').innerHTML = resultHTML;
}

// Event listener for form submission
document.getElementById('team-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    calculateBuffs();
});

// Initial load of CSV data
let heroBuffs = {};
fetchCSVData();

