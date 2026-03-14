"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Mail, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300">
      {/* Editorial Header */}
      <header className="pt-32 pb-16 md:pt-48 md:pb-24 bg-white dark:bg-gray-900 border-b border-border-light dark:border-border-dark text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6 block"
          >
            Since 2024
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-text-light dark:text-white mb-8 tracking-tight"
          >
            Beauty with <span className="text-primary italic font-medium">Intention.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 font-serif italic max-w-2xl mx-auto leading-relaxed"
          >
            GlamGirls Haven is a curated editorial destination dedicated to clean skincare, luxury beauty, and ethical self-care rituals.
          </motion.p>
        </div>
      </header>

      <section className="container mx-auto px-6 max-w-7xl py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-sm overflow-hidden bg-stone-100 shadow-2xl order-2 lg:order-1"
          >
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" 
              alt="Editor in Chief" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Founder & Editor-in-Chief</p>
              <h3 className="font-serif text-2xl">Sophia Sterling</h3>
            </div>
          </motion.div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
              <Sparkles size={14} /> Our Story
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-text-light dark:text-text-dark font-bold leading-tight">
              A New Standard for Modern Beauty.
            </h2>
            <div className="prose prose-stone dark:prose-invert text-gray-600 dark:text-gray-400 max-w-none">
              <p className="text-xl leading-relaxed font-light italic border-l-4 border-primary/20 pl-6 mb-8">
                "We didn't just want another beauty blog. We wanted a sanctuary where high-performance luxury meets intentional, clean living."
              </p>
              <p>
                Founded in 2024, GlamGirls Haven was born out of a simple frustration: the overwhelming noise of the beauty industry. Between viral trends that disappear in a week and complex ingredient lists that require a chemistry degree to decipher, finding what actually works had become a chore.
              </p>
              <p>
                We set out to change that. Our mission is to provide a curated editorial experience for the modern woman who values her time as much as her skin health. We bridge the gap between high-end Madison Avenue luxury and the hidden gems found on Amazon, ensuring that every recommendation is accessible yet premium.
              </p>
              <p>
                At our core, we are storytellers and truth-seekers. We believe that beauty is an act of self-love, and the rituals we choose should bring us joy, not stress.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border-light dark:border-border-dark">
              <div>
                <span className="text-4xl font-serif text-primary block mb-2">12k+</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Monthly Readers</span>
              </div>
              <div>
                <span className="text-4xl font-serif text-primary block mb-2">850+</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Hours of Testing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Process Section */}
      <section className="bg-stone-50 dark:bg-gray-900 py-20 md:py-32 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">Our Protocol</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-light dark:text-white">How We Review</h2>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto italic font-serif text-lg">Transparency is our most important ingredient.</p>
          </div>

          <div className="space-y-16">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-16 h-16 shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl font-serif text-primary shadow-sm">01</div>
              <div>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-widest text-text-light dark:text-white">Independent Research</h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  We start by scouring the market for products that solve real problems. We analyze clinical studies, ingredient safety profiles, and long-term brand reputation before a single product ever touches our skin.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-16 h-16 shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl font-serif text-primary shadow-sm">02</div>
              <div>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-widest text-text-light dark:text-white">Physical Trials</h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Every product is tested for a minimum of 14 to 30 days. We look for immediate results, sensory experience (texture and scent), and long-term efficacy. We don't just "try" products; we live with them.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-16 h-16 shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl font-serif text-primary shadow-sm">03</div>
              <div>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-widest text-text-light dark:text-white">Editorial Vetting</h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Our final reviews are a culmination of our findings. We highlight not just the "Pros," but the "Cons" and "Who it's not for." Honest feedback is the only way to build lasting trust with our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundational Values Section */}
      <section className="bg-white dark:bg-bg-dark py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <ShieldCheck className="text-primary" size={32} strokeWidth={1} />
              <h3 className="font-serif text-2xl">Integrity First</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                As a participant in the Amazon Associates program, we earn a small commission from qualifying purchases. However, this never influences our editorial voice. We are reader-supported and reader-obsessed.
              </p>
            </div>
            <div className="space-y-6">
              <Heart className="text-primary" size={32} strokeWidth={1} />
              <h3 className="font-serif text-2xl">Ethical Beauty</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We prioritize brands that align with our values: cruelty-free practices, sustainable packaging, and transparent supply chains. Beauty shouldn't come at the cost of the planet.
              </p>
            </div>
            <div className="space-y-6">
              <Sparkles className="text-primary" size={32} strokeWidth={1} />
              <h3 className="font-serif text-2xl">Expert-Led Results</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our content is vetted for accuracy. We stay updated with dermatological trends and cosmetic chemistry to ensure the advice we give is safe and effective for your skin barrier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 dark:bg-gray-900 py-32 text-center transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Join the Conversation.</h2>
          <p className="text-gray-500 mb-12 leading-relaxed">
            Whether you have a product question or want to share your own glow-up story, our digital doors are always open.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border border-border-light dark:border-border-dark hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border border-border-light dark:border-border-dark hover:text-primary transition-colors"><Twitter size={18} /></a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border border-border-light dark:border-border-dark hover:text-primary transition-colors"><Youtube size={18} /></a>
            <a href="mailto:hello@glamgirlshaven.com" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border border-border-light dark:border-border-dark hover:text-primary transition-colors"><Mail size={18} /></a>
          </div>
          <Link href="/contact" className="inline-block px-14 py-5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg">
            Work With Our Editorial Team
          </Link>
        </div>
      </section>
    </main>
  );
}
