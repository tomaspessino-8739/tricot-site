import { createHash } from "node:crypto";

const site = "https://untricot.com";
const emailPattern = /^[^\s@,;<>"\\]+@[^\s@,;<>"\\]+\.[^\s@,;<>"\\]+$/;

export default async function contact(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).end();
  }

  if (request.headers.origin !== site) return response.status(403).end();
  const contentType = request.headers["content-type"]?.split(";")[0];
  if (contentType !== "application/x-www-form-urlencoded") return response.status(415).end();
  if (Number(request.headers["content-length"]) > 2048) return response.status(413).end();

  const fields = typeof request.body === "string"
    ? Object.fromEntries(new URLSearchParams(request.body))
    : request.body ?? {};
  const returnPath = fields.language === "en" ? "/en/" : "/";
  const finish = (status) => {
    response.setHeader("Location", site + returnPath + "?contact=" + status + "#contacto");
    return response.status(303).end();
  };

  if (fields.companyWebsite) return finish("sent");

  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  if (email.length > 254 || !emailPattern.test(email) || /[\r\n]/.test(fields.email)) {
    return finish("invalid");
  }

  const { RESEND_API_KEY, TRICOT_CONTACT_FROM, TRICOT_CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !TRICOT_CONTACT_FROM || !TRICOT_CONTACT_TO) return finish("error");

  const timeWindow = Math.floor(Date.now() / (10 * 60 * 1000));
  const requestId = createHash("sha256").update(email.toLowerCase() + ":" + timeWindow).digest("hex");

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + RESEND_API_KEY,
        "Content-Type": "application/json",
        "Idempotency-Key": "tricot-contact/" + requestId,
      },
      body: JSON.stringify({
        from: TRICOT_CONTACT_FROM,
        to: [TRICOT_CONTACT_TO],
        reply_to: email,
        subject: "Nueva solicitud de contacto · TRICOT",
        text: "Han dejado este email en untricot.com: " + email,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return finish(result.ok ? "sent" : "error");
  } catch {
    return finish("error");
  }
}
