/// Function to fetch CSV data from GitHub
function fetchCSVData() {
    // Corrected URL with properly encoded special characters
    fetch('https://raw.githubusercontent.com/Antharok/antharok.github.io/main/data/Antharok\'s%20Skia%20Team%20Builder%20-%20Database.csv')  
        .then(response => response.text())  // Convert response to text
        .then(data => {
            console.log("CSV Data loaded:", data);
            const parsedData = parseCSV(data);  // Parse the CSV data into a usable format
            populateDropdown(parsedData);  // Populate the dropdown menus with hero names
        })
        .catch(error => {
            console.error("Error fetching the CSV file:", error);
        });
}

// Function to parse CSV data into an array of heroes
function parseCSV(data) {
    const rows = data.split("\n");  // Split data into rows by newline
    const parsedData = [];

    // Iterate over rows to extract valid hero names
    rows.forEach((row) => {
        const columns = row.split(",");  // Split each row into columns by comma

        // Extract hero names from the first column (e.g., Aaron, Agni Soldier, etc.)
        const heroName = columns[0];  // Hero name is in the first column (adjust if needed)

        // Add hero name to the array if it's a valid name (skip rows that don't have a hero name)
        if (heroName && heroName.trim() !== '' && columns.length > 1) {
            parsedData.push(heroName.trim());  // Add hero's name to the array, trimming whitespace
        }
    });

    console.log("Parsed Buffs:", parsedData);  // Log parsed hero names for debugging
    return parsedData;
}

// Function to populate the dropdown menu with hero names
function populateDropdown(heroes) {
    for (let i = 1; i <= 15; i++) {
        const dropdown = document.getElementById('hero' + i);  // Select the dropdown by its ID
        // Clear existing options
        dropdown.innerHTML = '';

        // Add a default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Hero ' + i;
        dropdown.appendChild(defaultOption);

        // Add each hero to the dropdown options
        heroes.forEach(heroName => {
            const option = document.createElement('option');
            option.value = heroName;
            option.textContent = heroName;
            dropdown.appendChild(option);
        });
    }
}

// Run the fetch function when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchCSVData();
});

