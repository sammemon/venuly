import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import Event from '@/models/Event';
import { getCurrentUser } from '@/lib/auth/session';
import { updateEventSchema } from '@/lib/validation/schemas';
import { EventStatus } from '@/types';

// GET single event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const event = await Event.findById(params.id)
      .populate('clientId', 'firstName lastName avatar email')
      .populate('proposals')
      .lean();

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Increment view count
    await Event.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    return NextResponse.json({ event });
  } catch (error: any) {
    console.error('Get event error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PATCH update event
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateEventSchema.parse(body);

    await connectDB();

    const event = await Event.findById(params.id);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (event.clientId.toString() !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updateData: any = { ...validatedData };
    
    if (validatedData.eventDate) {
      updateData.eventDate = {
        start: new Date(validatedData.eventDate.start),
        end: new Date(validatedData.eventDate.end),
      };
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error: any) {
    console.error('Update event error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE event
export async function DELETE(
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

    if (event.status === EventStatus.BOOKED || event.status === EventStatus.COMPLETED) {
      return NextResponse.json(
        { error: 'Cannot delete booked or completed events' },
        { status: 400 }
      );
    }

    await Event.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    console.error('Delete event error:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
