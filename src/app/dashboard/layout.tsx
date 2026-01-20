'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  X
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
    <div className="min-h-screen bg-[#F3F2EC]">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-[#DCDCDC]">
              <Link href="/" className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#1E93AB]" />
                <span className="text-xl font-bold text-[#222222]">Venuly</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                      isActive
                        ? 'bg-[#1E93AB] text-white'
                        : 'text-gray-700 hover:bg-[#DCDCDC]'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-[#DCDCDC]">
        <div className="flex items-center gap-2 p-6 border-b border-[#DCDCDC]">
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="w-8 h-8 text-[#1E93AB]" />
            <span className="text-2xl font-bold text-[#222222]">Venuly</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-[#1E93AB] text-white'
                    : 'text-gray-700 hover:bg-[#DCDCDC]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#DCDCDC]">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#1E93AB] flex items-center justify-center text-white font-bold">
              {session?.user.firstName?.[0]}{session?.user.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user.firstName} {session?.user.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{session?.user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#DCDCDC] px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#1E93AB]" />
            <span className="text-xl font-bold text-[#222222]">Venuly</span>
          </Link>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
