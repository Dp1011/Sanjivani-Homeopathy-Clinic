import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export function isMailConfigured(): boolean {
  return Boolean(
    process.env.DOCTOR_EMAIL?.trim() &&
      process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

type ErrorReportPayload = {
  name: string | null;
  email: string | null;
  subject: string;
  message: string;
  pageUrl: string | null;
};

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return cachedTransporter;
}

/** Strip control chars / newlines from email subject lines (RFC 5322 safety). */
function sanitizeSubjectLine(s: string, max = 180): string {
  return s
    .replace(/[\r\n\x00-\x1F\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function sendErrorReportEmail(payload: ErrorReportPayload): Promise<void> {
  if (!isMailConfigured()) {
    throw new Error("Mail is not configured");
  }

  const to = process.env.DOCTOR_EMAIL!.trim();
  const from =
    process.env.SMTP_FROM?.trim() || process.env.SMTP_USER!.trim();

  const lines = [
    "<h2>Website error report</h2>",
    "<p><strong>Subject:</strong> " + escapeHtml(payload.subject) + "</p>",
    "<p><strong>Message:</strong></p>",
    "<pre style=\"white-space:pre-wrap;font-family:sans-serif\">" +
      escapeHtml(payload.message) +
      "</pre>",
    "<p><strong>Reporter:</strong> " +
      escapeHtml(payload.name || "—") +
      "</p>",
    "<p><strong>Reporter email:</strong> " +
      escapeHtml(payload.email || "—") +
      "</p>",
    "<p><strong>Page URL:</strong> " +
      escapeHtml(payload.pageUrl || "—") +
      "</p>",
    "<hr /><p style=\"font-size:12px;color:#666\">Sent from Sanjivani Homeopathic Clinic website.</p>",
  ];

  const safeSubject = sanitizeSubjectLine(payload.subject);

  await getTransporter().sendMail({
    from,
    to,
    subject: `[Website] ${safeSubject}`,
    html: lines.join("\n"),
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
