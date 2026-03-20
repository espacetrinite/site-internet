document.addEventListener("DOMContentLoaded", function () {
  const form     = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  /* ----------------------------------------------------------
     Textarea auto-resize
  ---------------------------------------------------------- */
  const textarea = document.getElementById("contact-message");
  if (textarea) {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  }

  /* ----------------------------------------------------------
     Tous les boutons → scroll vers #contact
     (bouton flottant + "Demander un devis")
  ---------------------------------------------------------- */
  document.querySelectorAll("#btn-reserv-float, .btn-scroll-contact").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ----------------------------------------------------------
     Feedback helper
  ---------------------------------------------------------- */
  function showFeedback(type, msg) {
    feedback.className = "form-feedback " + type;
    feedback.textContent = msg;
    feedback.hidden = false;
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ----------------------------------------------------------
     Soumission
  ---------------------------------------------------------- */
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    feedback.hidden = true;

    // 🔐 Récupérer le token Turnstile
    const tokenField = document.querySelector("[name='cf-turnstile-response']");
    const token = tokenField?.value || "";

    if (!token) {
      showFeedback("error", "Veuillez valider le CAPTCHA avant d'envoyer.");
      return;
    }

    // 🔒 Vérification du CAPTCHA via Netlify
    try {
      const captchaRes = await fetch("/.netlify/functions/validate-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const captchaJson = await captchaRes.json();

      if (!captchaJson.success) {
        showFeedback("error", "Échec du CAPTCHA. Veuillez réessayer.");
        return;
      }
    } catch (err) {
      console.error("Erreur serveur CAPTCHA :", err);
      showFeedback("error", "Erreur lors de la vérification CAPTCHA. Vérifiez votre connexion.");
      return;
    }

    // ✅ Envoi du message après validation
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      secret: "trinite-XuB23v9Ld8"
    };

    try {
      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours…";

      const res = await fetch("/.netlify/functions/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showFeedback("success", "Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.");
        form.reset();
        submitBtn.textContent = "Envoyer la demande";
        submitBtn.disabled = false;
      } else {
        throw new Error("Réponse serveur non OK");
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      showFeedback("error", "Une erreur est survenue. Merci de réessayer ou de nous appeler directement.");
      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.textContent = "Envoyer la demande";
      submitBtn.disabled = false;
    }
  });
});
