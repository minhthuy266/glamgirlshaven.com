'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ShoppingBag, ChevronLeft, ChevronRight, Shield, CheckCircle, Mail, Star, Award, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';

interface GhostPost {
  id: string;
  title: string;
  slug: string;
  feature_image?: string;
  primary_tag?: { name: string; slug: string };
  custom_excerpt?: string;
  excerpt?: string;
  tags?: { name: string; slug: string }[]; // Added tags property for score extraction
}

interface HomeClientProps {
  hotPost: GhostPost | undefined;
  masterclassPosts: GhostPost[];
  trendingPosts: GhostPost[];
  verdictProducts: GhostPost[];
  heroBgImage: string;
  allPosts: GhostPost[];
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function HomeClient({
  hotPost,
  masterclassPosts,
  trendingPosts,
  verdictProducts,
  heroBgImage,
  allPosts,
}: HomeClientProps) {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [homepageDisplayCount, setHomepageDisplayCount] = React.useState(8);
  const [latestFeedCount, setLatestFeedCount] = React.useState(8);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <main className="bg-bg-light dark:bg-bg-dark overflow-x-hidden transition-colors duration-300">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[85vh] md:h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImage}
            alt="Glamorous Beauty"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gray-900/10 dark:bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="inline-block py-1.5 px-5 border border-white/20 bg-white/10 rounded-full text-[9px] font-bold tracking-[0.3em] uppercase mb-8 shadow-xl">
              Editorial Excellence
            </span>
            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl leading-[0.9] mb-8 drop-shadow-2xl font-bold tracking-tighter">
              The New <br />
              <span className="font-light italic text-primary-light">Standard</span>
            </h1>
            <p className="text-sm md:text-xl text-gray-100 font-normal max-w-xl mx-auto leading-relaxed mb-10 drop-shadow-md">
              Elevating your daily ritual through expert-vetted skincare, curated aesthetics, and intentional wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                href="/category/editors-verdict"
                className="group relative w-full sm:w-auto overflow-hidden bg-white text-text-light px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
              >
                <span className="relative z-10">Discover The Edits</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                href="/category/masterclass"
                className="w-full sm:w-auto bg-transparent border border-white/50 text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-text-light transition-all"
              >
                Beauty Academy
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        >
          <div className="w-[1px] h-12 bg-white/30" />
        </motion.div>
      </section>

      {/* --- TRUST BAR --- */}
      <section className="bg-white dark:bg-bg-dark border-b border-border-light dark:border-border-dark py-8 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-7xl flex flex-wrap justify-center gap-10 md:gap-24">
          <Link href="/about" className="trust-item group cursor-pointer hover:text-primary transition-colors">
            <Shield size={16} className="text-primary group-hover:scale-110 transition-transform" />
            <span>Expert Recommended</span>
          </Link>
          <Link href="/about" className="trust-item group cursor-pointer hover:text-primary transition-colors">
            <CheckCircle size={16} className="text-primary group-hover:scale-110 transition-transform" />
            <span>Unbiased Reviews</span>
          </Link>
          <Link href="/about" className="trust-item group cursor-pointer hover:text-primary transition-colors">
            <Award size={16} className="text-primary group-hover:scale-110 transition-transform" />
            <span>Tested & Verified</span>
          </Link>
        </div>
      </section>

