document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tokenField = document.querySelector(".cf-turnstile [name='cf-turnstile-response']");
    if (!tokenField || !tokenField.value) {
      alert("CAPTCHA non chargé.");
      return;
    }

    const token = tokenField.value;

    // 🔐 Vérification du CAPTCHA auprès du backend
    try {
      const captchaRes = await fetch("/.netlify/functions/validate-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const captchaJson = await captchaRes.json();

      if (!captchaJson.success) {
        alert("Échec du CAPTCHA. Veuillez réessayer.");
        return;
      }
    } catch (err) {
      console.error("Erreur CAPTCHA :", err);
      alert("Erreur serveur. Veuillez réessayer.");
      return;
    }

    // ✅ CAPTCHA validé → envoyer les données à /send-mail
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/.netlify/functions/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Message envoyé !");
        form.reset();
      } else {
        alert("Erreur lors de l’envoi. Merci de réessayer.");
      }
    } catch (err) {
      console.error("Erreur envoi formulaire :", err);
      alert("Impossible d’envoyer le message.");
    }
  });
});
