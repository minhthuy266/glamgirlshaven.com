"use client";

import React from 'react';

export default function TermsOfService() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 pb-24 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">Terms of Engagement</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light dark:text-white mb-8">Terms of Service</h1>
          <p className="text-gray-500 italic font-serif">Last Updated: March 2024</p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="font-serif text-2xl mb-6">Editorial Use</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              The content provided within GlamGirls Haven is for inspirational and educational purposes only. While we aim for clinical precision in our beauty reviews, our advice should not replace professional dermatological or medical guidance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-6">Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All visual assets, editorial narratives, and branding elements are the property of GlamGirls Haven unless otherwise noted. Reproducing our "Editor's Verdict" or curated collections without explicit permission constitutes a breach of these terms.
            </p>
          </section>

          <section className="pt-12 border-t border-border-light dark:border-border-dark">
            <p className="text-sm text-gray-500 italic">
              By continued use of this sanctuary, you agree to abide by these aesthetic and ethical standards.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
