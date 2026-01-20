import mongoose, { Schema, Model } from 'mongoose';
import { IConversation } from '@/types';

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{
      type: String,
      ref: 'User',
      required: true,
    }],
    eventId: {
      type: String,
      ref: 'Event',
      index: true,
    },
    proposalId: {
      type: String,
      ref: 'Proposal',
      index: true,
    },
    lastMessage: {
      type: String,
    },
    lastMessageAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ lastMessageAt: -1 });
ConversationSchema.index({ eventId: 1, participants: 1 });

// Ensure participants array has exactly 2 users
ConversationSchema.pre('save', function (next) {
  if (this.participants.length !== 2) {
    next(new Error('Conversation must have exactly 2 participants'));
  }
  next();
});

const Conversation: Model<IConversation> = 
  mongoose.models.Conversation || 
  mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
