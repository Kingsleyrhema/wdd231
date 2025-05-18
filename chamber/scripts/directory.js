// Load members
async function loadMembers() {
  const res = await fetch('data/members.json');
  const data = await res.json();
  const container = document.getElementById('members');
  container.innerHTML = '';

  data.members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p><em>${member.membership}</em></p>
    `;
    container.appendChild(card);
  });
}

// Toggle view
document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('members').classList.add('grid');
  document.getElementById('members').classList.remove('list');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('members').classList.add('list');
  document.getElementById('members').classList.remove('grid');
});

// Dates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

loadMembers();
