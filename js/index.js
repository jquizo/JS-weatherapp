window.onload = () => {
// SELECT ELEMENTS
    const API_KEY = 'b0ea363db2a0a285f5263ede3c11b099';
    let searchbutton = document.getElementById('searchBtn');
    let inputValue = document.getElementById('searchBar');
    let city = document.getElementById('city');
    let description = document.getElementById('description');
    let tempmax = document.getElementById('temp-max');
    let tempmin = document.getElementById('temp-min');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');
    let weatherIcon = document.getElementById('weatherIcon');
    let warning = document.getElementById('warning');
// Weather object to store Data
const weather = {};

// Search using enter keypress
searchbutton.addEventListener('click', getWeather);
inputValue.addEventListener('keyup', function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
    event.preventDefault();
    getWeather()
    }
})

// Fetches weather info
function getWeather () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&appid='+API_KEY+'')
    .then(response => response.json())
    .then(data => {
        // Stores data from response into weather object
        weather.cityValue = data['name'];
        weather.tempminValue = data['main']['temp_min'];
        weather.tempmaxValue = data['main']['temp_max'];
        weather.descriptionValue = data['weather'][0]['description'];
        weather.windValue = data['wind']['speed'];
        weather.humidityValue = data['main']['humidity'];
        weather.iconValue = data.weather[0]['icon'];
        // Populates HTML with data from API
        city.innerHTML = weather.cityValue;
        tempmax.innerHTML = 'High: ' + Math.floor(weather.tempmaxValue) + '&#176C';
        tempmin.innerHTML = 'Low: ' + Math.floor(weather.tempminValue) + '&#176C';
        // The slice here capitalizes first letter of word
        description.innerHTML = weather.descriptionValue.charAt(0).toUpperCase() + weather.descriptionValue.slice(1);
        wind.innerHTML = 'Winds at ' + Math.floor(weather.windValue) + 'm/s';
        humidity.innerHTML = 'Humidity levels at ' + weather.humidityValue + '%';
        weatherIcon.innerHTML = `<img class="weather-icon-image" src="../icons/${weather.iconValue}.png"/>`;
        warning.innerHTML = "";
        })
    // .catch(err => alert('Please enter a location'))
        .catch(err => warning.innerHTML = `<h2 class="errormsg">Please enter a location </h2>`)
    } /* .getWeather */


} /* .window.onload  */

