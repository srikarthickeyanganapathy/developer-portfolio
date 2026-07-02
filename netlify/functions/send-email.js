// Netlify Function: sends contact-form submissions through the Gmail API.
//
// Runs server-side only — Google credentials never reach the browser.
// Required environment variables (set in Netlify dashboard, NOT in the
// frontend .env, and NOT prefixed with VITE_):
//   GMAIL_CLIENT_ID
//   GMAIL_CLIENT_SECRET
//   GMAIL_REFRESH_TOKEN
//   GMAIL_SENDER        (the Gmail address these tokens belong to)
//   CONTACT_RECEIVER    (where the message should land — can be the same address)
//
// See the setup guide for how to obtain the client id/secret/refresh token.

import { google } from "googleapis";

const OAUTH_REDIRECT = "https://developers.google.com/oauthplayground";

function buildRawEmail({ to, from, replyTo, subject, text }) {
  const lines = [
    `From: Portfolio Contact Form <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    text,
  ];
  const raw = lines.join("\n");
  return Buffer.from(raw)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const { name, email, message } = payload;

  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: "Name, email, and message are all required." }) };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: "That email address doesn't look right." }) };
  }

  const {
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
    GMAIL_SENDER,
    CONTACT_RECEIVER,
  } = process.env;

  if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN || !GMAIL_SENDER) {
    console.error("Missing Gmail API environment variables");
    return { statusCode: 500, body: JSON.stringify({ error: "Email service isn't configured yet." }) };
  }

  try {
    const oAuth2Client = new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, OAUTH_REDIRECT);
    oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const raw = buildRawEmail({
      to: CONTACT_RECEIVER || GMAIL_SENDER,
      from: GMAIL_SENDER,
      replyTo: email,
      subject: `Portfolio contact form: ${name}`,
      text: `New message from your portfolio site\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("Gmail send failed:", err?.message || err);
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Couldn't send the message right now. Please try again shortly." }),
    };
  }
}