import mongoose, { Schema, Model } from 'mongoose';
import { IEvent, EventType, EventStatus } from '@/types';

const EventSchema = new Schema<IEvent>(
  {
    clientId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    eventType: {
      type: String,
      enum: Object.values(EventType),
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.DRAFT,
      index: true,
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      venue: { type: String },
      specificAddress: { type: String },
    },
    eventDate: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    guestCount: {
      min: { type: Number, required: true, min: 1 },
      max: { type: Number, required: true, min: 1 },
    },
    budget: {
      min: { type: Number, required: true, min: 0 },
      max: { type: Number, required: true, min: 0 },
      currency: { type: String, default: 'USD' },
    },
    requirements: {
      venueType: { type: String },
      services: [{ type: String }],
      additionalNotes: { type: String, maxlength: 2000 },
    },
    proposals: [{
      type: Schema.Types.ObjectId,
      ref: 'Proposal',
    }],
    selectedProposal: {
      type: Schema.Types.ObjectId,
      ref: 'Proposal',
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
EventSchema.index({ status: 1, isPublished: 1, publishedAt: -1 });
EventSchema.index({ eventType: 1, 'location.city': 1, 'location.state': 1 });
EventSchema.index({ 'eventDate.start': 1 });
EventSchema.index({ 'budget.min': 1, 'budget.max': 1 });
EventSchema.index({ createdAt: -1 });

// Text search index
EventSchema.index({ 
  title: 'text', 
  description: 'text',
  'requirements.services': 'text' 
});

// Validation
EventSchema.pre('save', function (next) {
  if (this.eventDate.end < this.eventDate.start) {
    next(new Error('Event end date must be after start date'));
  }
  if (this.guestCount.max < this.guestCount.min) {
    next(new Error('Maximum guest count must be greater than minimum'));
  }
  if (this.budget.max < this.budget.min) {
    next(new Error('Maximum budget must be greater than minimum'));
  }
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
