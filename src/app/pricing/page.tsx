'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, HelpCircle } from 'lucide-react';
import { AnimatedButton } from '@/components/ui';
import { containerVariants, itemVariants } from '@/lib/animations';
import { useSession } from 'next-auth/react';

export default function PricingPage() {
  const { data: session } = useSession();
  const isSignedIn = !!session;
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

  const faqs = [
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, cancel your subscription anytime without penalties. No questions asked.',
    },
    {
      question: 'Do you charge service fees?',
      answer: 'We charge a 5% service fee on successful projects to maintain our platform.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Professional plans include a 14-day free trial with full features.',
    },
    {
      question: 'How do payments work?',
      answer: 'Payments are held in escrow until project completion, ensuring both parties are safe.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-muted)] text-[var(--primary)] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Simple Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-[var(--muted)] leading-relaxed">
              Choose the perfect plan for your event planning or organizing needs. No hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Client Plans */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-[var(--text)] mb-4">For Event Clients</h2>
            <p className="text-[var(--muted)]">
              Find and hire professional event organizers at prices that fit your budget
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className={`relative bg-[var(--surface)] rounded-2xl p-8 flex flex-col h-full border transition-all duration-200 ${
                  plan.highlight 
                    ? 'border-[var(--primary)] shadow-glow' 
                    : 'border-[var(--border)] shadow-soft hover:shadow-soft-lg'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-display font-bold text-[var(--text)] mb-2">{plan.name}</h3>
                <p className="text-[var(--muted)] mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-[var(--primary)]">{plan.price}</span>
                  {plan.period && <span className="text-[var(--muted)]">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--success-light)] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[var(--success)]" />
                      </div>
                      <span className="text-[var(--text)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isSignedIn ? (
                  <motion.button
                    disabled
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 bg-[var(--bg-secondary)] text-[var(--muted)] border border-[var(--border)] cursor-not-allowed`}
                  >
                    Your Current Plan
                  </motion.button>
                ) : (
                  <Link href="/auth/signup?role=client" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        plan.highlight
                          ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/20'
                          : 'bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)]/30'
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Organizer Plans */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-[var(--text)] mb-4">For Event Organizers</h2>
            <p className="text-[var(--muted)]">
              Build your event business and reach more clients on Venuly
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {organizerPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className={`relative bg-[var(--surface)] rounded-2xl p-8 flex flex-col h-full border transition-all duration-200 ${
                  plan.highlight 
                    ? 'border-[var(--primary)] shadow-glow' 
                    : 'border-[var(--border)] shadow-soft hover:shadow-soft-lg'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      Best Value
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-display font-bold text-[var(--text)] mb-2">{plan.name}</h3>
                <p className="text-[var(--muted)] mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-[var(--primary)]">{plan.price}</span>
                  {plan.period && <span className="text-[var(--muted)]">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--success-light)] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[var(--success)]" />
                      </div>
                      <span className="text-[var(--text)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isSignedIn ? (
                  <motion.button
                    disabled
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 bg-[var(--bg-secondary)] text-[var(--muted)] border border-[var(--border)] cursor-not-allowed`}
                  >
                    Your Current Plan
                  </motion.button>
                ) : (
                  <Link href="/auth/signup?role=organizer" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        plan.highlight
                          ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/20'
                          : 'bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)]/30'
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--bg-secondary)] rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-[var(--primary)]" />
            <h2 className="text-3xl font-display font-bold text-[var(--text)]">Frequently Asked Questions</h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]"
              >
                <h3 className="font-semibold text-[var(--text)] mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-center text-[var(--muted)] mt-8">
            Have more questions?{' '}
            <Link href="/contact" className="text-[var(--primary)] hover:underline font-medium">
              Contact our support team
            </Link>
          </p>
        </motion.section>
      </main>
    </div>
  );
}
