import { fetchClasses } from './modules/dataService.js';
import { renderSchedule, setupModal } from './modules/ui.js';

// Hamburger toggle
const burger = document.getElementById('hamburger');
const menu  = document.getElementById('nav-menu');
burger.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Persist last‐viewed class in localStorage
const lastClass = localStorage.getItem('lastClass');
if (lastClass) {
  console.log('You last viewed class ID:', lastClass);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Only on schedule page
  const grid = document.getElementById('schedule-grid');
  if (!grid) return;

  try {
    const classes = await fetchClasses();
    renderSchedule(classes, grid);
    setupModal(grid, classes, (id) => {
      localStorage.setItem('lastClass', id);
    });
  } catch (err) {
    console.error('Failed to load classes:', err);
    grid.textContent = 'Sorry, we couldn’t load the schedule right now.';
  }
});


const featured = document.getElementById('featured-grid');
  if (featured) {
    try {
      const classes = await fetchClasses();
      // pick first 3 for a quick preview
      const preview = classes.slice(0, 3);
      renderSchedule(preview, featured);
    } catch (err) {
      console.error('Failed to load featured classes:', err);
      featured.textContent = 'Unable to load classes at the moment.';
    }
  }
