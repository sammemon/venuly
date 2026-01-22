import Link from 'next/link';
import { BookOpen, Video, Download, MessageSquare, Award } from 'lucide-react';
import { AnimatedCard } from '@/components/ui';

export default function ResourcesPage() {
  const resources = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Getting Started Guide',
      description: 'Learn the basics of posting events and finding organizers',
      link: '#',
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for all platform features',
      link: '#',
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Sample Proposals',
      description: 'Templates and examples of professional proposals',
      link: '#',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'FAQ',
      description: 'Answers to commonly asked questions',
      link: '#',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Best Practices',
      description: 'Tips for hiring and working with event professionals',
      link: '#',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
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

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-display font-bold text-dark mb-4">Resources & Help</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed on Venuly. Guides, tutorials, and support.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-12 text-center">Featured Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <AnimatedCard key={index} delay={index * 0.05} className="p-8">
                <div className="text-accent mb-4">{resource.icon}</div>
                <h3 className="text-lg font-semibold text-dark mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link href={resource.link} className="text-accent font-semibold hover:text-primary-dark">
                  Learn More →
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Resource Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-dark mb-12 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-dark mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link href="#" className="text-accent hover:text-primary-dark font-medium">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Support CTA */}
        <section className="bg-gradient-to-r from-accent to-primary-dark rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is here to help. Get in touch with us.
          </p>
          <Link href="/contact" className="inline-block">
            <button className="px-8 py-3 bg-white text-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
