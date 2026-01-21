import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import Event from '@/models/Event';
import { requireClient } from '@/lib/auth/session';
import { createEventSchema } from '@/lib/validation/schemas';
import { EventStatus } from '@/types';

// GET all events (with filters)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = { isPublished: true, status: EventStatus.OPEN };

    if (searchParams.get('eventType')) {
      filter.eventType = searchParams.get('eventType');
    }

    if (searchParams.get('city')) {
      filter['location.city'] = { $regex: searchParams.get('city'), $options: 'i' };
    }

    if (searchParams.get('state')) {
      filter['location.state'] = { $regex: searchParams.get('state'), $options: 'i' };
    }

    if (searchParams.get('minBudget') || searchParams.get('maxBudget')) {
      filter['budget.min'] = {};
      if (searchParams.get('minBudget')) {
        filter['budget.min'].$gte = parseInt(searchParams.get('minBudget')!);
      }
      if (searchParams.get('maxBudget')) {
        filter['budget.max'].$lte = parseInt(searchParams.get('maxBudget')!);
      }
    }

    if (searchParams.get('search')) {
      filter.$text = { $search: searchParams.get('search') };
    }

    // Sort options
    let sort: any = { publishedAt: -1 };
    const sortParam = searchParams.get('sort');
    if (sortParam === 'oldest') sort = { publishedAt: 1 };
    if (sortParam === 'budget-low') sort = { 'budget.min': 1 };
    if (sortParam === 'budget-high') sort = { 'budget.max': -1 };

    const [events, total] = await Promise.all([
      Event.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('clientId', 'firstName lastName avatar')
        .lean(),
      Event.countDocuments(filter),
    ]);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get events error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    const user = await requireClient();
    const body = await request.json();
    const validatedData = createEventSchema.parse(body);

    await connectDB();

    const event = await Event.create({
      ...validatedData,
      clientId: user.id,
      eventDate: {
        start: new Date(validatedData.eventDate.start),
        end: new Date(validatedData.eventDate.end),
      },
      status: EventStatus.OPEN,
      isPublished: true,
      publishedAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Event created successfully', event },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create event error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (error.message.includes('Forbidden')) {
      return NextResponse.json({ error: 'Only clients can create events' }, { status: 403 });
    }

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
