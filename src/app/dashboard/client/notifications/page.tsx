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
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated with your events</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
        <div className="p-12">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F3F2EC] flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-[#1E93AB]" />
            </div>
            <h3 className="text-lg font-semibold text-[#222222] mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
