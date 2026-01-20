'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Select } from '@/components/ui';
import { Search, MapPin, Calendar, DollarSign, Users, Filter, LogOut, User } from 'lucide-react';
import { EventType } from '@/types';
import { formatCurrency, formatDate } from '@/utils/helpers';

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

  const eventTypeColors: Record<EventType, string> = {
    [EventType.WEDDING]: 'bg-pink-100 text-pink-700',
    [EventType.CORPORATE]: 'bg-blue-100 text-blue-700',
    [EventType.BIRTHDAY]: 'bg-purple-100 text-purple-700',
    [EventType.CONCERT]: 'bg-red-100 text-red-700',
    [EventType.CONFERENCE]: 'bg-green-100 text-green-700',
    [EventType.EXHIBITION]: 'bg-yellow-100 text-yellow-700',
    [EventType.PARTY]: 'bg-orange-100 text-orange-700',
    [EventType.FESTIVAL]: 'bg-indigo-100 text-indigo-700',
    [EventType.OTHER]: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-white shadow-soft sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-accent" />
            <span className="font-display text-2xl font-bold text-dark">Venuly</span>
          </Link>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {session.user.firstName}
                  </Button>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Post Event</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-dark mb-2">
            Browse Events
          </h1>
          <p className="text-lg text-gray-600">
            Find your next event organizing opportunity
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              placeholder="Search events..."
              icon={<Search className="w-5 h-5" />}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />

            <Select
              options={[
                { value: '', label: 'All Event Types' },
                ...Object.values(EventType).map(type => ({
                  value: type,
                  label: type.replace('_', ' '),
                })),
              ]}
              value={filters.eventType}
              onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
            />

            <Input
              placeholder="City"
              icon={<MapPin className="w-5 h-5" />}
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />

            <Select
              options={[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'budget-high', label: 'Highest Budget' },
                { value: 'budget-low', label: 'Lowest Budget' },
              ]}
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            />
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-soft p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link key={event._id} href={`/marketplace/${event._id}`}>
                  <Card hover className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={eventTypeColors[event.eventType]}>
                          {event.eventType.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {event.proposals.length} proposals
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{event.location.city}, {event.location.state}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>{formatDate(event.eventDate.start, 'short')}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{event.guestCount.min}-{event.guestCount.max} guests</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <span className="font-semibold text-dark">
                            {formatCurrency(event.budget.min)} - {formatCurrency(event.budget.max)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                        Posted {formatDate(event.publishedAt, 'relative')}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 text-sm text-gray-600">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
