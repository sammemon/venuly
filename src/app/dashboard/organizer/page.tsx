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
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';

export default async function OrganizerDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ORGANIZER') {
    redirect('/auth/signin');
  }

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
        <p className="text-[var(--muted)]">Find new opportunities and manage your event services.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Active Proposals</p>
              <p className="text-3xl font-bold text-[var(--text)]">0</p>
              <p className="text-xs text-[var(--muted)] mt-2">Submitted</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-[var(--primary)]" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Active Jobs</p>
              <p className="text-3xl font-bold text-[var(--text)]">0</p>
              <p className="text-xs text-[var(--muted)] mt-2">In progress</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Total Earnings</p>
              <p className="text-3xl font-bold text-[var(--text)]">$0</p>
              <p className="text-xs text-[var(--muted)] mt-2">All time</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Rating</p>
              <p className="text-3xl font-bold text-[var(--text)]">-</p>
              <p className="text-xs text-[var(--muted)] mt-2">No reviews yet</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-[var(--secondary)] rounded-2xl p-6 mb-8 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[var(--primary)]" />
                <span className="text-sm font-medium text-white/80">Profile Setup</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Your Profile</h3>
              <p className="text-white/70 max-w-md">Add your skills, portfolio, and experience to attract more clients and stand out.</p>
            </div>
            <Link
              href="/dashboard/organizer/profile"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--primary-hover)] transition-all font-semibold whitespace-nowrap"
            >
              Complete Profile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/80">Progress</span>
              <span className="font-medium">20%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: '20%' }} />
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-sm text-white/70">
                <CheckCircle className="w-4 h-4 text-[var(--primary)]" />
                Basic info
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/50">
                <div className="w-4 h-4 rounded-full border border-white/30" />
                Skills & services
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/50">
                <div className="w-4 h-4 rounded-full border border-white/30" />
                Portfolio
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/50">
                <div className="w-4 h-4 rounded-full border border-white/30" />
                Availability
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Events */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] mb-8 overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text)]">Available Events</h2>
          <Link
            href="/marketplace"
            className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium flex items-center gap-1 group"
          >
            Browse All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
              <Briefcase className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">No events available</h3>
            <p className="text-[var(--muted)] mb-6">Check back soon or browse the marketplace for new opportunities.</p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/20 font-semibold"
            >
              Explore Marketplace
              <ArrowRight className="w-4 h-4" />
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
            <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-10 h-10 text-[var(--primary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">No proposals yet</h3>
            <p className="text-[var(--muted)]">You haven&apos;t submitted any proposals yet. Browse events to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
