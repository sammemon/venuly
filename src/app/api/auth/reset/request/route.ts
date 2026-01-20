import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';
import { sendMail } from '@/lib/email/mailer';

const APP_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Do not reveal that the email doesn't exist
      return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    user.passwordResetToken = token;
    user.passwordResetExpires = expires;
    await user.save();

    const resetLink = `${APP_URL}/auth/reset?token=${token}`;

    const html = `
      <h2>Reset your password</h2>
      <p>We received a request to reset your password. Click the link below to set a new password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `;

    await sendMail({
      to: user.email,
      subject: 'Reset your Venuly password',
      html,
    });

    return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
