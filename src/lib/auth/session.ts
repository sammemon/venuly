import { getServerSession } from 'next-auth';
import { authOptions } from './options';
import { UserRole } from '@/types';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return user;
}

export async function requireClient() {
  return requireRole([UserRole.CLIENT]);
}

export async function requireOrganizer() {
  return requireRole([UserRole.ORGANIZER]);
}

export async function requireAdmin() {
  return requireRole([UserRole.ADMIN]);
}
