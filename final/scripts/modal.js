// modal.js
export function showModal(cls) {
  const modal = document.getElementById('modal');
  modal.querySelector('.modal-title').textContent = cls.name;
  modal.querySelector('.modal-body').innerHTML = `
    <p><strong>Description:</strong> ${cls.description}</p>
    <p><strong>Instructor:</strong> ${cls.instructor}</p>
    <p><strong>Duration:</strong> ${cls.duration} mins</p>
    <p><strong>Level:</strong> ${cls.level}</p>
  `;
  modal.classList.add('open');
}

document.getElementById('modal-close')
        .addEventListener('click', () => {
  document.getElementById('modal').classList.remove('open');
});