      {/* --- SECTION 1: BEAUTY EDIT (Rating Cards) --- */}
      <motion.section 
        initial={isMobile ? "visible" : "hidden"}
        whileInView={isMobile ? undefined : "visible"}
        viewport={{ once: true, margin: "-50px" }}
        variants={revealVariants}
        className="bg-white dark:bg-bg-dark py-20 md:py-28 border-b border-border-light dark:border-border-dark overflow-hidden transition-colors duration-300"
      >
        <div className="container mx-auto px-6 md:px-8 max-w-7xl relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-3 block">Conversion First Edits</span>
              <h3 className="font-serif text-3xl md:text-5xl text-text-light dark:text-text-dark font-bold tracking-tight">The Editor's Verdict</h3>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-2 flex items-center gap-1.5 leading-none">
                <Shield size={10} strokeWidth={3} /> Independent Testing — Honesty over Hype
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Link href="/category/all" className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary hover:text-text-light dark:hover:text-white transition-colors flex items-center gap-2">
                Explore The Entire Edit <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-12"
          >
            {verdictProducts.slice(0, 3).map((prod, idx) => {
              // Extract score from tags (handle both internal #score: and public score- tags)
              const scoreTag = prod.tags?.find(t => 
                t.name.toLowerCase().startsWith('#score:') || 
                t.slug.startsWith('hash-score-') || // Internal tag slug format
                t.slug.startsWith('score-')        // Public tag slug format
              );
              
              let scoreValue = '9.8'; // Default fallback
              if (scoreTag) {
                // If it's a slug like 'score-9-2', convert to '9.2'
                if (scoreTag.slug.includes('score-')) {
                  scoreValue = scoreTag.slug.replace('hash-score-', '').replace('score-', '').replace('-', '.');
                } else {
                  scoreValue = scoreTag.name.split(':')[1] || '9.8';
                }
              }

              return (
                <div key={prod.id} className="group flex flex-col relative w-full">
                  {/* Ranking Badge */}
                  <div className="absolute -top-4 -left-4 z-30 w-12 h-12 bg-bg-light dark:bg-bg-dark border border-primary/20 flex items-center justify-center font-serif text-xl font-bold shadow-lg">
                    {idx + 1}
                  </div>
                  
                  <Link href={`/post/${prod.slug}`} className="block relative aspect-[4/5] bg-stone-50 dark:bg-gray-800 mb-4 overflow-hidden rounded-sm border border-border-light dark:border-border-dark">
                    {prod.feature_image && (
                      <Image
                        src={prod.feature_image}
                        alt={prod.title}
                        fill
                        className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-110"
                        sizes="(max-width: 768px) 280px, 380px"
                      />
                    )}
                  </Link>

                  {/* Editor's Score — dynamic from tag */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex gap-1 text-primary">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={11} fill="currentColor" />)}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Score: {scoreValue}</span>
                  </div>
                  
                  <div className="px-1">
                    <h4 className="font-serif text-xl text-text-light dark:text-text-dark font-bold group-hover:text-primary transition-colors leading-tight mb-2">
                      <Link href={`/post/${prod.slug}`}>{prod.title}</Link>
                    </h4>
                    <div className="flex justify-between items-center border-t border-border-light dark:border-border-dark pt-4">
                      <span className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold">
                        {prod.primary_tag?.name || 'Editor\'s Choice'}
                      </span>
                      <ShoppingBag size={14} className="text-gray-300" />
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              href="/category/all"
              className="w-full flex flex-col items-center justify-center bg-stone-50 dark:bg-gray-900 border border-border-light dark:border-border-dark text-center hover:border-primary transition-all aspect-[4/5] rounded-sm group mb-6 lg:mb-0"
            >
              <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
                <ArrowRight size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-serif text-lg text-text-light dark:text-text-dark">Explore The <br />Entire Edit</span>
            </Link>
          </div>

        </div>
      </motion.section>

      {/* --- SECTION 2: SKINCARE HACKS --- */}
      <motion.section 
        initial={isMobile ? "visible" : "hidden"}
        whileInView={isMobile ? undefined : "visible"}
        viewport={{ once: true, margin: "-50px" }}
        variants={revealVariants}
        className="py-24 md:py-32 bg-bg-light dark:bg-bg-dark transition-colors duration-300 relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute left-0 top-1/4 text-[25rem] md:text-[35rem] font-serif font-bold text-primary/5 select-none pointer-events-none hidden lg:block -translate-x-1/4 leading-none transition-colors">
          02
        </div>
        <div className="absolute right-0 top-1/2 text-[10rem] md:text-[15rem] font-serif font-bold text-primary/5 select-none pointer-events-none hidden lg:block translate-x-1/2 rotate-90">
          EDITORIAL
        </div>
        <div className="hidden lg:block absolute left-0 bottom-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-8 max-w-7xl relative">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-start">
            <div className="w-full lg:w-[40%] lg:sticky lg:top-32 flex gap-10">
              {/* Vertical Rail with Branding */}
              <div className="hidden lg:flex flex-col items-center gap-6 py-4 border-r border-border-light dark:border-border-dark pr-8 shrink-0 h-full min-h-[1200px]">
                <span className="rail-text">Est. {new Date().getFullYear() - 1}</span>
                <div className="w-[1px] h-32 bg-primary/20" />
                <span className="rail-text">Beauty Edits</span>
                <div className="w-px flex-1 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent mt-4" />
                <span className="rail-text rotate-180 mb-20 whitespace-nowrap">Volume No. 01</span>
              </div>

              <div className="flex flex-col h-full space-y-16">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">The Masterclass</span>
                  <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-light dark:text-text-dark mb-8 leading-[1.05] font-bold tracking-tighter">Rituals <br />Defined.</h2>
                  <p className="text-gray-500 dark:text-gray-400 font-light text-lg md:text-xl leading-relaxed italic max-w-md">
                    Beyond products, beauty is about the intention behind the action. Discover our science-led guides.
                  </p>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="flex items-center gap-6">
                    <Link
                      href="/category/skincare"
                      className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-text-light dark:text-white border-b-2 border-primary pb-2 hover:gap-6 transition-all w-max"
                    >
                      Browse The Academy <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Expert Insight Card */}
                  <div className="hidden lg:flex items-start gap-6 p-8 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-border-light dark:border-border-dark shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative w-24 h-32 shrink-0 bg-stone-100 dark:bg-gray-800">
                       <div className="absolute inset-0 border border-primary/20 -m-2 z-0" />
                       <div className="relative z-10 w-full h-full flex items-center justify-center text-primary/20 font-serif italic text-4xl select-none">GGH</div>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-primary mb-2 block">Editor's Highlight</span>
                      <h5 className="font-serif text-lg text-text-light dark:text-white font-bold mb-2">Editorial Collective</h5>
                      <p className="text-[11px] text-gray-500 italic leading-relaxed mb-4">"Skincare is a marathon, not a sprint. We prioritize long-term skin health over instant results."</p>
                      <span className="text-[8px] font-bold uppercase tracking-widest border-b border-primary/30 pb-0.5">Beauty Insiders</span>
                    </div>
                  </div>

                  {/* Trending Sidebar widget to fill vertical space */}
                  <div className="space-y-6 pt-6 border-t border-border-light dark:border-border-dark">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                       <TrendingUp size={14} /> Must-Read Edits
                    </h5>
                    <div className="space-y-6">
                      {masterclassPosts.slice(3, 5).map((p, i) => (
                        <Link key={p.id} href={`/post/${p.slug}`} className="group flex gap-4 items-center">
                          <span className="font-serif text-3xl text-primary/20 font-bold">0{i+1}</span>
                          <div>
                            <h6 className="text-[13px] font-serif font-bold text-text-light dark:text-white group-hover:text-primary transition-colors leading-snug">{p.title}</h6>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400">5 min read</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Popular Topics Cloud */}
                  <div className="space-y-4 pt-6">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Popular in Academy</h5>
                     <div className="flex flex-wrap gap-2">
                        {['Acid Peels', 'Micro-needling', 'Double Cleansing', 'Retinal vs Retinol', 'Barrier Health'].map(tag => (
                          <Link 
                            key={tag} 
                            href={`/category/skincare`}
                            className="px-3 py-1.5 bg-stone-100 dark:bg-gray-800/50 text-[9px] font-bold uppercase tracking-widest text-text-light dark:text-gray-400 hover:text-primary transition-colors cursor-pointer border border-transparent hover:border-primary/20"
                          >
                            {tag}
                          </Link>
                        ))}
                     </div>
                  </div>
                </div>

                {/* Editorial Quote Card */}
                <div className="hidden lg:block p-10 border-l-4 border-primary bg-stone-50/50 dark:bg-white/5 relative group shadow-sm">
                   <div className="absolute -top-4 -left-4 font-serif text-6xl text-primary/10 select-none">“</div>
                  <p className="font-serif italic text-2xl text-text-light dark:text-gray-300 leading-relaxed relative z-10">
                    True beauty begins the moment you decide to be yourself and ritualize your self-care.
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">GGH</div>
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">The Editorial Board</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {masterclassPosts.slice(0, 3).map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className={`group flex flex-col items-start ${idx === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`relative w-full ${idx === 0 ? 'aspect-[21/9]' : 'aspect-square'} bg-gray-100 dark:bg-gray-800 overflow-hidden mb-6 rounded-sm`}>
                    {post.feature_image && (
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-110"
                        sizes={idx === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-primary px-3 py-1.5 text-[7px] font-bold tracking-[0.3em] uppercase text-white">
                      MASTERCLASS
                    </div>
                  </div>
                  <h4 className={`font-serif ${idx === 0 ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'} text-text-light dark:text-text-dark group-hover:text-primary transition-colors font-bold mb-4 leading-tight`}>
                    {post.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base line-clamp-2 italic font-serif leading-relaxed">
                    {post.excerpt || post.custom_excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-primary">
                    <span className="text-[9px] font-bold uppercase tracking-widest">Begin Lesson</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- SECTION 3: TRENDING (The Gallery) --- */}
      <motion.section 
        initial={isMobile ? "visible" : "hidden"}
        whileInView={isMobile ? undefined : "visible"}
        viewport={{ once: true }}
        variants={revealVariants}
        className="container mx-auto px-6 md:px-8 max-w-7xl py-24 md:py-32 border-t border-border-light dark:border-border-dark"
      >
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">The Gallery</span>
          <h3 className="font-serif text-4xl md:text-6xl text-text-light dark:text-text-dark font-bold">Trending Aesthetics</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {trendingPosts.slice(0, homepageDisplayCount).map((post, idx) => (
            <article key={post.id} className={`group flex flex-col ${idx % 2 !== 0 ? 'md:mt-12' : ''}`}>
              <Link href={`/post/${post.slug}`} className="block overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6 relative aspect-[3/4] rounded-sm">
                {post.feature_image && (
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    fill
                    className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <span className="text-[9px] tracking-[0.2em] uppercase text-primary font-bold mb-2">0{idx + 1} — {post.primary_tag?.name || 'Featured'}</span>
              <h3 className="font-serif text-base md:text-xl text-text-light dark:text-text-dark font-bold leading-tight group-hover:text-primary transition-colors">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          {homepageDisplayCount < trendingPosts.length ? (
            <button 
              onClick={() => setHomepageDisplayCount(prev => Math.min(prev + 4, trendingPosts.length))}
              className="px-12 py-4 border border-border-light dark:border-border-dark text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 dark:text-gray-300 hover:text-primary hover:border-primary transition-all rounded-sm"
            >
              View More Trends
            </button>
          ) : (
            <button
              disabled
              className="px-12 py-4 border border-gray-200 dark:border-gray-800 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 dark:text-gray-600 cursor-not-allowed rounded-sm"
            >
              No More Trends
            </button>
          )}
        </div>
      </motion.section>

      {/* --- NEW SECTION 4: MORE TO EXPLORE (Latest Posts for SEO) --- */}
      <motion.section 
        initial={isMobile ? "visible" : "hidden"}
        whileInView={isMobile ? undefined : "visible"}
        viewport={{ once: true, margin: "-50px" }}
        variants={revealVariants}
        className="py-24 md:py-32 bg-stone-50 dark:bg-gray-900 border-t border-border-light dark:border-border-dark"
      >
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
               <div>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary mb-3 block">Infinite Inspiration</span>
                  <h3 className="font-serif text-5xl text-text-light dark:text-white font-bold">More to Explore</h3>
               </div>
               <p className="max-w-xs text-gray-500 text-xs italic leading-relaxed">
                  Our latest discoveries, from Amazon hidden gems to Sephora sale deep dives.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
               {allPosts?.slice(0, latestFeedCount).map((post) => (
                 <Link key={post.id} href={`/post/${post.slug}`} className="group flex flex-col">
                    <div className="relative aspect-[16/10] bg-gray-200 dark:bg-gray-800 rounded-sm mb-6 overflow-hidden border border-border-light dark:border-border-dark">
                       {post.feature_image && (
                         <Image 
                           src={post.feature_image} 
                           alt={post.title} 
                           fill 
                           className="object-cover md:transition-transform md:duration-500 md:group-hover:scale-105"
                           sizes="(max-width: 768px) 100vw, 25vw"
                         />
                       )}
                       <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                       <span className="text-[8px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-2 py-0.5">
                          {post.primary_tag?.name || 'Latest'}
                       </span>
                       <span className="w-8 h-[1px] bg-gray-200" />
                       <span className="text-[9px] text-gray-400 uppercase tracking-widest italic">New Post</span>
                    </div>
                    <h5 className="font-serif text-xl text-text-light dark:text-white font-bold group-hover:text-primary transition-colors leading-tight">
                       {post.title}
                    </h5>
                    <p className="mt-3 text-gray-400 text-[11px] font-serif italic line-clamp-2 leading-relaxed">
                       {post.custom_excerpt || post.excerpt}
                    </p>
                 </Link>
               ))}
            </div>

            {latestFeedCount < (allPosts?.length || 0) && (
              <div className="mt-20 text-center">
                 <button 
                  onClick={() => setLatestFeedCount(prev => prev + 4)}
                  className="group relative inline-flex items-center gap-4 px-12 py-5 border border-primary/30 text-[10px] font-bold uppercase tracking-[0.4em] text-text-light dark:text-white hover:bg-primary hover:text-white transition-all overflow-hidden"
                 >
                    <span className="relative z-10">Expand Your Horizon</span>
                    <Zap size={10} className="relative z-10 group-hover:scale-125 transition-transform" />
                 </button>
              </div>
            )}
         </div>
      </motion.section>

      {/* --- REFINED NEWSLETTER --- */}
      <section className="bg-bg-light dark:bg-bg-dark py-12 border-t border-border-light dark:border-border-dark transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-stone-50 dark:bg-gray-900 px-8 py-10 md:px-16 md:py-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 border border-border-light dark:border-border-dark">
            <div className="hidden md:block absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl" />
            
            <div className="relative z-10 flex items-center gap-6 text-left max-w-2xl">
              <div className="w-16 h-16 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Mail size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white font-bold leading-tight">
                  The Weekly <span className="italic font-light text-primary">Confidential.</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-serif italic mt-2">
                  Curated edits and luxury finds, delivered to 50,000+ beauty insiders.
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 flex flex-col sm:flex-row gap-0 w-full lg:w-max min-w-[320px] md:min-w-[450px] border border-gray-900 dark:border-white shadow-lg" 
                  onSubmit={handleSubscribe}
                >
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    className="flex-1 bg-white dark:bg-gray-800 px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase focus:outline-none dark:text-white"
                    required
                  />
                  <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary dark:hover:bg-primary hover:text-white transition-all whitespace-nowrap">
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 py-4 px-8 border-2 border-primary text-primary font-bold text-[10px] uppercase tracking-widest bg-primary/5"
                >
                  Welcome to the inner circle. check your inbox soon.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
