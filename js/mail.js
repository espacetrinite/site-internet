document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 🔐 Récupérer le token Turnstile
    const tokenField = document.querySelector("[name='cf-turnstile-response']");
    const token = tokenField?.value || "";

    if (!token) {
      alert("Veuillez valider le CAPTCHA avant d'envoyer.");
      return;
    }

    // 🔒 Étape 1 : Vérification du CAPTCHA via Netlify
    try {
      const captchaRes = await fetch("/.netlify/functions/validate-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const captchaJson = await captchaRes.json();
      console.log("Réponse CAPTCHA :", captchaJson);

      if (!captchaJson.success) {
        alert("Échec du CAPTCHA. Veuillez réessayer.");
        return;
      }
    } catch (err) {
      console.error("Erreur serveur CAPTCHA :", err);
      alert("Erreur lors de la vérification CAPTCHA.");
      return;
    }

    // ✅ Étape 2 : Envoi du message après validation
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      secret: "trinite-XuB23v9Ld8" // ou mieux : variable dans Netlify
    };

    try {
      const res = await fetch("/.netlify/functions/send-mail", {
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
