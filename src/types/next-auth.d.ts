import 'next-auth';
import { UserRole } from '@/types';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    avatar?: string;
    isEmailVerified: boolean;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    avatar?: string;
    isEmailVerified: boolean;
  }
}
