document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 🔐 Récupérer le token Turnstile
    const tokenField = document.querySelector(".cf-turnstile [name='cf-turnstile-response']");
    if (!tokenField) {
      alert("Erreur : CAPTCHA non détecté.");
      return;
    }

    const token = tokenField.value;

    // 🛡️ Vérifier le CAPTCHA auprès de la fonction serverless
    const captchaCheck = await fetch("/.netlify/functions/validate-captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    const captchaResult = await captchaCheck.json();

    if (!captchaResult.success) {
      alert("Échec de la validation du CAPTCHA. Veuillez réessayer.");
      return;
    }

    // ✅ Si CAPTCHA OK → envoyer le formulaire à Brevo
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      secret: "trinite-XuB23v9Ld8" // ta clé pour sécuriser côté Brevo
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
