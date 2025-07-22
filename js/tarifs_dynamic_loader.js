// Charger et afficher les tarifs à partir du fichier XLSX
fetch("/tarifs_salles.xlsx")
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const grid = document.querySelector("#tarifs .tarif-grid");

    // Nettoyer les anciens articles
    grid.innerHTML = "";

    const couleurs = ["rouge", "bleu", "jaune", "vert"];

    rows.forEach((row, i) => {
      const card = document.createElement("article");
      card.className = `tarif-card ${couleurs[i % couleurs.length]}`;
      card.setAttribute("aria-labelledby", `tarif-${i}`);

      card.innerHTML = `
        <h3 id="tarif-${i}">${row["Nom de la salle"]}</h3>
        <p><strong>Journée :</strong> ${row["Journée (€)"]} €</p>
        <p><strong>Demi-journée :</strong> ${row["Demi-journée (€)"]} €</p>
        <p><strong>Tarif horaire :</strong> ${row["Tarif horaire (€)"]} €</p>
      `;

      grid.appendChild(card);
    });
  });
