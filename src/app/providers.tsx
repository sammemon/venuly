'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/lib/theme-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFF',
              color: '#222222',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              iconTheme: {
                primary: '#2563EB',
                secondary: '#FFF',
              },
            },
          }}
        />
      </SessionProvider>
    </ThemeProvider>
  );
}
