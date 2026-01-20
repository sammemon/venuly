export enum UserRole {
  CLIENT = 'CLIENT',
  ORGANIZER = 'ORGANIZER',
  ADMIN = 'ADMIN',
}

export enum EventType {
  WEDDING = 'WEDDING',
  CORPORATE = 'CORPORATE',
  BIRTHDAY = 'BIRTHDAY',
  CONCERT = 'CONCERT',
  CONFERENCE = 'CONFERENCE',
  EXHIBITION = 'EXHIBITION',
  PARTY = 'PARTY',
  FESTIVAL = 'FESTIVAL',
  OTHER = 'OTHER',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  IN_DISCUSSION = 'IN_DISCUSSION',
  BOOKED = 'BOOKED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ProposalStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  NEGOTIATING = 'NEGOTIATING',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  HELD = 'HELD',
  RELEASED = 'RELEASED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMilestoneStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  IN_ESCROW = 'IN_ESCROW',
  RELEASED = 'RELEASED',
  DISPUTED = 'DISPUTED',
}

export enum NotificationType {
  NEW_PROPOSAL = 'NEW_PROPOSAL',
  PROPOSAL_ACCEPTED = 'PROPOSAL_ACCEPTED',
  PROPOSAL_REJECTED = 'PROPOSAL_REJECTED',
  NEW_MESSAGE = 'NEW_MESSAGE',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_RELEASED = 'PAYMENT_RELEASED',
  NEW_REVIEW = 'NEW_REVIEW',
  EVENT_UPDATE = 'EVENT_UPDATE',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrganizerProfile {
  _id: string;
  userId: string;
  businessName: string;
  bio: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  services: string[];
  specializations: EventType[];
  portfolio: {
    title: string;
    description: string;
    images: string[];
    eventDate: Date;
  }[];
  pricing: {
    minimumBudget: number;
    hourlyRate?: number;
  };
  availability: {
    date: Date;
    isAvailable: boolean;
  }[];
  verification: {
    isVerified: boolean;
    verifiedAt?: Date;
    documents: string[];
  };
  stats: {
    totalEvents: number;
    averageRating: number;
    totalReviews: number;
    responseTime: number; // in hours
    completionRate: number; // percentage
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id: string;
  clientId: string;
  title: string;
  description: string;
  eventType: EventType;
  status: EventStatus;
  location: {
    city: string;
    state: string;
    country: string;
    venue?: string;
    specificAddress?: string;
  };
  eventDate: {
    start: Date;
    end: Date;
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
  proposals: string[]; // Proposal IDs
  selectedProposal?: string;
  views: number;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProposal {
  _id: string;
  eventId: string;
  organizerId: string;
  status: ProposalStatus;
  coverLetter: string;
  services: {
    name: string;
    description: string;
    cost: number;
  }[];
  timeline: {
    phase: string;
    duration: string;
    description: string;
  }[];
  totalCost: number;
  deliverables: string[];
  terms: string;
  version: number;
  previousVersionId?: string;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export interface IConversation {
  _id: string;
  participants: string[]; // User IDs
  eventId?: string;
  proposalId?: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  _id: string;
  eventId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number; // 1-5
  comment: string;
  categories: {
    professionalism: number;
    communication: number;
    quality: number;
    value: number;
  };
  response?: {
    comment: string;
    createdAt: Date;
  };
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  _id: string;
  eventId: string;
  proposalId: string;
  clientId: string;
  organizerId: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: PaymentStatus;
  milestones: {
    title: string;
    amount: number;
    status: PaymentMilestoneStatus;
    dueDate: Date;
    paidAt?: Date;
    releasedAt?: Date;
  }[];
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification {
  _id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  readAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface IDisputeCase {
  _id: string;
  eventId: string;
  proposalId: string;
  paymentId: string;
  initiatorId: string;
  respondentId: string;
  reason: string;
  description: string;
  evidence: {
    type: string;
    url: string;
    uploadedBy: string;
    uploadedAt: Date;
  }[];
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED';
  resolution?: {
    decision: string;
    refundAmount?: number;
    resolvedBy: string;
    resolvedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
