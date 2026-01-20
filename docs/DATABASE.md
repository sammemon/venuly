# Venuly - Database Schema Reference

## Overview

This document provides a comprehensive reference for all MongoDB collections used in Venuly, including field descriptions, indexes, validations, and relationships.

---

## Users Collection

Stores all user accounts (Clients, Organizers, and Admins).

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `email` | String | Yes | User email (unique) |
| `password` | String | Yes | Hashed password (bcrypt) |
| `firstName` | String | Yes | User's first name |
| `lastName` | String | Yes | User's last name |
| `role` | Enum | Yes | `CLIENT`, `ORGANIZER`, or `ADMIN` |
| `avatar` | String | No | Profile image URL |
| `phone` | String | No | Contact phone number |
| `isEmailVerified` | Boolean | Yes | Email verification status (default: false) |
| `isActive` | Boolean | Yes | Account active status (default: true) |
| `createdAt` | Date | Auto | Account creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Indexes

```javascript
{ email: 1 }              // Unique
{ role: 1 }
{ isActive: 1 }
{ createdAt: -1 }
{ email: 1, role: 1 }     // Compound
```

### Validations

- Email must be valid format and unique
- Password minimum 8 characters (hashed before storage)
- Role must be one of the defined enum values

### Example Document

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john.doe@example.com",
  "password": "$2a$12$...", 
  "firstName": "John",
  "lastName": "Doe",
  "role": "CLIENT",
  "avatar": "https://cloudinary.com/...",
  "phone": "+1234567890",
  "isEmailVerified": true,
  "isActive": true,
  "createdAt": "2026-01-15T10:00:00.000Z",
  "updatedAt": "2026-01-15T10:00:00.000Z"
}
```

---

## OrganizerProfiles Collection

Extended profile information for organizers.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | String (Ref: User) | Yes | Reference to User document (unique) |
| `businessName` | String | Yes | Business or professional name |
| `bio` | String | Yes | Professional biography (max 2000 chars) |
| `location.city` | String | Yes | City |
| `location.state` | String | Yes | State/Province |
| `location.country` | String | Yes | Country |
| `services` | Array[String] | Yes | List of offered services |
| `specializations` | Array[EventType] | Yes | Event type specializations |
| `portfolio` | Array[Object] | No | Portfolio items |
| `portfolio[].title` | String | Yes | Portfolio item title |
| `portfolio[].description` | String | Yes | Portfolio item description |
| `portfolio[].images` | Array[String] | No | Image URLs |
| `portfolio[].eventDate` | Date | Yes | Event date |
| `pricing.minimumBudget` | Number | Yes | Minimum project budget |
| `pricing.hourlyRate` | Number | No | Hourly rate (if applicable) |
| `availability` | Array[Object] | No | Availability calendar |
| `verification.isVerified` | Boolean | Yes | Verification status (default: false) |
| `verification.verifiedAt` | Date | No | Verification timestamp |
| `verification.documents` | Array[String] | No | Verification document URLs |
| `stats.totalEvents` | Number | Yes | Total completed events (default: 0) |
| `stats.averageRating` | Number | Yes | Average rating 0-5 (default: 0) |
| `stats.totalReviews` | Number | Yes | Total reviews received (default: 0) |
| `stats.responseTime` | Number | Yes | Avg response time in hours (default: 0) |
| `stats.completionRate` | Number | Yes | Completion rate % (default: 0) |
| `createdAt` | Date | Auto | Profile creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Indexes

```javascript
{ userId: 1 }                           // Unique
{ 'location.city': 1, 'location.state': 1 }
{ specializations: 1 }
{ 'pricing.minimumBudget': 1 }
{ 'stats.averageRating': -1 }
{ 'verification.isVerified': 1 }
{ services: 1 }
```

---

## Events Collection

Event postings created by clients.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `clientId` | String (Ref: User) | Yes | Client who created the event |
| `title` | String | Yes | Event title (max 200 chars) |
| `description` | String | Yes | Detailed description (max 5000 chars) |
| `eventType` | EventType | Yes | Type of event |
| `status` | EventStatus | Yes | Current status (default: DRAFT) |
| `location.city` | String | Yes | Event city |
| `location.state` | String | Yes | Event state |
| `location.country` | String | Yes | Event country |
| `location.venue` | String | No | Preferred venue |
| `location.specificAddress` | String | No | Specific address |
| `eventDate.start` | Date | Yes | Event start date/time |
| `eventDate.end` | Date | Yes | Event end date/time |
| `guestCount.min` | Number | Yes | Minimum guest count |
| `guestCount.max` | Number | Yes | Maximum guest count |
| `budget.min` | Number | Yes | Minimum budget |
| `budget.max` | Number | Yes | Maximum budget |
| `budget.currency` | String | Yes | Currency code (default: USD) |
| `requirements.venueType` | String | No | Venue type preference |
| `requirements.services` | Array[String] | Yes | Required services |
| `requirements.additionalNotes` | String | No | Additional requirements |
| `proposals` | Array[ObjectId] (Ref: Proposal) | Yes | Submitted proposals |
| `selectedProposal` | ObjectId (Ref: Proposal) | No | Accepted proposal |
| `views` | Number | Yes | View count (default: 0) |
| `isPublished` | Boolean | Yes | Publication status (default: false) |
| `publishedAt` | Date | No | Publication timestamp |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Indexes

```javascript
{ clientId: 1 }
{ status: 1, isPublished: 1, publishedAt: -1 }
{ eventType: 1 }
{ 'location.city': 1, 'location.state': 1 }
{ 'eventDate.start': 1 }
{ 'budget.min': 1, 'budget.max': 1 }
{ title: 'text', description: 'text', 'requirements.services': 'text' }
```

### Event Types Enum

```
WEDDING | CORPORATE | BIRTHDAY | CONCERT | CONFERENCE | 
EXHIBITION | PARTY | FESTIVAL | OTHER
```

### Event Status Enum

```
DRAFT | OPEN | IN_DISCUSSION | BOOKED | COMPLETED | CANCELLED
```

---

## Proposals Collection

Organizer proposals for events.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `eventId` | String (Ref: Event) | Yes | Associated event |
| `organizerId` | String (Ref: User) | Yes | Organizer submitting proposal |
| `status` | ProposalStatus | Yes | Proposal status (default: PENDING) |
| `coverLetter` | String | Yes | Introduction message (max 3000 chars) |
| `services` | Array[Object] | Yes | Service breakdown |
| `services[].name` | String | Yes | Service name |
| `services[].description` | String | Yes | Service description |
| `services[].cost` | Number | Yes | Service cost |
| `timeline` | Array[Object] | Yes | Project timeline |
| `timeline[].phase` | String | Yes | Phase name |
| `timeline[].duration` | String | Yes | Phase duration |
| `timeline[].description` | String | Yes | Phase description |
| `totalCost` | Number | Yes | Total proposal cost |
| `deliverables` | Array[String] | Yes | List of deliverables |
| `terms` | String | Yes | Terms and conditions (max 2000 chars) |
| `version` | Number | Yes | Proposal version (default: 1) |
| `previousVersionId` | ObjectId (Ref: Proposal) | No | Previous version reference |
| `validUntil` | Date | Yes | Proposal expiration date |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Indexes

```javascript
{ eventId: 1, organizerId: 1 }
{ organizerId: 1, status: 1 }
{ eventId: 1, status: 1, createdAt: -1 }
{ validUntil: 1 }
// Unique index: one active proposal per organizer per event
{ eventId: 1, organizerId: 1, status: 1 } (unique, partial filter)
```

### Proposal Status Enum

```
PENDING | ACCEPTED | REJECTED | WITHDRAWN | NEGOTIATING
```

---

## Messages & Conversations Collections

Real-time messaging between users.

### Conversations Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `participants` | Array[String] (Ref: User) | Yes | User IDs (exactly 2) |
| `eventId` | String (Ref: Event) | No | Associated event |
| `proposalId` | String (Ref: Proposal) | No | Associated proposal |
| `lastMessage` | String | No | Last message preview |
| `lastMessageAt` | Date | No | Last message timestamp |
| `createdAt` | Date | Auto | Conversation start timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Messages Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `conversationId` | String (Ref: Conversation) | Yes | Parent conversation |
| `senderId` | String (Ref: User) | Yes | Message sender |
| `receiverId` | String (Ref: User) | Yes | Message receiver |
| `content` | String | Yes | Message content (max 5000 chars) |
| `attachments` | Array[Object] | No | File attachments |
| `attachments[].name` | String | Yes | File name |
| `attachments[].url` | String | Yes | File URL |
| `attachments[].type` | String | Yes | MIME type |
| `isRead` | Boolean | Yes | Read status (default: false) |
| `readAt` | Date | No | Read timestamp |
| `createdAt` | Date | Auto | Message timestamp |

---

## Reviews Collection

User reviews and ratings.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `eventId` | String (Ref: Event) | Yes | Associated event |
| `reviewerId` | String (Ref: User) | Yes | User leaving review |
| `revieweeId` | String (Ref: User) | Yes | User being reviewed |
| `rating` | Number | Yes | Overall rating (1-5) |
| `comment` | String | Yes | Review text (10-2000 chars) |
| `categories.professionalism` | Number | Yes | Category rating (1-5) |
| `categories.communication` | Number | Yes | Category rating (1-5) |
| `categories.quality` | Number | Yes | Category rating (1-5) |
| `categories.value` | Number | Yes | Category rating (1-5) |
| `response.comment` | String | No | Reviewee response (max 1000 chars) |
| `response.createdAt` | Date | No | Response timestamp |
| `isPublic` | Boolean | Yes | Public visibility (default: true) |
| `createdAt` | Date | Auto | Review timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Indexes

```javascript
{ revieweeId: 1, isPublic: 1, createdAt: -1 }
{ eventId: 1, reviewerId: 1 }  // Unique (one review per user per event)
{ rating: -1 }
```

---

## Payments Collection

Payment transactions and milestones.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `eventId` | String (Ref: Event) | Yes | Associated event |
| `proposalId` | String (Ref: Proposal) | Yes | Associated proposal |
| `clientId` | String (Ref: User) | Yes | Client making payment |
| `organizerId` | String (Ref: User) | Yes | Organizer receiving payment |
| `amount` | Number | Yes | Total amount |
| `platformFee` | Number | Yes | Platform commission |
| `netAmount` | Number | Yes | Amount after fees |
| `currency` | String | Yes | Currency code (default: USD) |
| `status` | PaymentStatus | Yes | Payment status (default: PENDING) |
| `milestones` | Array[Object] | Yes | Payment milestones |
| `milestones[].title` | String | Yes | Milestone name |
| `milestones[].amount` | Number | Yes | Milestone amount |
| `milestones[].status` | MilestoneStatus | Yes | Milestone status |
| `milestones[].dueDate` | Date | Yes | Due date |
| `milestones[].paidAt` | Date | No | Payment timestamp |
| `milestones[].releasedAt` | Date | No | Release timestamp |
| `stripePaymentIntentId` | String | No | Stripe integration ID |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Payment Status Enum

```
PENDING | HELD | RELEASED | REFUNDED
```

### Milestone Status Enum

```
PENDING | PAID | IN_ESCROW | RELEASED | DISPUTED
```

---

## Notifications Collection

User notifications.

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | String (Ref: User) | Yes | Notification recipient |
| `type` | NotificationType | Yes | Notification type |
| `title` | String | Yes | Notification title (max 200 chars) |
| `message` | String | Yes | Notification message (max 500 chars) |
| `link` | String | No | Action link |
| `isRead` | Boolean | Yes | Read status (default: false) |
| `readAt` | Date | No | Read timestamp |
| `metadata` | Object | No | Additional data |
| `createdAt` | Date | Auto | Notification timestamp |

### Notification Types Enum

```
NEW_PROPOSAL | PROPOSAL_ACCEPTED | PROPOSAL_REJECTED | 
NEW_MESSAGE | PAYMENT_RECEIVED | PAYMENT_RELEASED | 
NEW_REVIEW | EVENT_UPDATE | SYSTEM_ALERT
```

### TTL Index

```javascript
{ createdAt: 1 } // Expires after 30 days
```

---

## Relationships Diagram

```
User (CLIENT) ──1:N──> Events ──1:N──> Proposals <──N:1── User (ORGANIZER)
     │                    │                               │
     │                    │                               │
     └──1:1──> OrganizerProfile (if ORGANIZER)           │
     │                    │                               │
     └──1:N──> Notifications                              │
     │                    │                               │
     └──N:N──> Conversations ──1:N──> Messages           │
     │                    │                               │
     └──1:N──> Reviews <──│───────────────────────────────┘
                          │
                          └──1:N──> Payments
```

---

## Performance Optimization Tips

1. **Always use indexed fields in queries**
2. **Limit returned fields** with projection
3. **Use lean()** for read-only operations
4. **Implement pagination** for large result sets
5. **Cache frequently accessed data** (Redis)
6. **Monitor slow queries** with MongoDB profiler

---

*For updates or questions: dev@venuly.com*
