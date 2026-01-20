'use client'

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { EventType } from '@/types';
import DatePicker from 'react-datepicker';

interface FormState {
  title: string;
  description: string;
  eventType: EventType;
  location: {
    city: string;
    state: string;
    country: string;
    venue?: string;
    specificAddress?: string;
  };
  eventDate: {
    start: Date | null;
    end: Date | null;
  };
  guestCount: {
    min: number;
    max: number;
  };
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: {
    venueType?: string;
    services: string[];
    additionalNotes?: string;
  };
}

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Guard: only CLIENT can access
  useEffect(() => {
    if (status === 'authenticated' && session?.user.role !== 'CLIENT') {
      toast.error('Only clients can post events');
      router.replace('/dashboard');
    }
    if (status === 'unauthenticated') {
      router.replace('/auth/signin');
    }
  }, [status, session, router]);

  const todayDate = useMemo(() => new Date(), []);
  const tomorrowDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    eventType: EventType.WEDDING,
    location: { city: '', state: '', country: '' },
    eventDate: { start: todayDate, end: tomorrowDate },
    guestCount: { min: 50, max: 150 },
    budget: { min: 1000, max: 5000, currency: 'USD' },
    requirements: { services: [] },
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        eventDate: {
          start: form.eventDate.start?.toISOString() || new Date().toISOString(),
          end: form.eventDate.end?.toISOString() || new Date().toISOString(),
        },
        requirements: {
          venueType: form.requirements.venueType,
          services: form.requirements.services.filter((s) => s && s.trim().length > 0),
          additionalNotes: form.requirements.additionalNotes,
        },
      };

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to create event');
      }

      toast.success('Event created successfully');
      router.push('/dashboard/client/events');
    } catch (err: any) {
      toast.error(err.message || 'Error creating event');
    } finally {
      setSubmitting(false);
    }
  }

  const eventTypes = Object.values(EventType);

  return (
    <div className="min-h-screen bg-[#F3F2EC]">
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Post a New Event</h1>
        <p className="text-gray-600">Provide details so organizers can send proposals.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#222222]">Basic Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                placeholder="e.g., Corporate Annual Gala Planning"
                required
                minLength={10}
                maxLength={200}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Event Type</label>
              <select
                value={form.eventType}
                onChange={(e) => update('eventType', e.target.value as EventType)}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
              >
                {eventTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#222222] mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                rows={5}
                placeholder="Describe the event, goals, audience, and expectations"
                required
                minLength={50}
                maxLength={5000}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#222222]">Location</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">City</label>
              <input
                type="text"
                value={form.location.city}
                onChange={(e) => update('location', { ...form.location, city: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">State</label>
              <input
                type="text"
                value={form.location.state}
                onChange={(e) => update('location', { ...form.location, state: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Country</label>
              <input
                type="text"
                value={form.location.country}
                onChange={(e) => update('location', { ...form.location, country: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Venue (optional)</label>
              <input
                type="text"
                value={form.location.venue || ''}
                onChange={(e) => update('location', { ...form.location, venue: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#222222] mb-2">Specific Address (optional)</label>
              <input
                type="text"
                value={form.location.specificAddress || ''}
                onChange={(e) => update('location', { ...form.location, specificAddress: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
              />
            </div>
          </div>
        </div>

        {/* Dates & Guests */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#222222]">Date & Guests</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Start Date</label>
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={form.eventDate.start}
                  onChange={(date: Date | null) => update('eventDate', { ...form.eventDate, start: date })}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd HH:mm"
                  minDate={new Date()}
                  className="w-full px-4 py-2 bg-white border-3 border-[#1E93AB] rounded-lg focus:border-[#197A8F] focus:ring-6 focus:ring-[#1E93AB]/30 shadow-lg hover:shadow-xl transition-all text-[#222222] font-medium"
                  wrapperClassName="w-full"
                  calendarClassName="custom-calendar-start"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">End Date</label>
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={form.eventDate.end}
                  onChange={(date: Date | null) => update('eventDate', { ...form.eventDate, end: date })}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd HH:mm"
                  minDate={form.eventDate.start || new Date()}
                  className="w-full px-4 py-2 bg-white border-3 border-[#E62727] rounded-lg focus:border-[#D11F1F] focus:ring-6 focus:ring-[#E62727]/30 shadow-lg hover:shadow-xl transition-all text-[#222222] font-medium"
                  wrapperClassName="w-full"
                  calendarClassName="custom-calendar-end"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Guests (Min)</label>
              <input
                type="number"
                value={form.guestCount.min}
                onChange={(e) => update('guestCount', { ...form.guestCount, min: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Guests (Max)</label>
              <input
                type="number"
                value={form.guestCount.max}
                onChange={(e) => update('guestCount', { ...form.guestCount, max: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                min={1}
                required
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#222222]">Budget</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Min</label>
              <input
                type="number"
                value={form.budget.min}
                onChange={(e) => update('budget', { ...form.budget, min: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Max</label>
              <input
                type="number"
                value={form.budget.max}
                onChange={(e) => update('budget', { ...form.budget, max: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Currency</label>
              <input
                type="text"
                value={form.budget.currency}
                onChange={(e) => update('budget', { ...form.budget, currency: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl shadow-sm border border-[#DCDCDC]">
          <div className="p-6 border-b border-[#DCDCDC]">
            <h2 className="text-xl font-semibold text-[#222222]">Requirements</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Venue Type (optional)</label>
              <input
                type="text"
                value={form.requirements.venueType || ''}
                onChange={(e) => update('requirements', { ...form.requirements, venueType: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Services (comma separated)</label>
              <input
                type="text"
                value={form.requirements.services.join(', ')}
                onChange={(e) => update('requirements', { ...form.requirements, services: e.target.value.split(',').map(s => s.trim()) })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                placeholder="catering, decoration, music"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#222222] mb-2">Additional Notes (optional)</label>
              <textarea
                value={form.requirements.additionalNotes || ''}
                onChange={(e) => update('requirements', { ...form.requirements, additionalNotes: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#DCDCDC] rounded-lg focus:border-[#1E93AB] focus:ring-4 focus:ring-[#1E93AB]/20"
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-[#1E93AB] text-white px-6 py-3 rounded-lg hover:bg-[#197A8F] transition-colors shadow-md disabled:opacity-50"
          >
            {submitting ? 'Posting…' : 'Post Event'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 bg-white text-[#222222] px-6 py-3 rounded-lg border border-[#DCDCDC] hover:bg-[#F3F2EC]"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
