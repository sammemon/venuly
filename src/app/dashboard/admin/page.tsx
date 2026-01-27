import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';
import Event from '@/models/Event';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Shield,
  AlertCircle,
  ArrowRight,
  Settings,
  Activity
} from 'lucide-react';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin');
  }

  // Fetch real dashboard data
  await connectDB();
  
  const [totalUsers, totalEvents] = await Promise.all([
    User.countDocuments(),
    Event.countDocuments(),
  ]);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-[var(--primary)]" />
          <span className="text-sm font-medium text-[var(--primary)]">Admin Panel</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--text)] mb-2">
          Platform Overview
        </h1>
        <p className="text-[var(--muted)]">Monitor and manage all platform activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Total Users</p>
              <p className="text-3xl font-bold text-[var(--text)]">{totalUsers}</p>
              <p className="text-xs text-[var(--muted)] mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                Active accounts
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-[var(--primary)]" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Total Events</p>
              <p className="text-3xl font-bold text-[var(--text)]">{totalEvents}</p>
              <p className="text-xs text-[var(--muted)] mt-2">All listings</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Platform Revenue</p>
              <p className="text-3xl font-bold text-[var(--text)]">$0</p>
              <p className="text-xs text-[var(--muted)] mt-2">This month</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] mb-1">Growth</p>
              <p className="text-3xl font-bold text-[var(--text)]">-</p>
              <p className="text-xs text-[var(--muted)] mt-2">vs last month</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <Link 
          href="/dashboard/admin/users" 
          className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft hover:border-[var(--primary)]/30 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7 text-[var(--primary)]" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">Manage Users</h3>
          <p className="text-sm text-[var(--muted)] mb-4">View, edit, and manage user accounts</p>
          <span className="text-[var(--primary)] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            View Users
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link 
          href="/dashboard/admin/events" 
          className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft hover:border-[var(--primary)]/30 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-7 h-7 text-purple-500" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">Manage Events</h3>
          <p className="text-sm text-[var(--muted)] mb-4">Monitor and moderate event listings</p>
          <span className="text-[var(--primary)] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            View Events
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link 
          href="/dashboard/admin/settings" 
          className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] hover:shadow-soft hover:border-[var(--primary)]/30 transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Settings className="w-7 h-7 text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">Settings</h3>
          <p className="text-sm text-[var(--muted)] mb-4">Manage platform configuration</p>
          <span className="text-[var(--primary)] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            View Settings
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--text)]">Recent Platform Activity</h2>
        </div>
        <div className="p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5">
              <Activity className="w-10 h-10 text-[var(--primary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">No recent activity</h3>
            <p className="text-[var(--muted)]">Platform activity will appear here as users interact with the system.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
