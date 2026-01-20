# API Documentation - Venuly

## Base URL
```
Development: http://localhost:3000/api
Production: https://venuly.com/api
```

## Authentication

All protected endpoints require a valid JWT token in the request headers or cookies (managed by NextAuth).

### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CLIENT" // or "ORGANIZER"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CLIENT"
  }
}
```

---

### Events

#### List Events (Public)
```http
GET /events?page=1&limit=20&eventType=WEDDING&city=New York
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `eventType` (string): Filter by event type
- `city` (string): Filter by city
- `state` (string): Filter by state
- `minBudget` (number): Minimum budget
- `maxBudget` (number): Maximum budget
- `search` (string): Search term
- `sort` (string): `newest` | `oldest` | `budget-low` | `budget-high`

**Response:** `200 OK`
```json
{
  "events": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### Create Event
```http
POST /events
```
**Auth Required:** CLIENT

**Request Body:**
```json
{
  "title": "Elegant Summer Wedding",
  "description": "Looking for a professional wedding planner...",
  "eventType": "WEDDING",
  "location": {
    "city": "Los Angeles",
    "state": "California",
    "country": "USA",
    "venue": "Preferred outdoor venue"
  },
  "eventDate": {
    "start": "2026-08-15T14:00:00Z",
    "end": "2026-08-15T23:00:00Z"
  },
  "guestCount": {
    "min": 150,
    "max": 200
  },
  "budget": {
    "min": 25000,
    "max": 35000,
    "currency": "USD"
  },
  "requirements": {
    "venueType": "Outdoor garden",
    "services": ["Catering", "Photography", "Decor", "Music"],
    "additionalNotes": "Prefer eco-friendly options"
  }
}
```

**Response:** `201 Created`
```json
{
  "message": "Event created successfully",
  "event": { ... }
}
```

#### Get Event Details
```http
GET /events/:id
```

**Response:** `200 OK`
```json
{
  "event": {
    "_id": "...",
    "title": "...",
    "description": "...",
    "clientId": {
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "..."
    },
    "proposals": [...],
    ...
  }
}
```

#### Update Event
```http
PATCH /events/:id
```
**Auth Required:** CLIENT (owner only)

**Request Body:** (partial update)
```json
{
  "title": "Updated title",
  "budget": {
    "min": 30000,
    "max": 40000
  }
}
```

#### Publish Event
```http
POST /events/:id/publish
```
**Auth Required:** CLIENT (owner only)

**Response:** `200 OK`
```json
{
  "message": "Event published successfully",
  "event": { ... }
}
```

#### Delete Event
```http
DELETE /events/:id
```
**Auth Required:** CLIENT (owner only)

---

### Proposals

#### Submit Proposal
```http
POST /proposals
```
**Auth Required:** ORGANIZER

**Request Body:**
```json
{
  "eventId": "...",
  "coverLetter": "Dear Client, I am excited to...",
  "services": [
    {
      "name": "Venue Coordination",
      "description": "Complete venue setup and coordination",
      "cost": 5000
    },
    {
      "name": "Catering Management",
      "description": "Full catering service coordination",
      "cost": 8000
    }
  ],
  "timeline": [
    {
      "phase": "Planning & Design",
      "duration": "4 weeks",
      "description": "Initial consultations and design concepts"
    },
    {
      "phase": "Execution",
      "duration": "Event day + 1 day setup",
      "description": "Full event execution and coordination"
    }
  ],
  "deliverables": [
    "Complete event coordination",
    "Vendor management",
    "Day-of coordination",
    "Post-event wrap-up"
  ],
  "terms": "50% deposit required, remainder on event completion...",
  "validUntil": "2026-07-01T00:00:00Z"
}
```

**Response:** `201 Created`
```json
{
  "message": "Proposal submitted successfully",
  "proposal": {
    "_id": "...",
    "totalCost": 13000,
    ...
  }
}
```

#### Accept Proposal
```http
POST /proposals/:id/accept
```
**Auth Required:** CLIENT

#### Reject Proposal
```http
POST /proposals/:id/reject
```
**Auth Required:** CLIENT

---

### Organizer Profiles

#### List Organizers
```http
GET /organizers?specializations=WEDDING&city=New York&minRating=4
```

**Query Parameters:**
- `specializations` (array): Event types
- `city`, `state`, `country` (string): Location filters
- `minBudget`, `maxBudget` (number): Budget range
- `minRating` (number): Minimum rating (0-5)
- `verified` (boolean): Only verified organizers
- `search` (string): Search term
- `page`, `limit`: Pagination

**Response:** `200 OK`
```json
{
  "organizers": [...],
  "pagination": { ... }
}
```

#### Get Organizer Profile
```http
GET /organizers/:id
```

**Response:** `200 OK`
```json
{
  "organizer": {
    "_id": "...",
    "userId": { ... },
    "businessName": "Elite Events Co.",
    "bio": "...",
    "portfolio": [...],
    "stats": {
      "totalEvents": 145,
      "averageRating": 4.8,
      "totalReviews": 89,
      "completionRate": 98
    },
    ...
  }
}
```

#### Create/Update Organizer Profile
```http
POST /organizers/profile
PATCH /organizers/profile
```
**Auth Required:** ORGANIZER

---

### Messages

#### List Conversations
```http
GET /conversations
```
**Auth Required:** Any authenticated user

**Response:** `200 OK`
```json
{
  "conversations": [
    {
      "_id": "...",
      "participants": [...],
      "eventId": "...",
      "lastMessage": "Looking forward to working with you!",
      "lastMessageAt": "2026-06-15T10:30:00Z"
    }
  ]
}
```

#### Get Messages
```http
GET /conversations/:id/messages?page=1&limit=50
```

#### Send Message
```http
POST /conversations/:id/messages
```

**Request Body:**
```json
{
  "content": "Hello! I have some questions about...",
  "attachments": [
    {
      "name": "venue_image.jpg",
      "url": "https://...",
      "type": "image/jpeg"
    }
  ]
}
```

---

### Reviews

#### Get Organizer Reviews
```http
GET /reviews/organizer/:id?page=1&limit=10
```

#### Create Review
```http
POST /reviews
```
**Auth Required:** CLIENT

**Request Body:**
```json
{
  "eventId": "...",
  "revieweeId": "...",
  "rating": 5,
  "comment": "Absolutely fantastic service! Highly recommend...",
  "categories": {
    "professionalism": 5,
    "communication": 5,
    "quality": 5,
    "value": 4
  }
}
```

#### Respond to Review
```http
POST /reviews/:id/respond
```
**Auth Required:** ORGANIZER (reviewee only)

---

### Payments

#### Create Payment Intent
```http
POST /payments/create-intent
```
**Auth Required:** CLIENT

**Request Body:**
```json
{
  "proposalId": "...",
  "milestones": [
    {
      "title": "Deposit (50%)",
      "amount": 6500,
      "dueDate": "2026-07-01T00:00:00Z"
    },
    {
      "title": "Final Payment",
      "amount": 6500,
      "dueDate": "2026-08-15T00:00:00Z"
    }
  ]
}
```

#### Release Milestone Payment
```http
POST /payments/:paymentId/milestones/:milestoneId/release
```
**Auth Required:** CLIENT

---

### Admin

#### Get Platform Statistics
```http
GET /admin/stats
```
**Auth Required:** ADMIN

**Response:** `200 OK`
```json
{
  "totalUsers": 15234,
  "totalEvents": 8976,
  "totalOrganizers": 3421,
  "totalRevenue": 2456789,
  "monthlyGrowth": {
    "users": 12.5,
    "events": 8.3,
    "revenue": 15.7
  }
}
```

#### Verify Organizer
```http
PATCH /admin/users/:id/verify
```
**Auth Required:** ADMIN

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden: Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour
- **API rate limit headers** included in response

---

## WebSocket Events (Real-time)

### Connection
```javascript
const socket = io('wss://venuly.com', {
  auth: { token: '<JWT_TOKEN>' }
});
```

### Events
- `message:new` - New message received
- `message:read` - Message marked as read
- `proposal:new` - New proposal received
- `proposal:accepted` - Proposal accepted
- `notification:new` - New notification
- `user:online` - User came online
- `user:offline` - User went offline
- `typing:start` - User started typing
- `typing:stop` - User stopped typing

---

*Last Updated: January 2026*
