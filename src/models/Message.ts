import mongoose, { Schema, Model } from 'mongoose';
import { IMessage } from '@/types';

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: String,
      required: true,
      ref: 'Conversation',
      index: true,
    },
    senderId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    receiverId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    attachments: [{
      name: { type: String, required: true },
      url: { type: String, required: true },
      type: { type: String, required: true },
    }],
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ receiverId: 1, isRead: 1 });

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
