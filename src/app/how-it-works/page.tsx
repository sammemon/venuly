'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  MessageSquare, 
  Heart, 
  Zap, 
  Shield, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui';
import { containerVariants, itemVariants } from '@/lib/animations';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      icon: <Calendar className="w-7 h-7" />,
      title: 'Post Your Event',
      description: 'Describe your event requirements, budget, and timeline. It\'s free and takes just a few minutes.',
    },
    {
      step: '02',
      icon: <Users className="w-7 h-7" />,
      title: 'Receive Proposals',
      description: 'Professional organizers submit detailed proposals. Compare prices, portfolios, and reviews.',
    },
    {
      step: '03',
      icon: <MessageSquare className="w-7 h-7" />,
      title: 'Communicate',
      description: 'Chat directly with organizers, ask questions, and negotiate terms within our secure platform.',
    },
    {
      step: '04',
      icon: <Heart className="w-7 h-7" />,
      title: 'Hire & Manage',
      description: 'Award the project and track progress through milestones. Secure payments until completion.',
    },
    {
      step: '05',
      icon: <CheckCircle className="w-7 h-7" />,
      title: 'Review & Rate',
      description: 'Share your experience and help other clients find great organizers for their events.',
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast & Easy',
      description: 'Post your event in minutes and start receiving proposals from qualified professionals.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified Professionals',
      description: 'All organizers are verified and reviewed by real clients. Hire with confidence.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Secure Payments',
      description: 'Milestone-based escrow system protects your investment until deliverables are met.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
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
              Simple Process
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6">
              How Venuly Works
            </h1>
            <p className="text-xl text-[var(--muted)] leading-relaxed">
              Simple, transparent, and designed for success. From posting your event to hiring the perfect organizer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="text-center group">
                    {/* Step Number Badge */}
                    <div className="relative inline-block mb-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="w-16 h-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mx-auto shadow-soft group-hover:shadow-soft-lg group-hover:border-[var(--primary)]/30 transition-all duration-200"
                      >
                        <div className="text-[var(--primary)]">{step.icon}</div>
                      </motion.div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] shadow-soft hover:shadow-soft-lg transition-all duration-200"
                    >
                      <h3 className="text-lg font-display font-semibold text-[var(--text)] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text)] mb-4">
              Why Choose Venuly?
            </h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Everything you need to plan successful events, all in one place.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-soft hover:shadow-soft-lg hover:border-[var(--primary)]/20 transition-all duration-200 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary-muted)] flex items-center justify-center mb-6 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-[var(--text)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#2D2926] rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Ready to Plan Your Event?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Get started in minutes and connect with professional event organizers today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup?role=client">
                  <AnimatedButton 
                    size="lg" 
                    className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-8"
                  >
                    Post Your Event
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </AnimatedButton>
                </Link>
                <Link href="/browse-events">
                  <AnimatedButton 
                    size="lg" 
                    variant="ghost"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    Browse Events
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
