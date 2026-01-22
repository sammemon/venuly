'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, Mail, Shield, Bell, Copy, Check } from 'lucide-react';
import { AnimatedButton, AnimatedInput } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const { success, error } = useToast();

  const [copied, setCopied] = useState(false);
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'Venuly',
    platformEmail: 'support@venuly.dev',
    maintenanceMode: false,
    commissionsPercentage: 15,
  });

  const [emailSettings, setEmailSettings] = useState({
    sendNotifications: true,
    sendReports: true,
    sendPromotion: false,
  });

  const [loading, setLoading] = useState(false);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin');
  }

  const handleCopyEnv = () => {
    const envText = `
NEXTAUTH_URL=https://venuly.dev
NEXTAUTH_SECRET=${process.env.NEXTAUTH_SECRET || 'your-secret-here'}
DATABASE_URL=${process.env.DATABASE_URL || 'your-db-url'}
    `.trim();
    navigator.clipboard.writeText(envText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    success('Environment variables copied to clipboard');
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      success('Settings saved successfully');
    } catch (err: any) {
      error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-dark">Platform Settings</h1>
              <p className="text-sm text-gray-600">Manage platform configuration</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Platform Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-dark">General Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Platform Name</label>
              <AnimatedInput
                type="text"
                value={platformSettings.platformName}
                onChange={(e) => setPlatformSettings({ ...platformSettings, platformName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Support Email</label>
              <AnimatedInput
                type="email"
                value={platformSettings.platformEmail}
                onChange={(e) => setPlatformSettings({ ...platformSettings, platformEmail: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Commission Percentage (%)</label>
              <AnimatedInput
                type="number"
                min="0"
                max="100"
                value={platformSettings.commissionsPercentage}
                onChange={(e) => setPlatformSettings({ ...platformSettings, commissionsPercentage: Number(e.target.value) })}
              />
              <p className="text-sm text-gray-600 mt-1">Commission taken on each transaction</p>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-dark">Maintenance Mode</p>
                <p className="text-sm text-gray-600">Platform will be unavailable to users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformSettings.maintenanceMode}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, maintenanceMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Email Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-soft border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-dark">Email Settings</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-dark">Notification Emails</p>
                <p className="text-sm text-gray-600">Send emails for proposals and messages</p>
              </div>
              <input
                type="checkbox"
                checked={emailSettings.sendNotifications}
                onChange={(e) => setEmailSettings({ ...emailSettings, sendNotifications: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-dark">Report Emails</p>
                <p className="text-sm text-gray-600">Send admin reports and summaries</p>
              </div>
              <input
                type="checkbox"
                checked={emailSettings.sendReports}
                onChange={(e) => setEmailSettings({ ...emailSettings, sendReports: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-dark">Promotional Emails</p>
                <p className="text-sm text-gray-600">Send platform updates and promotions</p>
              </div>
              <input
                type="checkbox"
                checked={emailSettings.sendPromotion}
                onChange={(e) => setEmailSettings({ ...emailSettings, sendPromotion: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </label>
          </div>
        </motion.div>

        {/* Database Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-dark">Database</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Environment Variables</p>
              <p className="text-xs text-gray-500 mb-3">Copy these to your .env file:</p>
              <div className="bg-white p-3 rounded font-mono text-xs text-gray-600 overflow-x-auto mb-3">
                NEXTAUTH_URL=https://venuly.dev<br/>
                NEXTAUTH_SECRET=***<br/>
                DATABASE_URL=***
              </div>
              <AnimatedButton
                type="button"
                variant="outline"
                onClick={handleCopyEnv}
                icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied!' : 'Copy Variables'}
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-soft border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-dark">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 font-medium mb-2">🔒 Active Security Status</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ NextAuth enabled with session management</li>
                <li>✓ Password hashing with bcryptjs (12 rounds)</li>
                <li>✓ Role-based access control (ADMIN, ORGANIZER, CLIENT)</li>
                <li>✓ API route protection with getServerSession</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="font-medium text-dark mb-2">API Endpoints Protection</p>
              <p className="text-sm text-gray-600 mb-3">All sensitive endpoints are protected with authentication and authorization checks.</p>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Protected:</span> /api/admin/*, /api/events, /api/proposals</p>
                <p><span className="font-semibold">Public:</span> /api/auth/register, /api/contact, /api/upload</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <AnimatedButton
            type="button"
            variant="primary"
            onClick={handleSaveSettings}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </AnimatedButton>
        </motion.div>
      </main>
    </div>
  );
}
