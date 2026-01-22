'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { AnimatedButton, AnimatedInput, Textarea } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { Loader } from '@/components/ui';

function CreateProposalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const { success, error } = useToast();

  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    coverLetter: '',
    services: [{ name: '', description: '', cost: 0 }],
    timeline: [{ phase: '', duration: '', description: '' }],
    deliverables: [''],
    terms: '',
  });

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    } else {
      setEventLoading(false);
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) throw new Error('Failed to load event');
      const data = await response.json();
      setEvent(data.event);
    } catch (err) {
      error('Could not load event details');
    } finally {
      setEventLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceChange = (index: number, field: string, value: any) => {
    const updated = [...formData.services];
    updated[index] = { ...updated[index], [field]: field === 'cost' ? parseFloat(value) || 0 : value };
    setFormData(prev => ({ ...prev, services: updated }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '', cost: 0 }],
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleTimelineChange = (index: number, field: string, value: string) => {
    const updated = [...formData.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, timeline: updated }));
  };

  const addTimeline = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { phase: '', duration: '', description: '' }],
    }));
  };

  const removeTimeline = (index: number) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  const handleDeliverableChange = (index: number, value: string) => {
    const updated = [...formData.deliverables];
    updated[index] = value;
    setFormData(prev => ({ ...prev, deliverables: updated }));
  };

  const addDeliverable = () => {
    setFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, ''],
    }));
  };

  const removeDeliverable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) {
      error('Event ID is missing');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        eventId,
        ...formData,
      };

      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit proposal');
      }

      success('Proposal submitted successfully!');
      setTimeout(() => {
        router.push('/dashboard/organizer/proposals');
      }, 1500);
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to submit proposal');
    } finally {
      setLoading(false);
    }
  };

  if (eventLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/dashboard/organizer/proposals" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Proposals
        </Link>

        <h1 className="text-4xl font-display font-bold text-dark mb-2">Submit Proposal</h1>
        {event && (
          <p className="text-gray-600">
            For event: <span className="font-semibold text-dark">{event.title}</span>
          </p>
        )}
      </motion.div>

      {/* Event Details Preview */}
      {event && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Budget</p>
              <p className="font-semibold text-dark">${event.budget?.min} - ${event.budget?.max}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Event Date</p>
              <p className="font-semibold text-dark">
                {new Date(event.eventDate?.start).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-dark">
                {event.location?.city}, {event.location?.state}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Cover Letter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <label className="block text-sm font-semibold text-dark mb-2">
            Cover Letter *
          </label>
          <Textarea
            name="coverLetter"
            placeholder="Introduce yourself and explain why you're the perfect fit for this event..."
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            required
          />
        </motion.div>

        {/* Services */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-dark">Services *</label>
            <AnimatedButton
              type="button"
              size="sm"
              variant="outline"
              onClick={addService}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Service
            </AnimatedButton>
          </div>

          <div className="space-y-4">
            {formData.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="grid md:grid-cols-3 gap-3">
                  <AnimatedInput
                    placeholder="Service name"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                    required
                  />
                  <AnimatedInput
                    type="number"
                    placeholder="Cost"
                    value={service.cost}
                    onChange={(e) => handleServiceChange(index, 'cost', e.target.value)}
                    required
                  />
                  {formData.services.length > 1 && (
                    <AnimatedButton
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeService(index)}
                      icon={<Trash2 className="w-4 h-4" />}
                    >
                      Remove
                    </AnimatedButton>
                  )}
                </div>
                <Textarea
                  placeholder="Service description"
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  rows={2}
                  required
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-dark">Project Timeline</label>
            <AnimatedButton
              type="button"
              size="sm"
              variant="outline"
              onClick={addTimeline}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Phase
            </AnimatedButton>
          </div>

          <div className="space-y-4">
            {formData.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="grid md:grid-cols-3 gap-3">
                  <AnimatedInput
                    placeholder="Phase name (e.g., Planning)"
                    value={item.phase}
                    onChange={(e) => handleTimelineChange(index, 'phase', e.target.value)}
                  />
                  <AnimatedInput
                    placeholder="Duration (e.g., 2 weeks)"
                    value={item.duration}
                    onChange={(e) => handleTimelineChange(index, 'duration', e.target.value)}
                  />
                  {formData.timeline.length > 1 && (
                    <AnimatedButton
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeTimeline(index)}
                      icon={<Trash2 className="w-4 h-4" />}
                    >
                      Remove
                    </AnimatedButton>
                  )}
                </div>
                <Textarea
                  placeholder="Phase description"
                  value={item.description}
                  onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                  rows={2}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deliverables */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-dark">Deliverables</label>
            <AnimatedButton
              type="button"
              size="sm"
              variant="outline"
              onClick={addDeliverable}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Item
            </AnimatedButton>
          </div>

          <div className="space-y-2">
            {formData.deliverables.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                <AnimatedInput
                  placeholder="e.g., Venue booking confirmation"
                  value={item}
                  onChange={(e) => handleDeliverableChange(index, e.target.value)}
                  className="flex-1"
                />
                {formData.deliverables.length > 1 && (
                  <AnimatedButton
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeDeliverable(index)}
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Terms */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <label className="block text-sm font-semibold text-dark mb-2">
            Terms & Conditions
          </label>
          <Textarea
            name="terms"
            placeholder="Any special terms, conditions, or important information the client should know..."
            value={formData.terms}
            onChange={handleChange}
            rows={4}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 pt-4"
        >
          <Link href="/dashboard/organizer/proposals" className="flex-1">
            <AnimatedButton variant="outline" className="w-full">
              Cancel
            </AnimatedButton>
          </Link>
          <AnimatedButton
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Proposal'}
          </AnimatedButton>
        </motion.div>
      </form>
    </div>
  );
}

export default function CreateProposalPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader /></div>}>
      <CreateProposalContent />
    </Suspense>
  );
}
