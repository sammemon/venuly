'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Award, TrendingUp, Users, Shield, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Reach thousands of potential clients looking for event organizers.',
  },
  {
    icon: Users,
    title: 'Connect Directly',
    description: 'Communicate with clients and negotiate terms on your own terms.',
  },
  {
    icon: DollarSign,
    title: 'Earn More',
    description: 'Set your own rates and keep more of what you earn.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Get paid safely through our escrow system with milestone-based releases.',
  },
  {
    icon: Award,
    title: 'Build Reputation',
    description: 'Earn reviews and ratings to attract more high-quality clients.',
  },
  {
    icon: CheckCircle,
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
    number: '01',
    title: 'Create Account',
    description: 'Sign up with your email and basic information',
  },
  {
    number: '02',
    title: 'Complete Profile',
    description: 'Add your experience, skills, portfolio, and pricing',
  },
  {
    number: '03',
    title: 'Get Verified',
    description: 'We verify your credentials and background',
  },
  {
    number: '04',
    title: 'Start Bidding',
    description: 'Browse events and submit proposals to clients',
  },
];

const eventTypes = [
  'Weddings',
  'Corporate Events',
  'Birthday Parties',
  'Conferences',
  'Social Gatherings',
  'Product Launches',
  'Networking Events',
  'Private Celebrations',
];

export default function BecomeOrganizerPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary)] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--accent)] opacity-5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Join Our Community
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              Become a{' '}
              <span className="text-[var(--primary)]">Venuly Organizer</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10">
              Join thousands of event professionals earning more by connecting directly with clients.
            </p>
            <Link href="/auth/signup?role=organizer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        {/* Benefits */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Why Join Venuly?
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4 group-hover:bg-[var(--primary)]/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              Getting Started
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              How It Works
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[var(--primary)]/20 via-[var(--primary)] to-[var(--primary)]/20" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft text-center">
                  <div className="w-14 h-14 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-lg font-bold relative z-10">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-[var(--text)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <div className="bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-soft overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <motion.div variants={itemVariants} className="p-8 md:p-12">
                <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
                  Eligibility
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--text)] mb-6">
                  Organizer Requirements
                </h2>
                <p className="text-[var(--muted)] mb-6">
                  To ensure the best experience for both clients and organizers, we have a few basic requirements:
                </p>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <motion.li 
                      key={index} 
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--muted)]">{requirement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="bg-[var(--bg-secondary)] p-8 md:p-12"
              >
                <h3 className="font-semibold text-[var(--text)] mb-6 text-xl">Application Process</h3>
                <ol className="space-y-4 text-[var(--muted)]">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
                    Submit application with your background
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                    We review your credentials and experience
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
                    Quick verification call (15 minutes)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
                    Get approved and start bidding
                  </li>
                </ol>
                <p className="text-sm text-[var(--muted)] mt-8 p-4 bg-[var(--bg)] rounded-xl border border-[var(--border)]">
                  Most applications are reviewed within <span className="font-medium text-[var(--text)]">24-48 hours</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Event Types */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Event Types We Support
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventTypes.map((eventType) => (
              <motion.div
                key={eventType}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center shadow-soft"
              >
                <p className="text-[var(--text)] font-medium">{eventType}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#2D2926] dark:bg-[#1A1715] rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary)] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
              Join Venuly and start connecting with more clients today. No upfront fees.
            </p>
            <Link href="/auth/signup?role=organizer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                Apply as Organizer
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
