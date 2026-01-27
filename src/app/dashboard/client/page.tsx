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
  Eye,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { connectDB } from '@/lib/db/connect';
import Event from '@/models/Event';
import Proposal from '@/models/Proposal';
import { EventStatus } from '@/types';

export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  await connectDB();
  const [activeEvents, totalProposals, allEvents] = await Promise.all([
    Event.countDocuments({ clientId: session.user.id, status: EventStatus.OPEN, isPublished: true }),
    Proposal.countDocuments({ eventId: { $in: await Event.find({ clientId: session.user.id }).distinct('_id') } }),
    Event.find({ clientId: session.user.id }).select('views').lean(),
  ]);
  
  const totalViews = allEvents.reduce((sum, event) => sum + (event.views || 0), 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-[var(--primary)]">Dashboard</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--text)] mb-2">
          Welcome back, {session.user.firstName}!
        </h1>
        <p className="text-[var(--muted)]">Here&apos;s what&apos;s happening with your events today.</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Link
          href="/events/create"
          className="inline-flex items-center gap-2.5 bg-[var(--primary)] text-white px-6 py-3.5 rounded-2xl hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/20 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Post New Event
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Active Events</p>
              <p className="text-3xl font-bold text-[var(--text)]">{activeEvents}</p>
              <p className="text-xs text-[var(--muted)] mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Currently live
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-[var(--primary)]" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Total Proposals</p>
              <p className="text-3xl font-bold text-[var(--text)]">{totalProposals}</p>
              <p className="text-xs text-[var(--muted)] mt-2">From organizers</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Messages</p>
              <p className="text-3xl font-bold text-[var(--text)]">0</p>
              <p className="text-xs text-[var(--muted)] mt-2">Unread: 0</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Total Views</p>
              <p className="text-3xl font-bold text-[var(--text)]">{totalViews}</p>
              <p className="text-xs text-[var(--muted)] mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[var(--primary)]" />
                Event impressions
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] mb-8 overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text)]">Your Events</h2>
          <Link 
            href="/events/create" 
            className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium flex items-center gap-1 group"
          >
            New Event
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-10 h-10 text-[var(--primary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">No events posted yet</h3>
            <p className="text-[var(--muted)] mb-6">Create your first event to find the perfect organizer for your needs.</p>
            <Link
              href="/events/create"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/20 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Post Your First Event
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Proposals */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--text)]">Recent Proposals</h2>
        </div>
        <div className="p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">No proposals yet</h3>
            <p className="text-[var(--muted)] mb-2">Organizers will submit proposals once you post an event.</p>
            <p className="text-sm text-[var(--muted)]">Get started by creating your first event above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
