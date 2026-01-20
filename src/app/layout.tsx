import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Venuly - Event Organizing Marketplace',
  description: 'Connect with professional event organizers for your perfect event',
  keywords: ['event planning', 'event organizer', 'venue', 'marketplace', 'wedding', 'corporate events'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
