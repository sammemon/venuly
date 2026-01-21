import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { FileText } from 'lucide-react';

export default async function ClientProposalsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#222222] mb-2">Proposals</h1>
        <p className="text-lg text-gray-600">Review proposals from professional organizers</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
        <div className="p-12">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#222222] mb-3">No proposals yet</h3>
            <p className="text-gray-600 mb-2">Once you post an event, organizers will submit proposals for you to review.</p>
            <p className="text-sm text-gray-500">Compare organizers, their rates, experience, and testimonials to make the best choice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
