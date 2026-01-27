'use client';

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Input, Select } from '@/components/ui';
import { Calendar, Mail, Lock, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { UserRole } from '@/types';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role:
      roleParam === 'organizer'
        ? UserRole.ORGANIZER
        : UserRole.CLIENT,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      toast.success('Account created successfully!');
      router.push('/auth/signin');
    } catch (error: any) {
      toast.error(
        error.message || 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = formData.password.length >= 8;

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[var(--bg-secondary)]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&h=1600&fit=crop"
            alt="Beautiful wedding celebration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        
        {/* Overlay Content */}
        <div className="absolute top-12 left-12">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-white">
              Venuly
            </span>
          </Link>
        </div>

        <div className="absolute bottom-12 left-12 right-12 max-w-md">
          <h2 className="text-3xl font-display font-semibold text-white mb-4">
            Join thousands of successful event planners
          </h2>
          <ul className="space-y-3">
            {[
              'Access to verified professionals',
              'Secure milestone payments',
              'Dedicated support team',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/90">
                <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-8 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="bg-[var(--primary)] p-2.5 rounded-xl">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-[var(--text)]">
                Venuly
              </span>
            </Link>
          </div>

          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-display font-semibold text-[var(--text)] mb-2">
              Create your account
            </h1>
            <p className="text-[var(--muted)]">
              Start planning unforgettable events today
            </p>
          </div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                placeholder="John"
                icon={<User className="w-5 h-5" />}
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
                required
              />

              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              required
            />

            <Select
              label="I want to"
              options={[
                {
                  value: UserRole.CLIENT,
                  label: 'Organize an Event (Client)',
                },
                {
                  value: UserRole.ORGANIZER,
                  label: 'Offer Event Services (Organizer)',
                },
              ]}
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as UserRole,
                })
              }
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                icon={<Lock className="w-5 h-5" />}
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
              />
              {/* Password Strength Indicator */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      formData.password.length === 0 
                        ? 'w-0' 
                        : formData.password.length < 6 
                        ? 'w-1/4 bg-[var(--error)]' 
                        : formData.password.length < 8 
                        ? 'w-2/4 bg-[var(--warning)]' 
                        : 'w-full bg-[var(--success)]'
                    }`}
                  />
                </div>
                <span className={`text-xs font-medium ${passwordStrength ? 'text-[var(--success)]' : 'text-[var(--muted)]'}`}>
                  {formData.password.length === 0 
                    ? '' 
                    : passwordStrength 
                    ? 'Strong' 
                    : 'Min 8 chars'}
                </span>
              </div>
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              icon={<Lock className="w-5 h-5" />}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              error={
                formData.confirmPassword && formData.password !== formData.confirmPassword 
                  ? 'Passwords do not match' 
                  : undefined
              }
              required
            />

            <p className="text-sm text-[var(--muted)]">
              By signing up, you agree to our{' '}
              <Link
                href="/terms"
                className="text-[var(--primary)] hover:underline"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-[var(--primary)] hover:underline"
              >
                Privacy Policy
              </Link>
            </p>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </motion.form>

          <p className="mt-6 text-center text-[var(--muted)]">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
          <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
