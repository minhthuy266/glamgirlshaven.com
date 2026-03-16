import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | GlamGirls Haven',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-6 transition-colors duration-300">
      <div className="text-center max-w-lg">
        {/* Decorative number */}
        <p className="font-serif text-[10rem] md:text-[14rem] leading-none font-bold text-primary/10 select-none">
          404
        </p>

        <div className="-mt-6 md:-mt-10">
          <span className="block text-[10px] font-bold tracking-[0.35em] uppercase text-primary mb-4">
            Page Not Found
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-text-light dark:text-text-dark font-bold leading-tight mb-4">
            This page has left<br />
            <span className="font-light italic">the building.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-serif italic leading-relaxed mb-10">
            The page you&apos;re looking for may have been moved, renamed, or removed.
            Let&apos;s get you back to something beautiful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group relative w-full sm:w-auto overflow-hidden bg-text-light dark:bg-white text-white dark:text-text-light px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
            >
              <span className="relative z-10">Back to Home</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              href="/category/all"
              className="w-full sm:w-auto bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
