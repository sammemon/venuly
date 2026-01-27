'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, DollarSign, Users, Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { AnimatedCard, AnimatedButton, Skeleton } from '@/components/ui';
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
  const { success, error } = useToast();

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

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-display font-bold text-text mb-2">Browse Events</h1>
          <p className="text-text-secondary">Discover opportunities and submit your best proposals</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border sticky top-4">
              <h3 className="text-lg font-semibold mb-4 text-text flex items-center gap-2">
                <Filter className="w-5 h-5 text-accent" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium text-text mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-text"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="mb-6">
                <label className="text-sm font-medium text-text mb-2 block">Event Type</label>
                <select
                  value={filters.eventType}
                  onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
                  className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-text"
                >
                  <option value="">All Types</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="birthday">Birthday</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <label className="text-sm font-medium text-text mb-2 block">Budget Range</label>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-text-secondary">Min: ${filters.minBudget.toLocaleString()}</span>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={filters.minBudget}
                      onChange={(e) => setFilters({ ...filters, minBudget: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary">Max: ${filters.maxBudget.toLocaleString()}</span>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={filters.maxBudget}
                      onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="mb-6">
                <label className="text-sm font-medium text-text mb-2 block">City</label>
                <input
                  type="text"
                  placeholder="Enter city..."
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-text"
                />
              </div>

              <AnimatedButton
                variant="outline"
                fullWidth
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ eventType: '', minBudget: 0, maxBudget: 100000, city: '' });
                }}
              >
                Reset Filters
              </AnimatedButton>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} variant="rectangular" height={200} />
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event, index) => (
                  <Link key={event._id} href={`/events/${event._id}`}>
                    <AnimatedCard delay={index * 0.1} hoverable>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-text mb-2">{event.title}</h3>
                          <p className="text-text-secondary mb-4 line-clamp-2">{event.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-accent" />
                              {new Date(event.eventDate.start).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-accent" />
                              {event.location.city}, {event.location.state}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-accent" />
                              {event.guestCount.min}-{event.guestCount.max} guests
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-accent" />
                              ${event.budget.min.toLocaleString()}-${event.budget.max.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
                          <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
                            Accepting
                          </span>
                          <span className="text-accent font-semibold">View Details →</span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-border mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-secondary mb-2">No events found</h3>
                <p className="text-text-muted">Try adjusting your filters or check back later</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
