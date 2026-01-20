import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  // Redirect to role-specific dashboard
  const role = session.user.role;
  
  if (role === 'CLIENT') {
    redirect('/dashboard/client');
  } else if (role === 'ORGANIZER') {
    redirect('/dashboard/organizer');
  } else if (role === 'ADMIN') {
    redirect('/dashboard/admin');
  }

  // Fallback
  redirect('/');
}
