import Link from 'next/link';
import { Check } from 'lucide-react';
import { AnimatedButton, AnimatedCard } from '@/components/ui';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      description: 'For individuals planning their first event',
      price: 'Free',
      features: [
        'Post up to 2 events',
        'Receive up to 10 proposals',
        'Basic messaging',
        'Email support',
        '14-day guarantee',
      ],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Professional',
      description: 'For frequent event planners',
      price: '$9.99',
      period: '/month',
      features: [
        'Unlimited event posts',
        'Unlimited proposals',
        'Priority support',
        'Advanced filtering',
        '30-day guarantee',
        'Verified badge',
        'Analytics dashboard',
      ],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'Team collaboration tools',
        'White-label options',
        'SLA guarantee',
        'Priority onboarding',
      ],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];

  const organizerPlans = [
    {
      name: 'Free',
      description: 'Get started as an organizer',
      price: 'Free',
      features: [
        'Create profile',
        'Browse events',
        'Submit proposals',
        'Basic messaging',
        'Monthly earnings report',
      ],
      cta: 'Create Profile',
      highlight: false,
    },
    {
      name: 'Pro Organizer',
      description: 'Grow your event business',
      price: '$19.99',
      period: '/month',
      features: [
        'Everything in Free',
        'Featured in search results',
        'Portfolio showcase',
        'Advanced analytics',
        'Priority customer support',
        'Marketing materials',
        'Payment processing',
      ],
      cta: 'Upgrade Now',
      highlight: true,
    },
    {
      name: 'Agency',
      description: 'For event management companies',
      price: '$49.99',
      period: '/month',
      features: [
        'Everything in Pro',
        'Team member accounts',
        'White-label options',
        'Custom branding',
        'Dedicated support',
        'API access',
        'Bulk operations',
      ],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-display font-bold text-dark mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your event planning or organizing needs. No hidden fees.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Client Plans */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-4 text-center">For Event Clients</h2>
          <p className="text-center text-gray-600 mb-12">
            Find and hire professional event organizers at prices that fit your budget
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className={`p-8 flex flex-col h-full ${
                  plan.highlight ? 'border-2 border-accent transform md:scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-dark mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-accent">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup?role=client" className="w-full">
                  <AnimatedButton
                    size="lg"
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    {plan.cta}
                  </AnimatedButton>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Organizer Plans */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-4 text-center">For Event Organizers</h2>
          <p className="text-center text-gray-600 mb-12">
            Build your event business and reach more clients on Venuly
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {organizerPlans.map((plan, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className={`p-8 flex flex-col h-full ${
                  plan.highlight ? 'border-2 border-accent transform md:scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                    Best Value
                  </div>
                )}
                <h3 className="text-2xl font-bold text-dark mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-accent">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup?role=organizer" className="w-full">
                  <AnimatedButton
                    size="lg"
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    {plan.cta}
                  </AnimatedButton>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-lg border border-gray-200 p-12">
          <h2 className="text-3xl font-display font-bold text-dark mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-dark mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, cancel your subscription anytime without penalties. No questions asked.</p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-2">Do you charge service fees?</h3>
              <p className="text-gray-600">We charge a 5% service fee on successful projects to maintain our platform.</p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! Professional plans include a 14-day free trial with full features.</p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-2">How do payments work?</h3>
              <p className="text-gray-600">Payments are held in escrow until project completion, ensuring both parties are safe.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
