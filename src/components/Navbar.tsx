'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Menu, X, ChevronDown, Sparkles, Zap, Users } from 'lucide-react';
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
    { href: '/become-organizer', label: 'Become Organizer', icon: Sparkles },
    { href: '/resources', label: 'Resources', icon: Zap },
    { href: '/success-stories', label: 'Success Stories', icon: Users },
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
            ? 'bg-card/95 backdrop-blur-xl shadow-soft border-b border-border'
            : 'bg-card'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-primary via-accent to-secondary p-2 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Venuly
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all relative group ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
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
                <button className="px-4 py-2 rounded-lg font-medium text-muted hover:text-primary transition-all flex items-center gap-1">
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-2xl border border-border overflow-hidden"
                    >
                      {servicesLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-primary">{link.label}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted hover:text-primary'
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-lg font-semibold text-muted hover:text-primary transition-colors"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/auth/signup">
                <AnimatedButton variant="primary" className="shadow-lg shadow-primary/20">
                  Get Started
                </AnimatedButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-muted" />
              ) : (
                <Menu className="w-6 h-6 text-muted" />
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
              className="lg:hidden border-t border-border bg-card"
            >
              <div className="px-4 py-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                      pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-text hover:bg-card-hover'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-2 pb-2">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Services
                  </p>
                  {servicesLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-primary/5 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 pb-2">
                  <p className="px-4 text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Company
                  </p>
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg font-medium text-text hover:bg-primary/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  <div className="px-4 flex justify-start">
                    <ThemeToggle />
                  </div>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-3 rounded-lg font-semibold text-text border-2 border-border hover:border-primary transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <AnimatedButton variant="primary" className="w-full">
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
