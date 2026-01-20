import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import Notification from '@/models/Notification';
import { requireAuth } from '@/lib/auth/session';

// GET user notifications
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    await connectDB();

    const filter: any = { userId: user.id };
    if (unreadOnly) {
      filter.isRead = false;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments(filter),
      Notification.countDocuments({ userId: user.id, isRead: false }),
    ]);

    return NextResponse.json({
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get notifications error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// PATCH mark notification(s) as read
export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { notificationIds, markAllAsRead } = body;

    await connectDB();

    if (markAllAsRead) {
      await Notification.updateMany(
        { userId: user.id, isRead: false },
        { isRead: true, readAt: new Date() }
      );

      return NextResponse.json({
        message: 'All notifications marked as read',
      });
    }

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: 'notificationIds array is required' },
        { status: 400 }
      );
    }

    await Notification.updateMany(
      { _id: { $in: notificationIds }, userId: user.id },
      { isRead: true, readAt: new Date() }
    );

    return NextResponse.json({
      message: 'Notifications marked as read',
    });
  } catch (error: any) {
    console.error('Update notifications error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Failed to update notifications' },
      { status: 500 }
    );
  }
}

// DELETE notification(s)
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth();
    const searchParams = request.nextUrl.searchParams;
    const notificationId = searchParams.get('id');

    await connectDB();

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    const result = await Notification.findOneAndDelete({
      _id: notificationId,
      userId: user.id,
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Notification deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete notification error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}
