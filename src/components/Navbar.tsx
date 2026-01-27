'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Menu, X, ChevronDown, Sparkles, BookOpen, Users } from 'lucide-react';
import { AnimatedButton } from '@/components/ui';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboard = pathname?.startsWith('/dashboard');
  if (isDashboard) return null;

  const navLinks = [
    { href: '/browse-events', label: 'Browse Events' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const servicesLinks = [
    { href: '/become-organizer', label: 'Become Organizer', icon: Sparkles, description: 'Start earning as a pro' },
    { href: '/resources', label: 'Resources', icon: BookOpen, description: 'Guides & tutorials' },
    { href: '/success-stories', label: 'Success Stories', icon: Users, description: 'Client testimonials' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/95 backdrop-blur-xl shadow-soft border-b border-[var(--border)]'
            : 'bg-[var(--bg)]'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="bg-[var(--primary)] p-2.5 rounded-xl shadow-soft">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
              </motion.div>
              <span className="font-display text-2xl font-bold text-[var(--text)]">
                Venuly
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                    pathname === link.href
                      ? 'text-[var(--primary)]'
                      : 'text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--primary-muted)]'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--primary)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="px-4 py-2 rounded-lg font-medium text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--primary-muted)] transition-all duration-200 flex items-center gap-1">
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-[var(--card)] rounded-2xl shadow-soft-lg border border-[var(--border)] overflow-hidden"
                    >
                      <div className="p-2">
                        {servicesLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-[var(--primary-muted)] transition-colors group"
                            >
                              <div className="p-2 rounded-lg bg-[var(--primary-muted)] group-hover:bg-[var(--primary)] transition-colors">
                                <Icon className="w-4 h-4 text-[var(--primary)] group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <span className="font-medium text-[var(--text)] block">{link.label}</span>
                                <span className="text-sm text-[var(--muted)]">{link.description}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-[var(--primary)]'
                      : 'text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--primary-muted)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Link href="/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 rounded-xl font-medium text-[var(--text)] hover:bg-[var(--primary-muted)] transition-colors"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/auth/signup">
                <AnimatedButton variant="primary" className="shadow-soft">
                  Get Started
                </AnimatedButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-[var(--primary-muted)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--text)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--text)]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-[var(--border)] bg-[var(--card)]"
            >
              <div className="px-4 py-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                      pathname === link.href
                        ? 'bg-[var(--primary-muted)] text-[var(--primary)]'
                        : 'text-[var(--text)] hover:bg-[var(--primary-muted)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                    Services
                  </p>
                  {servicesLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text)] hover:bg-[var(--primary-muted)] transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-[var(--primary-muted)]">
                          <Icon className="w-4 h-4 text-[var(--primary)]" />
                        </div>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 pb-2">
                  <p className="px-4 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                    Company
                  </p>
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl font-medium text-[var(--text)] hover:bg-[var(--primary-muted)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 space-y-3 border-t border-[var(--border)]">
                  <div className="px-4 flex justify-start">
                    <ThemeToggle />
                  </div>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-3 rounded-xl font-semibold text-[var(--text)] border-2 border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-muted)] transition-all">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <AnimatedButton variant="primary" fullWidth className="mt-2">
                      Get Started
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
}
