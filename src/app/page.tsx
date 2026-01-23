import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, Calendar, Users, Star, Shield } from 'lucide-react';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-accent py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight slide-in-up">
              Plan Your{' '}
              <span className="text-yellow-300">Perfect Event</span>
              {' '}Today
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed slide-in-up">
              Connect with top-rated event organizers and create unforgettable moments. From intimate gatherings to grand celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-up">
              <Link href="/auth/signup?role=client">
                <Button size="lg" icon={<Calendar className="w-5 h-5" />} className="bg-white text-primary hover:bg-yellow-300">
                  Post an Event
                </Button>
              </Link>
              <Link href="/auth/signup?role=organizer">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Join as Organizer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-text mb-4">
              How Venuly Works
            </h2>
            <p className="text-xl text-muted">
              Simple, transparent, and designed for success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">Post Your Event</h3>
              <p className="text-muted">
                  Describe your event requirements, budget, and timeline. It is free and takes just a few minutes.
                  </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">Receive Proposals</h3>
              <p className="text-muted">
                Professional organizers submit detailed proposals. Compare prices, portfolios, and reviews.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">Create Magic</h3>
              <p className="text-muted">
                Work with your chosen organizer through our secure platform. Make your event unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-dark mb-6">
                Secure & Trusted Platform
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Verified Organizers</h4>
                    <p className="text-gray-600">
                      All organizers go through our verification process to ensure quality and professionalism.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Secure Payments</h4>
                    <p className="text-gray-600">
                      Milestone-based escrow system protects your investment until deliverables are met.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                    <p className="text-gray-600">
                      Our dedicated team helps resolve any issues quickly and fairly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-soft-lg p-8">
              <div className="text-center space-y-6">
                <div>
                  <div className="text-5xl font-bold text-accent">10K+</div>
                  <div className="text-gray-600 mt-2">Events Organized</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-accent">5K+</div>
                  <div className="text-gray-600 mt-2">Verified Organizers</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-accent">4.8★</div>
                  <div className="text-gray-600 mt-2">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Create Your Perfect Event?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied clients who found their ideal event organizer on Venuly
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="secondary"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-6 h-6 text-accent" />
                <span className="font-display text-xl font-bold">Venuly</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional event organizing marketplace connecting clients with expert organizers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/marketplace" className="hover:text-accent">Browse Events</Link></li>
                <li><Link href="/how-it-works" className="hover:text-accent">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-accent">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Organizers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/become-organizer" className="hover:text-accent">Become an Organizer</Link></li>
                <li><Link href="/resources" className="hover:text-accent">Resources</Link></li>
                <li><Link href="/success-stories" className="hover:text-accent">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-accent">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Venuly. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
      <Footer />
    </div>
  );
}
