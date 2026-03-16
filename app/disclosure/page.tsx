"use client";

import React from 'react';

export default function AffiliateDisclosure() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 pb-24 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">Commercial Transparency</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light dark:text-white mb-8">Affiliate Disclosure</h1>
          <p className="text-gray-500 italic font-serif">Last Updated: March 2024</p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="font-serif text-2xl mb-6">Our Relationship with Commerce</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              GlamGirls Haven is reader-supported. We participate in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-6">Editorial Integrity</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you click on a link and make a purchase, we may receive a small commission at no extra cost to you. This support allows us to maintain our clinical trials, hire expert editors, and keep the journal free of intrusive banner ads. We only recommend products we have physically tested and found to meet our rigorous standards.
            </p>
          </section>

          <section className="pt-12 border-t border-border-light dark:border-border-dark">
            <p className="text-sm text-gray-500 italic">
              Your trust is our most valuable asset. Thank you for supporting our work.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
