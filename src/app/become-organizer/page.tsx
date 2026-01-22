import Link from 'next/link';
import { CheckCircle, Award, TrendingUp, Users, Shield, DollarSign } from 'lucide-react';
import { AnimatedButton, AnimatedCard } from '@/components/ui';

export default function BecomeOrganizerPage() {
  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Grow Your Business',
      description: 'Reach thousands of potential clients looking for event organizers.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Connect Directly',
      description: 'Communicate with clients and negotiate terms on your own terms.',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Earn More',
      description: 'Set your own rates and keep more of what you earn.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Get paid safely through our escrow system with milestone-based releases.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Build Reputation',
      description: 'Earn reviews and ratings to attract more high-quality clients.',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Tools & Support',
      description: 'Access to marketing materials, analytics, and dedicated customer support.',
    },
  ];

  const requirements = [
    'At least 1 year of event organizing experience',
    'Professional portfolio with past event examples',
    'Valid business license or freelance credentials',
    'Professional communication and presentation skills',
    'Liability insurance coverage (recommended)',
    'Availability to respond to client inquiries',
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up with your email and basic information',
    },
    {
      number: '2',
      title: 'Complete Profile',
      description: 'Add your experience, skills, portfolio, and pricing',
    },
    {
      number: '3',
      title: 'Get Verified',
      description: 'We verify your credentials and background',
    },
    {
      number: '4',
      title: 'Start Bidding',
      description: 'Browse events and submit proposals to clients',
    },
  ];

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-gradient-to-r from-accent to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-display font-bold mb-4">Become a Venuly Organizer</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of event professionals earning more by connecting directly with clients.
          </p>
          <Link href="/auth/signup?role=organizer">
            <AnimatedButton size="lg" variant="primary" className="bg-white text-accent hover:bg-gray-100">
              Apply Now
            </AnimatedButton>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-12 text-center">Why Join Venuly?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedCard key={index} delay={index * 0.05} className="p-8">
                <div className="text-accent mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-dark mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                  <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-accent"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-white rounded-lg border border-gray-200 p-12 mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-8">Organizer Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-6">
                To ensure the best experience for both clients and organizers, we have a few basic requirements:
              </p>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
              <h3 className="font-semibold text-dark mb-4">Application Process</h3>
              <ol className="space-y-3 text-gray-700">
                <li>1. Submit application with your background</li>
                <li>2. We review your credentials and experience</li>
                <li>3. Quick verification call (15 minutes)</li>
                <li>4. Get approved and start bidding</li>
              </ol>
              <p className="text-sm text-gray-600 mt-6">
                Most applications are reviewed within 24-48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Types of Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-12 text-center">Event Types We Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Weddings',
              'Corporate Events',
              'Birthday Parties',
              'Conferences',
              'Social Gatherings',
              'Product Launches',
              'Networking Events',
              'Private Celebrations',
            ].map((eventType, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-dark font-semibold">{eventType}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary-dark to-accent rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join Venuly and start connecting with more clients today. No upfront fees.
          </p>
          <Link href="/auth/signup?role=organizer">
            <AnimatedButton size="lg" variant="primary" className="bg-white text-accent hover:bg-gray-100">
              Apply as Organizer
            </AnimatedButton>
          </Link>
        </section>
      </main>
    </div>
  );
}
