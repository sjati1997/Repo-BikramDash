import "server-only"

import type { ContactFormValues } from "@/lib/contact/schema"

/** Escapes user-supplied text before it is placed into HTML. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Removes control characters (incl. CR/LF) from values used in headers. */
export function sanitizeHeaderValue(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim()
}

export function formatSubmittedAt(date: Date) {
  const day = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date)
  return `${day}, ${time} UTC`
}

type TemplateInput = {
  values: ContactFormValues
  submittedAt: Date
  organizationName: string
}

export function buildContactEmail({ values, submittedAt, organizationName }: TemplateInput) {
  const subjectLine = sanitizeHeaderValue(
    `New website enquiry: ${values.topic} — ${values.name}`
  ).slice(0, 200)

  const rows: Array<[label: string, value: string]> = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "Not provided"],
    ["Enquiry about", values.topic],
    ["Submitted", formatSubmittedAt(submittedAt)],
  ]

  const text = [
    "New Website Enquiry",
    "",
    ...rows.flatMap(([label, value]) => [`${label}:`, value, ""]),
    "Message:",
    values.message,
    "",
    "—",
    `Sent from the ${organizationName} website contact form. Reply to this email to respond to the visitor.`,
  ].join("\n")

  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e3e2eb;width:140px;vertical-align:top;color:#565470;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e3e2eb;vertical-align:top;color:#14122b;font-size:15px;">${
            label === "Email"
              ? `<a href="mailto:${escapeHtml(value)}" style="color:#004aad;">${escapeHtml(value)}</a>`
              : escapeHtml(value)
          }</td>
        </tr>`
    )
    .join("")

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f3f3f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e3e2eb;">
      <tr>
        <td style="padding:28px 32px;border-bottom:4px solid #1800ad;">
          <p style="margin:0 0 4px;color:#1800ad;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;">${escapeHtml(organizationName)}</p>
          <h1 style="margin:0;color:#14122b;font-size:22px;font-weight:600;">New Website Enquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 8px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rowHtml}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 28px;">
          <p style="margin:0 0 8px;color:#565470;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">Message</p>
          <div style="padding:16px;background:#f3f3f6;color:#14122b;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(values.message)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px;background:#f8f8fa;color:#565470;font-size:12px;line-height:1.5;">
          Sent from the ${escapeHtml(organizationName)} website contact form. Reply to this email to respond directly to ${escapeHtml(values.name)}.
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject: subjectLine, html, text }
}
