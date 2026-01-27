'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations';
import { Heart, Target, Users, Globe, Sparkles, Lightbulb, Shield } from 'lucide-react';

const team = [
  // All team members use the same professional business profile SVG
  {
    name: 'Raza Khan',
    role: 'AI Engineer',
    avatar: (
      <svg viewBox="0 0 80 80" className="w-20 h-20 animate-fade-in-up" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#222" stroke="#fff" strokeWidth="2" />
        <g>
          <ellipse cx="40" cy="60" rx="20" ry="12" fill="#fff" />
          <ellipse cx="40" cy="38" rx="15" ry="16" fill="#222" />
          <ellipse cx="40" cy="34" rx="8" ry="8" fill="#222" />
          <rect x="32" y="50" width="16" height="10" rx="4" fill="#222" />
          <rect x="36" y="54" width="8" height="6" rx="2" fill="#fff" />
          <rect x="36" y="54" width="2" height="6" rx="1" fill="#222" />
          <rect x="42" y="54" width="2" height="6" rx="1" fill="#222" />
        </g>
      </svg>
    ),
    bio: 'Student of Computer System Engineering at MUET',
  },
  {
    name: 'Sohail Ahmed',
    role: 'Full Stack Developer',
    avatar: (
      <svg viewBox="0 0 80 80" className="w-20 h-20 animate-fade-in-up" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#222" stroke="#fff" strokeWidth="2" />
        <g>
          <ellipse cx="40" cy="60" rx="20" ry="12" fill="#fff" />
          <ellipse cx="40" cy="38" rx="15" ry="16" fill="#222" />
          <ellipse cx="40" cy="34" rx="8" ry="8" fill="#222" />
          <rect x="32" y="50" width="16" height="10" rx="4" fill="#222" />
          <rect x="36" y="54" width="8" height="6" rx="2" fill="#fff" />
          <rect x="36" y="54" width="2" height="6" rx="1" fill="#222" />
          <rect x="42" y="54" width="2" height="6" rx="1" fill="#222" />
        </g>
      </svg>
    ),
    bio: 'Student of Computer System Engineering at MUET',
  },
  {
    name: 'Muhammad Hammad',
    role: 'AI Engineer',
    avatar: (
      <img
        src="/team/muhammad.jpg"
        alt="Muhammad Hammad profile"
        className="w-28 h-28 rounded-full object-cover animate-fade-in-up border-2 border-[var(--primary)] bg-[var(--card)]"
      />
    ),
    bio: 'Student of Computer System Engineering at MUET',
  },
];

const values = [
  {
    icon: Heart,
    title: 'People First',
    description: 'We prioritize the needs and success of both clients and event organizers.',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'No hidden fees, no surprises. We believe in honest, straightforward business.',
  },
  {
    icon: Users,
    title: 'Community',
    description: "We're building a community where professionals can grow and thrive together.",
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly improving our platform to serve the event industry better.',
  },
];

const stats = [
  { value: '5,000+', label: 'Events Organized' },
  { value: '2,000+', label: 'Verified Organizers' },
  { value: '8,000+', label: 'Happy Clients' },
  { value: '$50M+', label: 'Projects Completed' },
];

export default function AboutPage() {
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
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              Transforming How Events{' '}
              <span className="text-[var(--primary)]">Come to Life</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              We're on a mission to connect event clients with the best professional organizers.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        {/* Our Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
                The Beginning
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)] mb-6">
                Born From a Simple Frustration
              </h2>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  Venuly was founded in 2023 by a group of event industry veterans who saw a problem: 
                  finding and hiring professional event organizers was complicated, risky, and inefficient.
                </p>
                <p className="font-medium text-[var(--text)]">We spent years dealing with:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1.5">•</span>
                    Unreliable freelancers and contractors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1.5">•</span>
                    Hidden fees and surprise costs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1.5">•</span>
                    Difficulty comparing proposals and prices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1.5">•</span>
                    Poor communication and project tracking
                  </li>
                </ul>
                <p>
                  So we decided to build the platform we wished existed. Today, Venuly connects 
                  thousands of clients with verified event professionals every month.
                </p>
              </div>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 border border-[var(--border)]">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="text-center p-4"
                    >
                      <p className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2">{stat.value}</p>
                      <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white dark:bg-[var(--card)] rounded-2xl p-8 border border-[var(--border)] shadow-soft"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[var(--text)] mb-4">Our Mission</h3>
              <p className="text-[var(--muted)] leading-relaxed">
                To simplify event planning by connecting clients with trusted, professional organizers 
                and providing a transparent, secure platform for collaboration.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white dark:bg-[var(--card)] rounded-2xl p-8 border border-[var(--border)] shadow-soft"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[var(--text)] mb-4">Our Vision</h3>
              <p className="text-[var(--muted)] leading-relaxed">
                To become the go-to platform for event planning, recognized worldwide for excellence, 
                reliability, and innovation in connecting clients with event professionals.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--primary)]/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              The People Behind Venuly
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Meet Our Team
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3 } 
                }}
                className="relative bg-white dark:bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-soft group"
              >
                {/* Animated glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500 group-hover:duration-200 animate-glow -z-10" />
                <div className="relative bg-white dark:bg-[var(--card)] rounded-2xl overflow-hidden">
                  <div className="aspect-square flex items-center justify-center overflow-hidden">
                    {member.avatar}
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[var(--text)] mb-1 group-hover:text-[var(--primary)] transition-colors duration-300">{member.name}</h3>
                    <p className="text-sm text-[var(--primary)] font-semibold mb-3">{member.role}</p>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{member.bio}</p>
                  </div>
                </div>
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
              Questions? We'd Love to Hear From You
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
              Our team is here to help with any questions about Venuly, partnerships, or anything else.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
