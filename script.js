// Example: Fetch CSV data from Google Sheets
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMBoWYSHdXHICSbvzdazS5Cn59lx81TPPyXK0H9e158G_zTe2AeGkmFPnULA1O-X7VdGJYvJGrJrKi/pub?gid=2114190030&single=true&output=csv';

// Fetch and process CSV data
function fetchCSVData() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split("\n");
            const heroNames = [];
            const heroBuffs = {};

            rows.forEach((row, index) => {
                const cells = row.split(",");

                // The first row will have the hero names
                if (index === 0) {
                    for (let i = 1; i < cells.length; i++) {
                        if (cells[i].trim()) {
                            heroNames.push(cells[i].trim());
                            heroBuffs[cells[i].trim()] = {}; // Initialize an empty object for each hero
                        }
                    }
                }

                // Subsequent rows will have the buffs for each hero
                if (index > 1) {
                    for (let i = 1; i < cells.length; i++) {
                        const buffType = rows[1].split(",")[i].trim(); // Get the buff type from the second row
                        if (heroNames[i - 1] && buffType && cells[i].trim()) {
                            heroBuffs[heroNames[i - 1]][buffType] = cells[i].trim();
                        }
                    }
                }
            });

            // Populate dropdowns with heroes
            populateHeroDropdown(heroNames);
        });
}

// Populate hero dropdowns with hero names
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

// Calculate the buffs based on selected heroes
function calculateBuffs() {
    const hero1 = document.getElementById('hero1').value;
    const hero2 = document.getElementById('hero2').value;

    const selectedHeroes = [hero1, hero2];
    const buffs = {};

    selectedHeroes.forEach(hero => {
        if (heroBuffs[hero]) {
            for (const [buffType, value] of Object.entries(heroBuffs[hero])) {
                if (!buffs[buffType]) buffs[buffType] = 0;
                buffs[buffType] += parseFloat(value);
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
