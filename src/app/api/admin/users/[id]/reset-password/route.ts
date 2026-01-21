import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get request body
    const { newPassword } = await request.json();
    
    if (!newPassword || newPassword.trim().length < 8) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Connect to database
    await connectDB();

    // Find and update user
    const user = await User.findById(params.id);
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Set new password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Password reset successfully' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error resetting password:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to reset password' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
