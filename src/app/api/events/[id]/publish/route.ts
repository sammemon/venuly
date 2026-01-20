import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import Event from '@/models/Event';
import { getCurrentUser } from '@/lib/auth/session';
import { EventStatus } from '@/types';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const event = await Event.findById(params.id);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (event.clientId.toString() !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (event.isPublished) {
      return NextResponse.json(
        { error: 'Event is already published' },
        { status: 400 }
      );
    }

    event.isPublished = true;
    event.status = EventStatus.OPEN;
    event.publishedAt = new Date();
    await event.save();

    return NextResponse.json({
      message: 'Event published successfully',
      event,
    });
  } catch (error: any) {
    console.error('Publish event error:', error);
    return NextResponse.json(
      { error: 'Failed to publish event' },
      { status: 500 }
    );
  }
}
