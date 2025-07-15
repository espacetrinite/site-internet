const axios = require("axios");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Méthode non autorisée"
    };
  }

  try {
    const { token } = JSON.parse(event.body);
    const secret = process.env.TURNSTILE_SECRET;

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const response = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      params
    );

    if (response.data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({
          success: false,
          errors: response.data["error-codes"]
        })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
