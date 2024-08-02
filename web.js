const apiKey = 'LLvXfqZrYQZqxFFKDxIjv5wZpOs3Lo8o2hMGW6u4';
const prevDayButton = document.getElementById('prev-day');
const nextDayButton = document.getElementById('next-day');
const titleElement = document.getElementById('Title');
const imageElement = document.getElementById('nasaImage');
const descriptionElement = document.getElementById('description');
const dateElement = document.getElementById('Date');

// Get the dropdown menu
const dropdownMenu = document.getElementById('dropdownMenu');

// Set the initial display style of the dropdown menu to 'none'
dropdownMenu.style.display = 'none';

// Add event listener to the menu button
document.getElementById('menu').addEventListener('click', function(event) {
    // Prevent the document click event from firing
    event.stopPropagation();

    // Toggle the display style of the dropdown menu
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

// Add event listener to the dropdown menu
dropdownMenu.addEventListener('click', function(event) {
    // Prevent the document click event from firing
    event.stopPropagation();
});

// Add event listener to the document
document.addEventListener('click', function() {
    // Hide the dropdown menu
    dropdownMenu.style.display = 'none';
});

let currentDate = new Date();

// Function to format date to YYYY-MM-DD for API
function formatDateForAPI(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

// Function to format date to DD/MM/YYYY for display
function formatDateForDisplay(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
}

// Function to fetch APOD data for a given date
function fetchAPOD(date) {
    const formattedDateForAPI = formatDateForAPI(date);
    const apiurl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formattedDateForAPI}`;

    fetch(apiurl)
    .then(response => response.json())
    .then(data => {
        titleElement.textContent = data.title;
        imageElement.src = data.url;
        imageElement.alt = data.title;
        descriptionElement.textContent = data.explanation;
        dateElement.textContent = formatDateForDisplay(date); // Use the display format here
    })
    .catch(error => {
        console.error('Error fetching APOD data:', error);
    });
}

// Function to fetch the previous day's APOD data
function fetchPrevDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    fetchAPOD(currentDate);
}

// Function to fetch the next day's APOD data
function fetchNextDay() {
    // Get today's date without time for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Check if the new date is beyond the current date
    if (currentDate.getTime() >= today.getTime()) {
        alert('No data available for future dates');
        return;
    }

    currentDate.setDate(currentDate.getDate() + 1);
    fetchAPOD(currentDate);
}

// Function to handle date picker change
function handleDateChange() {
    currentDate = new Date(this.value);
    fetchAPOD(currentDate);
}

// Add event listener to the "next day" button
nextDayButton.addEventListener('click', fetchNextDay);

// Add event listener to the "previous day" button
prevDayButton.addEventListener('click', fetchPrevDay);

// Add event listener to the date picker
document.getElementById('date-picker').addEventListener('change', handleDateChange);

// Initialize with current date's APOD
fetchAPOD(currentDate);
