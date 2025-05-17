// Course data
const coursesArray = courses.map(course => ({
  code: `${course.subject} ${course.number}`,
  name: course.title,
  category: course.subject.toLowerCase(),
  completed: course.completed,
  credits: course.credits // add credits here
}));

// DOM references
const buttons = document.querySelectorAll('.filter-buttons button');
const coursesContainer = document.getElementById('coursesContainer');
const creditsSummary = document.getElementById('creditsSummary');
const currentYearSpan = document.getElementById('currentYear');
const lastUpdateSpan = document.getElementById('lastUpdate');

// Render courses dynamically and update completed credits summary
function renderCourses(category = 'all') {
  coursesContainer.innerHTML = '';

  const filteredCourses = category === 'all'
    ? coursesArray
    : coursesArray.filter(course => course.category === category);

  filteredCourses.forEach(course => {
    const btn = document.createElement('button');
    btn.classList.add('course-btn', course.category);
    btn.textContent = `${course.code} - ${course.name}`;
    if (course.completed) {
      btn.style.backgroundColor = '#0f8d36'; // Green for completed
      btn.style.color = 'white';
    } else {
      btn.style.backgroundColor = '#ccc'; // Light gray for incomplete
      btn.style.color = '#333';
    }
    coursesContainer.appendChild(btn);
  });

  // Calculate total credits of completed courses in filtered list
  const totalCompletedCredits = filteredCourses
    .filter(course => course.completed)
    .reduce((sum, course) => sum + course.credits, 0);

  // Update credits summary text
  creditsSummary.textContent = `Total Completed Credits: ${totalCompletedCredits}`;
}

// Course filter function
function filterCourses(category) {
  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });

  const activeBtn = document.getElementById('btn' + category.toUpperCase());
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
  }

  renderCourses(category);
}

// Set footer data and initial render
document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  currentYearSpan.textContent = new Date().getFullYear();

  // Set last modified date
  lastUpdateSpan.textContent = document.lastModified;

  // Initial render with all courses
  renderCourses('all');
});
