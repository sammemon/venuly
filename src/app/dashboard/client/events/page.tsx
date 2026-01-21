import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ClientEventsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

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
      </div>
    </div>
  );
}
