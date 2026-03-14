import type { Metadata } from 'next';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { CookieBanner } from '@/src/components/layout/CookieBanner';
import { ThemeProvider } from '@/src/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'GlamGirls Haven',
  description: 'Your ultimate destination for beauty, skincare, and wellness.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
