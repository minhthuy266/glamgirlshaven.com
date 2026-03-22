'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { GhostPost } from '@/src/lib/types';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryClientProps {
  initialPosts: GhostPost[];
  categoryName: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function CategoryClient({ initialPosts, categoryName }: CategoryClientProps) {
  const INITIAL_COUNT = 9;
  const PAGE_SIZE = 6;
  const [displayCount, setDisplayCount] = useState(INITIAL_COUNT);

  const featuredPost = initialPosts[0];
  // otherPosts: bỏ featured (index 0), lấy đến displayCount
  const totalOthers = initialPosts.length - 1; // không tính featured
  const otherPosts = initialPosts.slice(1, 1 + Math.min(displayCount, totalOthers));
  const hasMore = otherPosts.length < totalOthers;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + PAGE_SIZE, totalOthers));
  };

  return (
    <div className="pb-16">
      {/* --- Category Header & Featured Story --- */}
      <div className="mb-16 relative">
        
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="w-full lg:w-2/3 h-[500px] md:h-[650px] overflow-hidden relative group">
              <Link href={`/post/${featuredPost.slug}`}>
                <img 
                  src={featuredPost.feature_image || ''} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                <div className="absolute top-8 left-8">
                   <div className="px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      Must Read Story
                   </div>
                </div>
              </Link>
            </div>
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Featured Editor's Choice</span>
                <div className="w-12 h-px bg-primary/30" />
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light dark:text-white leading-[1.1]">
                <Link href={`/post/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                  {featuredPost.title}
                </Link>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-serif italic italic">
                {featuredPost.custom_excerpt || featuredPost.excerpt}
              </p>
              <Link 
                href={`/post/${featuredPost.slug}`}
                className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-text-light dark:text-white border-b-2 border-primary pb-2 hover:gap-6 transition-all"
              >
                Read Full Story <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-6 mb-16">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">Library Collections</h2>
        <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
      </div>

      {/* --- Responsive Grid --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
      >
        <AnimatePresence>
          {otherPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
              layout
              className="group flex flex-col"
            >
              <Link href={`/post/${post.slug}`} className="relative overflow-hidden mb-8 aspect-[4/5] bg-stone-100 dark:bg-gray-800">
                {post.feature_image ? (
                  <img 
                    src={post.feature_image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="text-primary/20" size={40} />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-primary">
                    {post.primary_tag?.name || categoryName}
                  </span>
                  <span className="w-6 h-[1px] bg-primary/20"></span>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-light dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed font-light italic">
                  {post.custom_excerpt || post.excerpt}
                </p>
                <Link href={`/post/${post.slug}`} className="mt-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-text-light dark:text-white group-hover:text-primary transition-all">
                  Full Story <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button — hiện khi còn bài, ẩn khi hết */}
      <div className="mt-16 text-center">
        {hasMore ? (
          <button 
            onClick={loadMore}
            className="group relative px-16 py-5 overflow-hidden border border-gray-900 dark:border-white"
          >
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors">
              Load More Stories
            </span>
          </button>
        ) : (
          <button
            disabled
            className="px-16 py-5 border border-gray-300 dark:border-gray-700 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-300 dark:text-gray-600 cursor-not-allowed"
          >
            No More Stories
          </button>
        )}
      </div>
    </div>
  );
}
