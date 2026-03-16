'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, Plus, Minus, Moon, Sun, Twitter, Instagram, ArrowRight, TrendingUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import type { GhostPost } from '@/src/lib/types';

const MENU_ITEMS = [
  { label: 'Skincare', slug: 'skincare' },
  { label: 'Makeup', slug: 'make-up' },
  { label: 'Haircare', slug: 'haircare' },
  { label: 'Wellness', slug: 'wellness-self-love' },
];

const MORE_ITEMS = [
  { label: 'Fragrance & Body', slug: 'fragrance-body' },
  { label: 'Nails & Beauty Tools', slug: 'nails-beauty-tools' },
  { label: 'Beauty Tips & Hacks', slug: 'beauty-tips-hacks' },
  { label: 'Gift Guides', slug: 'gift-guides' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState<GhostPost[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setActiveMobileMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen || isSearchOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }

    if (isSearchOpen && searchData.length === 0) {
      fetch('/api/posts')
        .then((r) => r.json())
        .then(setSearchData)
        .catch(console.error);
    }
    
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, isSearchOpen, searchData.length]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;
  const isDarkMode = mounted && resolvedTheme === 'dark';

  const textBase = isTransparent ? 'text-white' : 'text-text-light dark:text-gray-300';
  const textHover = isTransparent ? 'hover:text-primary-light' : 'hover:text-primary transition-colors';
  
  const logoClass = isTransparent 
    ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]' 
    : 'text-text-light dark:text-white';
    
  const iconClass = isTransparent 
    ? 'text-white hover:text-primary-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]' 
    : 'text-text-light dark:text-gray-300 hover:text-primary dark:hover:text-primary';

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ease-in-out border-b ${
        scrolled || isOpen || !isHome
          ? `bg-bg-light/95 dark:bg-bg-dark/95 ${!isOpen ? 'backdrop-blur-sm' : ''} border-border-light dark:border-border-dark py-3`
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center relative">
        <Link href="/" className="block group">
          <div className={`flex flex-col items-center transition-all duration-300 ${logoClass}`}>
            <span className="font-serif text-xl md:text-3xl tracking-tight font-bold">
              GlamGirls<span className="text-primary italic font-medium ml-1">Haven</span>
            </span>
            <span className={`text-[8px] uppercase tracking-[0.5em] mt-1 font-bold ${isTransparent ? 'text-white/90' : 'text-gray-400'}`}>Editorial & Beauty</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === `/category/${item.slug}`;
            return (
              <Link
                key={item.slug}
                href={`/category/${item.slug}`}
                className={`transition-all duration-300 pb-1 border-b-2 hover:border-primary ${
                  isActive ? 'border-primary text-primary' : 'border-transparent ' + textBase
                } ${textHover}`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* MORE DROPDOWN */}
          {(() => {
            const isAnyMoreItemActive = MORE_ITEMS.some(item => pathname === `/category/${item.slug}`);
            return (
              <div className="relative group/more">
                <button className={`flex items-center gap-1 transition-all duration-300 pb-1 border-b-2 group-hover/more:border-primary ${
                  isAnyMoreItemActive ? 'border-primary text-primary' : 'border-transparent ' + textBase
                } ${textHover}`}>
                  More <ChevronDown size={12} className="group-hover/more:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-300">
                  <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark shadow-2xl min-w-[200px] py-4">
                    {MORE_ITEMS.map((sub) => {
                      const isActive = pathname === `/category/${sub.slug}`;
                      return (
                        <Link
                          key={sub.slug}
                          href={`/category/${sub.slug}`}
                          className={`block px-6 py-2.5 transition-colors whitespace-nowrap ${
                            isActive 
                              ? 'text-primary bg-stone-50 dark:bg-gray-800' 
                              : 'text-text-light dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-stone-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          <Link
            href="/about"
            className={`transition-all duration-300 pb-1 border-b-2 hover:border-primary ${
              pathname === '/about' ? 'border-primary text-primary' : 'border-transparent ' + textBase
            } ${textHover}`}
          >
            About
          </Link>

          <div className="flex items-center gap-4 ml-4">
            <button
              aria-label="Toggle Theme"
              className={`transition-colors ${iconClass}`}
              onClick={toggleTheme}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              aria-label="Search"
              className={`transition-colors ${iconClass}`}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} />
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`transition-colors p-2 ${isOpen || !isTransparent ? 'text-text-light dark:text-white' : 'text-white drop-shadow-md'}`}
          >
            <Search size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className={`transition-colors p-2 ${isOpen || !isTransparent ? 'text-text-light dark:text-white' : 'text-white drop-shadow-md'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`transition-colors p-2 ${isOpen || !isTransparent ? 'text-text-light dark:text-white' : 'text-white drop-shadow-md'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[999] bg-white dark:bg-bg-dark md:hidden"
          >
            <div className="flex flex-col h-[100dvh] bg-white dark:bg-bg-dark">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-border-light dark:border-border-dark bg-white dark:bg-bg-dark shrink-0">
                <Link href="/" onClick={() => setIsOpen(false)} className="block">
                  <span className="font-serif text-2xl font-bold text-text-light dark:text-white">
                    GlamGirls<span className="text-primary italic font-medium ml-1">Haven</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-light dark:text-white"
                  aria-label="Close menu"
                >
                  <X size={32} strokeWidth={1} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-10 pt-10 pb-20 bg-white dark:bg-bg-dark">
                <nav className="flex-1 space-y-1">
                  <Link
                    href="/"
                    className={`block font-serif text-3xl py-4 border-b border-border-light/50 dark:border-border-dark/50 ${
                      pathname === '/' ? 'text-primary' : 'text-text-light dark:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Journal
                  </Link>
                  
                  {MENU_ITEMS.map((item) => {
                    const isActive = pathname === `/category/${item.slug}`;
                    return (
                      <Link
                        key={item.slug}
                        href={`/category/${item.slug}`}
                        className={`block font-serif text-3xl py-4 border-b border-border-light/50 dark:border-border-dark/50 ${
                          isActive ? 'text-primary' : 'text-text-light dark:text-white'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className="py-4 border-b border-border-light/50 dark:border-border-dark/50">
                    {(() => {
                      const isAnyMoreItemActive = MORE_ITEMS.some(item => pathname === `/category/${item.slug}`);
                      return (
                        <>
                          <button 
                            onClick={() => setActiveMobileMenu(activeMobileMenu === 'more' ? null : 'more')}
                            className={`w-full flex items-center justify-between font-serif text-3xl ${
                              isAnyMoreItemActive ? 'text-primary' : 'text-text-light dark:text-white'
                            }`}
                          >
                            More {activeMobileMenu === 'more' ? <Minus size={24} /> : <Plus size={24} />}
                          </button>
                          
                          <div className={`grid transition-all duration-300 ease-in-out ${activeMobileMenu === 'more' ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden space-y-4">
                              {MORE_ITEMS.map((item) => {
                                const isActive = pathname === `/category/${item.slug}`;
                                return (
                                  <Link
                                    key={item.slug}
                                    href={`/category/${item.slug}`}
                                    className={`block text-lg font-medium transition-colors pl-4 border-l-2 ${
                                      isActive ? 'text-primary border-primary' : 'text-gray-500 dark:text-gray-400 border-primary/20'
                                    } hover:text-primary`}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {item.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <Link
                    href="/about"
                    className={`block font-serif text-3xl py-4 ${
                      pathname === '/about' ? 'text-primary' : 'text-text-light dark:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </nav>

                <div className="mt-12 pt-10 border-t border-border-light dark:border-border-dark flex flex-col gap-8">
                   <div className="flex items-center gap-6">
                    <a href="https://instagram.com/glamgirlshaven" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                      <Instagram size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Instagram</span>
                    </a>
                    <a href="https://twitter.com/glamgirlshaven" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                      <Twitter size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Twitter</span>
                    </a>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-gray-400">© {new Date().getFullYear()} GLAMGIRLS HAVEN EDITORIAL</p>
                    <p className="text-[9px] italic text-gray-400 leading-relaxed">Curated beauty insights for the modern aesthetic.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-bg-light/98 dark:bg-bg-dark/98 backdrop-blur-3xl flex flex-col items-center justify-start pt-24 md:pt-40 px-6 isolate w-full h-[100dvh] overflow-hidden"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-3 text-text-light dark:text-white hover:rotate-90 transition-transform duration-300"
            >
              <X size={40} strokeWidth={1} />
            </button>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-3xl"
            >
              <div className="relative border-b-2 border-primary/30 py-4 mb-12 group focus-within:border-primary transition-colors">
                <input 
                  type="text" 
                  placeholder="SEARCH GLAMGIRLS HAVEN..." 
                  className="w-full bg-transparent border-none text-3xl md:text-5xl font-serif text-text-light dark:text-white focus:outline-none placeholder:text-gray-300 dark:placeholder:text-gray-700 pb-2"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-primary" size={32} />
              </div>

              {searchQuery.length > 2 ? (
                <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-4">
                   <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6">Search Results for "{searchQuery}"</h4>
                   
                   {searchData.filter(post => {
                     const terms = searchQuery.toLowerCase().split(' ').filter(Boolean);
                     const searchStr = `${post.title} ${post.tags?.map(t => t.name).join(' ')}`.toLowerCase();
                     return terms.every(term => searchStr.includes(term));
                   }).map(result => (
                     <Link 
                      key={result.id} 
                      href={`/post/${result.slug}`} 
                      onClick={() => setIsSearchOpen(false)}
                      className="block group"
                     >
                        <div className="flex items-center justify-between py-4 border-b border-border-light dark:border-border-dark group-hover:pl-4 transition-all">
                          <span className="text-xl md:text-2xl font-serif text-text-light dark:text-white line-clamp-1">{result.title}</span>
                          <ArrowRight size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-4" />
                        </div>
                     </Link>
                   ))}

                   {searchData.filter(post => {
                     const terms = searchQuery.toLowerCase().split(' ').filter(Boolean);
                     const searchStr = `${post.title} ${post.tags?.map(t => t.name).join(' ')}`.toLowerCase();
                     return terms.every(term => searchStr.includes(term));
                   }).length === 0 && (
                     <p className="font-serif text-xl text-gray-400 italic">No perfect matches found. Try exploring our categories below.</p>
                   )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6">
                      <TrendingUp size={14} /> Trending Searches
                    </h4>
                    <ul className="space-y-4">
                      {['Amazon Beauty', 'Flawless Filter Dupes', 'Retinoid Ladder', 'Sunscreen'].map((term) => (
                        <li key={term}>
                          <button 
                            onClick={() => setSearchQuery(term)} 
                            className="text-lg md:text-xl font-serif text-gray-500 hover:text-primary transition-colors flex items-center group"
                          >
                            {term} <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6">Curated Categories</h4>
                    <div className="flex flex-wrap gap-3">
                      {MENU_ITEMS.map((item) => (
                        <Link 
                          key={item.slug}
                          href={`/category/${item.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="px-4 py-2 border border-border-light dark:border-border-dark text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
