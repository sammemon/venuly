import mongoose, { Schema, Model } from 'mongoose';
import { IReview } from '@/types';

const ReviewSchema = new Schema<IReview>(
  {
    eventId: {
      type: String,
      required: true,
      ref: 'Event',
      index: true,
    },
    reviewerId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    revieweeId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    categories: {
      professionalism: { type: Number, required: true, min: 1, max: 5 },
      communication: { type: Number, required: true, min: 1, max: 5 },
      quality: { type: Number, required: true, min: 1, max: 5 },
      value: { type: Number, required: true, min: 1, max: 5 },
    },
    response: {
      comment: { type: String, maxlength: 1000 },
      createdAt: { type: Date },
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ReviewSchema.index({ revieweeId: 1, isPublic: 1, createdAt: -1 });
ReviewSchema.index({ eventId: 1, reviewerId: 1 }, { unique: true });
ReviewSchema.index({ rating: -1 });

// Ensure reviewer and reviewee are different
ReviewSchema.pre('save', function (next) {
  if (this.reviewerId === this.revieweeId) {
    next(new Error('Cannot review yourself'));
  }
  next();
});

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
