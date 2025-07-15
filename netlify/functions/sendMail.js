const axios = require("axios");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }

  const body = JSON.parse(event.body);

  // 🔒 Vérification de la clé secrète
  if (!process.env.FORM_SECRET_KEY || body.secret !== process.env.FORM_SECRET_KEY) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Accès non autorisé" })
    };
  }

  const { name, email, subject, message } = body;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name, email },
        to: [{ email: process.env.DEST_EMAIL }],
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
