import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { connectDB } from '@/lib/db/connect';
import Event from '@/models/Event';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Clock, FileText, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui';

async function getEvent(id: string) {
  try {
    await connectDB();
    const event = await Event.findById(id)
      .populate('clientId', 'firstName lastName email avatar phone')
      .lean();
    
    if (!event) {
      return null;
    }
    
    // Convert MongoDB document to plain object with serializable dates
    const serializedEvent: any = {
      ...event,
      _id: event._id.toString(),
      clientId: event.clientId ? {
        _id: (event.clientId as any)._id.toString(),
        firstName: (event.clientId as any).firstName,
        lastName: (event.clientId as any).lastName,
        email: (event.clientId as any).email,
        avatar: (event.clientId as any).avatar,
        phone: (event.clientId as any).phone,
      } : null,
      createdAt: event.createdAt?.toString(),
      updatedAt: event.updatedAt?.toString(),
      eventDate: {
        start: event.eventDate.start.toString(),
        end: event.eventDate.end.toString(),
      }
    };
    
    return serializedEvent;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return null;
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

  if (!event) {
    notFound();
  }

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

  const daysUntil = calculateDaysUntil(event.eventDate.start);

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/browse-events" className="inline-flex items-center gap-2 text-accent hover:text-primary-dark font-medium mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </Link>
        
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
                      event.status === 'BOOKED' ? 'bg-red-100 text-red-800' :
                      event.status === 'IN_DISCUSSION' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {event.status === 'BOOKED' ? 'Booked' : event.status === 'IN_DISCUSSION' ? 'In Discussion' : '✓ Accepting Proposals'}
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
                <p className="font-semibold text-dark">{formatDate(event.eventDate.start)}</p>
                <p className="text-sm text-gray-600">{formatTime(event.eventDate.start)}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Location</span>
                </div>
                <p className="font-semibold text-dark">{event.location.venue || 'TBD'}</p>
                <p className="text-sm text-gray-600">{event.location.city}, {event.location.state}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Budget</span>
                </div>
                <p className="font-semibold text-dark">${event.budget.min.toLocaleString()}-${event.budget.max.toLocaleString()}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Guest Count</span>
                </div>
                <p className="font-semibold text-dark">{event.guestCount.min}-{event.guestCount.max} Guests</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-dark">Event Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Services Needed */}
            {event.requirements?.services && event.requirements.services.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-dark">Services Needed</h2>
                <div className="flex flex-wrap gap-2">
                  {event.requirements.services.map((service: string) => (
                    <span key={service} className="bg-surface text-dark px-3 py-1 rounded-full text-sm font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {event.requirements?.additionalNotes && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-dark flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Additional Notes
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">{event.requirements.additionalNotes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Client Info Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4 text-dark">Posted By</h3>
              {event.clientId && typeof event.clientId === 'object' && (
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    {(event.clientId as any)?.avatar ? (
                      <img
                        src={(event.clientId as any).avatar}
                        alt={(event.clientId as any).firstName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                        {(event.clientId as any).firstName?.[0]}{(event.clientId as any).lastName?.[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-dark">{(event.clientId as any).firstName} {(event.clientId as any).lastName}</p>
                      <p className="text-sm text-gray-600">Client</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{(event.clientId as any).email}</p>
                  {(event.clientId as any)?.phone && (
                    <p className="text-sm text-gray-600 mb-4">{(event.clientId as any).phone}</p>
                  )}
                </div>
              )}

              {/* CTA Button */}
              {session && session.user.role === 'ORGANIZER' ? (
                <Link href={`/dashboard/organizer/proposals/create?eventId=${event._id}`} className="w-full block">
                  <Button className="w-full" variant="primary">
                    Submit Proposal
                  </Button>
                </Link>
              ) : session ? (
                <Button className="w-full" variant="outline" disabled>
                  Sign in as Organizer to Submit
                </Button>
              ) : (
                <Link href="/auth/signup?role=organizer" className="w-full block">
                  <Button className="w-full" variant="primary">
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
                    <p className="font-semibold text-dark">${event.budget.min.toLocaleString()}-${event.budget.max.toLocaleString()}</p>
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
