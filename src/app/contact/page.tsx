'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Sparkles, Send, Clock, HelpCircle } from 'lucide-react';
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations';
import { useToast } from '@/components/ui/Toast';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    primary: 'support@venuly.com',
    secondary: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: 'Call Us',
    primary: '1-800-VENULY-1',
    secondary: 'Monday - Friday, 9am - 6pm EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    primary: '123 Event Street',
    secondary: 'New York, NY 10001',
  },
];

const faqs = [
  {
    question: 'How long does verification take?',
    answer: 'Most applications are verified within 24-48 hours.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Yes, we offer refunds for cancelled projects within 7 days.',
  },
  {
    question: 'How do I report a problem?',
    answer: 'Use the contact form above or email us at support@venuly.com directly.',
  },
];

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      success("Thank you for reaching out. We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              We'd Love to{' '}
              <span className="text-[var(--primary)]">Hear From You</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Have questions? Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        {/* Contact Info Cards */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--primary)] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[var(--primary)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{info.title}</h3>
                  <p className="text-[var(--text)] font-medium">{info.primary}</p>
                  <p className="text-sm text-[var(--muted)]">{info.secondary}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left side - Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
                Contact Form
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)] mb-6">
                Send Us a Message
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24 hours. 
                We're here to help with any questions about Venuly.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[var(--muted)]">
                  <Clock className="w-5 h-5 text-[var(--primary)]" />
                  <span>Average response time: 4 hours</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--muted)]">
                  <Sparkles className="w-5 h-5 text-[var(--primary)]" />
                  <span>Available 24/7 for urgent matters</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div 
              variants={cardVariants}
              className="lg:col-span-3 bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-soft p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text)] mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text)] mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--text)] mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-4 block">
              Quick Answers
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)]">
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text)] mb-2">{faq.question}</h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
