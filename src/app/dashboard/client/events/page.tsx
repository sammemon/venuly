import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { Calendar, Plus } from 'lucide-react';
import Link from 'next/link';
import { connectDB } from '@/lib/db/connect';
import Event from '@/models/Event';
import { EventStatus } from '@/types';

export default async function ClientEventsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  await connectDB();
  const events = await Event.find({ clientId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#222222] mb-2">My Events</h1>
          <p className="text-gray-600">Manage all your posted events</p>
        </div>
        <Link
          href="/events/create"
          className="flex items-center justify-center sm:justify-start gap-2 bg-gradient-to-r from-[#1E93AB] to-[#0E7A82] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all shadow-md font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
        {events.length === 0 ? (
          <div className="p-12">
            <div className="text-center max-w-sm mx-auto">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-[#1E93AB]" />
              </div>
              <h3 className="text-2xl font-bold text-[#222222] mb-3">No events posted yet</h3>
              <p className="text-gray-600 mb-8">Create your first event to start finding the perfect organizers for your needs. Post event details, requirements, and budget to attract quality proposals.</p>
              <Link
                href="/events/create"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E93AB] to-[#0E7A82] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all shadow-md font-semibold mx-auto"
              >
                <Plus className="w-5 h-5" />
                Post Event
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 lg:p-8 space-y-4">
            {events.map((event: any) => (
              <div key={event._id.toString()} className="border border-[#DCDCDC] rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#222222]">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.location?.city}, {event.location?.state}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event.status === EventStatus.OPEN ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {event.status === EventStatus.OPEN ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-700 mb-3 line-clamp-2">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-gray-800">Budget:</span> {event.budget?.currency || 'USD'} {event.budget?.min} - {event.budget?.max}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Guests:</span> {event.guestCount?.min} - {event.guestCount?.max}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Dates:</span> {new Date(event.eventDate?.start).toLocaleDateString()} - {new Date(event.eventDate?.end).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
