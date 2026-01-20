import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import OrganizerProfile from '@/models/OrganizerProfile';
import { requireOrganizer } from '@/lib/auth/session';
import { createOrganizerProfileSchema, updateOrganizerProfileSchema } from '@/lib/validation/schemas';

// GET organizer profile (current user)
export async function GET(request: NextRequest) {
  try {
    const user = await requireOrganizer();
    await connectDB();

    const profile = await OrganizerProfile.findOne({ userId: user.id })
      .populate('userId', 'firstName lastName email avatar')
      .lean();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    console.error('Get profile error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// POST create organizer profile
export async function POST(request: NextRequest) {
  try {
    const user = await requireOrganizer();
    const body = await request.json();
    const validatedData = createOrganizerProfileSchema.parse(body);

    await connectDB();

    // Check if profile already exists
    const existingProfile = await OrganizerProfile.findOne({ userId: user.id });
    if (existingProfile) {
      return NextResponse.json(
        { error: 'Profile already exists' },
        { status: 400 }
      );
    }

    const profile = await OrganizerProfile.create({
      ...validatedData,
      userId: user.id,
    });

    return NextResponse.json(
      { message: 'Profile created successfully', profile },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create profile error:', error);

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
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

// PATCH update organizer profile
export async function PATCH(request: NextRequest) {
  try {
    const user = await requireOrganizer();
    const body = await request.json();
    const validatedData = updateOrganizerProfileSchema.parse(body);

    await connectDB();

    const profile = await OrganizerProfile.findOneAndUpdate(
      { userId: user.id },
      validatedData,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);

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
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
