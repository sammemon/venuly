import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth/session';

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { avatarUrl } = await request.json();

    if (!avatarUrl) {
      return NextResponse.json({ error: 'avatarUrl is required' }, { status: 400 });
    }

    await connectDB();

    const updated = await User.findByIdAndUpdate(
      user.id,
      { avatar: avatarUrl },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Avatar updated', avatar: updated.avatar });
  } catch (error: any) {
    console.error('Update avatar error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Failed to update avatar' }, { status: 500 });
  }
}
