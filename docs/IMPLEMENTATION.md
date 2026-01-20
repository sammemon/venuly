# Venuly - Implementation Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB 6+ (local or Atlas)
- Git
- Code editor (VS Code recommended)

### Step 1: Clone and Install

```bash
# Navigate to project directory
cd venuly

# Install dependencies
npm install
```

### Step 2: Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/venuly
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/venuly

# Authentication
NEXTAUTH_SECRET=generate-a-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Email (Optional for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Stripe (Optional for development)
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key

# Cloudinary (Optional for development)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Platform Settings
PLATFORM_COMMISSION_RATE=0.15
```

### Step 3: Generate Auth Secret

```bash
# Generate a secure random string for NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 4: Start MongoDB

**Local MongoDB:**
```bash
mongod --dbpath /path/to/data/directory
```

**MongoDB Atlas:**
- Create a free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Get connection string and update `MONGODB_URI`

### Step 5: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📦 Project Structure Explained

```
venuly/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── signin/          # Sign in page
│   │   │   └── signup/          # Sign up page
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   ├── events/          # Event CRUD
│   │   │   ├── proposals/       # Proposal system
│   │   │   ├── reviews/         # Review system
│   │   │   └── notifications/   # Notifications
│   │   ├── marketplace/         # Public marketplace
│   │   ├── dashboard/           # User dashboard
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── providers.tsx        # Context providers
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   └── ui/                  # Reusable components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── auth/                # Auth utilities
│   │   │   ├── options.ts       # NextAuth config
│   │   │   ├── session.ts       # Session helpers
│   │   │   └── middleware.ts    # Auth middleware
│   │   ├── db/                  # Database
│   │   │   └── connect.ts       # MongoDB connection
│   │   └── validation/          # Zod schemas
│   │       └── schemas.ts
│   ├── models/                  # Mongoose models
│   │   ├── User.ts
│   │   ├── Event.ts
│   │   ├── Proposal.ts
│   │   └── ...
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   └── utils/                   # Helper functions
│       └── helpers.ts
├── public/                      # Static assets
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md
│   └── API.md
├── .env.example                 # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 🔨 Development Workflow

### 1. Creating a New Feature

**Example: Adding a "Favorites" feature**

1. **Create Model** (`src/models/Favorite.ts`):
```typescript
import mongoose, { Schema, Model } from 'mongoose';

interface IFavorite {
  userId: string;
  eventId: string;
  createdAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>({
  userId: { type: String, required: true, ref: 'User' },
  eventId: { type: String, required: true, ref: 'Event' },
}, { timestamps: true });

FavoriteSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.models.Favorite || 
  mongoose.model<IFavorite>('Favorite', FavoriteSchema);
```

2. **Create API Route** (`src/app/api/favorites/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import Favorite from '@/models/Favorite';
import { requireAuth } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  const user = await requireAuth();
  const { eventId } = await request.json();
  
  await connectDB();
  const favorite = await Favorite.create({ userId: user.id, eventId });
  
  return NextResponse.json({ favorite }, { status: 201 });
}
```

3. **Create UI Component** (`src/components/features/FavoriteButton.tsx`):
```typescript
'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui';

export function FavoriteButton({ eventId }: { eventId: string }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = async () => {
    const response = await fetch('/api/favorites', {
      method: isFavorited ? 'DELETE' : 'POST',
      body: JSON.stringify({ eventId }),
    });
    
    if (response.ok) {
      setIsFavorited(!isFavorited);
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={toggleFavorite}
      icon={<Heart fill={isFavorited ? 'currentColor' : 'none'} />}
    >
      {isFavorited ? 'Favorited' : 'Favorite'}
    </Button>
  );
}
```

### 2. Database Seeding

Create `scripts/seed.ts`:

```typescript
import { connectDB } from '../src/lib/db/connect';
import User from '../src/models/User';
import Event from '../src/models/Event';
import { UserRole, EventType, EventStatus } from '../src/types';

async function seed() {
  await connectDB();

  // Create sample client
  const client = await User.create({
    email: 'client@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.CLIENT,
  });

  // Create sample event
  await Event.create({
    clientId: client._id,
    title: 'Summer Wedding Celebration',
    description: 'Looking for an experienced wedding planner...',
    eventType: EventType.WEDDING,
    status: EventStatus.OPEN,
    location: {
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
    },
    eventDate: {
      start: new Date('2026-08-15'),
      end: new Date('2026-08-15'),
    },
    guestCount: { min: 150, max: 200 },
    budget: { min: 25000, max: 35000, currency: 'USD' },
    requirements: {
      services: ['Catering', 'Photography', 'Decor'],
    },
    isPublished: true,
    publishedAt: new Date(),
  });

  console.log('✅ Database seeded successfully');
  process.exit(0);
}

seed().catch(console.error);
```

Run: `npx ts-node scripts/seed.ts`

### 3. Testing API Endpoints

Use tools like:
- **Postman**: Import API collection
- **Thunder Client**: VS Code extension
- **curl**: Command line

Example:
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "CLIENT"
  }'

# Get events
curl http://localhost:3000/api/events?page=1&limit=10
```

---

## 🎨 Customizing the Design

### Updating Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    bg: '#YOUR_COLOR',      // Primary background
    light: '#YOUR_COLOR',
    DEFAULT: '#YOUR_COLOR',
    dark: '#YOUR_COLOR',
  },
  accent: '#YOUR_COLOR',    // Call-to-action buttons
  dark: '#YOUR_COLOR',      // Text color
}
```

### Adding New UI Components

Follow the existing pattern in `src/components/ui/`:

```typescript
// src/components/ui/Chip.tsx
import * as React from 'react';
import { cn } from '@/utils/helpers';

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  onDelete?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, onDelete, className, ...props }) => {
  return (
    <div 
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm',
        'bg-secondary-bg text-dark',
        className
      )}
      {...props}
    >
      <span>{label}</span>
      {onDelete && (
        <button onClick={onDelete} className="ml-2">×</button>
      )}
    </div>
  );
};
```

---

## 🔌 Adding Integrations

### Stripe Payment Integration

1. Install Stripe:
```bash
npm install stripe @stripe/stripe-js
```

2. Create Stripe instance (`src/lib/stripe.ts`):
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
```

3. Create payment endpoint:
```typescript
// src/app/api/payments/create-intent/route.ts
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const { amount } = await request.json();
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
  });
  
  return Response.json({ clientSecret: paymentIntent.client_secret });
}
```

### Email Notifications

1. Install Nodemailer:
```bash
npm install nodemailer
```

2. Create email utility (`src/lib/email.ts`):
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/venuly.git
git push -u origin main
```

2. **Deploy to Vercel**:
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables
- Deploy

3. **Set Environment Variables** in Vercel dashboard

### Alternative: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t venuly .
docker run -p 3000:3000 venuly
```

---

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Create `src/components/ui/__tests__/Button.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### API Tests

Use Postman collections or write integration tests with supertest.

---

## 📊 Monitoring & Analytics

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

Initialize in `src/app/layout.tsx`.

### Analytics (Vercel Analytics)

```bash
npm install @vercel/analytics
```

Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🎓 Learning Resources

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **MongoDB**: [mongodb.com/docs](https://mongodb.com/docs)
- **NextAuth**: [next-auth.js.org](https://next-auth.js.org)
- **TypeScript**: [typescriptlang.org/docs](https://typescriptlang.org/docs)

---

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB is running
- Ensure network access in MongoDB Atlas

### NextAuth Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies

### Build Errors
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

**Need Help?** Open an issue or contact support@venuly.com
