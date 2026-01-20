import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { MessageSquare, Send } from 'lucide-react';

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with {session.user.role === 'CLIENT' ? 'organizers' : 'clients'}</p>
      </div>

      {/* Messages Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] h-[600px]">
        <div className="p-12 flex items-center justify-center h-full">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F3F2EC] flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-[#1E93AB]" />
            </div>
            <h3 className="text-lg font-semibold text-[#222222] mb-2">No messages yet</h3>
            <p className="text-gray-600">Start a conversation by {session.user.role === 'CLIENT' ? 'hiring an organizer' : 'submitting a proposal'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
