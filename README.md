# Venuly - Event Organizing Marketplace Platform

A production-ready, two-sided marketplace platform for event organizing and venue management, inspired by Upwork's architecture.

## 🎯 Overview

Venuly connects event hosts (clients) with professional event organizers and vendors through a sophisticated marketplace platform with proposals, real-time communication, and secure payment handling.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth with JWT
- **Real-time**: Socket.io
- **Validation**: Zod
- **State Management**: React Context + Server Components

### Design System

- **Primary Background**: #FAF3E1
- **Secondary Background**: #F5E7C6
- **Accent/CTA**: #FA8112
- **Text/Dark UI**: #222222

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your credentials

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
venuly/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth group routes
│   │   ├── (client)/          # Client dashboard routes
│   │   ├── (organizer)/       # Organizer dashboard routes
│   │   ├── (admin)/           # Admin panel routes
│   │   ├── api/               # API routes
│   │   └── marketplace/       # Public marketplace
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── features/         # Feature-specific components
│   ├── lib/                   # Utility libraries
│   │   ├── db/               # Database connection
│   │   ├── auth/             # Auth utilities
│   │   └── validation/       # Zod schemas
│   ├── models/                # Mongoose models
│   ├── types/                 # TypeScript types
│   └── utils/                 # Helper functions
├── public/                    # Static assets
└── docs/                      # Documentation

```

## 🔑 Key Features

### For Clients (Event Hosts)
- Post event requirements with detailed specifications
- Receive and compare proposals from organizers
- Real-time chat with organizers
- Secure milestone-based payments
- Review and rate organizers

### For Organizers (Service Providers)
- Browse marketplace listings
- Submit customized proposals
- Manage professional profile and portfolio
- Track availability calendar
- Build reputation through reviews

### Platform Features
- Advanced search and filtering
- Real-time notifications
- Admin dashboard for moderation
- Escrow-style payment system
- Review and rating system
- Dispute resolution

## 📊 Database Collections

- **users**: User accounts and roles
- **events**: Event postings
- **proposals**: Organizer bids
- **messages**: Real-time chat
- **reviews**: Ratings and feedback
- **payments**: Transaction records
- **notifications**: User notifications

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Input validation with Zod
- CSRF protection
- Secure password hashing with bcrypt
- Rate limiting on API routes

## 🎨 UI/UX Philosophy

- Clean, luxury event aesthetic
- Mobile-first responsive design
- Intuitive Upwork-like workflows
- Soft shadows and rounded elements
- Professional SaaS layout

## 📈 Scalability Considerations

- Modular feature-based architecture
- Database indexing for performance
- API route optimization
- Image optimization with Next.js
- CDN-ready static assets
- Horizontal scaling support

## 🧪 Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

Proprietary - All Rights Reserved

## 👥 Support

For questions and support, contact: support@venuly.com
