// Show current year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const apiKey = 'f0f7c88951ba06e1bba3de006ecc4e43';
  const lat = 6.5244; // Lagos
  const lon = 3.3792;

  async function fetchCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById("current-temp").textContent = `${data.main.temp}°C`;
    document.getElementById("current-desc").textContent = data.weather[0].description;
  }

  async function fetchForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    const forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = "";

    const dailyMap = {};
    data.list.forEach(entry => {
      const date = entry.dt_txt.split(" ")[0];
      if (!dailyMap[date]) {
        dailyMap[date] = entry;
      }
    });

    Object.entries(dailyMap).slice(1, 4).forEach(([date, info]) => {
      const day = new Date(date).toLocaleDateString(undefined, { weekday: "short" });
      forecastEl.innerHTML += `<li><strong>${day}:</strong> ${Math.round(info.main.temp)}°C, ${info.weather[0].description}</li>`;
    });
  }

  fetchCurrentWeather();
  fetchForecast();


async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json'); // Adjust path as needed
    if (!response.ok) throw new Error('Failed to load member data');

    const jsonData = await response.json();
    const members = jsonData.members;

    // Filter gold and silver members
    const filtered = members.filter(m => 
      m.membership.toLowerCase() === 'gold' || 
      m.membership.toLowerCase() === 'silver'
    );

    // Shuffle and pick 2-3 members randomly
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const spotlightContainer = document.getElementById('spotlight-cards');
    spotlightContainer.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" />
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading spotlight members:', error);
  }
}

loadSpotlights();

