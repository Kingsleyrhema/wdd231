// scripts/discover.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("discoverGrid");
  fetch("data/discover.json")
    .then(res => res.json())
    .then(items => {
      items.forEach((item, i) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.gridArea = `card${i+1}`;
        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure><img src="${item.img}" alt="${item.title}" width="300" height="200" loading="lazy"/></figure>
          <address>${item.address}</address>
          <p>${item.desc}</p>
          <button>Learn More</button>
        `;
        grid.appendChild(card);
      });
    })
    .catch(console.error);

  // localStorage visit message
  const msgEl = document.getElementById("visitMsg");
  const now = Date.now();
  const last = localStorage.getItem("lastVisit");
  if (!last) {
    msgEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - Number(last)) / 86400000);
    if (days < 1) {
      msgEl.textContent = "Back so soon! Awesome!";
    } else {
      msgEl.textContent = `You last visited ${days} day${days > 1 ? "s" : ""} ago.`;
    }
  }
  localStorage.setItem("lastVisit", now);
});
