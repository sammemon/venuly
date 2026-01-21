'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useMemo, useState, useRef } from 'react';
import { Award, Mail, MapPin, Phone, Globe, Edit2, Save, Star, User, X, Camera } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

export default function ClientProfilePage() {
  const { data: session } = useSession();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(session?.user?.avatar || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    phone: '',
    location: '',
    website: '',
  });

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  const initials = useMemo(() => {
    const first = session?.user?.firstName?.[0] || '';
    const last = session?.user?.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase();
  }, [session]);

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

      const saveRes = await fetch('/api/users/avatar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: url }),
      });

      if (!saveRes.ok) {
        const data = await saveRes.json();
        throw new Error(data.error || 'Failed to save avatar');
      }

      setAvatarUrl(url);
      toast.success('Profile picture updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', formData);
    toast.success('Profile updated successfully');
    setShowProfileModal(false);
  };

  const handleSaveBio = () => {
    console.log('Saving bio:', bio);
    toast.success('Bio updated successfully');
    setShowBioModal(false);
  };

  const profileStrength = useMemo(() => {
    let strength = 100; // Basic info complete
    if (!bio) strength -= 20;
    if (!formData.location) strength -= 10;
    if (!formData.phone) strength -= 5;
    if (!formData.website) strength -= 5;
    return strength;
  }, [bio, formData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-[#1E93AB] via-[#149396] to-[#0E7A82]"></div>

      {/* Profile Section */}
      <div className="px-6 lg:px-8 pb-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-24 mb-8">
          {/* Avatar */}
          <div className="relative">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-40 h-40 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1E93AB] to-[#0E7A82] flex items-center justify-center text-4xl font-bold text-white">
                  {initials}
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#1E93AB] rounded-full flex items-center justify-center text-white shadow-lg">
                <Camera className="w-5 h-5" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          {/* Header Info */}
          <div className="sm:flex-1 sm:pb-2">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#222222]">
                {session.user.firstName} {session.user.lastName}
              </h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">New</span>
            </div>
            <p className="text-lg text-gray-600 mb-1">Event Organizer Client</p>
            <p className="text-gray-500 truncate">{session.user.email}</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#1E93AB] text-[#1E93AB] rounded-lg hover:bg-[#1E93AB]/10 transition-colors font-semibold self-end"
          >
            <Edit2 className="w-5 h-5" />
            Edit profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Events Posted</p>
                <p className="text-3xl font-bold text-[#222222]">0</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Proposals Received</p>
                <p className="text-3xl font-bold text-[#222222]">0</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Spend</p>
                <p className="text-3xl font-bold text-[#222222]">PKR 0</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg Rating</p>
                <p className="text-3xl font-bold text-[#222222]">—</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-lg font-bold text-yellow-600">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#222222]">About</h2>
                <button
                  onClick={() => setShowBioModal(true)}
                  className="flex items-center gap-1 text-sm text-[#1E93AB] hover:text-[#197A8F] font-semibold"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {bio || 'Add a compelling bio to showcase your event management experience and what makes you unique as a client.'}
              </p>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#222222]">Contact Information</h2>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-1 text-sm text-[#1E93AB] hover:text-[#197A8F] font-semibold"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#1E93AB]" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900 font-medium">{session.user.email}</p>
                  </div>
                </div>
                {formData.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1E93AB]" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-900 font-medium">{formData.phone}</p>
                    </div>
                  </div>
                )}
                {formData.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#1E93AB]" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-gray-900 font-medium">{formData.location}</p>
                    </div>
                  </div>
                )}
                {formData.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#1E93AB]" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-[#1E93AB] hover:text-[#197A8F] font-medium">
                        {formData.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Profile Strength */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6 sticky top-6">
              <h3 className="text-lg font-bold text-[#222222] mb-6">Profile Strength</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall</span>
                    <span className="text-sm font-bold text-[#1E93AB]">{profileStrength}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#1E93AB] to-[#0E7A82] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${profileStrength}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCDCDC]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${bio ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">About section</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.location ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">Location added</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.phone ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">Phone number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.website ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">Website link</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)}>
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#222222]">Edit Profile</h2>
            <button
              onClick={() => setShowProfileModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleProfileChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-[#DCDCDC] rounded-lg focus:outline-none focus:border-[#1E93AB] focus:ring-2 focus:ring-[#1E93AB]/10 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleProfileChange}
                placeholder="City, Country"
                className="w-full px-4 py-3 border border-[#DCDCDC] rounded-lg focus:outline-none focus:border-[#1E93AB] focus:ring-2 focus:ring-[#1E93AB]/10 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleProfileChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 border border-[#DCDCDC] rounded-lg focus:outline-none focus:border-[#1E93AB] focus:ring-2 focus:ring-[#1E93AB]/10 transition-colors"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full flex items-center justify-center gap-2 bg-[#1E93AB] text-white py-3 rounded-lg hover:bg-[#197A8F] transition-colors font-semibold"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Bio Modal */}
      <Modal isOpen={showBioModal} onClose={() => setShowBioModal(false)}>
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#222222]">Edit Bio</h2>
            <button
              onClick={() => setShowBioModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#222222] mb-2">About You</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell clients about yourself, your experience, and what you are looking for..."
                rows={6}
                className="w-full px-4 py-3 border border-[#DCDCDC] rounded-lg focus:outline-none focus:border-[#1E93AB] focus:ring-2 focus:ring-[#1E93AB]/10 transition-colors resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">{bio.length} characters</p>
            </div>

            <button
              onClick={handleSaveBio}
              className="w-full flex items-center justify-center gap-2 bg-[#1E93AB] text-white py-3 rounded-lg hover:bg-[#197A8F] transition-colors font-semibold"
            >
              <Save className="w-5 h-5" />
              Save Bio
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
