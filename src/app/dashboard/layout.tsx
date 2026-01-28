'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Bell, 
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const clientNav = [
    { name: 'Dashboard', href: '/dashboard/client', icon: LayoutDashboard },
    { name: 'My Events', href: '/dashboard/client/events', icon: Calendar },
    { name: 'Proposals', href: '/dashboard/client/proposals', icon: FileText },
    { name: 'Messages', href: '/dashboard/client/messages', icon: MessageSquare },
    { name: 'Notifications', href: '/dashboard/client/notifications', icon: Bell },
    { name: 'Profile', href: '/dashboard/client/profile', icon: User },
    { name: 'Settings', href: '/dashboard/client/settings', icon: Settings },
  ];

  const organizerNav = [
    { name: 'Dashboard', href: '/dashboard/organizer', icon: LayoutDashboard },
    { name: 'Browse Events', href: '/marketplace', icon: Calendar },
    { name: 'My Proposals', href: '/dashboard/organizer/proposals', icon: FileText },
    { name: 'Active Jobs', href: '/dashboard/organizer/jobs', icon: Calendar },
    { name: 'Messages', href: '/dashboard/organizer/messages', icon: MessageSquare },
    { name: 'Profile', href: '/dashboard/organizer/profile', icon: User },
    { name: 'Settings', href: '/dashboard/organizer/settings', icon: Settings },
  ];

  const adminNav = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/dashboard/admin/users', icon: User },
    { name: 'Events', href: '/dashboard/admin/events', icon: Calendar },
    { name: 'Reports', href: '/dashboard/admin/reports', icon: FileText },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  const navigation = session?.user.role === 'CLIENT' 
    ? clientNav 
    : session?.user.role === 'ORGANIZER' 
    ? organizerNav 
    : adminNav;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
              onClick={() => setSidebarOpen(false)} 
            />
            <motion.div 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[var(--secondary)] shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--divider)]">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-[var(--text)]">Venuly</span>
                </Link>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--primary-muted)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                        isActive
                          ? 'bg-[var(--primary)] text-white shadow-md'
                          : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--primary-muted)]'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-[var(--secondary)]">
        <div className="flex items-center gap-2.5 p-6 border-b border-[var(--divider)]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[var(--text)]">Venuly</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="px-4 mb-3 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
            Menu
          </p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--primary-muted)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold overflow-hidden ring-2 ring-white/20">
              {session?.user.avatar ? (
                <img src={session.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>
                  {session?.user.firstName?.[0]}
                  {session?.user.lastName?.[0]}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user.firstName} {session?.user.lastName}
              </p>
              <p className="text-xs text-white/50 truncate">{session?.user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-red-400 hover:bg-red-500/10 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-40 bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
          >
            <Menu className="w-6 h-6 text-[var(--text)]" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--text)]">Venuly</span>
          </Link>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
