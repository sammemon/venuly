'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { AnimatedButton, AnimatedInput, Textarea } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement contact form submission
      console.log('Form data:', formData);
      success('Thank you for reaching out. We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-display font-bold text-dark mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-1">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark">Email</h3>
                </div>
                <p className="text-gray-600">support@venuly.com</p>
                <p className="text-sm text-gray-500">We\'ll respond within 24 hours</p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark">Phone</h3>
                </div>
                <p className="text-gray-600">1-800-VENULY-1</p>
                <p className="text-sm text-gray-500">Monday - Friday, 9am - 6pm EST</p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark">Address</h3>
                </div>
                <p className="text-gray-600">123 Event Street</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-lg border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                    Your Name
                  </label>
                  <AnimatedInput
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email Address
                  </label>
                  <AnimatedInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
                  Subject
                </label>
                <AnimatedInput
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  required
                />
              </div>

              <AnimatedButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </AnimatedButton>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-display font-bold text-dark mb-8">Quick Answers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-dark mb-2">How long does verification take?</h3>
              <p className="text-gray-600">Most applications are verified within 24-48 hours.</p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers.</p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-2">Is there a refund policy?</h3>
              <p className="text-gray-600">Yes, we offer refunds for cancelled projects within 7 days.</p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-2">How do I report a problem?</h3>
              <p className="text-gray-600">Use the contact form above or email us at support@venuly.com directly.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
