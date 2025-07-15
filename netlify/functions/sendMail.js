const axios = require("axios");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name, email }, // Expéditeur affiché
        to: [{ email: "contact@tondomaine.fr" }], // ⚠️ à adapter
        subject: subject || "Nouveau message via le site",
        htmlContent: `
          <h3>Message reçu via le site Espace Trinité</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong><br>${message}</p>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("Erreur Brevo :", err.response?.data || err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Échec de l’envoi" })
    };
  }
};
