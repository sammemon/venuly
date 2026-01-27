'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Video, Download, MessageSquare, Award, ArrowRight, Sparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

const resources = [
  {
    icon: BookOpen,
    title: 'Getting Started Guide',
    description: 'Learn the basics of posting events and finding organizers',
    link: '#',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for all platform features',
    link: '#',
  },
  {
    icon: Download,
    title: 'Sample Proposals',
    description: 'Templates and examples of professional proposals',
    link: '#',
  },
  {
    icon: MessageSquare,
    title: 'FAQ',
    description: 'Answers to commonly asked questions',
    link: '#',
  },
  {
    icon: Award,
    title: 'Best Practices',
    description: 'Tips for hiring and working with event professionals',
    link: '#',
  },
  {
    icon: BookOpen,
    title: 'API Documentation',
    description: 'For developers integrating with Venuly',
    link: '#',
  },
];

const categories = [
  {
    title: 'For Clients',
    items: [
      'How to post an event',
      'Comparing proposals',
      'Payment and escrow',
      'Managing projects',
      'Hiring best practices',
    ],
  },
  {
    title: 'For Organizers',
    items: [
      'Profile optimization',
      'Writing winning proposals',
      'Time management',
      'Building your portfolio',
      'Growing your business',
    ],
  },
  {
    title: 'General',
    items: [
      'Platform updates',
      'Security & privacy',
      'Community guidelines',
      'Contact support',
      'Feature requests',
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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
              Learn & Grow
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              Resources &{' '}
              <span className="text-[var(--primary)]">Help Center</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Everything you need to succeed on Venuly. Guides, tutorials, and support.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        {/* Featured Resources */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              Quick Start
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Featured Resources
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4 group-hover:bg-[var(--primary)]/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{resource.title}</h3>
                  <p className="text-sm text-[var(--muted)] mb-4">{resource.description}</p>
                  <Link 
                    href={resource.link} 
                    className="inline-flex items-center gap-1 text-[var(--primary)] font-medium text-sm group-hover:gap-2 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Resource Categories */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              Browse Topics
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Browse by Category
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <motion.div 
                key={category.title}
                variants={itemVariants}
                className="bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-soft p-6"
              >
                <h3 className="text-xl font-bold text-[var(--text)] mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Link 
                        href="#" 
                        className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors group"
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Support CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#2D2926] dark:bg-[#1A1715] rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary)] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
              Our support team is here to help. Get in touch with us.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                Contact Support
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
