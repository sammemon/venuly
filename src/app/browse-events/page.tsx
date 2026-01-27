'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Users, Search, Filter, ArrowRight, Sparkles } from 'lucide-react';
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
  clientId?: any;
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
              <Sparkles className="w-4 h-4" />
              Find Your Next Project
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              Browse{' '}
              <span className="text-[var(--primary)]">Open Events</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Discover opportunities and submit your best proposals to clients looking for talented event organizers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft sticky top-24">
              <h3 className="text-lg font-semibold mb-6 text-[var(--text)] flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                  <Filter className="w-4 h-4 text-[var(--primary)]" />
                </div>
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[var(--text)] mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[var(--text)] mb-2 block">Event Type</label>
                <select
                  value={filters.eventType}
                  onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
                  className="w-full p-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[var(--text)] mb-4 block">Budget Range</label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-[var(--muted)] mb-2">
                      <span>Min</span>
                      <span className="font-medium text-[var(--primary)]">${filters.minBudget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={filters.minBudget}
                      onChange={(e) => setFilters({ ...filters, minBudget: parseInt(e.target.value) })}
                      className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[var(--muted)] mb-2">
                      <span>Max</span>
                      <span className="font-medium text-[var(--primary)]">${filters.maxBudget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={filters.maxBudget}
                      onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) })}
                      className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                    />
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[var(--text)] mb-2 block">City</label>
                <input
                  type="text"
                  placeholder="Enter city..."
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full p-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetFilters}
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl text-[var(--text)] font-medium hover:bg-[var(--bg-secondary)] transition-all duration-200"
              >
                Reset Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Events List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] animate-pulse"
                  >
                    <div className="h-6 bg-[var(--bg-secondary)] rounded-lg w-3/4 mb-4" />
                    <div className="h-4 bg-[var(--bg-secondary)] rounded w-full mb-2" />
                    <div className="h-4 bg-[var(--bg-secondary)] rounded w-2/3 mb-4" />
                    <div className="flex gap-4">
                      <div className="h-4 bg-[var(--bg-secondary)] rounded w-24" />
                      <div className="h-4 bg-[var(--bg-secondary)] rounded w-32" />
                      <div className="h-4 bg-[var(--bg-secondary)] rounded w-28" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[var(--muted)]">
                    Showing <span className="font-medium text-[var(--text)]">{filteredEvents.length}</span> events
                  </p>
                </div>
                
                {filteredEvents.map((event) => (
                  <motion.div key={event._id} variants={itemVariants}>
                    <Link href={`/events/${event._id}`}>
                      <motion.div
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                                {event.title}
                              </h3>
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                                Accepting
                              </span>
                            </div>
                            <p className="text-[var(--muted)] mb-4 line-clamp-2">{event.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2 text-[var(--muted)]">
                                <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                                  <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
                                </div>
                                <span>{new Date(event.eventDate.start).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[var(--muted)]">
                                <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                                  <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                                </div>
                                <span>{event.location.city}, {event.location.state}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[var(--muted)]">
                                <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                                  <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
                                </div>
                                <span>{event.guestCount.min}-{event.guestCount.max} guests</span>
                              </div>
                              <div className="flex items-center gap-2 text-[var(--muted)]">
                                <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                                  <DollarSign className="w-3.5 h-3.5 text-[var(--primary)]" />
                                </div>
                                <span className="font-medium text-[var(--text)]">
                                  ${event.budget.min.toLocaleString()}-${event.budget.max.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="flex items-center gap-2 text-[var(--primary)] font-semibold group-hover:gap-3 transition-all">
                              View Details
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
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
