import { z } from 'zod';
import { UserRole, EventType, EventStatus, ProposalStatus } from '@/types';

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum([UserRole.CLIENT, UserRole.ORGANIZER]),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Event validation schemas
export const createEventSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(200),
  description: z.string().min(50, 'Description must be at least 50 characters').max(5000),
  eventType: z.nativeEnum(EventType),
  location: z.object({
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    venue: z.string().optional(),
    specificAddress: z.string().optional(),
  }),
  eventDate: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  guestCount: z.object({
    min: z.number().int().positive(),
    max: z.number().int().positive(),
  }),
  budget: z.object({
    min: z.number().positive(),
    max: z.number().positive(),
    currency: z.string().default('USD'),
  }),
  requirements: z.object({
    venueType: z.string().optional(),
    services: z.array(z.string()),
    additionalNotes: z.string().max(2000).optional(),
  }),
});

export const updateEventSchema = createEventSchema.partial();

// Proposal validation schemas
export const createProposalSchema = z.object({
  eventId: z.string(),
  coverLetter: z.string().min(100, 'Cover letter must be at least 100 characters').max(3000),
  services: z.array(z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    cost: z.number().positive(),
  })).min(1, 'At least one service is required'),
  timeline: z.array(z.object({
    phase: z.string().min(3),
    duration: z.string().min(3),
    description: z.string().min(10),
  })).min(1, 'At least one timeline phase is required'),
  deliverables: z.array(z.string().min(5)).min(1, 'At least one deliverable is required'),
  terms: z.string().min(50, 'Terms must be at least 50 characters').max(2000),
  validUntil: z.string().datetime(),
});

export const updateProposalStatusSchema = z.object({
  status: z.nativeEnum(ProposalStatus),
});

// Review validation schemas
export const createReviewSchema = z.object({
  eventId: z.string(),
  revieweeId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(2000),
  categories: z.object({
    professionalism: z.number().int().min(1).max(5),
    communication: z.number().int().min(1).max(5),
    quality: z.number().int().min(1).max(5),
    value: z.number().int().min(1).max(5),
  }),
});

// Organizer profile validation
export const createOrganizerProfileSchema = z.object({
  businessName: z.string().min(3, 'Business name must be at least 3 characters'),
  bio: z.string().min(100, 'Bio must be at least 100 characters').max(2000),
  location: z.object({
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
  }),
  services: z.array(z.string()).min(1, 'At least one service is required'),
  specializations: z.array(z.nativeEnum(EventType)).min(1, 'At least one specialization is required'),
  pricing: z.object({
    minimumBudget: z.number().positive(),
    hourlyRate: z.number().positive().optional(),
  }),
});

export const updateOrganizerProfileSchema = createOrganizerProfileSchema.partial();

// Message validation
export const sendMessageSchema = z.object({
  conversationId: z.string(),
  content: z.string().min(1, 'Message cannot be empty').max(5000),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    type: z.string(),
  })).optional(),
});

// Query/Filter validation
export const eventFilterSchema = z.object({
  eventType: z.nativeEnum(EventType).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  minBudget: z.number().positive().optional(),
  maxBudget: z.number().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z.enum(['newest', 'oldest', 'budget-low', 'budget-high']).default('newest'),
});

export const organizerFilterSchema = z.object({
  specializations: z.array(z.nativeEnum(EventType)).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  minBudget: z.number().positive().optional(),
  maxBudget: z.number().positive().optional(),
  minRating: z.number().min(0).max(5).optional(),
  verified: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type CreateProposalInput = z.infer<typeof createProposalSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type CreateOrganizerProfileInput = z.infer<typeof createOrganizerProfileSchema>;
export type UpdateOrganizerProfileInput = z.infer<typeof updateOrganizerProfileSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type EventFilterInput = z.infer<typeof eventFilterSchema>;
export type OrganizerFilterInput = z.infer<typeof organizerFilterSchema>;
