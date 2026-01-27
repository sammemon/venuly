import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { connectDB } from '@/lib/db/connect';
import User from '@/models/User';
import Link from 'next/link';
import { Mail, User as UserIcon, MessageSquare } from 'lucide-react';

async function getUser(id: string) {
  try {
    await connectDB();
    const user = await User.findById(id).lean();
    if (!user) return null;
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export default async function PublicProfilePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const user = await getUser(params.id);
  if (!user) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center py-24">
      <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-10 border border-[var(--border)] shadow-soft max-w-lg w-full text-center">
        <div className="flex flex-col items-center mb-6">
          {user.avatar ? (
            <img src={user.avatar} alt={user.firstName} className="w-20 h-20 rounded-full object-cover border-2 border-[var(--primary)] mb-3" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-3xl mb-3">
              {user.firstName[0]}{user.lastName[0]}
            </div>
          )}
          <h1 className="text-2xl font-bold text-[var(--text)] mb-1">{user.firstName} {user.lastName}</h1>
          <p className="text-[var(--primary)] font-medium mb-2">{user.role.charAt(0) + user.role.slice(1).toLowerCase()}</p>
          <div className="flex items-center justify-center gap-2 text-[var(--muted)] text-sm">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
        </div>
        <Link href={`/messages/new?userId=${user._id}`}>
          <button className="w-full px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Message
          </button>
        </Link>
      </div>
    </div>
  );
}
