'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Settings, Bell, Lock, User, Save } from 'lucide-react';

export default function OrganizerSettingsPage() {
  const { data: session } = useSession();
  const [avatarUrl] = useState(session?.user?.avatar || '');
  const [notifications, setNotifications] = useState({
    emailProposals: true,
    emailMessages: true,
    emailUpdates: false,
    pushNotifications: true,
  });

  if (!session || session.user.role !== 'ORGANIZER') {
    redirect('/auth/signin');
  }

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    // TODO: Save to API
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Settings</h1>
        <p className="text-[var(--muted)]">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Display */}
        <div className="bg-[var(--card)] rounded-xl shadow-sm border border-[var(--border)] p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] overflow-hidden flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="text-white text-xl font-semibold">
                  {session?.user.firstName?.[0]}{session?.user.lastName?.[0]}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)]">
                {session?.user.firstName} {session?.user.lastName}
              </h3>
              <p className="text-sm text-[var(--muted)]">{session?.user.email}</p>
              <p className="text-xs text-[var(--primary)] font-medium mt-1">Event Organizer</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-[var(--card)] rounded-xl shadow-sm border border-[var(--border)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary-muted)] flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text)]">Account Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
              <input
                type="email"
                value={session.user.email}
                disabled
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--muted)]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">First Name</label>
                <input
                  type="text"
                  value={session.user.firstName}
                  disabled
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--muted)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Last Name</label>
                <input
                  type="text"
                  value={session.user.lastName}
                  disabled
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--muted)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-[var(--card)] rounded-xl shadow-sm border border-[var(--border)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary-muted)] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text)]">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--text)]">Email - New Proposals</p>
                <p className="text-sm text-[var(--muted)]">Get notified when clients view your proposals</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailProposals}
                  onChange={(e) => setNotifications({ ...notifications, emailProposals: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--card)] after:border-[var(--border)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email - Messages</p>
                <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailMessages}
                  onChange={(e) => setNotifications({ ...notifications, emailMessages: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1E93AB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E93AB]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email - Platform Updates</p>
                <p className="text-sm text-gray-500">Receive updates about new features and tips</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailUpdates}
                  onChange={(e) => setNotifications({ ...notifications, emailUpdates: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1E93AB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E93AB]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive browser push notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1E93AB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E93AB]"></div>
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSaveNotifications}
              className="bg-[#1E93AB] text-white px-6 py-2 rounded-lg hover:bg-[#197A8F] transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6\">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#1E93AB]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#1E93AB]" />
            </div>
            <h2 className="text-xl font-semibold text-[#222222]">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full md:w-auto bg-[#1E93AB] text-white px-6 py-2 rounded-lg hover:bg-[#197A8F] transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
