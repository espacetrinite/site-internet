document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tokenField = document.querySelector(".cf-turnstile [name='cf-turnstile-response']");
    if (!tokenField) {
      alert("CAPTCHA non chargé.");
      return;
    }

    const token = tokenField.value;

    try {
      const captchaRes = await fetch("/.netlify/functions/validate-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const captchaJson = await captchaRes.json();

      if (!captchaJson.success) {
        alert("Échec du CAPTCHA. Veuillez réessayer.");
        return;
      }

      // ✅ CAPTCHA validé — déclencher ici l’envoi du mail vers send-mail
      // Par exemple :
      document.getElementById("contact-form").submit();

    } catch (err) {
      console.error("Erreur de vérification CAPTCHA", err);
      alert("Erreur serveur. Veuillez réessayer.");
    }
  });
});
