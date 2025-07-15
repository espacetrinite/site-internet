const axios = require("axios");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Méthode non autorisée"
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Corps de requête invalide" })
    };
  }

  if (!process.env.FORM_SECRET_KEY || body.secret !== process.env.FORM_SECRET_KEY) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Accès non autorisé" })
    };
  }

  const { name, email, subject, message } = body;

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Espace Trinité", email: "contact@espacetrinite.fr" },
        to: [{ email: process.env.DEST_EMAIL }],
        subject: subject || "Nouveau message via le site",
        htmlContent: `
          <h3>Message reçu via le site Espace Trinité</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong><br>${message.replace(/\n/g, "<br>")}</p>
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
  } catch (error) {
    console.error("Erreur d’envoi avec Brevo :", error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Échec de l’envoi du message" })
    };
  }
};
