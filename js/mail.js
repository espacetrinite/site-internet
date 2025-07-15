document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/.netlify/functions/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Message envoyé !");
        form.reset();
      } else {
        alert("Une erreur est survenue. Merci de réessayer.");
      }
    } catch (err) {
      console.error("Erreur lors de l’envoi du formulaire :", err);
      alert("Impossible d’envoyer le message. Vérifiez votre connexion.");
    }
  });
});
