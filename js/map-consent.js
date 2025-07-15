document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".map-container");

  if (!container) return;

  const accepted = localStorage.getItem("mapAccepted");

  if (!accepted) return;

  loadMap();

  function loadMap() {
    container.innerHTML = `
      <iframe
        src="https://www.google.com/maps/embed?pb=...TA_CLE_Ici..."
        width="100%"
        height="350"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Carte Google Maps – Espace Trinité, Paris">
      </iframe>`;
  }

  const btn = document.getElementById("show-map");

  if (btn) {
    btn.addEventListener("click", function () {
      localStorage.setItem("mapAccepted", "true");
      loadMap();
    });
  }
});
