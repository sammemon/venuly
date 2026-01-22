'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Lock, Bell, User, Save } from 'lucide-react';
import { AnimatedButton, AnimatedInput } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';

export default function ClientSettingsPage() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error } = useToast();

  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(session?.user?.avatar || '');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailProposals: true,
    emailMessages: true,
    emailUpdates: false,
    pushNotifications: true,
  });

  useEffect(() => {
    const storedPrefs = localStorage.getItem('venuly-notifications');
    if (storedPrefs) {
      try {
        setNotifications(JSON.parse(storedPrefs));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

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
      success('Avatar uploaded successfully');
    } catch (err: any) {
      error(err.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      error('Password must be at least 8 characters');
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to change password');
      }

      success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      error(err.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveNotifications = async () => {
    try {
      localStorage.setItem('venuly-notifications', JSON.stringify(notifications));
      success('Notification preferences saved');
    } catch (err) {
      error('Failed to save preferences');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-display font-bold text-dark mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </motion.div>

      <div className="space-y-6 mt-8">
        {/* Profile Picture */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-dark">Profile Picture</h2>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-surface overflow-hidden flex items-center justify-center border-2 border-primary/20">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <AnimatedButton
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Change Picture'}
                </AnimatedButton>
                <p className="text-sm text-gray-600 mt-2">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-dark">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Current Password
                </label>
                <AnimatedInput
                  type="password"
                  placeholder="Enter your current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  New Password
                </label>
                <AnimatedInput
                  type="password"
                  placeholder="Enter your new password (min 8 characters)"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Confirm Password
                </label>
                <AnimatedInput
                  type="password"
                  placeholder="Confirm your new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>

              <AnimatedButton
                type="submit"
                variant="primary"
                disabled={passwordLoading}
              >
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </AnimatedButton>
            </form>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-dark">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailProposals', label: 'Email notifications for new proposals', desc: 'Get notified when organizers submit proposals' },
                { key: 'emailMessages', label: 'Email notifications for messages', desc: 'Get notified when you receive messages' },
                { key: 'emailUpdates', label: 'Email marketing updates', desc: 'Receive tips and updates about Venuly' },
                { key: 'pushNotifications', label: 'Push notifications', desc: 'Browser notifications for real-time updates' },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={() => handleNotificationChange(item.key as keyof typeof notifications)}
                    className="w-5 h-5 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="font-medium text-dark">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </label>
              ))}

              <AnimatedButton
                type="button"
                variant="primary"
                onClick={handleSaveNotifications}
                icon={<Save className="w-4 h-4" />}
              >
                Save Preferences
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
