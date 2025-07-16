/* =========================================================================
   GALERIE – NAVIGATION & ZOOM
   ======================================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------------------------------
     1. SLIDER : boutons -> slides
  ------------------------------------------------------------------ */
  const navButtons = document.querySelectorAll(".gallery-nav button");
  const slides     = document.querySelectorAll(".gallery-slide");

  function showSlide(n){
    slides.forEach((s, i) => s.classList.toggle("active", i === n));
    navButtons.forEach((b, i) => b.classList.toggle("active", i === n));
  }

  showSlide(0);

  navButtons.forEach((btn, i) =>
    btn.addEventListener("click", () => showSlide(i))
  );

  /* ------------------------------------------------------------------
     2. Accès direct via #hash
  ------------------------------------------------------------------ */
  const idToIndex = {
    "#accueil-": 0,
    "#goursat": 1,
    "#orves":   2,
    "#messiaen": 3,
    "#labruyere": 4
  };

  const initialHash = window.location.hash;
  if (idToIndex.hasOwnProperty(initialHash)){
    showSlide(idToIndex[initialHash]);
  }

  /* ------------------------------------------------------------------
     3. Liens internes « Plus de photos »
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const idx = idToIndex[link.getAttribute("href")];
    if (idx !== undefined){
      link.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("galerie")?.scrollIntoView({ behavior: "smooth" });
        showSlide(idx);
      });
    }
  });

  /* ------------------------------------------------------------------
     4. ZOOM — activé pour tous les écrans
  ------------------------------------------------------------------ */
  document.querySelectorAll(".gallery-mosaic img").forEach(img => {
    img.addEventListener("click", () => {
      if (document.getElementById("zoom-viewer")) return;
      openZoom(img);
    });
  });

  function openZoom(imgClicked){
    const slide  = imgClicked.closest(".gallery-slide");
    const images = Array.from(slide.querySelectorAll("img"));
    let index    = images.indexOf(imgClicked);

    const viewer = document.createElement("div");
    viewer.id = "zoom-viewer";
    viewer.innerHTML = `
      <span class="zoom-arrow zoom-prev">&#10094;</span>
      <img src="${imgClicked.src}" alt="${imgClicked.alt}">
      <span class="zoom-arrow zoom-next">&#10095;</span>
    `;
    document.body.appendChild(viewer);

    const imgEl   = viewer.querySelector("img");
    const prevBtn = viewer.querySelector(".zoom-prev");
    const nextBtn = viewer.querySelector(".zoom-next");

    const update = () => {
      imgEl.src = images[index].src;
      imgEl.alt = images[index].alt || "";
    };

    prevBtn.addEventListener("click", e => {
      e.stopPropagation();
      index = (index - 1 + images.length) % images.length;
      update();
    });

    nextBtn.addEventListener("click", e => {
      e.stopPropagation();
      index = (index + 1) % images.length;
      update();
    });

    const keyHandler = e => {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
      if (e.key === "Escape") closeViewer();
    };
    document.addEventListener("keydown", keyHandler);

    viewer.addEventListener("click", e => {
      if (e.target === viewer) closeViewer();
    });

    function closeViewer(){
      document.removeEventListener("keydown", keyHandler);
      viewer.remove();
    }
  }
});
