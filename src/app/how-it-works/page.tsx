import Link from 'next/link';
import { Calendar, Users, CheckCircle, MessageSquare, Heart, Zap } from 'lucide-react';
import { AnimatedButton } from '@/components/ui';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Post Your Event',
      description: 'Describe your event requirements, budget, and timeline. It\'s free and takes just a few minutes.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Receive Proposals',
      description: 'Professional organizers submit detailed proposals. Compare prices, portfolios, and reviews.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Communicate & Negotiate',
      description: 'Chat directly with organizers, ask questions, and negotiate terms within our secure platform.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Hire & Manage',
      description: 'Award the project and track progress through milestones. Secure payments until completion.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Review & Rate',
      description: 'Share your experience and help other clients find great organizers for their events.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-display font-bold text-dark mb-4">How Venuly Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, transparent, and designed for success. From posting your event to hiring the perfect organizer.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <div className={step.color}>{step.icon}</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-accent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-8 text-center">Why Choose Venuly?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-dark mb-3">Fast & Easy</h3>
              <p className="text-gray-600">
                Post your event in minutes and start receiving proposals from qualified professionals.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <CheckCircle className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-dark mb-3">Verified Professionals</h3>
              <p className="text-gray-600">
                All organizers are verified and reviewed by real clients. Hire with confidence.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <Heart className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-dark mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Milestone-based escrow system protects your investment until deliverables are met.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-accent to-primary-dark rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Plan Your Event?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started in minutes and connect with event professionals today.
          </p>
          <Link href="/auth/signup?role=client">
            <AnimatedButton size="lg" variant="primary" className="bg-white text-accent hover:bg-gray-100">
              Post Your Event
            </AnimatedButton>
          </Link>
        </section>
      </main>
    </div>
  );
}
