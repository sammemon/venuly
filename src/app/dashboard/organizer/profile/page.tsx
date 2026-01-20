'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { User, Star, Briefcase, Award, Edit2, Save, X } from 'lucide-react';

export default function OrganizerProfilePage() {
  const { data: session } = useSession();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bio, setBio] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    location: '',
    website: '',
    hourlyRate: '',
  });

  if (!session || session.user.role !== 'ORGANIZER') {
    redirect('/auth/signin');
  }

  const handleSaveBio = () => {
    // TODO: Save to database via API
    console.log('Saving bio:', bio);
    setIsEditingBio(false);
  };

  const handleSaveProfile = () => {
    // TODO: Save to database via API
    console.log('Saving profile:', formData);
    setIsEditingProfile(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">My Profile</h1>
        <p className="text-gray-600">Complete your profile to attract more clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6\">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#1E93AB] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {session.user.firstName[0]}{session.user.lastName[0]}
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-1">
                {session.user.firstName} {session.user.lastName}
              </h3>
              <p className="text-gray-600 text-sm mb-4">Event Organizer</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">New</span>
              </div>
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="w-full bg-[#1E93AB] text-white px-6 py-2 rounded-lg hover:bg-[#197A8F] transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {isEditingProfile && (
            <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#222222] mb-4">Edit Contact Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E93AB] focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E93AB] focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E93AB] focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E93AB] focus:border-transparent"
                    placeholder="50"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-[#1E93AB] text-white px-6 py-2 rounded-lg hover:bg-[#197A8F] transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#222222] mb-4">Profile Completion</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Basic Info</span>
                  <span className="text-sm font-medium text-green-600">100%</span>
                </div>
                <div className="h-2 bg-[#F3F2EC] rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Skills & Experience</span>
                  <span className="text-sm font-medium text-gray-600">0%</span>
                </div>
                <div className="h-2 bg-[#F3F2EC] rounded-full\">
                  <div className="h-2 bg-[#1E93AB] rounded-full\" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1\">
                  <span className="text-sm text-gray-600\">Portfolio</span>
                  <span className="text-sm font-medium text-gray-600\">0%</span>
                </div>
                <div className="h-2 bg-[#F3F2EC] rounded-full\">
                  <div className="h-2 bg-[#1E93AB] rounded-full\" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC] p-6\">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#222222]">About</h3>
              {bio && !isEditingBio && (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-[#1E93AB] hover:text-[#197A8F] flex items-center gap-1 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
            
            {isEditingBio ? (
              <div className="space-y-4">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E93AB] focus:border-transparent"
                  placeholder="Tell clients about your experience, expertise, and what makes you great at organizing events..."
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveBio}
                    className="flex-1 bg-[#1E93AB] text-white px-6 py-2 rounded-lg hover:bg-[#197A8F] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Bio
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : bio ? (
              <p className="text-gray-700 whitespace-pre-wrap">{bio}</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">Add a compelling bio to showcase your experience and expertise</p>
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="bg-[#1E93AB] text-white px-6 py-2 rounded-lg hover:bg-[#197A8F] transition-colors"
                >
                  Add Bio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
