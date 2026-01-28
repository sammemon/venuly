import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/email/mailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const contactEmailTemplate = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
    <h2 style="color: #1E93AB; margin-bottom: 20px;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #1E93AB;">${data.message.replace(/\n/g, '<br>')}</p>
  </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Send email to both support addresses
    const supportEmails = [
      process.env.SUPPORT_EMAIL || 'support@venuly.dev',
      'sm275665@gmail.com',
    ];
    for (const to of supportEmails) {
      await sendMail({
        to,
        subject: `New Contact Form: ${validatedData.subject}`,
        html: contactEmailTemplate(validatedData),
      });
    }

    // Send confirmation email to user
    await sendMail({
      to: validatedData.email,
      subject: 'We received your message - Venuly',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Contact Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1E93AB;">Thank you for contacting us</h2>
            <p>Dear ${validatedData.name},</p>
            <p>We've received your message and our support team will get back to you within 24 hours.</p>
            <p>Best regards,<br/>Venuly Team</p>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);

    // Always return valid JSON
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    // If error is not JSON-serializable, return a generic message
    return NextResponse.json(
      { error: error?.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}
