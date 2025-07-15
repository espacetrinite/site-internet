const axios = require("axios");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { token, ip } = JSON.parse(event.body);

  const secret = process.env.TURNSTILE_SECRET;

  try {
    const response = await axios.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", null, {
      params: {
        secret: secret,
        response: token,
        remoteip: ip,
      },
    });

    if (response.data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ success: false, errors: response.data["error-codes"] }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error" }),
    };
  }
};
