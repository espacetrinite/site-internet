document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");

  if (!localStorage.getItem("cookieAccepted")) {
    banner.style.display = "flex";
  } else {
    // Carte déjà acceptée ? → l’afficher
    if (localStorage.getItem("mapAccepted")) {
      const event = new Event("consentGiven");
      document.dispatchEvent(event);
    }
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieAccepted", "true");
    banner.style.display = "none";

    // Consentement pour la carte
    localStorage.setItem("mapAccepted", "true");

    const event = new Event("consentGiven");
    document.dispatchEvent(event);
  });
});
