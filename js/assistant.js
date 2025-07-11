document.addEventListener("DOMContentLoaded", () => {

  const toggleButtons = document.querySelectorAll(".assistant-toggle");
  const overlay       = document.getElementById("assistant-overlay");
  const cancelBtn     = document.getElementById("assistant-cancel");
  const submitBtn     = document.getElementById("assistant-submit");
  const resultBlock   = document.getElementById("assistant-result");

  const eventType     = document.getElementById("eventType");
  const participants  = document.getElementById("participants");
  const duration      = document.getElementById("duration");
  const pmrCheck      = document.getElementById("pmr");

  if (!toggleButtons.length || !overlay || !submitBtn || !eventType || !participants) {
    console.warn("Éléments requis manquants pour le mini-assistant");
    return;
  }

  /* =========  Données salles  ========= */
  const rooms = [
    {
      id: "messiaen",
      name: "Salle Olivier Messiaen",
      max: 65, min: 20, pmr: false,
      eventTypes: [
        { type: "conference", label: "Conférence",       capacity: 65 },
        { type: "reunion",    label: "Réunion en U",     capacity: 40 },
        { type: "classe",     label: "Salle de classe",  capacity: 38 }
      ],
      pricing: { heure: 190, demi: 540, journee: 740 }
    },
    {
      id: "bruyere",
      name: "Salle La Bruyère",
      max: 50, min: 10, pmr: true,
      eventTypes: [
        { type: "conference", label: "Conférence",       capacity: 50 },
        { type: "reunion",    label: "Réunion en U",     capacity: 30 },
        { type: "classe",     label: "Salle de classe",  capacity: 30 }
      ],
      pricing: { heure: 200, demi: 580, journee: 800 }
    },
    {
      id: "goursat",
      name: "Salle Pierre Goursat",
      max: 25, min: 10, pmr: true,
      eventTypes: [
        { type: "conference", label: "Conférence",       capacity: 25 },
        { type: "reunion",    label: "Réunion en U",     capacity: 18 },
        { type: "classe",     label: "Salle de classe",  capacity: 20 }
      ],
      pricing: { heure: 150, demi: 460, journee: 640 }
    },
    {
      id: "orves",
      name: "Salle Estienne d'Orves",
      max: 25, min: 6, pmr: true,
      eventTypes: [
        { type: "conference", label: "Conférence",       capacity: 25 },
        { type: "reunion",    label: "Réunion en U",     capacity: 16 },
        { type: "classe",     label: "Salle de classe",  capacity: 18 }
      ],
      pricing: { heure: 140, demi: 405, journee: 580 }
    }
  ];
  
  let pageScrollY = 0;

  const openAssistant = () => {
    pageScrollY = window.pageYOffset || document.documentElement.scrollTop;
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${pageScrollY}px`;
    overlay.style.display = "flex";
  };

  const closeAssistant = () => {
    overlay.style.display = "none";
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
    window.scrollTo(0, pageScrollY);
  };

  overlay.addEventListener("click", (e) => {
    const modal = document.getElementById("assistant-modal");
    if (!modal || !modal.contains(e.target)) closeAssistant();
  });

  overlay.style.display = "none";
  document.body.classList.remove("no-scroll");
  document.documentElement.classList.remove("no-scroll");
  document.body.style.top = "";

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openAssistant();
    });
  });

  cancelBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeAssistant();
  });

  /* =========  Gestionnaire principal ========= */
  submitBtn.addEventListener("click", () => {
    /* ----- Reset bloc résultat ----- */
    resultBlock.style.display = "none";
    resultBlock.className     = "";

    /* ----- Lecture des champs ----- */
    const type      = eventType.value;
    const nb        = participants.valueAsNumber || 0;
    const wantPMR   = pmrCheck.checked;
    const durValue  = duration.value;                     // "horaire" | "demi" | "journee" | ""
    const dateStart = document.getElementById("dateStart")?.value;
    const dateEnd   = document.getElementById("dateEnd")?.value;

    if (!type || Number.isNaN(nb) || nb < 1) {
      resultBlock.className   = "result-empty";
      resultBlock.innerHTML   = "Sélectionnez un type d’événement et indiquez un nombre de participants.";
      resultBlock.style.display = "block";
      return;
    }

    /* ----- Filtrage des salles ----- */
    const matches = rooms.filter(room => {
      const spec = room.eventTypes.find(e => e.type === type);
      if (!spec) return false;                             // le type n'est pas proposé

      const minCap = room.min ?? 0;                        // seuil plancher général
      const maxCap = spec.capacity;                       // capacité MAX pour ce type
      const okCap  = nb >= minCap && nb <= maxCap;
      const okPMR  = !wantPMR || room.pmr;

      return okCap && okPMR;
    });

    if (!matches.length) {
      resultBlock.className   = "result-empty";
      resultBlock.innerHTML   = "Aucune salle ne correspond exactement à votre besoin.<br>Contactez-nous pour une solution sur mesure.";
      resultBlock.style.display = "block";
      return;
    }

    /* ----- Détermination de la clé tarifaire ----- */
    const priceKey = durValue === "horaire"
      ? "heure"
      : (durValue === "demi" || durValue === "journee") ? durValue
      : null;  // pas de durée choisie

    const labelMap = { demi: "demi-journée", journee: "journée", horaire: "horaire" };
    const labelDur = priceKey ? labelMap[durValue] : "durée non précisée";

    /* ----- Tri : prix croissant puis capacité la plus ajustée ----- */
    matches.sort((a, b) => {
      const priceA = priceKey ? a.pricing[priceKey] : Math.min(...Object.values(a.pricing));
      const priceB = priceKey ? b.pricing[priceKey] : Math.min(...Object.values(b.pricing));
      if (priceA !== priceB) return priceA - priceB;
      return (a.max - nb) - (b.max - nb);                 // écart de capacité le plus faible
    });

    const best     = matches[0];
    const priceStr = priceKey ? `${best.pricing[priceKey]} € HT` : "sur devis";

    /* ----- Couleur du bloc selon la salle ----- */
    const colorMap = {
      bruyere : "result-bruyere",
      goursat : "result-goursat",
      orves   : "result-orves",
      messiaen: "result-messiaen"
    };
    if (colorMap[best.id]) resultBlock.classList.add(colorMap[best.id]);

    /* ----- Affichage du résultat ----- */
    resultBlock.innerHTML = `
      <strong>${best.name}</strong><br>
      Capacité : jusqu’à ${best.max} pers.<br>
      Tarif ${labelDur} : <strong>${priceStr}</strong><br><br>
      <button id="devis-btn" class="btn btn-primary">Demander un devis</button>
    `;
    resultBlock.style.display = "block";

    /* ----- Listener « Demander un devis » (une seule fois) ----- */
    document.getElementById("devis-btn").addEventListener("click", () => {
      const pmrText = wantPMR ? "oui" : "non";
      const lignes  = [
        "Bonjour,",
        "",
        "Je souhaite organiser un événement avec les critères suivants :",
        `- Type d’événement : ${type}`,
        `- Nombre de participants : ${nb}`,
        `- Durée : ${labelDur}`,
        (dateStart && dateEnd) ? `- Période souhaitée : du ${dateStart} au ${dateEnd}` : null,
        `- Besoin d’accessibilité PMR : ${pmrText}`,
        "",
        "Pourriez-vous me faire une proposition adaptée ?",
        "Merci d’avance."
      ].filter(Boolean).join("\n");

      const contactSection = document.getElementById("contact");
      const subjectField   = contactSection?.querySelector('input[placeholder*="Objet"], #contact-subject');
      const messageField   = contactSection?.querySelector('textarea, #contact-message');

      if (subjectField && messageField) {
        subjectField.value = "Demande de devis";
        messageField.value = lignes;
      }

      closeAssistant();                                   // ta fonction existante
      setTimeout(() => contactSection?.scrollIntoView({ behavior: "smooth" }), 50);
    }, { once: true });
  });

});
