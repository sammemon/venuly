'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Award, TrendingUp, Users, Quote } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

const stories = [
  {
    name: 'Sarah Mitchell',
    role: 'Wedding Planner',
    image: 'https://i.pravatar.cc/150?img=1',
    quote:
      'Using Venuly, I\'ve been able to connect with high-quality clients and grow my business by 300% in just one year. The platform is intuitive and the community is fantastic.',
    metrics: {
      events: '250+',
      clients: '500+',
      growth: '+300%',
    },
  },
  {
    name: 'Michael Chen',
    role: 'Corporate Event Organizer',
    image: 'https://i.pravatar.cc/150?img=3',
    quote:
      'The proposal system has been a game-changer for my business. I can now showcase my work effectively and compete fairly with larger agencies.',
    metrics: {
      events: '180+',
      avgBudget: '$25K',
      rating: '4.9/5',
    },
  },
  {
    name: 'Jessica Rodriguez',
    role: 'Event Client',
    image: 'https://i.pravatar.cc/150?img=5',
    quote:
      'I was overwhelmed planning my corporate gala, but Venuly made it so easy to find the perfect organizer. The whole process was transparent and professional.',
    metrics: {
      eventsSaved: '50+ hours',
      budgetSaved: '$5K',
      satisfaction: '10/10',
    },
  },
  {
    name: 'David Thompson',
    role: 'Event Agency Owner',
    image: 'https://i.pravatar.cc/150?img=8',
    quote:
      'Venuly has opened up new markets for our agency. We\'ve been able to expand beyond our local area and take on projects we never would have seen before.',
    metrics: {
      expansion: '5 new cities',
      revenue: '+250%',
      team: 'Hired 8 people',
    },
  },
  {
    name: 'Emily Watson',
    role: 'Wedding Client',
    image: 'https://i.pravatar.cc/150?img=9',
    quote:
      'Finding my wedding planner through Venuly was the best decision. The reviews and portfolio samples made it so easy to choose someone I could trust.',
    metrics: {
      proposals: '12 received',
      planning: '6 months',
      rating: '5/5 stars',
    },
  },
  {
    name: 'Alex Patel',
    role: 'Conference Organizer',
    image: 'https://i.pravatar.cc/150?img=11',
    quote:
      'Managing large conference contracts has never been easier. Venuly\'s platform handles all the complexity while keeping everything transparent.',
    metrics: {
      events: '30+ conferences',
      attendees: '50K+',
      venues: '100+',
    },
  },
];

const stats = [
  {
    label: 'Events Organized',
    value: '5000+',
    icon: TrendingUp,
  },
  {
    label: 'Happy Clients',
    value: '8000+',
    icon: Users,
  },
  {
    label: 'Professional Organizers',
    value: '2000+',
    icon: Award,
  },
  {
    label: 'Average Rating',
    value: '4.8/5',
    icon: Star,
  },
];

export default function SuccessStoriesPage() {
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
              <Award className="w-4 h-4" />
              Real Results
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              Success{' '}
              <span className="text-[var(--primary)]">Stories</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Discover how clients and organizers are achieving their goals with Venuly.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        {/* Stats Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-1">{stat.value}</p>
                  <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Success Stories Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Hear From Our Community
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <motion.div
                key={story.name}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft group"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--primary)] text-[var(--primary)]" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[var(--primary)]/10" />
                  <p className="text-[var(--muted)] text-sm leading-relaxed pl-4">
                    "{story.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 mb-4 pt-4 border-t border-[var(--border)]">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[var(--text)]">{story.name}</p>
                    <p className="text-sm text-[var(--primary)]">{story.role}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center bg-[var(--bg-secondary)] rounded-xl p-3">
                  {Object.entries(story.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className="font-bold text-[var(--primary)] text-sm">{value}</p>
                      <p className="text-xs text-[var(--muted)] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    </div>
                  ))}
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
          <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary)] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent)] opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied clients and organizers on Venuly today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup?role=client">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  Post an Event
                </motion.button>
              </Link>
              <Link href="/become-organizer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Become an Organizer
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
