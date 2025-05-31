document.addEventListener("DOMContentLoaded", function () {
  // Set hidden timestamp on form load
  const timestampEl = document.getElementById("timestamp");
  if (timestampEl) {
    timestampEl.value = new Date().toISOString();
  }

  // Modals
  window.openModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
  }

  window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

  // Update footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const modifiedEl = document.getElementById("lastModified");
  if (modifiedEl) modifiedEl.textContent = document.lastModified;
});
