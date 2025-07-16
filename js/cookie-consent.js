window.addEventListener("load", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");

  if (!localStorage.getItem("cookieAccepted")) {
    banner.style.display = "flex";
  }

  acceptBtn?.addEventListener("click", function () {
    localStorage.setItem("cookieAccepted", "true");
    localStorage.setItem("mapAccepted", "true");
    banner.style.display = "none";

    // Déclenche le chargement de la carte si le bouton existe
    const loadMapButton = document.getElementById("load-map");
    if (loadMapButton) loadMapButton.click();
  });
});
