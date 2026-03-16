'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to an error reporting service in the future
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-6 transition-colors duration-300">
      <div className="text-center max-w-lg">
        {/* Decorative icon */}
        <p className="font-serif text-[8rem] md:text-[12rem] leading-none font-bold text-primary/10 select-none">
          !
        </p>

        <div className="-mt-4">
          <span className="block text-[10px] font-bold tracking-[0.35em] uppercase text-primary mb-4">
            Something Went Wrong
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-text-light dark:text-text-dark font-bold leading-tight mb-4">
            An unexpected<br />
            <span className="font-light italic">error occurred.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-serif italic leading-relaxed mb-10">
            We&apos;re sorry for the inconvenience. You can try again or head back to the home page.
            {error?.digest && (
              <span className="block mt-2 text-[10px] font-mono text-gray-400">
                Error ID: {error.digest}
              </span>
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="group relative w-full sm:w-auto overflow-hidden bg-text-light dark:bg-white text-white dark:text-text-light px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
            >
              <span className="relative z-10">Try Again</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
