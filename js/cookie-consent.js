document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");
  const placeholder   = document.getElementById("map-placeholder");
  const iframe        = document.getElementById("google-map");
  const loadMapBtn    = document.getElementById("load-map");

  // Vérification localStorage (Safari bugfix)
  const cookiesAccepted = localStorage.getItem("cookieAccepted") === "true";
  const mapAccepted = localStorage.getItem("mapAccepted") === "true";

  // Affichage conditionnel du bandeau cookie
  if (!cookiesAccepted) {
    cookieBanner.style.display = "flex";
  } else {
    cookieBanner.style.display = "none";
  }

  // Gestion du clic sur "OK" cookies
  cookieAccept?.addEventListener("click", () => {
    try {
      localStorage.setItem("cookieAccepted", "true");
      cookieBanner.style.display = "none";

      // Déclenche aussi l’acceptation carte
      localStorage.setItem("mapAccepted", "true");
      if (loadMapBtn) loadMapBtn.click();
    } catch (e) {
      console.error("Erreur stockage localStorage", e);
    }
  });

  // Gestion de la carte
  if (mapAccepted) {
    showMap();
  }

  loadMapBtn?.addEventListener("click", () => {
    try {
      localStorage.setItem("mapAccepted", "true");
      showMap();
    } catch (e) {
      console.error("Erreur stockage carte", e);
    }
  });

  function showMap() {
    if (placeholder) placeholder.style.display = "none";
    if (iframe) iframe.style.display = "block";
  }
});
