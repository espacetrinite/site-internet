document.addEventListener("DOMContentLoaded", function () {
  const consentGiven = localStorage.getItem("cookieAccepted") === "true";
  const mapContainer = document.querySelector(".map-container");

  if (!mapContainer) return;

  if (consentGiven) {
    loadMapIframe();
  } else {
    // Create the placeholder message
    const placeholder = document.createElement("div");
    placeholder.className = "map-placeholder";
    placeholder.innerHTML = `
      <div style="background:#f0f0f0;padding:2rem;text-align:center;font-family:sans-serif;">
        <p>Google Maps est désactivé pour respecter votre vie privée.</p>
        <button id="activate-map" style="padding:0.5rem 1rem;background:black;color:white;border:none;cursor:pointer;">
          Accepter et afficher la carte
        </button>
      </div>
    `;
    mapContainer.innerHTML = "";
    mapContainer.appendChild(placeholder);

    document.getElementById("activate-map").addEventListener("click", function () {
      localStorage.setItem("cookieAccepted", "true");
      loadMapIframe();
    });
  }

  function loadMapIframe() {
    mapContainer.innerHTML = `<iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.5064898799234!2d2.3282051!3d48.877525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e49c2725e9d%3A0x1bea2a062e99c336!2sDu%20C%C3%B4t%C3%A9%20de%20la%20Trinit%C3%A9!5e0!3m2!1sfr!2sfr!4v1719152360000!5m2!1sfr!2sfr"
      width="100%"
      height="350"
      style="border:0;"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Carte Google Maps – Espace Trinité, 3 rue de la Trinité, Paris 9e"
    ></iframe>`;
  }
});
