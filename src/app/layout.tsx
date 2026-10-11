import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { CommandPalette } from '@/components/CommandPalette';
import { ToastContainer } from '@/components/ToastContainer';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CHC Jhaknawda – Pediatric Drug Quick-Reference',
  description:
    'Fast access to pediatric dose, stock and safety information. Verified clinical reference for Community Health Centre Jhaknawda.',
  applicationName: 'CHC Jhaknawda Pediatric Ref',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CHC Pediatric Ref',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>

      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        <AppProvider>
          <Navbar />

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>

          <Footer />
          <BottomNav />
          <CommandPalette />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}