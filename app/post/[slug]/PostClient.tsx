'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GhostPost } from '@/src/lib/ghost';
import { ArrowLeft, List, ChevronDown, ArrowRight, Star, Trophy, ShieldCheck, ExternalLink } from 'lucide-react';
import { AffiliateDisclosure } from '@/src/components/affiliate/AffiliateDisclosure';

interface TOCItem { id: string; text: string; level: number; }

interface PostClientProps {
  post: GhostPost;
  trendingPosts: GhostPost[];
}

export default function PostClient({ post, trendingPosts }: PostClientProps) {
  const [processedHtml, setProcessedHtml] = useState<string>('');
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Detect affiliate content to show disclosure
  const hasAffiliateLinks = post.html?.includes('amazon.com') || post.html?.includes('amzn.to') || post.tags?.some(t => ['amazon-finds','shop-the-look','splurge-vs-save','gift-guides'].includes(t.slug));

  useEffect(() => {
    if (!post?.html) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.html, 'text/html');

    const headings = doc.querySelectorAll('h2, h3');
    const tocData: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `section-${index}`;
      heading.id = id;
      tocData.push({ id, text, level: parseInt(heading.tagName.substring(1)) });
    });

    // Group consecutive product cards into sliders
    const productCards = Array.from(doc.querySelectorAll('.kg-product-card'));
    if (productCards.length > 0) {
      let i = 0;
      while (i < productCards.length) {
        const group: Element[] = [productCards[i]];
        let j = i + 1;
        while (j < productCards.length) {
          const current = productCards[j - 1];
          const next = productCards[j];
          const sibling = current.nextElementSibling;
          if (sibling === next) { group.push(next); j++; } else { break; }
        }
        if (group.length > 1) {
          const wrapper = doc.createElement('div');
          wrapper.className = 'gh-product-slider-wrapper';
          const container = doc.createElement('div');
          container.className = 'gh-product-slider-container';
          wrapper.appendChild(container);
          const firstCard = group[0];
          if (firstCard.parentNode) {
            firstCard.parentNode.insertBefore(wrapper, firstCard);
            group.forEach((card) => container.appendChild(card));
          }
        }
        i = j;
      }
    }

    setProcessedHtml(doc.body.innerHTML);
    setToc(tocData);
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
      if (toc.length === 0) return;
      const headerOffset = 150;
      let currentId = '';
      for (const item of toc) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= headerOffset) currentId = item.id;
      }
      setActiveId(currentId);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string, isMobile: boolean = false) => {
    if (isMobile) {
      setIsMobileTocOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveId(id); }
      }, 10);
    } else {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveId(id); }
    }
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-primary z-[100] transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="bg-bg-light dark:bg-bg-dark min-h-screen pb-20 transition-colors duration-300">
        {/* Article Header */}
        <header className="pt-24 pb-10 md:pt-32 md:pb-16 bg-white dark:bg-gray-900 border-b border-border-light dark:border-border-dark transition-colors duration-300">
          <div className="container mx-auto px-6 md:px-8 max-w-7xl text-center">
            <Link
              href="/"
              className="inline-flex items-center text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-text-light dark:text-gray-500 dark:hover:text-text-dark mb-6 transition-colors"
            >
              <ArrowLeft size={10} className="mr-2" /> Back to Journal
            </Link>

            <div className="flex items-center justify-center flex-wrap gap-2 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-5">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              {post.primary_tag && (
                <>
                  <Link
                    href={`/category/${post.primary_tag.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.primary_tag.name}
                  </Link>
                  <span className="text-gray-300 dark:text-gray-600">/</span>
                </>
              )}
              <span className="text-primary truncate max-w-[150px] md:max-w-none">{post.title}</span>
            </div>

            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-text-light dark:text-text-dark leading-[1.2] mb-6 max-w-3xl mx-auto">
              {post.title}
            </h1>
            {post.custom_excerpt && (
              <p className="font-serif text-base md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                {post.custom_excerpt}
              </p>
            )}
          </div>

          {/* Feature Image */}
          {post.feature_image && (
            <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-8 md:mt-12">
              <div className="relative aspect-[16/9] md:aspect-[2.4/1] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm rounded-sm">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1280px"
                />
              </div>
            </div>
          )}
        </header>

        {/* Article Layout */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12 md:mt-16 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">

            {/* Left Sidebar — TOC */}
            <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-1">
              {toc.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 block">Contents</span>
                  <nav className="border-l border-border-light dark:border-border-dark">
                    <ul className="space-y-0">
                      {toc.map((item) => (
                        <li key={item.id} className="relative">
                          <a
                            href={`#${item.id}`}
                            className={`block py-2 pl-4 text-xs leading-relaxed transition-all duration-300 border-l-2 -ml-[1px] ${item.level === 3 ? 'pl-8 text-[11px]' : ''} ${activeId === item.id ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-400 hover:text-text-light dark:hover:text-text-dark hover:border-gray-300'}`}
                            onClick={(e) => { e.preventDefault(); scrollToHeading(item.id, false); }}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </aside>

            {/* Main Content */}
            <main className="col-span-1 lg:col-span-8 order-2 min-w-0 bg-white dark:bg-bg-dark p-5 md:p-14 border border-border-light dark:border-border-dark shadow-md rounded-sm transition-colors duration-300">
              {/* FTC Disclosure */}
              {hasAffiliateLinks && (
                <div className="mb-6">
                  <AffiliateDisclosure />
                </div>
              )}

              {/* Expert Trust Snippet (US Audience Focus) */}
              <div className="flex items-center gap-4 p-5 bg-stone-50 dark:bg-gray-800/50 border border-border-light dark:border-border-dark mb-10 rounded-sm">
                <ShieldCheck className="text-primary shrink-0" size={24} />
                <div className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                  <strong className="text-text-light dark:text-white uppercase tracking-widest block mb-0.5">Tested & Verified</strong>
                  Our editors independentaly research and test products. When you buy through our links, we may earn a commission. <Link href="/about" className="underline hover:text-primary transition-colors">Learn more about our review process.</Link>
                </div>
              </div>

              {/* Expert Scorecard (Only shown for product posts) */}
              {post.tags?.some(t => t.slug === 'amazon-finds') && (
                <div className="rating-card mb-12">
                  <div className="absolute top-0 right-0 bg-primary/10 text-primary dark:text-primary-light px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-bl-xl">
                    Editorial Pick
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <div className="flex flex-col items-center">
                      <div className="rating-score">4.8</div>
                      <div className="flex gap-1 text-yellow-500 mt-2 mb-1">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Expert Rank</span>
                    </div>
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-border-light dark:border-border-dark pt-6 md:pt-0 md:pl-8">
                      <h4 className="font-serif text-xl mb-4 text-text-light dark:text-text-dark">Quick Verdict</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 italic">
                        "{post.excerpt || 'A standout product in its category, offering premium performance and exceptional value for the modern beauty routine.'}"
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-primary block">Pros</span>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full" /> Long-lasting finish</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full" /> Natural ingredients</li>
                          </ul>
                        </div>
                        <div className="space-y-2 text-right md:text-left">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block">Best For</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 block">Sensitive Skin & Daily Wear</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile TOC */}
              {toc.length > 0 && (
                <div className="lg:hidden mb-8 border-b border-t border-border-light dark:border-border-dark py-3">
                  <button
                    onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-600 dark:text-gray-300 flex items-center">
                      <List size={14} className="mr-3" /> Table of Contents
                    </span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileTocOpen && (
                    <div className="pt-4 mt-2 border-t border-border-light dark:border-border-dark">
                      <ul className="space-y-2.5 text-sm">
                        {toc.map((item) => (
                          <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                            <a
                              href={`#${item.id}`}
                              className={`block py-1 ${activeId === item.id ? 'text-text-light dark:text-text-dark font-bold' : 'text-gray-500 hover:text-text-light dark:hover:text-text-dark'}`}
                              onClick={(e) => { e.preventDefault(); scrollToHeading(item.id, true); }}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Article Body */}
              <div
                className="gh-content max-w-none prose prose-stone prose-base md:prose-lg mx-auto prose-headings:font-serif prose-headings:font-normal prose-img:rounded-sm prose-img:w-full"
                dangerouslySetInnerHTML={{ __html: processedHtml || post.html }}
              />

              {/* Up Next / Footer CTA */}
              <div className="mt-20 pt-16 border-t border-border-light dark:border-border-dark">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8 block">Up Next</span>
                {trendingPosts[0] && (
                  <Link href={`/post/${trendingPosts[0].slug}`} className="group flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                    <div className="relative w-full md:w-1/3 aspect-[4/3] overflow-hidden rounded-sm bg-stone-100">
                      {trendingPosts[0].feature_image && (
                        <Image 
                          src={trendingPosts[0].feature_image} 
                          alt={trendingPosts[0].title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      <h4 className="font-serif text-3xl md:text-5xl text-text-light dark:text-text-dark group-hover:text-primary transition-colors leading-tight">
                        {trendingPosts[0].title}
                      </h4>
                      <p className="text-gray-500 line-clamp-2 italic font-serif">
                        {trendingPosts[0].custom_excerpt || trendingPosts[0].excerpt}
                      </p>
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary pt-2 border-b border-primary/20 group-hover:border-primary transition-all">
                        Continue Reading <ArrowRight size={14} className="ml-2" />
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </main>

            {/* Right Sidebar — Trending */}
            <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 block">Trending</span>
              <div className="space-y-8">
                {trendingPosts.map((trend, idx) => (
                  <Link href={`/post/${trend.slug}`} key={trend.id} className="group block">
                    <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3 rounded-sm shadow-sm border border-border-light dark:border-border-dark">
                      {trend.feature_image ? (
                        <Image
                          src={trend.feature_image}
                          alt={trend.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          sizes="208px"
                        />
                      ) : null}
                      <div className="absolute top-0 left-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-2 py-1">
                        <span className="text-[9px] font-bold tracking-widest text-text-light dark:text-text-dark">0{idx + 1}</span>
                      </div>
                    </div>
                    <h4 className="font-serif text-sm text-text-light dark:text-text-dark leading-tight group-hover:text-primary transition-colors font-bold">
                      {trend.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          {/* Mobile Trending — Below Article */}
          <div className="lg:hidden mt-12 pt-10 border-t border-border-light dark:border-border-dark">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 block">More Stories</span>
            <div className="grid grid-cols-2 gap-4">
              {trendingPosts.slice(0, 4).map((trend) => (
                <Link href={`/post/${trend.slug}`} key={trend.id} className="group block">
                  <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden mb-2 rounded-sm">
                    {trend.feature_image ? (
                      <Image
                        src={trend.feature_image}
                        alt={trend.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        sizes="50vw"
                      />
                    ) : null}
                  </div>
                  <h4 className="font-serif text-sm text-text-light dark:text-text-dark leading-tight group-hover:text-primary transition-colors">
                    {trend.title}
                  </h4>
                </Link>
              ))}
            </div>
            <Link href="/" className="mt-6 w-full flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase text-text-light dark:text-text-dark border border-border-light dark:border-border-dark py-3 rounded-sm">
              Back to Journal <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
