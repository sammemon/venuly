import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { Bell } from 'lucide-react';

export default async function ClientNotificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#222222] mb-2">Notifications</h1>
        <p className="text-lg text-gray-600">Stay updated with your events and proposals</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
        <div className="p-12">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#222222] mb-3">All caught up!</h3>
            <p className="text-gray-600">You have no new notifications. Check back soon for updates from organizers about your events.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
