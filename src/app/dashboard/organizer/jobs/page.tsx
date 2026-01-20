import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { Briefcase, Calendar, DollarSign, MapPin } from 'lucide-react';

export default async function OrganizerJobsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ORGANIZER') {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Active Jobs</h1>
        <p className="text-gray-600">Manage your ongoing event projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#DCDCDC]\">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">In Progress</span>
            <Briefcase className="w-5 h-5 text-[#1E93AB]" />
          </div>
          <p className="text-3xl font-bold text-[#222222]">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#DCDCDC]\">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Completed</span>
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-[#222222]">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#DCDCDC]\">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Earned</span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-[#222222]">$0</p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
        <div className="p-6 border-b border-[#DCDCDC]">
          <h2 className="text-xl font-semibold text-[#222222]">Your Jobs</h2>
        </div>
        <div className="p-12">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F3F2EC] flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-[#1E93AB]" />
            </div>
            <h3 className="text-lg font-semibold text-[#222222] mb-2">No active jobs</h3>
            <p className="text-gray-600 mb-6">Submit proposals to events to get hired</p>
            <a
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-[#1E93AB] text-white px-6 py-3 rounded-lg hover:bg-[#197A8F] transition-colors shadow-md"
            >
              Find Events
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
