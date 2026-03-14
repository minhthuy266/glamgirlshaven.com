'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

interface GhostPost {
  id: string;
  title: string;
  slug: string;
  feature_image?: string;
  primary_tag?: { name: string; slug: string };
  custom_excerpt?: string;
}

interface HomeClientProps {
  hotPost: GhostPost | undefined;
  organizationPosts: GhostPost[];
  trendingPosts: GhostPost[];
  amazonProducts: GhostPost[];
  heroBgImage: string;
}

export default function HomeClient({
  hotPost,
  organizationPosts,
  trendingPosts,
  amazonProducts,
  heroBgImage,
}: HomeClientProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-bg-light dark:bg-bg-dark overflow-x-hidden transition-colors duration-300">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[80vh] md:h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImage}
            alt="Glamorous Beauty"
            fill
            className="object-cover object-center animate-slow-zoom"
            priority
            sizes="100vw"
          />
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gray-900/10 dark:bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center text-white mt-12">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1.5 px-5 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-[9px] font-bold tracking-[0.25em] uppercase mb-6 shadow-lg">
              Est. 2024
            </span>
            <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl leading-tight md:leading-none mb-6 drop-shadow-lg font-bold tracking-tight">
              Curated <span className="font-light text-primary-light">Beauty</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-100 font-normal max-w-lg mx-auto leading-relaxed mb-8 drop-shadow-md">
              Luxury skincare, beauty finds, and wellness insights for the modern woman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tag/beauty-finds"
                className="w-full sm:w-auto bg-white text-text-light px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary-light hover:text-text-light transition-colors"
              >
                Shop Beauty Finds
              </Link>
              <Link
                href="/tag/skincare"
                className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-text-light transition-colors"
              >
                Skincare Hacks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 1: BEAUTY EDIT --- */}
      <section className="bg-white dark:bg-bg-dark py-12 md:py-16 border-b border-border-light dark:border-border-dark overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl relative">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 mb-2 block">The Edit</span>
              <h3 className="font-serif text-2xl md:text-3xl text-text-light dark:text-text-dark font-bold tracking-tight">Beauty Favorites</h3>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => scrollSlider('left')} className="w-9 h-9 md:w-10 md:h-10 border border-border-light dark:border-border-dark rounded-full flex items-center justify-center text-gray-500 hover:border-text-light dark:hover:border-text-dark hover:text-text-light dark:hover:text-text-dark transition-colors" aria-label="Scroll left">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scrollSlider('right')} className="w-9 h-9 md:w-10 md:h-10 border border-border-light dark:border-border-dark rounded-full flex items-center justify-center text-gray-500 hover:border-text-light dark:hover:border-text-dark hover:text-text-light dark:hover:text-text-dark transition-colors" aria-label="Scroll right">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
          >
            {amazonProducts.map((prod) => (
              <div key={prod.id} className="snap-center md:snap-start shrink-0 w-[160px] md:w-[260px] flex flex-col group select-none">
                <Link href={`/${prod.slug}`} className="block relative aspect-[3/4] bg-gray-100 dark:bg-gray-800 mb-3 overflow-hidden rounded-sm cursor-pointer">
                  {prod.feature_image && (
                    <Image
                      src={prod.feature_image}
                      alt={prod.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 160px, 260px"
                      draggable={false}
                    />
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <ShoppingBag size={12} className="text-text-light" />
                  </div>
                </Link>
                <h4 className="font-serif text-sm md:text-base text-text-light dark:text-text-dark font-bold truncate pr-2 group-hover:text-primary transition-colors">
                  <Link href={`/${prod.slug}`}>{prod.title}</Link>
                </h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
                    {prod.custom_excerpt?.split('|')[0] || 'See Price'}
                  </span>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    {prod.custom_excerpt?.split('|')[1] || 'Beauty'}
                  </span>
                </div>
              </div>
            ))}
            <Link
              href="/tag/beauty-finds"
              className="snap-center md:snap-start shrink-0 w-[160px] md:w-[260px] flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors aspect-[3/4] rounded-sm"
            >
              <span className="font-serif text-base md:text-lg text-text-light dark:text-text-dark mb-2">View All</span>
              <ArrowRight size={18} className="text-gray-400" />
            </Link>
            <div className="w-2 shrink-0 md:hidden" />
          </div>
        </div>
      </section>

      {/* --- SECTION 2: SKINCARE HACKS --- */}
      <section className="py-16 md:py-20 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 mb-4 block">Glow Up Series</span>
            <h2 className="font-serif text-3xl md:text-5xl text-text-light dark:text-text-dark mb-4 md:mb-6">Skincare Simplified.</h2>
            <p className="text-gray-500 dark:text-gray-400 font-light text-sm md:text-base leading-relaxed">Expert tips, product layering guides, and routines that enhance your natural glow without the overwhelm.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Featured wide card */}
            {hotPost && (
              <Link
                href={`/${hotPost.slug}`}
                className="lg:col-span-2 group relative h-[300px] md:h-[500px] overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-800 block shadow-sm hover:shadow-lg transition-shadow"
              >
                {hotPost.feature_image && (
                  <Image
                    src={hotPost.feature_image}
                    alt={hotPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 840px"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
                  <span className="bg-primary/80 backdrop-blur border text-white border-white/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3 inline-block">
                    {hotPost.primary_tag?.name || 'Skincare'}
                  </span>
                  <h3 className="font-serif text-2xl md:text-4xl mb-3 leading-tight font-bold">{hotPost.title}</h3>
                  <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest hover:underline decoration-white underline-offset-4">
                    Read Article <ArrowRight size={10} className="ml-2" />
                  </span>
                </div>
              </Link>
            )}

            {/* Small side cards */}
            <div className="flex flex-col gap-4 md:gap-6 justify-center">
              {organizationPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="flex gap-4 items-center group bg-white dark:bg-gray-900 p-3 md:p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow border border-border-light dark:border-border-dark"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gray-200 dark:bg-gray-800 shrink-0 overflow-hidden rounded-sm">
                    {post.feature_image && (
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary block mb-1">{post.primary_tag?.name || 'Beauty'}</span>
                    <h4 className="font-serif text-sm md:text-base text-text-light dark:text-text-dark leading-tight group-hover:text-primary-dark dark:group-hover:text-primary transition-colors font-bold">{post.title}</h4>
                  </div>
                </Link>
              ))}
              <Link
                href="/tag/skincare"
                className="mt-2 text-center text-[10px] font-bold uppercase tracking-widest text-text-light dark:text-text-dark border border-border-light dark:border-border-dark py-3 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors rounded-sm"
              >
                More Skincare Hacks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TRENDING NOW --- */}
      <div className="container mx-auto px-6 md:px-8 max-w-7xl py-16 md:py-20 border-t border-border-light dark:border-border-dark">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 mb-2 block">The Editorial</span>
            <h3 className="font-serif text-2xl md:text-4xl text-text-light dark:text-text-dark font-bold tracking-tight">Trending Now</h3>
          </div>
          <Link
            href="/tag/all"
            className="hidden md:flex gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 hover:text-text-light dark:hover:text-text-dark transition-colors items-center"
          >
            View Archive <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
          {trendingPosts.slice(0, 8).map((post) => (
            <article key={post.id} className="group flex flex-col h-full">
              <Link href={`/${post.slug}`} className="block overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 relative aspect-[4/3] rounded-sm">
                {post.feature_image && (
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={12} className="text-text-light" />
                </div>
              </Link>
              <div className="flex flex-col flex-1">
                <span className="text-[9px] tracking-widest uppercase text-primary font-bold mb-1.5">{post.primary_tag?.name || 'Featured'}</span>
                <h3 className="font-serif text-sm md:text-lg text-text-light dark:text-text-dark mb-2 leading-snug group-hover:text-primary transition-colors font-bold tracking-tight">
                  <Link href={`/${post.slug}`}>{post.title}</Link>
                </h3>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/tag/all"
          className="md:hidden mt-10 w-full flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase text-text-light dark:text-text-dark border border-border-light dark:border-border-dark py-3 rounded-sm active:bg-gray-100 dark:active:bg-gray-800"
        >
          View All Stories <ArrowRight size={12} />
        </Link>
      </div>
    </main>
  );
}
