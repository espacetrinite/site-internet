document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const mapPlaceholder = document.getElementById("map-placeholder");
  const iframe = document.getElementById("google-map");
  const loadMapButton = document.getElementById("load-map");

  // 1. Afficher le bandeau cookie si non accepté
  if (banner && !localStorage.getItem("cookieAccepted")) {
    banner.style.display = "flex";
  }

  // 2. Clic sur OK du bandeau cookie
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieAccepted", "true");
      banner.style.display = "none";

      // Déclenche aussi l’acceptation de la map
      localStorage.setItem("mapAccepted", "true");
      if (loadMapButton) loadMapButton.click();
    });
  }

  // 3. Gestion carte Google Maps
  function showMap() {
    if (mapPlaceholder) mapPlaceholder.style.display = "none";
    if (iframe) iframe.style.display = "block";
  }

  if (loadMapButton) {
    loadMapButton.addEventListener("click", function () {
      localStorage.setItem("mapAccepted", "true");
      showMap();
    });
  }

  // 4. Chargement automatique si déjà accepté
  if (localStorage.getItem("mapAccepted")) {
    showMap();
  }
});
