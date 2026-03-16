"use client";

import React from 'react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 pb-24 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">Information Governance</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light dark:text-white mb-8">Privacy Policy</h1>
          <p className="text-gray-500 italic font-serif">Last Updated: March 2024</p>
        </header>

        <article className="prose prose-stone dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="font-serif text-2xl mb-6">Editorial Transparency</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              At GlamGirls Haven, we honor the sanctuary of your personal space. Our collection of data is limited to what is essential for delivering our curated editorial experiences. We do not sell your personal narratives or interaction data to third-party brokers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-6">Data Acquisition</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We collect information that you provide directly to us through our newsletter subscription, contact forms, and account creation. This may include your name, email address, and any preferences articulated within your profile.
            </p>
          </section>
          
          <section>
             <h2 className="font-serif text-2xl mb-6">Analytical Insight</h2>
             <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
               To refine our aesthetic and editorial direction, we use cookies and similar technologies to track how our journal is read. This helps us understand which stories resonate most with the glamorous girl community.
             </p>
          </section>

          <section className="pt-12 border-t border-border-light dark:border-border-dark">
            <p className="text-sm text-gray-500 italic">
              Questions regarding our privacy protocol should be directed to <a href="mailto:privacy@glamgirlshaven.com" className="text-primary hover:underline">privacy@glamgirlshaven.com</a>.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
