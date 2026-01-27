'use client';

import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Input } from '@/components/ui';
import { Calendar, Mail, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = require('next-auth/react').useSession();

  // If already signed in, redirect to dashboard
  React.useEffect(() => {
    if (status === 'authenticated') {
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      router.replace(callbackUrl);
    }
  }, [status, searchParams, router]);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Signed in successfully!');
        const callbackUrl =
          searchParams.get('callbackUrl') || '/dashboard';
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="bg-[var(--primary)] p-2.5 rounded-xl">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-[var(--text)]">
              Venuly
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-semibold text-[var(--text)] mb-2">
              Welcome back
            </h1>
            <p className="text-[var(--muted)]">
              Sign in to your account to continue managing your events
            </p>
          </div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span className="ml-2 text-[var(--muted)]">
                  Remember me
                </span>
              </label>

              <Link
                href="/auth/reset"
                className="text-[var(--primary)] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </motion.form>

          <p className="mt-8 text-center text-[var(--muted)]">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[var(--bg-secondary)]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=1600&fit=crop"
            alt="Elegant event setting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* Overlay Content */}
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="text-white">
            <p className="text-2xl font-display font-medium leading-relaxed mb-4">
              &ldquo;Venuly transformed how we plan corporate events. The platform is intuitive and the organizers are exceptional.&rdquo;
            </p>
            <footer className="flex items-center gap-4">
              <Image
                src="https://i.pravatar.cc/48?img=8"
                alt="Michael Chen"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Michael Chen</p>
                <p className="text-white/70 text-sm">Director of Operations, TechCorp</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
          <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
