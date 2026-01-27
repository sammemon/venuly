'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  Users, 
  Star, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Award,
  Sparkles,
  Heart,
  BadgeCheck,
  Clock,
  MapPin
} from 'lucide-react';
import { AnimatedButton, AnimatedCard } from '@/components/ui';

export default function HomeClient() {
  const features = [
    {
      step: '01',
      icon: <Calendar className="w-7 h-7" />,
      title: 'Post Your Event',
      description: 'Share your vision, budget, and timeline. Our streamlined process takes just minutes.',
    },
    {
      step: '02',
      icon: <Users className="w-7 h-7" />,
      title: 'Receive Proposals',
      description: 'Get personalized proposals from verified organizers. Compare portfolios and reviews.',
    },
    {
      step: '03',
      icon: <Sparkles className="w-7 h-7" />,
      title: 'Create Magic',
      description: 'Collaborate seamlessly through our platform. Make your event unforgettable.',
    },
  ];

  const trustFeatures = [
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: 'Verified Professionals',
      description: 'Every organizer passes our rigorous verification process.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Payments',
      description: 'Milestone-based escrow protects your investment.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Our dedicated team is always here to help.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Events Organized' },
    { value: '5,000+', label: 'Verified Organizers' },
    { value: '4.9', label: 'Average Rating', icon: <Star className="w-5 h-5 fill-current" /> },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const featuredOrganizers = [
    {
      name: 'Elegant Affairs',
      specialty: 'Luxury Weddings',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      price: 'From $2,500',
    },
    {
      name: 'Corporate Events Pro',
      specialty: 'Business Events',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      price: 'From $1,800',
    },
    {
      name: 'Party Perfection',
      specialty: 'Birthday & Celebrations',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      price: 'From $800',
    },
  ];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--bg)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
        </div>

        <div className="container-main relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-muted)] text-[var(--primary)] text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4" />
                Trusted by 10,000+ Event Hosts
              </motion.span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] leading-tight mb-6">
                Your Dream Event,{' '}
                <span className="text-[var(--primary)] relative">
                  Perfectly Planned
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 2 150 2 198 10" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
                  </svg>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[var(--muted)] mb-8 leading-relaxed max-w-xl">
                Connect with top-rated event professionals who bring your vision to life. 
                From intimate gatherings to grand celebrations — we make it effortless.
              </p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/auth/signup?role=client">
                  <AnimatedButton
                    size="lg"
                    icon={<Calendar className="w-5 h-5" />}
                    glow
                  >
                    Post Your Event
                  </AnimatedButton>
                </Link>
                <Link href="/auth/signup?role=organizer">
                  <AnimatedButton
                    size="lg"
                    variant="outline"
                  >
                    Join as Organizer
                  </AnimatedButton>
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div 
                className="mt-10 flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-[var(--card)] bg-[var(--bg-secondary)] overflow-hidden"
                    >
                      <Image 
                        src={`https://i.pravatar.cc/80?img=${i + 10}`} 
                        alt="User"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[var(--primary)]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--muted)]">
                    <span className="font-semibold text-[var(--text)]">4.9/5</span> from 2,000+ reviews
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative lg:h-[600px]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-3xl" />
                <Image
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop"
                  alt="Beautiful wedding venue"
                  width={800}
                  height={600}
                  className="rounded-3xl object-cover h-full shadow-soft-xl"
                  priority
                />
                
                {/* Floating Card */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-[var(--card)] rounded-2xl p-4 shadow-soft-lg border border-[var(--border)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--success-light)] flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-[var(--success)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text)]">Event Booked!</p>
                      <p className="text-sm text-[var(--muted)]">Wedding • June 2026</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stats Card */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-[var(--card)] rounded-2xl p-4 shadow-soft-lg border border-[var(--border)]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[var(--primary)] fill-current" />
                    <span className="font-semibold text-[var(--text)]">98% Happy Clients</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="section bg-[var(--bg-secondary)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-muted)] text-[var(--primary)] text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--text)] mb-4">
              How Venuly Works
            </h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Three simple steps to your perfect event. We&apos;ve streamlined the process so you can focus on what matters.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="relative h-full">
                  {/* Step Number */}
                  <span className="absolute -top-4 -left-2 text-7xl font-display font-bold text-[var(--primary)]/10">
                    {feature.step}
                  </span>
                  
                  <AnimatedCard 
                    className="relative h-full text-center pt-8" 
                    hoverable={false}
                    padding="lg"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[var(--primary-muted)] flex items-center justify-center mx-auto mb-6 text-[var(--primary)]">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3 text-[var(--text)]">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </AnimatedCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 bg-[#2D2926] dark:bg-[#2D2926]">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {stat.value}
                  {stat.icon}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ORGANIZERS SECTION ===== */}
      <section className="section bg-[var(--bg)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-sm font-medium mb-4">
                Top Rated
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--text)]">
                Featured Organizers
              </h2>
              <p className="text-lg text-[var(--muted)] mt-2">
                Discover our most trusted event professionals
              </p>
            </div>
            <Link href="/marketplace">
              <AnimatedButton variant="ghost" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                View All Organizers
              </AnimatedButton>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredOrganizers.map((organizer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCard className="h-full overflow-hidden" padding="none">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={organizer.image}
                      alt={organizer.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-[var(--text)]">
                      {organizer.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <BadgeCheck className="w-5 h-5 text-[var(--primary)]" />
                      <span className="text-sm text-[var(--primary)] font-medium">Verified</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-1">{organizer.name}</h3>
                    <p className="text-sm text-[var(--muted)] mb-3">{organizer.specialty}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[var(--primary)] fill-current" />
                        <span className="font-semibold text-[var(--text)]">{organizer.rating}</span>
                        <span className="text-sm text-[var(--muted)]">({organizer.reviews})</span>
                      </div>
                      <AnimatedButton size="sm" variant="ghost">
                        View Profile
                      </AnimatedButton>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="section bg-[var(--card)]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--success-light)] text-[var(--success)] text-sm font-medium mb-4">
                Why Venuly
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--text)] mb-6">
                A Platform Built on Trust & Excellence
              </h2>
              <p className="text-lg text-[var(--muted)] mb-8">
                We&apos;ve created the safest and most reliable marketplace for event planning. Your satisfaction is our priority.
              </p>

              <div className="space-y-6">
                {trustFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[var(--primary-muted)] flex items-center justify-center text-[var(--primary)]">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text)] mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-[var(--muted)] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=500&fit=crop"
                  alt="Team collaboration"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Testimonial Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 max-w-xs bg-[var(--card)] rounded-2xl p-5 shadow-soft-lg border border-[var(--border)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-1 text-[var(--primary)] mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[var(--text)] text-sm mb-3 italic">
                  &quot;Venuly made planning our wedding so much easier. Found the perfect organizer within days!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://i.pravatar.cc/40?img=32"
                    alt="Sarah M."
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-[var(--text)] text-sm">Sarah M.</p>
                    <p className="text-xs text-[var(--muted)]">Wedding, NYC</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="section-lg bg-[var(--bg)] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-narrow relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-muted)] text-[var(--primary)] text-sm font-medium mb-6">
              Start Today
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[var(--text)] mb-6 max-w-3xl mx-auto leading-tight">
              Ready to Create Your <span className="text-[var(--primary)]">Perfect Event</span>?
            </h2>
            <p className="text-lg text-[var(--muted)] mb-10 max-w-2xl mx-auto">
              Join thousands of happy clients who found their ideal event organizer on Venuly. 
              Start for free, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <AnimatedButton
                  size="xl"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  glow
                >
                  Get Started Free
                </AnimatedButton>
              </Link>
              <Link href="/how-it-works">
                <AnimatedButton
                  size="xl"
                  variant="ghost"
                >
                  Learn More
                </AnimatedButton>
              </Link>
            </div>

            {/* Trust Badges */}
            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-[var(--muted)]">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Secure Platform</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--muted)]">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--muted)]">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Money-Back Guarantee</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
