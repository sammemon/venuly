import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';
import { registerSchema } from '@/lib/validation/schemas';
import { UserRole } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      email: validatedData.email,
      password: validatedData.password,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      role: validatedData.role,
    });

    // Remove password from response
    const userResponse = user.toJSON();

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
