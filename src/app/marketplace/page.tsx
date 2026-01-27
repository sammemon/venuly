'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui';
import { Search, MapPin, Calendar, DollarSign, Users, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventType } from '@/types';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { containerVariants, itemVariants } from '@/lib/animations';

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  location: {
    city: string;
    state: string;
    country: string;
  };
  eventDate: {
    start: string;
    end: string;
  };
  guestCount: {
    min: number;
    max: number;
  };
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  proposals: any[];
  views: number;
  publishedAt: string;
}

const eventTypeColors: Record<EventType, string> = {
  [EventType.WEDDING]: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
  [EventType.CORPORATE]: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  [EventType.BIRTHDAY]: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  [EventType.CONCERT]: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  [EventType.CONFERENCE]: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  [EventType.EXHIBITION]: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  [EventType.PARTY]: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  [EventType.FESTIVAL]: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  [EventType.OTHER]: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
};

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'budget-high', label: 'Highest Budget' },
  { value: 'budget-low', label: 'Lowest Budget' },
];

export default function MarketplacePage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    eventType: '',
    city: '',
    sort: 'newest',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, [filters, page]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      });

      const response = await fetch(`/api/events?${params}`);
      const data = await response.json();

      setEvents(data.events);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
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
              Discover Opportunities
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
              Find Your Next{' '}
              <span className="text-[var(--primary)]">Event Project</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Browse events from clients looking for talented event organizers like you.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-soft p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
              />
            </div>

            <select
              value={filters.eventType}
              onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
              className="w-full p-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
            >
              <option value="">All Event Types</option>
              {Object.values(EventType).map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="City"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
              />
            </div>

            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="w-full p-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 animate-pulse">
                <div className="h-6 bg-[var(--bg-secondary)] rounded-lg mb-4 w-24" />
                <div className="h-6 bg-[var(--bg-secondary)] rounded mb-4" />
                <div className="h-4 bg-[var(--bg-secondary)] rounded mb-2" />
                <div className="h-4 bg-[var(--bg-secondary)] rounded w-2/3 mb-6" />
                <div className="space-y-2">
                  <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
                  <div className="h-4 bg-[var(--bg-secondary)] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
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
            <p className="text-[var(--muted)]">Try adjusting your filters or check back later</p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {events.map((event) => (
                <motion.div key={event._id} variants={itemVariants}>
                  <Link href={`/events/${event._id}`}>
                    <motion.div
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="bg-white dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full group overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className={`${eventTypeColors[event.eventType]} border-0`}>
                            {event.eventType.replace('_', ' ')}
                          </Badge>
                          <span className="text-xs text-[var(--muted)]">
                            {event.proposals.length} proposals
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                          {event.title}
                        </h3>
                        
                        <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-[var(--muted)]">
                            <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                              <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                            </div>
                            <span>{event.location.city}, {event.location.state}</span>
                          </div>

                          <div className="flex items-center gap-2 text-[var(--muted)]">
                            <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                              <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" />
                            </div>
                            <span>{formatDate(event.eventDate.start, 'short')}</span>
                          </div>

                          <div className="flex items-center gap-2 text-[var(--muted)]">
                            <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                              <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
                            </div>
                            <span>{event.guestCount.min}-{event.guestCount.max} guests</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                              <DollarSign className="w-3.5 h-3.5 text-[var(--primary)]" />
                            </div>
                            <span className="font-semibold text-[var(--text)]">
                              {formatCurrency(event.budget.min)} - {formatCurrency(event.budget.max)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between">
                        <span className="text-xs text-[var(--muted)]">
                          Posted {formatDate(event.publishedAt, 'relative')}
                        </span>
                        <span className="flex items-center gap-1 text-[var(--primary)] font-medium text-sm group-hover:gap-2 transition-all">
                          View
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-[var(--border)] rounded-xl text-[var(--text)] font-medium hover:bg-[var(--bg-secondary)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </motion.button>
                <div className="px-4 py-2 text-sm text-[var(--muted)]">
                  Page <span className="font-medium text-[var(--text)]">{page}</span> of <span className="font-medium text-[var(--text)]">{totalPages}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-[var(--border)] rounded-xl text-[var(--text)] font-medium hover:bg-[var(--bg-secondary)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
