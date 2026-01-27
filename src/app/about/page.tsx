import Link from 'next/link';
import { Heart, Target, Users, Globe } from 'lucide-react';
import { AnimatedCard } from '@/components/ui';

export default function AboutPage() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Co-Founder & CEO',
      bio: '15+ years in event planning and hospitality management',
    },
    {
      name: 'Michael Chen',
      role: 'Co-Founder & CTO',
      bio: 'Tech entrepreneur with experience building B2B platforms',
    },
    {
      name: 'Jessica Martinez',
      role: 'Head of Operations',
      bio: 'Operations expert who scaled two startups to profitability',
    },
    {
      name: 'David Thompson',
      role: 'Head of Partnerships',
      bio: 'Business development leader with strong industry connections',
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'People First',
      description: 'We prioritize the needs and success of both clients and event organizers.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Transparency',
      description: 'No hidden fees, no surprises. We believe in honest, straightforward business.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'We\'re building a community where professionals can grow and thrive together.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Constantly improving our platform to serve the event industry better.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-display font-bold text-text mb-4">About Venuly</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            We\'re on a mission to connect event clients with the best professional organizers.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-text mb-6">Our Story</h2>
              <p className="text-text-secondary mb-4">
                Venuly was founded in 2023 by a group of event industry veterans who saw a problem: finding and hiring professional event organizers was complicated, risky, and inefficient.
              </p>
              <p className="text-text-secondary mb-4">
                We spent years dealing with:
              </p>
              <ul className="space-y-2 text-text-secondary mb-6">
                <li>• Unreliable freelancers and contractors</li>
                <li>• Hidden fees and surprise costs</li>
                <li>• Difficulty comparing proposals and prices</li>
                <li>• Poor communication and project tracking</li>
              </ul>
              <p className="text-text-secondary">
                So we decided to build the platform we wished existed. Today, Venuly connects thousands of clients with verified event professionals every month.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent to-primary-dark rounded-lg h-96 flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">5000+</p>
                <p className="text-xl">Events Organized</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatedCard delay={0} className="p-8 bg-card border border-border">
            <Target className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-text mb-3">Our Mission</h3>
            <p className="text-text-secondary">
              To simplify event planning by connecting clients with trusted, professional organizers and providing a transparent, secure platform for collaboration.
            </p>
          </AnimatedCard>
          <AnimatedCard delay={0.1} className="p-8 bg-card border border-border">
            <Globe className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-text mb-3">Our Vision</h3>
            <p className="text-text-secondary">
              To become the go-to platform for event planning, recognized worldwide for excellence, reliability, and innovation in connecting clients with event professionals.
            </p>
          </AnimatedCard>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-text mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-8">
                <div className="text-accent mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-3">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-text mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-text mb-1">{member.name}</h3>
                <p className="text-accent font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-text-secondary">{member.bio}</p>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-card rounded-lg border border-border p-12 mb-16">
          <h2 className="text-3xl font-display font-bold text-text mb-12 text-center">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-accent mb-2">5000+</p>
              <p className="text-text-secondary">Events Organized</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent mb-2">2000+</p>
              <p className="text-text-secondary">Verified Organizers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent mb-2">8000+</p>
              <p className="text-text-secondary">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent mb-2">$50M+</p>
              <p className="text-text-secondary">Projects Completed</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-display font-bold text-text mb-4">Questions? We'd Love to Hear From You</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Our team is here to help with any questions about Venuly, partnerships, or anything else.
          </p>
          <Link href="/contact" className="inline-block">
            <button className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              Get in Touch
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
