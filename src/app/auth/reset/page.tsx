'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const hasToken = Boolean(token);

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return toast.error('Email is required');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send reset email');
      }
      toast.success('If that email exists, a reset link has been sent.');
    } catch (err: any) {
      toast.error(err.message || 'Error sending reset email');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return toast.error('Password is required');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to reset password');
      }
      toast.success('Password updated. Please sign in.');
      router.push('/auth/signin');
    } catch (err: any) {
      toast.error(err.message || 'Error resetting password');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F2EC] p-6">
      <div className="w-full max-w-md bg-white border border-[#DCDCDC] rounded-xl shadow-sm p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#222222] mb-2">{hasToken ? 'Set New Password' : 'Reset Password'}</h1>
          <p className="text-gray-600 text-sm">
            {hasToken
              ? 'Enter a new password to complete your reset.'
              : 'Enter your email and we will send you a reset link.'}
          </p>
        </div>

        {hasToken ? (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                minLength={8}
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1E93AB] text-white py-3 rounded-lg hover:bg-[#197A8F] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1E93AB] text-white py-3 rounded-lg hover:bg-[#197A8F] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
