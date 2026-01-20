'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useMemo, useState, useRef } from 'react';
import { Award, Briefcase, Camera, Edit2, Save, Star, User, X } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

export default function OrganizerProfilePage() {
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
    hourlyRate: '',
    skills: [] as string[],
    portfolioLinks: [] as string[],
  });
  const [skillInput, setSkillInput] = useState('');
  const [portfolioInput, setPortfolioInput] = useState('');

  if (!session || session.user.role !== 'ORGANIZER') {
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

      // Persist avatar to user profile
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

  const handleSaveBio = () => {
    // TODO: Save to database via API
    setShowBioModal(false);
  };

  const handleSaveProfile = () => {
    // TODO: Save to database via API
    setShowProfileModal(false);
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const addPortfolioLink = () => {
    if (!portfolioInput.trim()) return;
    setFormData((prev) => ({ ...prev, portfolioLinks: [...prev.portfolioLinks, portfolioInput.trim()] }));
    setPortfolioInput('');
  };

  const removePortfolioLink = (link: string) => {
    setFormData((prev) => ({ ...prev, portfolioLinks: prev.portfolioLinks.filter((l) => l !== link) }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Photo Area */}
      <div className="h-48 bg-gradient-to-r from-[#0E7490] to-[#18A4B8]"></div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-20 sm:-mt-24 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full bg-white p-2 shadow-xl">
                <div className="h-full w-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-gray-400">{initials}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-0 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-between sm:pb-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white truncate">
                    {session?.user.firstName} {session?.user.lastName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-white" />
                    New
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/90">Event Organizer • {session?.user.email}</p>
              </div>
              <div className="mt-5 sm:mt-0">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white rounded-lg shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Briefcase className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Jobs applied</dt>
                    <dd className="text-lg font-semibold text-gray-900">0</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Award className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Invites received</dt>
                    <dd className="text-lg font-semibold text-gray-900">0</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Star className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Profile views</dt>
                    <dd className="text-lg font-semibold text-gray-900">0</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Connections</dt>
                    <dd className="text-lg font-semibold text-gray-900">0</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
                <button
                  onClick={() => setShowBioModal(true)}
                  className="text-sm text-[#0E7490] hover:text-[#0b5f74] font-medium flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  {bio ? 'Edit' : 'Add'}
                </button>
              </div>
              {bio ? (
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{bio}</p>
              ) : (
                <p className="text-gray-500 text-sm italic">Add a compelling bio to showcase your experience and expertise</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="text-sm text-[#0E7490] hover:text-[#0b5f74] font-medium flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  {formData.skills.length ? 'Edit' : 'Add'}
                </button>
              </div>
              {formData.skills.length ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">Add skills to showcase your expertise</p>
              )}
            </div>

            {/* Portfolio Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Portfolio</h2>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="text-sm text-[#0E7490] hover:text-[#0b5f74] font-medium flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  {formData.portfolioLinks.length ? 'Edit' : 'Add'}
                </button>
              </div>
              {formData.portfolioLinks.length ? (
                <ul className="space-y-2">
                  {formData.portfolioLinks.map((link) => (
                    <li key={link}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-[#0E7490] hover:underline break-all"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic">Add portfolio links to showcase your work</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Profile strength</h3>
              <div className="space-y-4">
                {[{
                  label: 'Basic info',
                  value: 100,
                  color: 'bg-green-500',
                }, {
                  label: 'Skills',
                  value: formData.skills.length > 0 ? 100 : 0,
                  color: 'bg-blue-500',
                }, {
                  label: 'Portfolio',
                  value: formData.portfolioLinks.length > 0 ? 100 : 0,
                  color: 'bg-blue-500',
                }].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className="text-sm font-medium text-gray-900">{value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-2 ${color} transition-all duration-300`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Edit profile"
        size="lg"
      >
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#0E7490]/10 overflow-hidden flex items-center justify-center">
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
                className="inline-flex items-center gap-2 rounded-lg bg-[#0E7490] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5f74] disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload photo'}
              </button>
              <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 10MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#0E7490] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#0E7490] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#0E7490] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly rate (USD)</label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                placeholder="50"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#0E7490] focus:border-transparent"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                  placeholder="e.g. Event production"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#0E7490] focus:border-transparent"
                />
                <button
                  onClick={addSkill}
                  className="rounded-lg bg-[#0E7490] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5f74]"
                >
                  Add
                </button>
              </div>
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-800 px-3 py-1 text-sm">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="text-gray-500 hover:text-gray-700">
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio links</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={portfolioInput}
                  onChange={(e) => setPortfolioInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPortfolioLink(); } }}
                  placeholder="https://dribbble.com/your-work"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#0E7490] focus:border-transparent"
                />
                <button
                  onClick={addPortfolioLink}
                  className="rounded-lg bg-[#0E7490] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5f74]"
                >
                  Add
                </button>
              </div>
              {formData.portfolioLinks.length > 0 && (
                <ul className="space-y-2">
                  {formData.portfolioLinks.map((link) => (
                    <li key={link} className="flex items-center justify-between gap-3 text-sm">
                      <a href={link} target="_blank" rel="noreferrer" className="text-[#0E7490] hover:underline break-all flex-1">
                        {link}
                      </a>
                      <button onClick={() => removePortfolioLink(link)} className="text-gray-500 hover:text-gray-700">
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setShowProfileModal(false)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0E7490] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5f74]"
            >
              <Save className="w-4 h-4" /> Save changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Bio modal */}
      <Modal
        isOpen={showBioModal}
        onClose={() => setShowBioModal(false)}
        title="Edit bio"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Write a concise pitch (like Upwork): niche, years of experience, key tools, and one proof point.
          </p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#0E7490] focus:border-transparent"
            placeholder="Example: Event producer with 5+ years delivering conferences (500-2,000 attendees). Expert in vendor management, AV, run-of-show, and budget control."
          />
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setShowBioModal(false)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={handleSaveBio}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0E7490] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5f74]"
            >
              <Save className="w-4 h-4" /> Save bio
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
