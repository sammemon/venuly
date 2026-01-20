import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@/types';

export async function authMiddleware(
  request: NextRequest,
  requiredRoles?: UserRole[]
) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (requiredRoles && !requiredRoles.includes(token.role as UserRole)) {
    return NextResponse.json(
      { error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    );
  }

  return null; // Continue to handler
}

export function createAuthMiddleware(requiredRoles?: UserRole[]) {
  return async (request: NextRequest) => {
    const authError = await authMiddleware(request, requiredRoles);
    if (authError) {
      return authError;
    }
  };
}
