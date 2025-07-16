document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.getElementById("map-placeholder");
  const iframe = document.getElementById("google-map");
  const button = document.getElementById("load-map");

  if (!placeholder || !iframe || !button) return;

  function showMap() {
    placeholder.style.display = "none";
    iframe.style.display = "block";
  }

  // Si l'utilisateur clique manuellement sur le bouton
  button.addEventListener("click", function () {
    localStorage.setItem("mapAccepted", "true");
    showMap();
  });

  // Écoute l'événement personnalisé déclenché après acceptation des cookies
  document.addEventListener("consentGiven", function () {
    showMap();
  });
});
