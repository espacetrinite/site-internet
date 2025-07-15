document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");

  if (!localStorage.getItem("cookieAccepted")) {
    banner.style.display = "flex";
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieAccepted", "true");
    banner.style.display = "none";

    // Déclenche aussi l’acceptation de la carte
    localStorage.setItem("mapAccepted", "true");
    const loadMapButton = document.getElementById("load-map");
    if (loadMapButton) loadMapButton.click();
  });
});
