// Example: Fetch CSV data from Google Sheets
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMBoWYSHdXHICSbvzdazS5Cn59lx81TPPyXK0H9e158G_zTe2AeGkmFPnULA1O-X7VdGJYvJGrJrKi/pub?gid=2114190030&single=true&output=csv';

function fetchCSVData() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // Parse CSV data and load heroes into dropdowns
            const rows = data.split("\n");
            rows.forEach(row => {
                const cells = row.split(",");
                // Populate hero options (e.g., populate `hero1`, `hero2`, etc.)
                // You can use `cells` to fill in the hero names and buffs
            });
        });
}

// Example: Buff Calculation Logic (this should be adjusted to match your sheet's formulas)
function calculateBuffs() {
    const hero1 = document.getElementById('hero1').value;
    const hero2 = document.getElementById('hero2').value;
    
    // Example logic: Calculate buff based on selected heroes (you need to adapt this)
    const buff = (parseInt(hero1) + parseInt(hero2)) * 10; // Dummy calculation

    // Display the calculated buff
    document.getElementById('buffs').innerText = `Total Buff: ${buff}`;
}

// Event listener for form submission
document.getElementById('team-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    calculateBuffs();
});

// Initial load of heroes (fetch data from Google Sheets)
fetchCSVData();
