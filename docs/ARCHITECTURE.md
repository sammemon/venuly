# Venuly - Complete Architecture Documentation

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Database Architecture](#database-architecture)
4. [API Endpoints](#api-endpoints)
5. [Authentication & Authorization](#authentication--authorization)
6. [Frontend Architecture](#frontend-architecture)
7. [Feature Modules](#feature-modules)
8. [Deployment Guide](#deployment-guide)
9. [Scalability Strategy](#scalability-strategy)

---

## System Overview

Venuly is a two-sided marketplace platform connecting event hosts (clients) with professional event organizers and vendors. The platform follows Upwork's marketplace model but is specialized for the event planning industry.

### Core User Flows

**Client Flow:**
1. Sign up as a client
2. Create event posting with requirements
3. Receive and review proposals from organizers
4. Compare proposals and select the best fit
5. Communicate with organizer
6. Make milestone-based payments
7. Review and rate the organizer

**Organizer Flow:**
1. Sign up as an organizer
2. Complete professional profile
3. Browse marketplace listings
4. Submit customized proposals
5. Negotiate with clients
6. Deliver services per agreement
7. Receive payments upon milestone completion
8. Build reputation through reviews

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Server Components
- **Forms**: React Hook Form + Zod validation
- **Real-time**: Socket.io Client
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Zod
- **Real-time**: Socket.io

### Infrastructure
- **Hosting**: Vercel (recommended) / AWS / DigitalOcean
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary / AWS S3
- **Email**: SendGrid / AWS SES
- **Payments**: Stripe

---

## Database Architecture

### Collections Schema

#### 1. Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: Enum('CLIENT', 'ORGANIZER', 'ADMIN'),
  avatar: String,
  phone: String,
  isEmailVerified: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)
- `role`
- `createdAt`

#### 2. OrganizerProfiles Collection
```javascript
{
  _id: ObjectId,
  userId: String (ref: User, unique),
  businessName: String,
  bio: String,
  location: {
    city: String,
    state: String,
    country: String
  },
  services: [String],
  specializations: [EventType],
  portfolio: [{
    title: String,
    description: String,
    images: [String],
    eventDate: Date
  }],
  pricing: {
    minimumBudget: Number,
    hourlyRate: Number
  },
  verification: {
    isVerified: Boolean,
    verifiedAt: Date,
    documents: [String]
  },
  stats: {
    totalEvents: Number,
    averageRating: Number,
    totalReviews: Number,
    responseTime: Number,
    completionRate: Number
  }
}
```

**Indexes:**
- `userId` (unique)
- `location.city`, `location.state`
- `specializations`
- `pricing.minimumBudget`
- `stats.averageRating`

#### 3. Events Collection
```javascript
{
  _id: ObjectId,
  clientId: String (ref: User),
  title: String,
  description: String,
  eventType: EventType,
  status: EventStatus,
  location: {
    city: String,
    state: String,
    country: String,
    venue: String,
    specificAddress: String
  },
  eventDate: {
    start: Date,
    end: Date
  },
  guestCount: {
    min: Number,
    max: Number
  },
  budget: {
    min: Number,
    max: Number,
    currency: String
  },
  requirements: {
    venueType: String,
    services: [String],
    additionalNotes: String
  },
  proposals: [ObjectId] (ref: Proposal),
  selectedProposal: ObjectId (ref: Proposal),
  views: Number,
  isPublished: Boolean,
  publishedAt: Date
}
```

**Indexes:**
- `clientId`
- `status`, `isPublished`
- `eventType`
- `location.city`, `location.state`
- `eventDate.start`
- `budget.min`, `budget.max`
- Text index on `title`, `description`

#### 4. Proposals Collection
```javascript
{
  _id: ObjectId,
  eventId: String (ref: Event),
  organizerId: String (ref: User),
  status: ProposalStatus,
  coverLetter: String,
  services: [{
    name: String,
    description: String,
    cost: Number
  }],
  timeline: [{
    phase: String,
    duration: String,
    description: String
  }],
  totalCost: Number,
  deliverables: [String],
  terms: String,
  version: Number,
  validUntil: Date
}
```

**Indexes:**
- `eventId`
- `organizerId`
- `status`
- Compound: `eventId` + `organizerId` (unique for active proposals)

#### 5. Messages Collection
```javascript
{
  _id: ObjectId,
  conversationId: String (ref: Conversation),
  senderId: String (ref: User),
  receiverId: String (ref: User),
  content: String,
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  isRead: Boolean,
  readAt: Date,
  createdAt: Date
}
```

**Indexes:**
- `conversationId`
- `senderId`, `receiverId`
- `isRead`

#### 6. Reviews Collection
```javascript
{
  _id: ObjectId,
  eventId: String (ref: Event),
  reviewerId: String (ref: User),
  revieweeId: String (ref: User),
  rating: Number (1-5),
  comment: String,
  categories: {
    professionalism: Number,
    communication: Number,
    quality: Number,
    value: Number
  },
  response: {
    comment: String,
    createdAt: Date
  },
  isPublic: Boolean
}
```

**Indexes:**
- `revieweeId`, `isPublic`
- `eventId`
- `rating`

#### 7. Payments Collection
```javascript
{
  _id: ObjectId,
  eventId: String (ref: Event),
  proposalId: String (ref: Proposal),
  clientId: String (ref: User),
  organizerId: String (ref: User),
  amount: Number,
  platformFee: Number,
  netAmount: Number,
  currency: String,
  status: PaymentStatus,
  milestones: [{
    title: String,
    amount: Number,
    status: MilestoneStatus,
    dueDate: Date,
    paidAt: Date,
    releasedAt: Date
  }],
  stripePaymentIntentId: String
}
```

**Indexes:**
- `eventId`
- `clientId`
- `organizerId`
- `status`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `GET /api/auth/session` - Get current session

### Events
- `GET /api/events` - List events (with filters)
- `POST /api/events` - Create event (Client only)
- `GET /api/events/[id]` - Get event details
- `PATCH /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event
- `POST /api/events/[id]/publish` - Publish event

### Proposals
- `POST /api/proposals` - Submit proposal (Organizer only)
- `GET /api/proposals/[id]` - Get proposal details
- `PATCH /api/proposals/[id]` - Update proposal
- `POST /api/proposals/[id]/accept` - Accept proposal (Client)
- `POST /api/proposals/[id]/reject` - Reject proposal (Client)

### Organizer Profiles
- `GET /api/organizers` - List organizers (with filters)
- `GET /api/organizers/[id]` - Get organizer profile
- `POST /api/organizers/profile` - Create profile
- `PATCH /api/organizers/profile` - Update profile

### Messages
- `GET /api/conversations` - List user conversations
- `GET /api/conversations/[id]/messages` - Get messages
- `POST /api/conversations/[id]/messages` - Send message

### Reviews
- `GET /api/reviews/organizer/[id]` - Get organizer reviews
- `POST /api/reviews` - Create review
- `POST /api/reviews/[id]/respond` - Respond to review

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/[id]/release` - Release milestone payment
- `GET /api/payments/[id]` - Get payment details

### Admin
- `GET /api/admin/users` - List all users
- `PATCH /api/admin/users/[id]/verify` - Verify organizer
- `GET /api/admin/stats` - Platform statistics

---

## Authentication & Authorization

### JWT Token Structure
```javascript
{
  id: string,          // User ID
  email: string,
  role: UserRole,
  firstName: string,
  lastName: string,
  avatar?: string,
  isEmailVerified: boolean
}
```

### Role-Based Access Control (RBAC)

**CLIENT:**
- Create and manage events
- Review proposals
- Communicate with organizers
- Make payments
- Leave reviews

**ORGANIZER:**
- Browse marketplace
- Submit proposals
- Manage profile
- Communicate with clients
- Receive payments
- Respond to reviews

**ADMIN:**
- All permissions
- User management
- Organizer verification
- Dispute resolution
- Platform analytics

---

## Frontend Architecture

### Folder Structure
```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (client)/        # Client dashboard
│   ├── (organizer)/     # Organizer dashboard
│   ├── (admin)/         # Admin panel
│   ├── api/             # API routes
│   ├── marketplace/     # Public marketplace
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── lib/
│   ├── db/             # Database utilities
│   ├── auth/           # Auth utilities
│   └── validation/     # Zod schemas
├── models/             # Mongoose models
├── types/              # TypeScript types
└── utils/              # Helper functions
```

### Design System Colors
- Primary Background: `#FAF3E1`
- Secondary Background: `#F5E7C6`
- Accent/CTA: `#FA8112`
- Text/Dark: `#222222`

---

## Feature Modules

### 1. Event Posting System
- Multi-step form with validation
- Draft saving
- Image upload for venue/mood boards
- Service requirements checklist
- Budget calculator

### 2. Proposal System
- Template-based proposals
- Service breakdown builder
- Timeline planner
- Cost calculator
- Proposal versioning

### 3. Real-Time Messaging
- Socket.io implementation
- Online status indicators
- Typing indicators
- File attachments
- Message notifications

### 4. Payment & Escrow
- Stripe integration
- Milestone-based releases
- Automatic platform fee calculation (15%)
- Payment history
- Invoice generation

### 5. Review System
- 5-star rating
- Category-based ratings
- Review moderation
- Response system
- Reputation calculation

---

## Deployment Guide

### Environment Variables
```bash
# Database
MONGODB_URI=mongodb+srv://...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://venuly.com

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=...
SMTP_PASSWORD=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Performance Optimization
- Enable Next.js Image Optimization
- Implement Redis for caching
- CDN for static assets
- Database query optimization
- API route caching

---

## Scalability Strategy

### Horizontal Scaling
- Stateless API design
- Session management in database
- WebSocket clustering with Redis adapter

### Database Optimization
- Proper indexing strategy
- Query optimization
- Connection pooling
- Read replicas for heavy reads

### Caching Strategy
- Redis for session storage
- API response caching
- Static page generation
- CDN for assets

### Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Database performance (MongoDB Atlas)
- User analytics

### Future Enhancements
1. Mobile app (React Native)
2. AI-powered organizer matching
3. Video consultation integration
4. Multi-language support
5. Advanced analytics dashboard
6. Automated contract generation
7. Insurance integration
8. Vendor marketplace expansion

---

## Security Best Practices

1. **Input Validation**: All inputs validated with Zod
2. **SQL Injection**: Mongoose parameterized queries
3. **XSS Protection**: React auto-escaping + CSP headers
4. **CSRF Protection**: NextAuth built-in protection
5. **Rate Limiting**: API route rate limiting
6. **Secure Headers**: Next.js security headers
7. **File Upload**: Validation + virus scanning
8. **Payment Security**: PCI compliance via Stripe

---

## Support & Maintenance

### Logging
- Winston for application logs
- MongoDB slow query log
- Error tracking with Sentry

### Backup Strategy
- Daily automated MongoDB backups
- Weekly full backups
- Point-in-time recovery enabled

### Update Strategy
- Dependency updates monthly
- Security patches immediately
- Feature releases bi-weekly
- Database migrations versioned

---

*For questions or support: support@venuly.com*
