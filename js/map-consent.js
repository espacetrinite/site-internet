window.addEventListener("load", function () {
  const placeholder = document.getElementById("map-placeholder");
  const iframe = document.getElementById("google-map");
  const button = document.getElementById("load-map");

  if (!placeholder || !iframe || !button) return;

  function showMap() {
    placeholder.style.display = "none";
    iframe.style.display = "block";
  }

  if (localStorage.getItem("mapAccepted")) {
    showMap();
  }

  button.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("mapAccepted", "true");
    showMap();
  });
});
