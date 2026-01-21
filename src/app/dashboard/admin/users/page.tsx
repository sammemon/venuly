'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Shield, Calendar, CheckCircle, XCircle, Loader, Key, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  avatar: string | null;
  role: string;
  password: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F2EC] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#1E93AB] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (selectedUser) {
    return <UserDetailView user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#F3F2EC]">
      {/* Header */}
      <header className="bg-white border-b border-[#DCDCDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#222222]">Manage Users</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage all registered users</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DCDCDC] bg-[#F9F8F6]">
            <p className="text-sm font-medium text-gray-700">
              Total Users: <span className="text-[#1E93AB] font-bold">{users.length}</span>
            </p>
          </div>

          {users.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F9F8F6] border-b border-[#DCDCDC]">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Verified</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-[#DCDCDC] hover:bg-[#F9F8F6] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.firstName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E93AB] to-[#0E7A82] flex items-center justify-center text-white font-medium">
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-[#222222]">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'ORGANIZER' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.isActive ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-red-600">Inactive</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.isEmailVerified ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Verified</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-orange-600" />
                              <span className="text-sm text-orange-600">Pending</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-[#1E93AB] hover:text-[#197A8F] font-medium text-sm hover:underline"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function UserDetailView({ user, onBack }: { user: User; onBack: () => void }) {
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      alert('Please enter a password');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users/${user._id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setResetSuccess(true);
      setTimeout(() => {
        setShowResetModal(false);
        setResetSuccess(false);
        setNewPassword('');
      }, 2000);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      alert('Please enter a password');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users/${user._id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setResetSuccess(true);
      setTimeout(() => {
        setShowResetModal(false);
        setResetSuccess(false);
        setNewPassword('');
      }, 2000);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="min-h-screen bg-[#F3F2EC]">
      {/* Header */}
      <header className="bg-white border-b border-[#DCDCDC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#1E93AB] hover:text-[#197A8F] mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </button>
          <h1 className="text-2xl font-bold text-[#222222]">User Profile</h1>
          <p className="text-sm text-gray-600 mt-1">View complete user information</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC] overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-[#1E93AB] to-[#0E7A82]"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-6">
              {/* Avatar */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1E93AB] to-[#0E7A82] flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#222222]">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'ORGANIZER' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                  {user.isActive ? (
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      <XCircle className="w-4 h-4" />
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#DCDCDC]">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#1E93AB] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-medium text-[#222222]">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1E93AB] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium text-[#222222]">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC] p-6">
            <h3 className="text-lg font-semibold text-[#222222] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1E93AB]" />
              Account Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-mono text-sm text-[#222222] break-all">{user._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium text-[#222222]">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="font-medium text-[#222222]">{user.isActive ? 'Active' : 'Inactive'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Verification</p>
                <div className="flex items-center gap-2 mt-1">
                  {user.isEmailVerified ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC] p-6">
            <h3 className="text-lg font-semibold text-[#222222] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1E93AB]" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="font-medium text-[#222222]">
                  {format(new Date(user.createdAt), 'PPP p')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium text-[#222222]">
                  {format(new Date(user.updatedAt), 'PPP p')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium text-[#222222]">
                  {format(new Date(user.createdAt), 'MMMM yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm border border-[#DCDCDC] p-6 mt-6">
          <h3 className="text-lg font-semibold text-[#222222] mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">First Name</p>
              <p className="font-medium text-[#222222]">{user.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Name</p>
              <p className="font-medium text-[#222222]">{user.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium text-[#222222]">{user.firstName} {user.lastName}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-[#222222]">{user.phone}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-[#222222]">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Password (Encrypted Hash - Cannot be Decrypted)</p>
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-2">
                  ⚠️ Passwords are encrypted using bcrypt and cannot be decrypted for security reasons. 
                  This is the secure hash stored in the database.
                </p>
                <p className="font-mono text-xs text-[#222222] break-all bg-red-50 p-2 rounded border border-red-200 max-h-24 overflow-y-auto">
                  {user.password}
                </p>
              </div>
            </div>
          </div>

          {/* Reset Password Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                setShowResetModal(true);
                generateTempPassword();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1E93AB] text-white rounded-lg hover:bg-[#197A8F] font-medium transition-colors"
            >
              <Key className="w-4 h-4" />
              Reset Password
            </button>
          </div>
        </div>
      </main>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-[#222222] mb-4">Reset User Password</h3>
            
            {resetSuccess ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-600 font-medium">Password reset successful!</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Temporary Password
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#1E93AB]"
                      placeholder="Enter new password"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    onClick={generateTempPassword}
                    className="text-sm text-[#1E93AB] hover:underline font-medium"
                  >
                    Generate Random Password
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> Share this temporary password with the user. They should change it on their first login.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetPassword}
                    disabled={loading || !newPassword.trim()}
                    className="flex-1 px-4 py-2 bg-[#1E93AB] text-white rounded-lg hover:bg-[#197A8F] disabled:bg-gray-400 font-medium transition-colors"
                  >
                    {loading ? 'Resetting...' : 'Confirm Reset'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
