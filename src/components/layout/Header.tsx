"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';

const CATEGORIES = [
  'All',
  'Skincare',
  'Make-up',
  'Haircare',
  'Fragrance & Body',
  'Nails & Beauty Tools',
  'Wellness & Self-love',
  'Beauty Tips & Hacks',
  'Gift Guides'
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isDarkMode = mounted && resolvedTheme === 'dark';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-xl border-b border-border-light dark:border-border-dark py-4'
          : 'bg-transparent py-8'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        
        {/* Left: Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/category/skincare" className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500 hover:text-primary transition-colors">
            Skincare
          </Link>
          <Link href="/category/make-up" className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500 hover:text-primary transition-colors">
            Make-up
          </Link>
        </nav>

        {/* Center: Logo */}
        <Link href="/" className="flex flex-col items-center group absolute left-1/2 -translate-x-1/2">
          <span className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-gray-900 dark:text-white transition-transform duration-500 group-hover:scale-105">
            GlamGirls<span className="text-primary italic font-medium">Haven</span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.5em] text-gray-400 mt-1 font-bold">Editorial & Beauty</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/about" className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500 hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-primary transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              className="md:hidden p-2 text-gray-900 dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark p-12 md:hidden h-screen"
          >
            <nav className="flex flex-col gap-8 items-center justify-center h-full -mt-20">
              <Link href="/" className="text-3xl font-serif font-bold text-gray-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/category/skincare" className="text-3xl font-serif font-bold text-gray-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>Skincare</Link>
              <Link href="/category/make-up" className="text-3xl font-serif font-bold text-gray-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>Make-up</Link>
              <Link href="/about" className="text-3xl font-serif font-bold text-gray-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
