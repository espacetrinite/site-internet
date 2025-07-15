document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tokenField = document.querySelector("[name='cf-turnstile-response']");
    if (!tokenField || !tokenField.value) {
      alert("Veuillez patienter, le CAPTCHA se charge...");
      return;
    }

    const token = tokenField.value;

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
        alert("Erreur lors de l’envoi.");
      }
    } catch (err) {
      console.error("Erreur envoi :", err);
      alert("Impossible d’envoyer le message.");
    }
  });
});
