'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Users, Star, Shield, ArrowRight, CheckCircle, Zap, Award } from 'lucide-react';
import { AnimatedButton, AnimatedCard } from '@/components/ui';

export default function HomeClient() {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Post Your Event',
      description: 'Describe your event requirements, budget, and timeline. It\'s free and takes just a few minutes.',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Receive Proposals',
      description: 'Professional organizers submit detailed proposals. Compare prices, portfolios, and reviews.',
      color: 'bg-secondary/10',
      iconColor: 'text-secondary',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Create Magic',
      description: 'Work with your chosen organizer through our secure platform. Make your event unforgettable.',
      color: 'bg-accent/10',
      iconColor: 'text-accent',
    },
  ];

  const trustFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified Organizers',
      description: 'All organizers go through our verification process to ensure quality and professionalism.',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Secure Payments',
      description: 'Milestone-based escrow system protects your investment until deliverables are met.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Dispute Resolution',
      description: 'Our dedicated team helps resolve any issues quickly and fairly.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Events Organized' },
    { value: '5K+', label: 'Verified Organizers' },
    { value: '4.8★', label: 'Average Rating' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-secondary py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              Plan Your{' '}
              <span className="text-accent relative">
                Perfect Event
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
              {' '}Today
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with top-rated event organizers and create unforgettable moments. From intimate gatherings to grand celebrations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/auth/signup?role=client">
                <AnimatedButton
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                  className="bg-white text-primary hover:bg-white/90 shadow-lg"
                  glow
                >
                  Post an Event
                </AnimatedButton>
              </Link>
              <Link href="/auth/signup?role=organizer">
                <AnimatedButton
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  Join as Organizer
                </AnimatedButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-text mb-4">
              How Venuly Works
            </h2>
            <p className="text-xl text-muted">
              Simple, transparent, and designed for success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCard className="text-center h-full p-8">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <div className={feature.iconColor}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-text">
                    {feature.title}
                  </h3>
                  <p className="text-muted">
                    {feature.description}
                  </p>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-text mb-4">
              Secure & Trusted Platform
            </h2>
            <p className="text-xl text-muted">
              Your satisfaction and security are our top priorities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-blue-600 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-white">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of satisfied clients who found their ideal event organizer on Venuly
            </p>
            <Link href="/auth/signup">
              <AnimatedButton
                size="xl"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="bg-white text-primary hover:bg-white/90"
                glow
              >
                Get Started Free
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
