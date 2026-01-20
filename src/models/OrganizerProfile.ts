import mongoose, { Schema, Model } from 'mongoose';
import { IOrganizerProfile, EventType } from '@/types';

const OrganizerProfileSchema = new Schema<IOrganizerProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      ref: 'User',
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    services: [{
      type: String,
      required: true,
    }],
    specializations: [{
      type: String,
      enum: Object.values(EventType),
    }],
    portfolio: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      images: [{ type: String }],
      eventDate: { type: Date, required: true },
    }],
    pricing: {
      minimumBudget: {
        type: Number,
        required: true,
        min: 0,
      },
      hourlyRate: {
        type: Number,
        min: 0,
      },
    },
    availability: [{
      date: { type: Date, required: true },
      isAvailable: { type: Boolean, default: true },
    }],
    verification: {
      isVerified: { type: Boolean, default: false },
      verifiedAt: { type: Date },
      documents: [{ type: String }],
    },
    stats: {
      totalEvents: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0, min: 0, max: 5 },
      totalReviews: { type: Number, default: 0 },
      responseTime: { type: Number, default: 0 },
      completionRate: { type: Number, default: 0, min: 0, max: 100 },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search and filtering
OrganizerProfileSchema.index({ 'location.city': 1, 'location.state': 1 });
OrganizerProfileSchema.index({ specializations: 1 });
OrganizerProfileSchema.index({ 'pricing.minimumBudget': 1 });
OrganizerProfileSchema.index({ 'stats.averageRating': -1 });
OrganizerProfileSchema.index({ 'verification.isVerified': 1 });
OrganizerProfileSchema.index({ services: 1 });

const OrganizerProfile: Model<IOrganizerProfile> = 
  mongoose.models.OrganizerProfile || 
  mongoose.model<IOrganizerProfile>('OrganizerProfile', OrganizerProfileSchema);

export default OrganizerProfile;
