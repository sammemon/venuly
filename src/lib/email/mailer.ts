import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('RESEND_API_KEY not configured; email sending will be skipped.');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  if (!resend) {
    console.warn('Resend not configured; skipping email send.');
    return;
  }

  const fromAddress = options.from || process.env.RESEND_FROM || 'noreply@venuly.dev';

  try {
    await resend.emails.send({
      from: fromAddress,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
