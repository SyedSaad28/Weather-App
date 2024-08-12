const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    if (!city) {
        weatherResult.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            weatherResult.innerHTML = '<p class="error">City not found. Please try again.</p>';
        } else {
            weatherResult.innerHTML = `
                <p class="temp">${Math.round(data.main.temp)}°C</p>
                <p class="description">${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        }
    } catch (error) {
        weatherResult.innerHTML = '<p class="error">An error occurred. Please try again later.</p>';
    }
}
