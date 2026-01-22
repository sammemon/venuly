import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { connectDB } from '@/lib/db/connect';
import Event from '@/models/Event';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui';

async function getEvent(id: string) {
  try {
    await connectDB();
    const event = await Event.findById(id)
      .populate('clientId', 'firstName lastName email avatar phone')
      .lean();
    
    if (!event) {
      notFound();
    }
    
    return event;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  return {
    title: event?.title || 'Event Not Found',
    description: event?.description,
  };
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const event = await getEvent(params.id);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDaysUntil = (date: Date | string) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = calculateDaysUntil(event.eventDate);

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-accent hover:text-primary-dark font-medium mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Marketplace
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-accent to-primary-dark rounded-lg h-64 mb-6 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-white/50" />
              </div>

              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-display font-bold text-dark mb-2">{event.title}</h1>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                      event.status === 'CLOSED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status === 'OPEN' ? '✓ Accepting Proposals' : event.status === 'CLOSED' ? 'Closed' : 'Draft'}
                    </div>
                  </div>
                  {daysUntil > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Event in</div>
                      <div className="text-3xl font-bold text-accent">{daysUntil}d</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Event Info Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Event Date</span>
                </div>
                <p className="font-semibold text-dark">{formatDate(event.eventDate)}</p>
                <p className="text-sm text-gray-600">{formatTime(event.eventDate)}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Location</span>
                </div>
                <p className="font-semibold text-dark">{event.venue}</p>
                <p className="text-sm text-gray-600">{event.city}, {event.state}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Budget</span>
                </div>
                <p className="font-semibold text-dark">${event.budget?.toLocaleString()}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Guest Count</span>
                </div>
                <p className="font-semibold text-dark">{event.guestCount} Guests</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-dark">Event Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Services Needed */}
            {event.servicesNeeded && event.servicesNeeded.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-dark">Services Needed</h2>
                <div className="flex flex-wrap gap-2">
                  {event.servicesNeeded.map((service: string) => (
                    <span key={service} className="bg-secondary-bg text-dark px-3 py-1 rounded-full text-sm font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {event.additionalNotes && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-dark flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Additional Notes
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">{event.additionalNotes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Client Info Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4 text-dark">Posted By</h3>
              {event.clientId && (
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    {event.clientId.avatar ? (
                      <img
                        src={event.clientId.avatar}
                        alt={event.clientId.firstName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                        {event.clientId.firstName[0]}{event.clientId.lastName[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-dark">{event.clientId.firstName} {event.clientId.lastName}</p>
                      <p className="text-sm text-gray-600">Client</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{event.clientId.email}</p>
                  {event.clientId.phone && (
                    <p className="text-sm text-gray-600 mb-4">{event.clientId.phone}</p>
                  )}
                </div>
              )}

              {/* CTA Button */}
              {session && session.user.role === 'ORGANIZER' ? (
                <Link href={`/dashboard/organizer/proposals?eventId=${event._id}`} className="w-full block">
                  <Button fullWidth variant="primary">
                    Submit Proposal
                  </Button>
                </Link>
              ) : session ? (
                <Button fullWidth variant="outline" disabled>
                  Sign in as Organizer to Submit
                </Button>
              ) : (
                <Link href="/auth/signup?role=organizer" className="w-full block">
                  <Button fullWidth variant="primary">
                    Become an Organizer
                  </Button>
                </Link>
              )}
            </div>

            {/* Event Stats */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-dark">Event Stats</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600">Posted</span>
                  <p className="font-semibold text-dark">{formatDate(event.createdAt)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Event Type</span>
                  <p className="font-semibold text-dark capitalize">{event.eventType}</p>
                </div>
                {event.budget && (
                  <div>
                    <span className="text-sm text-gray-600">Budget Range</span>
                    <p className="font-semibold text-dark">${event.budget?.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
