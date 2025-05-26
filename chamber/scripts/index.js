// Show current year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// OpenWeatherMap API setup
const apiKey = 'f0f7c88951ba06e1bba3de006ecc4e43'; // Replace with your OpenWeatherMap API key
const lat = '7.4967';  // Example: Lagos latitude
const lon = '3.8980';  // Example: Lagos longitude
const weatherTodayDiv = document.getElementById('weather-today');
const weatherForecastDiv = document.getElementById('weather-forecast');

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data fetch failed');
    const data = await response.json();

    // Current weather
    const temp = Math.round(data.current.temp);
    const desc = data.current.weather[0].description;
    weatherTodayDiv.innerHTML = `<p>Temperature: ${temp}°C</p><p>Conditions: ${desc}</p>`;

    // 3-day forecast
    const forecastDays = data.daily.slice(1, 4);
    weatherForecastDiv.innerHTML = '';
    forecastDays.forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
      const min = Math.round(day.temp.min);
      const max = Math.round(day.temp.max);
      const icon = day.weather[0].icon;
      weatherForecastDiv.innerHTML += `
        <div class="forecast-day">
          <h4>${dayName}</h4>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}" />
          <p>${min}°C / ${max}°C</p>
        </div>
      `;
    });
  } catch (error) {
    weatherTodayDiv.textContent = 'Unable to load weather data.';
    weatherForecastDiv.textContent = '';
    console.error(error);
  }
}

getWeather();

// Fetch member JSON and randomly display 2-3 gold or silver spotlights
async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json'); // Adjust path as needed
    if (!response.ok) throw new Error('Failed to load member data');
    const members = await response.json();

    // Filter gold and silver members
    const filtered = members.filter(m => m.membership.toLowerCase() === 'gold' || m.membership.toLowerCase() === 'silver');

    // Shuffle and pick 2-3 members randomly
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const spotlightContainer = document.getElementById('spotlight-cards');
    spotlightContainer.innerHTML = '';

    selected.forEach(member => {
      spotlightContainer.innerHTML += `
        <div class="spotlight-card">
          <img src="${member.logo}" alt="${member.company} logo" />
          <h3>${member.company}</h3>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${member.membership}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

loadSpotlights();
