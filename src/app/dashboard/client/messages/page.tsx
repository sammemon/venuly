import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { MessageSquare } from 'lucide-react';

export default async function ClientMessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#222222] mb-2">Messages</h1>
        <p className="text-lg text-gray-600">Communicate with professional event organizers</p>
      </div>

      {/* Messages Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
        <div className="p-12 flex items-center justify-center h-full">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#222222] mb-3">No messages yet</h3>
            <p className="text-gray-600 mb-2">Messages will appear here when organizers respond to your events.</p>
            <p className="text-sm text-gray-500">Post an event to start receiving proposals and direct messages from organizers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
