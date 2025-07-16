window.addEventListener("load", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const mapPlaceholder = document.getElementById("map-placeholder");
  const iframe = document.getElementById("google-map");
  const loadMapButton = document.getElementById("load-map");

  // Initialisation
  const cookieAccepted = localStorage.getItem("cookieAccepted");
  const mapAccepted = localStorage.getItem("mapAccepted");

  // Affichage du bandeau
  if (!cookieAccepted && banner) {
    banner.style.display = "flex";
  }

  // Fonction d’affichage de la carte
  function showMap() {
    if (mapPlaceholder) mapPlaceholder.style.display = "none";
    if (iframe) iframe.style.display = "block";
  }

  // Gestion du clic "OK" sur le bandeau
  if (acceptBtn) {
    acceptBtn.onclick = function () {
      try {
        localStorage.setItem("cookieAccepted", "true");
        banner.style.display = "none";

        // Déclenche l’acceptation de la carte aussi
        localStorage.setItem("mapAccepted", "true");
        showMap();
      } catch (e) {
        console.warn("Erreur stockage local : ", e);
      }
    };
  }

  // Gestion du clic "Afficher la carte"
  if (loadMapButton) {
    loadMapButton.onclick = function () {
      try {
        localStorage.setItem("mapAccepted", "true");
        showMap();
      } catch (e) {
        console.warn("Erreur stockage local : ", e);
      }
    };
  }

  // Chargement automatique de la carte si déjà accepté
  if (mapAccepted) {
    showMap();
  }
});
