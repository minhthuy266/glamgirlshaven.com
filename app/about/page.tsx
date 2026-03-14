"use client";

import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          About GlamGirls Haven
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-serif italic">
          Your ultimate destination for honest beauty reviews, skincare secrets, and wellness inspiration.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-gray-800"
        >
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" 
            alt="Sarah Jenkins" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert"
        >
          <h2>Hi, I'm Sarah!</h2>
          <p>
            Welcome to GlamGirls Haven! I started this blog in 2023 as a creative outlet to share my passion for all things beauty and wellness.
          </p>
          <p>
            As a certified esthetician and self-proclaimed makeup junkie, I've spent years testing thousands of products—from drugstore steals to luxury splurges. My goal is to help you navigate the overwhelming world of beauty and find products that actually work for your skin type and budget.
          </p>
          <p>
            Here, you'll find honest reviews, step-by-step tutorials, and curated lists of my absolute favorite finds (especially those hidden gems on Amazon!).
          </p>
          <p>
            When I'm not testing the latest viral skincare trend, you can find me sipping iced matcha, re-watching Gilmore Girls, or exploring local coffee shops.
          </p>
          
          <div className="flex items-center gap-4 mt-8">
            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white rounded-full transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white rounded-full transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white rounded-full transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white rounded-full transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="bg-primary-light/20 dark:bg-gray-800/50 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Let's Work Together</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Are you a brand looking to collaborate? I love partnering with brands that align with GlamGirls Haven's values to create authentic, engaging content.
        </p>
        <a href="mailto:hello@glamgirlshaven.com" className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-colors">
          Get in Touch
        </a>
      </div>
    </div>
  );
}
