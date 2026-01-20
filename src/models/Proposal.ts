import mongoose, { Schema, Model } from 'mongoose';
import { IProposal, ProposalStatus } from '@/types';

const ProposalSchema = new Schema<IProposal>(
  {
    eventId: {
      type: String,
      required: true,
      ref: 'Event',
      index: true,
    },
    organizerId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(ProposalStatus),
      default: ProposalStatus.PENDING,
      index: true,
    },
    coverLetter: {
      type: String,
      required: true,
      maxlength: 3000,
    },
    services: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      cost: { type: Number, required: true, min: 0 },
    }],
    timeline: [{
      phase: { type: String, required: true },
      duration: { type: String, required: true },
      description: { type: String, required: true },
    }],
    totalCost: {
      type: Number,
      required: true,
      min: 0,
    },
    deliverables: [{
      type: String,
      required: true,
    }],
    terms: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    version: {
      type: Number,
      default: 1,
    },
    previousVersionId: {
      type: Schema.Types.ObjectId,
      ref: 'Proposal',
    },
    validUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProposalSchema.index({ eventId: 1, organizerId: 1 });
ProposalSchema.index({ organizerId: 1, status: 1 });
ProposalSchema.index({ eventId: 1, status: 1, createdAt: -1 });
ProposalSchema.index({ validUntil: 1 });

// Ensure one organizer can't submit multiple active proposals for same event
ProposalSchema.index(
  { eventId: 1, organizerId: 1, status: 1 },
  { 
    unique: true,
    partialFilterExpression: { 
      status: { $in: [ProposalStatus.PENDING, ProposalStatus.NEGOTIATING] }
    }
  }
);

// Validation
ProposalSchema.pre('save', function (next) {
  if (this.validUntil < new Date()) {
    next(new Error('Valid until date must be in the future'));
  }
  
  // Calculate total from services if not manually set
  if (this.services && this.services.length > 0) {
    const calculatedTotal = this.services.reduce((sum, service) => sum + service.cost, 0);
    if (!this.totalCost) {
      this.totalCost = calculatedTotal;
    }
  }
  
  next();
});

const Proposal: Model<IProposal> = mongoose.models.Proposal || mongoose.model<IProposal>('Proposal', ProposalSchema);

export default Proposal;
