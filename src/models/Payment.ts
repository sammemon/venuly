import mongoose, { Schema, Model } from 'mongoose';
import { IPayment, PaymentStatus, PaymentMilestoneStatus } from '@/types';

const PaymentSchema = new Schema<IPayment>(
  {
    eventId: {
      type: String,
      required: true,
      ref: 'Event',
      index: true,
    },
    proposalId: {
      type: String,
      required: true,
      ref: 'Proposal',
      index: true,
    },
    clientId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    organizerId: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    platformFee: {
      type: Number,
      required: true,
      min: 0,
    },
    netAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      index: true,
    },
    milestones: [{
      title: { type: String, required: true },
      amount: { type: Number, required: true, min: 0 },
      status: { 
        type: String, 
        enum: Object.values(PaymentMilestoneStatus),
        default: PaymentMilestoneStatus.PENDING 
      },
      dueDate: { type: Date, required: true },
      paidAt: { type: Date },
      releasedAt: { type: Date },
    }],
    stripePaymentIntentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
PaymentSchema.index({ clientId: 1, status: 1 });
PaymentSchema.index({ organizerId: 1, status: 1 });
PaymentSchema.index({ eventId: 1, status: 1 });
PaymentSchema.index({ 'milestones.status': 1 });

// Calculate platform fee and net amount
PaymentSchema.pre('save', function (next) {
  const COMMISSION_RATE = parseFloat(process.env.PLATFORM_COMMISSION_RATE || '0.15');
  
  if (this.isModified('amount') && !this.platformFee) {
    this.platformFee = this.amount * COMMISSION_RATE;
    this.netAmount = this.amount - this.platformFee;
  }
  
  next();
});

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
