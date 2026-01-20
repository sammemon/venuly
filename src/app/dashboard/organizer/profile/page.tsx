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
    <div className="p-6 lg:p-10 bg-[#f7f7f5] min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B4F6C] via-[#0E7490] to-[#18A4B8] text-white mb-8 shadow-md">
        <div className="p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="uppercase tracking-[0.3rem] text-xs text-white/80">Organizer Profile</p>
            <h1 className="text-3xl lg:text-4xl font-bold mt-2">Stand out to clients on Venuly</h1>
            <p className="mt-3 text-white/85 max-w-2xl">
              Keep your details polished like an Upwork profile: strong bio, clear rates, and a complete portfolio.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur">
            <Star className="w-8 h-8 text-amber-300 fill-amber-300" />
            <div>
              <p className="text-sm text-white/80">Profile strength</p>
              <p className="text-xl font-semibold">Getting Started</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e5e0] p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#0E7490] text-white flex items-center justify-center text-xl font-semibold overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  initials || <User className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-[#111827]">
                    {session?.user.firstName} {session?.user.lastName}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-1 text-xs font-medium">
                    <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                    New
                  </span>
                </div>
                <p className="text-sm text-gray-600">Event Organizer</p>
                <p className="text-xs text-gray-500 mt-1">Last updated: just now</p>
              </div>
            </div>

            <button
              onClick={() => setShowProfileModal(true)}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0E7490] text-white py-2.5 font-semibold hover:bg-[#0b5f74] transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Edit profile details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{
              label: 'Jobs applied',
              value: '0',
              icon: Briefcase,
            }, {
              label: 'Invites received',
              value: '0',
              icon: Award,
            }].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white rounded-xl border border-[#e5e5e0] p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0E7490]/10 text-[#0E7490] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
                    <p className="text-lg font-semibold text-[#111827]">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e5e0] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Profile completion</h3>
                <p className="text-sm text-gray-500">Boost your chances by completing each section.</p>
              </div>
              <span className="text-sm font-medium text-[#0E7490]">Start with bio and contact info</span>
            </div>

            <div className="space-y-4">
              {[{
                label: 'Basic info',
                value: '100%',
                color: 'bg-emerald-500',
              }, {
                label: 'Skills & experience',
                value: '0%',
                color: 'bg-[#0E7490]',
              }, {
                label: 'Portfolio',
                value: '0%',
                color: 'bg-[#0E7490]',
              }].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700 font-medium">{label}</span>
                    <span className="text-sm text-gray-600">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5e5e0] p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">About</h3>
                <p className="text-sm text-gray-500">Craft a short, client-friendly bio (like Upwork profiles).</p>
              </div>
              <button
                onClick={() => setShowBioModal(true)}
                className="text-sm inline-flex items-center gap-2 text-[#0E7490] hover:text-[#0b5f74] font-semibold"
              >
                <Edit2 className="w-4 h-4" />
                {bio ? 'Edit bio' : 'Add bio'}
              </button>
            </div>

            {bio ? (
              <p className="text-gray-700 leading-7 whitespace-pre-wrap">{bio}</p>
            ) : (
              <div className="rounded-lg border border-dashed border-[#0E7490]/40 bg-[#0E7490]/3 p-4 text-sm text-gray-700">
                Add a punchy intro about your niche, top skills, and what makes you reliable. Keep it 3-5 sentences.
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5e5e0] p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Skills</h3>
                <p className="text-sm text-gray-500">Add the specialties you want clients to see.</p>
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="text-sm inline-flex items-center gap-2 text-[#0E7490] hover:text-[#0b5f74] font-semibold"
              >
                <Edit2 className="w-4 h-4" /> Manage
              </button>
            </div>
            {formData.skills.length ? (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-2 rounded-full bg-[#0E7490]/10 text-[#0E7490] px-3 py-1 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No skills added yet.</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5e5e0] p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Portfolio</h3>
                <p className="text-sm text-gray-500">Link to case studies, event galleries, or decks.</p>
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="text-sm inline-flex items-center gap-2 text-[#0E7490] hover:text-[#0b5f74] font-semibold"
              >
                <Edit2 className="w-4 h-4" /> Manage
              </button>
            </div>
            {formData.portfolioLinks.length ? (
              <ul className="space-y-2">
                {formData.portfolioLinks.map((link) => (
                  <li key={link}>
                    <a href={link} target="_blank" rel="noreferrer" className="text-[#0E7490] hover:underline break-words text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No portfolio links yet.</p>
            )}
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
