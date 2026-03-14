'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, Plus, Minus, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const MENU_ITEMS = [
  { label: 'Skincare', slug: 'skincare' },
  { label: 'Makeup', slug: 'makeup' },
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
    setActiveMobileMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;
  const isDarkMode = mounted && resolvedTheme === 'dark';

  const textBase = isTransparent ? 'text-white' : 'text-text-light dark:text-gray-300';
  const textHover = isTransparent ? 'hover:text-primary-light' : 'hover:text-primary transition-colors';
  
  // FIX: Logo visibility bug - Ensure it's readable on transparent headers
  const logoClass = isTransparent 
    ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]' 
    : 'text-text-light dark:text-white';
    
  const iconClass = isTransparent ? 'text-white hover:text-primary-light' : 'text-text-light dark:text-gray-300 hover:text-primary dark:hover:text-primary';

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ease-in-out border-b ${
        scrolled || isOpen || !isHome
          ? 'bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm border-border-light dark:border-border-dark py-3'
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
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className={`transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-primary ${textBase} ${textHover}`}
            >
              {item.label}
            </Link>
          ))}

          {/* MORE DROPDOWN */}
          <div className="relative group/more">
            <button className={`flex items-center gap-1 transition-all duration-300 pb-1 border-b-2 border-transparent group-hover/more:border-primary ${textBase} ${textHover}`}>
              More <ChevronDown size={12} className="group-hover/more:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-300">
              <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark shadow-2xl min-w-[200px] py-4">
                {MORE_ITEMS.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/category/${sub.slug}`}
                    className="block px-6 py-2.5 text-text-light dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-stone-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className={`transition-all duration-300 pb-1 border-b-2 border-transparent hover:border-primary ${textBase} ${textHover}`}
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
            >
              <Search size={18} />
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className={`transition-colors p-1 ${isOpen || !isTransparent ? 'text-text-light dark:text-white' : 'text-white'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`transition-colors p-1 ${isOpen || !isTransparent ? 'text-text-light dark:text-white' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[45] transition-all duration-500 md:hidden ${isOpen ? 'visible' : 'invisible delay-300'}`}
      >
        <div
          className={`absolute inset-0 bg-gray-900/60 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-full bg-bg-light dark:bg-bg-dark shadow-2xl transition-transform duration-500 ease-out transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-10">
            <nav className="flex-1 flex flex-col items-center justify-center space-y-8">
              <Link
                href="/"
                className="font-serif text-3xl text-text-light dark:text-white font-bold hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Journal
              </Link>
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="font-serif text-3xl text-text-light dark:text-white font-bold hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile More Items */}
              {MORE_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="font-serif text-xl border-t border-border-light dark:border-border-dark pt-4 w-full text-center text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/about"
                className="font-serif text-3xl text-text-light dark:text-white font-bold hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </nav>

            <div className="mt-auto pt-8 border-t border-border-light dark:border-border-dark flex justify-center gap-8">
              <button className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-primary">Instagram</button>
              <button className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-primary">Pinterest</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
