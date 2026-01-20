import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import Review from '@/models/Review';
import { requireAuth } from '@/lib/auth/session';
import { createReviewSchema } from '@/lib/validation/schemas';
import Event from '@/models/Event';
import OrganizerProfile from '@/models/OrganizerProfile';
import { EventStatus, UserRole } from '@/types';

// GET reviews for a reviewee (organizer or client)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const revieweeId = searchParams.get('revieweeId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!revieweeId) {
      return NextResponse.json(
        { error: 'revieweeId is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const filter: any = { revieweeId, isPublic: true };

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('reviewerId', 'firstName lastName avatar')
        .populate('eventId', 'title eventType')
        .lean(),
      Review.countDocuments(filter),
    ]);

    // Calculate average ratings
    const avgRatings = await Review.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          avgProfessionalism: { $avg: '$categories.professionalism' },
          avgCommunication: { $avg: '$categories.communication' },
          avgQuality: { $avg: '$categories.quality' },
          avgValue: { $avg: '$categories.value' },
        },
      },
    ]);

    return NextResponse.json({
      reviews,
      averages: avgRatings[0] || {},
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST create review
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validatedData = createReviewSchema.parse(body);

    await connectDB();

    // Verify the event exists and is completed
    const event = await Event.findById(validatedData.eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (event.status !== EventStatus.COMPLETED) {
      return NextResponse.json(
        { error: 'Can only review completed events' },
        { status: 400 }
      );
    }

    // Verify user is part of the event
    const isClient = event.clientId.toString() === user.id;
    const isOrganizer = validatedData.revieweeId === user.id;

    if (!isClient && !isOrganizer) {
      return NextResponse.json(
        { error: 'You are not authorized to review this event' },
        { status: 403 }
      );
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      eventId: validatedData.eventId,
      reviewerId: user.id,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this event' },
        { status: 400 }
      );
    }

    const review = await Review.create({
      ...validatedData,
      reviewerId: user.id,
    });

    // Update organizer stats if reviewing an organizer
    if (user.role === UserRole.CLIENT) {
      await updateOrganizerStats(validatedData.revieweeId);
    }

    return NextResponse.json(
      { message: 'Review created successfully', review },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create review error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

async function updateOrganizerStats(organizerId: string) {
  const reviews = await Review.find({ revieweeId: organizerId, isPublic: true });
  
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  await OrganizerProfile.findOneAndUpdate(
    { userId: organizerId },
    {
      'stats.totalReviews': totalReviews,
      'stats.averageRating': Math.round(averageRating * 10) / 10,
    }
  );
}
