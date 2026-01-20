import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import Link from 'next/link';
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bell,
  DollarSign,
  Star,
  TrendingUp
} from 'lucide-react';

export default async function OrganizerDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ORGANIZER') {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-[#F3F2EC]">
      {/* Header */}
      <header className="bg-white border-b border-[#DCDCDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-[#222222]">
              Welcome back, {session.user.firstName}!
            </h1>
            <p className="text-sm text-gray-600">Organizer Dashboard</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Proposals</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">0</p>
              </div>
              <FileText className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">0</p>
              </div>
              <Briefcase className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">$0</p>
              </div>
              <DollarSign className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">-</p>
              </div>
              <Star className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-gradient-to-r from-[#1E93AB] to-[#197A8F] rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
              <p className="text-white/90">Add your skills, portfolio, and experience to attract more clients</p>
            </div>
            <Link
              href="/dashboard/organizer/profile"
              className="bg-white text-[#1E93AB] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Complete Profile
            </Link>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <p className="text-sm mt-2 text-white/90">20% completed</p>
        </div>

        {/* Available Events */}
        <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC] mb-8">
          <div className="p-6 border-b border-[#DCDCDC] flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#222222]">Available Events</h2>
            <Link
              href="/marketplace"
              className="text-[#1E93AB] hover:text-[#197A8F] font-medium"
            >
              Browse All Events →
            </Link>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No events available at the moment</p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 bg-[#1E93AB] text-white px-6 py-3 rounded-lg hover:bg-[#197A8F] transition-colors"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#222222]">Recent Proposals</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">You have not submitted any proposals yet</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
