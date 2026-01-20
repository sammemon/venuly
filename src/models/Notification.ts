import mongoose, { Schema, Model } from 'mongoose';
import { INotification, NotificationType } from '@/types';

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    link: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: {
      type: Date,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, type: 1 });
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // Auto-delete after 30 days

const Notification: Model<INotification> = 
  mongoose.models.Notification || 
  mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
