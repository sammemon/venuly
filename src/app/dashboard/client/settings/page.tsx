'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useRef } from 'react';
import { Settings, Bell, Lock, User, Save, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ClientSettingsPage() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(session?.user?.avatar || '');
  const [notifications, setNotifications] = useState({
    emailProposals: true,
    emailMessages: true,
    emailUpdates: false,
    pushNotifications: true,
  });

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'avatars');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const { url } = await res.json();
      setAvatarUrl(url);
      toast.success('Avatar uploaded successfully');
      // TODO: Update user profile with new avatar URL via API
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    // TODO: Save to API
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#1E93AB]/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#1E93AB]" />
            </div>
            <h2 className="text-xl font-semibold text-[#222222]">Profile Picture</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#DCDCDC] overflow-hidden flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                  className="px-6 py-2 bg-[#1E93AB] text-white rounded-lg hover:bg-[#197A8F] transition-colors disabled:opacity-50 font-semibold"
              >
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
                <p className="text-sm text-gray-500 mt-3">JPG, PNG or GIF. Max 10MB.</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#1E93AB]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#1E93AB]" />
            </div>
            <h2 className="text-xl font-semibold text-[#222222]">Account Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={session.user.email}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-medium"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={session.user.firstName}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={session.user.lastName}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-medium"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">Your account information is read-only. Contact support to make changes.</p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#1E93AB]/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#1E93AB]" />
            </div>
            <h2 className="text-xl font-semibold text-[#222222]">Notification Preferences</h2>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 border border-[#DCDCDC] rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">Email - New Proposals</p>
                <p className="text-sm text-gray-500 mt-1">Get notified when organizers submit proposals</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={notifications.emailProposals}
                  onChange={(e) => setNotifications({ ...notifications, emailProposals: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E93AB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E93AB]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 border border-[#DCDCDC] rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">Email - Messages</p>
                <p className="text-sm text-gray-500 mt-1">Get notified when you receive new messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={notifications.emailMessages}
                  onChange={(e) => setNotifications({ ...notifications, emailMessages: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E93AB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E93AB]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 border border-[#DCDCDC] rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">Email - Platform Updates</p>
                <p className="text-sm text-gray-500 mt-1">Receive updates about new features and tips</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={notifications.emailUpdates}
                  onChange={(e) => setNotifications({ ...notifications, emailUpdates: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E93AB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E93AB]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 border border-[#DCDCDC] rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500 mt-1">Receive browser push notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1E93AB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E93AB]"></div>
              </label>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#DCDCDC]">
            <button
              onClick={handleSaveNotifications}
              className="bg-[#1E93AB] text-white px-6 py-3 rounded-lg hover:bg-[#197A8F] transition-colors flex items-center gap-2 font-semibold shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>

        {/* Security */}
          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#1E93AB]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#1E93AB]" />
            </div>
            <h2 className="text-xl font-semibold text-[#222222]">Security</h2>
          </div>
          <div className="space-y-4">
              <p className="text-gray-600">Manage your password and security settings</p>
              <button className="w-full sm:w-auto bg-[#1E93AB] text-white px-6 py-3 rounded-lg hover:bg-[#197A8F] transition-colors font-semibold shadow-sm">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
