import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD;

if (!smtpHost || !smtpUser || !smtpPass) {
  // In production this should be set; we guard to avoid runtime crashes on missing envs
  console.warn('SMTP credentials not fully configured; email sending will be skipped.');
}

export const mailer = smtpHost && smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587/STARTTLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  if (!mailer) {
    console.warn('Mailer not configured; skipping email send.');
    return;
  }

  const fromAddress = options.from || process.env.SMTP_FROM || smtpUser;

  await mailer.sendMail({
    from: fromAddress,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
