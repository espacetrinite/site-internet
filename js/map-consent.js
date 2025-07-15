document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("load-map");
  const iframe = document.getElementById("google-map");
  const placeholder = document.getElementById("map-placeholder");

  if (!btn || !iframe || !placeholder) return;

  // Si consentement déjà donné, on affiche directement la carte
  if (localStorage.getItem("mapAccepted") === "true") {
    placeholder.style.display = "none";
    iframe.style.display = "block";
  }

  btn.addEventListener("click", function () {
    localStorage.setItem("mapAccepted", "true");
    placeholder.style.display = "none";
    iframe.style.display = "block";
  });
});
