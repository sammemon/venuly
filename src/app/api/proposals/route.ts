import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import Proposal from '@/models/Proposal';
import Event from '@/models/Event';
import { requireOrganizer } from '@/lib/auth/session';
import { createProposalSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const user = await requireOrganizer();
    const body = await request.json();
    const validatedData = createProposalSchema.parse(body);

    await connectDB();

    // Check if event exists and is open
    const event = await Event.findById(validatedData.eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isPublished) {
      return NextResponse.json({ error: 'Event is not published' }, { status: 400 });
    }

    // Calculate total cost
    const totalCost = validatedData.services.reduce((sum, service) => sum + service.cost, 0);

    const proposal = await Proposal.create({
      ...validatedData,
      organizerId: user.id,
      totalCost,
      validUntil: new Date(validatedData.validUntil),
    });

    // Add proposal to event
    await Event.findByIdAndUpdate(validatedData.eventId, {
      $push: { proposals: proposal._id },
    });

    return NextResponse.json(
      { message: 'Proposal submitted successfully', proposal },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create proposal error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: 'Only organizers can submit proposals' },
        { status: 403 }
      );
    }

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'You already have an active proposal for this event' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit proposal' },
      { status: 500 }
    );
  }
}
