// schedule.js
import { showModal }      from './modal.js';
import { saveFavorites, getFavorites } from './storage.js';

async function loadClasses() {
  try {
    const res     = await fetch('data/classes.json');
    const classes = await res.json();      // fetch + parsing
    const favs    = getFavorites();        // localStorage
    const list    = document.getElementById('class-list');

    list.innerHTML = classes.map(cls => `
      <div class="class-item" data-id="${cls.id}">
        <img src="${cls.imageUrl}" alt="${cls.name}" loading="lazy">
        <h3>${cls.name}</h3>
        <p><strong>Instructor:</strong> ${cls.instructor}</p>
        <p><strong>Time:</strong> ${cls.time}</p>
        <p><strong>Duration:</strong> ${cls.duration} mins</p>
        <p><strong>Level:</strong> ${cls.level}</p>
        <button class="details-btn">View Details</button>
        <button class="fav-btn">
          ${favs.includes(cls.id) ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    `).join('');                         // template literals, map()

    classes.forEach(cls => {
      const item = document.querySelector(`.class-item[data-id="${cls.id}"]`);
      item.querySelector('.details-btn')
          .addEventListener('click', () => showModal(cls));
      item.querySelector('.fav-btn')
          .addEventListener('click', () => {
            saveFavorites(cls.id);
            loadClasses();              // re-render to update favorites
          });
    });
  } catch (err) {
    console.error('Error loading classes:', err);  // robust error handling
  }
}

document.addEventListener('DOMContentLoaded', loadClasses);
