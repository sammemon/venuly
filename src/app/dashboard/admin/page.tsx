import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Shield,
  AlertCircle
} from 'lucide-react';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-[#F3F2EC]">
      {/* Header */}
      <header className="bg-white border-b border-[#DCDCDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#1E93AB]" />
            <div>
              <h1 className="text-2xl font-bold text-[#222222]">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Platform Management</p>
            </div>
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
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">1</p>
              </div>
              <Users className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">0</p>
              </div>
              <Calendar className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platform Revenue</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">$0</p>
              </div>
              <DollarSign className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-3xl font-bold text-[#222222] mt-1">-</p>
              </div>
              <TrendingUp className="w-10 h-10 text-[#1E93AB]" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC] hover:shadow-md transition-shadow">
            <Users className="w-12 h-12 text-[#1E93AB] mb-4" />
            <h3 className="text-lg font-semibold text-[#222222] mb-2">Manage Users</h3>
            <p className="text-sm text-gray-600 mb-4">View, edit, and manage user accounts</p>
            <button className="text-[#1E93AB] hover:text-[#197A8F] font-medium">
              View Users →
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC] hover:shadow-md transition-shadow">
            <Calendar className="w-12 h-12 text-[#1E93AB] mb-4" />
            <h3 className="text-lg font-semibold text-[#222222] mb-2">Manage Events</h3>
            <p className="text-sm text-gray-600 mb-4">Monitor and moderate event listings</p>
            <button className="text-[#1E93AB] hover:text-[#197A8F] font-medium">
              View Events →
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#DCDCDC] hover:shadow-md transition-shadow">
            <AlertCircle className="w-12 h-12 text-[#1E93AB] mb-4" />
            <h3 className="text-lg font-semibold text-[#222222] mb-2">Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Handle user reports and disputes</p>
            <button className="text-[#1E93AB] hover:text-[#197A8F] font-medium">
              View Reports →
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#222222]">Recent Platform Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No recent activity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
