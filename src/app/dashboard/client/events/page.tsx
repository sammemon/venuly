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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#222222] mb-2">My Events</h1>
          <p className="text-gray-600">Manage all your posted events</p>
        </div>
        <Link
          href="/events/create"
          className="flex items-center gap-2 bg-[#1E93AB] text-white px-6 py-3 rounded-lg hover:bg-[#197A8F] transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          New Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
        <div className="p-12">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F3F2EC] flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-[#1E93AB]" />
            </div>
            <h3 className="text-lg font-semibold text-[#222222] mb-2">No events posted</h3>
            <p className="text-gray-600 mb-6">Create your first event to find organizers</p>
            <Link
              href="/events/create"
              className="inline-flex items-center gap-2 bg-[#1E93AB] text-white px-6 py-3 rounded-lg hover:bg-[#197A8F] transition-colors shadow-md"
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
