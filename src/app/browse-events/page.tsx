'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Users, Search, Filter, ArrowRight, Sparkles, User } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';
import { useToast } from '@/components/ui/Toast';

interface EventData {
  _id: string;
  title: string;
  description: string;
  eventDate: {
    start: string;
    end: string;
  };
  location: {
    city: string;
    state: string;
    venue?: string;
  };
  budget: {
    min: number;
    max: number;
  };
  guestCount: {
    min: number;
    max: number;
  };
  status: string;
  eventType: string;
  clientId?: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email?: string;
  };
}

const eventTypes = [
  { value: '', label: 'All Types' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'conference', label: 'Conference' },
  { value: 'other', label: 'Other' },
];

export default function BrowseEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    eventType: '',
    minBudget: 0,
    maxBudget: 100000,
    city: '',
  });
  const { error } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data.events || []);
      setFilteredEvents(data.events || []);
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.eventType) {
      filtered = filtered.filter(event => event.eventType === filters.eventType);
    }

    if (filters.city) {
      filtered = filtered.filter(event =>
        event.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    filtered = filtered.filter(
      event => event.budget.min >= filters.minBudget && event.budget.max <= filters.maxBudget
    );

    setFilteredEvents(filtered);
  }, [searchQuery, filters, events]);

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({ eventType: '', minBudget: 0, maxBudget: 100000, city: '' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
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
              <Sparkles className="w-4 h-4" />
              Discover Events
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              Browse <span className="text-[var(--primary)]">Open Events</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Find your next opportunity and connect with top event clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/4"
          >
            {/* ...existing filter sidebar code... */}
            {/* (No change to filter sidebar markup) */}
          </motion.div>

          {/* Events Card Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 animate-pulse h-72" />
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredEvents.map((event) => (
                  <motion.div key={event._id} variants={itemVariants}>
                    <Link href={`/events/${event._id}`} className="block group h-full">
                      <div className="relative bg-white dark:bg-[var(--card)] rounded-2xl border-2 border-[var(--primary)] shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full overflow-hidden">
                        {/* Event Image Placeholder */}
                        <div className="h-40 w-full bg-[var(--bg-secondary)] flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-[var(--primary)] opacity-30" />
                        </div>
                        <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-semibold">
                              {event.eventType || 'Event'}
                            </span>
                            <span className="ml-auto px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-semibold">
                              From ${event.budget.min.toLocaleString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[var(--text)] mb-1 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2 flex-1">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-4">
                            <MapPin className="w-4 h-4 text-[var(--primary)]" />
                            <span>{event.location.city}, {event.location.state}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-4">
                            <Users className="w-4 h-4 text-[var(--primary)]" />
                            <span>{event.guestCount.min}-{event.guestCount.max} guests</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-4">
                            <Calendar className="w-4 h-4 text-[var(--primary)]" />
                            <span>{new Date(event.eventDate.start).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-auto">
                            <Link href={`/events/${event._id}`} className="ml-auto px-4 py-2 bg-[var(--primary)] text-white rounded-full font-semibold text-sm shadow-glow hover:bg-[var(--primary-hover)] transition-all">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)]"
              >
                <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-[var(--muted)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-2">No events found</h3>
                <p className="text-[var(--muted)] mb-6">Try adjusting your filters or check back later</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
