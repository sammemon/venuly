import { Star, Users, TrendingUp } from 'lucide-react';
import { AnimatedCard } from '@/components/ui';

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: 'Sarah Mitchell',
      role: 'Wedding Planner',
      image: 'bg-gradient-to-br from-pink-400 to-pink-600',
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
      image: 'bg-gradient-to-br from-blue-400 to-blue-600',
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
      image: 'bg-gradient-to-br from-purple-400 to-purple-600',
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
      image: 'bg-gradient-to-br from-green-400 to-green-600',
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
      image: 'bg-gradient-to-br from-rose-400 to-rose-600',
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
      image: 'bg-gradient-to-br from-amber-400 to-amber-600',
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
      icon: '🎉',
    },
    {
      label: 'Happy Clients',
      value: '8000+',
      icon: '😊',
    },
    {
      label: 'Professional Organizers',
      value: '2000+',
      icon: '👥',
    },
    {
      label: 'Average Rating',
      value: '4.8/5',
      icon: '⭐',
    },
  ];

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-display font-bold text-dark mb-4">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results from real professionals and clients using Venuly to succeed.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <section className="mb-16 grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold text-accent mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Success Stories Grid */}
        <section>
          <h2 className="text-3xl font-display font-bold text-dark mb-12 text-center">Featured Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <AnimatedCard key={index} delay={index * 0.05} className="p-8 flex flex-col">
                {/* Profile Image */}
                <div className={`w-16 h-16 ${story.image} rounded-full mb-4`}></div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 mb-6 flex-1">"{story.quote}"</p>

                {/* Name & Role */}
                <div className="mb-4 border-t border-gray-200 pt-4">
                  <p className="font-semibold text-dark">{story.name}</p>
                  <p className="text-sm text-accent">{story.role}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  {Object.entries(story.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className="font-bold text-accent">{value}</p>
                      <p className="text-xs text-gray-600 capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-gradient-to-r from-accent to-primary-dark rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied clients and organizers on Venuly today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/signup?role=client" className="px-8 py-3 bg-white text-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Post an Event
            </a>
            <a href="/become-organizer" className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-accent transition-colors">
              Become an Organizer
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
