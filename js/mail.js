document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tokenField = document.querySelector("[name='cf-turnstile-response']");
    const token = tokenField?.value;

    if (!token) {
      alert("Veuillez valider le CAPTCHA.");
      return;
    }

    // ✅ Vérifier CAPTCHA via fonction serverless
    try {
      const captchaRes = await fetch("/.netlify/functions/validate-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const result = await captchaRes.json();
      console.log("Réponse CAPTCHA:", result);

      if (!result.success) {
        alert("Échec du CAPTCHA. Veuillez réessayer.");
        return;
      }
    } catch (err) {
      console.error("Erreur CAPTCHA :", err);
      alert("Problème serveur CAPTCHA.");
      return;
    }

    // ✅ CAPTCHA validé, on peut envoyer le mail
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      secret: "trinite-XuB23v9Ld8"
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
        turnstile.reset(); // Important : reset du CAPTCHA
      } else {
        alert("Erreur d’envoi du message.");
      }
    } catch (err) {
      console.error("Erreur d’envoi :", err);
      alert("Impossible d’envoyer le message.");
    }
  });
});
