 // Set hidden timestamp on form load
    document.getElementById("timestamp").value = new Date().toISOString();

    // Modals
    function openModal(id) {
      document.getElementById(id).style.display = "block";
    }

    function closeModal(id) {
      document.getElementById(id).style.display = "none";
    }

    // Update footer
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;