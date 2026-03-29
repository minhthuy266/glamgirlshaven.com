import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Manrope, Tenor_Sans } from 'next/font/google';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
// import { CookieBanner } from '@/src/components/layout/CookieBanner';
import { ThemeProvider } from '@/src/components/theme-provider';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tenor-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
};

export const metadata: Metadata = {
  title: 'GlamGirls Haven',
  description: 'Your ultimate destination for beauty, skincare, and wellness.',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/icon.png',
    shortcut: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${tenorSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.glamgirlshaven.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://api.glamgirlshaven.com" />
      </head>
      <body className="font-sans antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
{/* <CookieBanner /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
