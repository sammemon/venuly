import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import Link from 'next/link';
import { 
  Calendar, 
  FileText, 
  MessageSquare, 
  Bell, 
  Plus,
  TrendingUp,
  Eye
} from 'lucide-react';

export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#222222] mb-2">
          Welcome back, {session.user.firstName}!
        </h1>
        <p className="text-lg text-gray-600">Here is what is happening with your events today.</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Link
          href="/events/create"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E93AB] to-[#0E7A82] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all shadow-md font-semibold"
        >
          <Plus className="w-5 h-5" />
          Post New Event
        </Link>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#DCDCDC] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Events</p>
                <p className="text-3xl font-bold text-[#222222]">0</p>
                <p className="text-xs text-gray-500 mt-2">Currently active</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#1E93AB]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#DCDCDC] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Proposals</p>
                <p className="text-3xl font-bold text-[#222222]">0</p>
                <p className="text-xs text-gray-500 mt-2">Pending responses</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#1E93AB]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#DCDCDC] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Messages</p>
                <p className="text-3xl font-bold text-[#222222]">0</p>
                <p className="text-xs text-gray-500 mt-2">Unread: 0</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#1E93AB]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#DCDCDC] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Views</p>
                <p className="text-3xl font-bold text-[#222222]">0</p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#1E93AB]" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] mb-8">
          <div className="p-6 border-b border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#222222]">Your Events</h2>
              <Link href="/events/create" className="text-sm text-[#1E93AB] hover:text-[#197A8F] font-medium">
                + New Event
              </Link>
            </div>
          </div>
          <div className="p-12">
            <div className="text-center max-w-sm mx-auto">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-[#1E93AB]" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-2">No events posted</h3>
              <p className="text-gray-600 mb-6">Create your first event to find the perfect organizer for your needs</p>
              <Link
                href="/events/create"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E93AB] to-[#0E7A82] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all shadow-md font-semibold"
              >
                <Plus className="w-5 h-5" />
                Post Your First Event
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-2xl font-bold text-[#222222]">Recent Proposals</h2>
          </div>
          <div className="p-12">
            <div className="text-center max-w-sm mx-auto">
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-2">No proposals yet</h3>
              <p className="text-gray-600 mb-2">Organizers will submit proposals once you post an event</p>
              <p className="text-sm text-gray-500">Get started by creating your first event above</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
