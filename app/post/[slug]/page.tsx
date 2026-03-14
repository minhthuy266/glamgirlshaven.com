import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Facebook, Twitter, Linkedin, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { AffiliateDisclosure } from '@/src/components/affiliate/AffiliateDisclosure';
import { AuthorBox } from '@/src/components/affiliate/AuthorBox';
import { ComparisonTable, ComparisonProduct } from '@/src/components/affiliate/ComparisonTable';
import { GhostContent } from '@/src/components/ghost/GhostContent';
import { TableOfContents } from '@/src/components/layout/TableOfContents';
import { ReadingProgress } from '@/src/components/ui/ReadingProgress';
import { getPostBySlug, getPosts } from '@/src/lib/ghost';

// Mock Data for the comparison table (keep this as an example of mixing custom components with Ghost content)
const COMPARISON_PRODUCTS: ComparisonProduct[] = [
  {
    id: '1',
    name: 'CeraVe Hydrating Facial Cleanser',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop',
    bestFor: 'Dry & Sensitive Skin',
    rating: 4.8,
    price: '$14.99',
    link: '#',
    award: 'Best Overall'
  },
  {
    id: '2',
    name: 'La Roche-Posay Toleriane Purifying',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop',
    bestFor: 'Oily & Acne-Prone Skin',
    rating: 4.7,
    price: '$16.99',
    link: '#',
    award: 'Best for Oily Skin'
  },
  {
    id: '3',
    name: 'Neutrogena Hydro Boost',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop',
    bestFor: 'Dehydrated Skin',
    rating: 4.6,
    price: '$11.49',
    link: '#',
    award: 'Best Budget'
  }
];

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await getPosts();
  const trendingPosts = allPosts?.filter(p => p.slug !== slug).slice(0, 5) || [];

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
      <ReadingProgress />
      <article className="pb-32">
        
        {/* Luxury Editorial Header */}
        <header className="relative pt-20 pb-12 md:pt-32 md:pb-20 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {post.primary_tag && (
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                  {post.primary_tag.name}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
              <div className="flex items-center gap-4">
                <span className="text-gray-900 dark:text-white">Written By</span>
                <span className="text-primary">{post.primary_author?.name || 'Sarah Jenkins'}</span>
              </div>
              <span className="hidden md:block w-12 h-[1px] bg-border-light dark:bg-border-dark"></span>
              <div className="flex items-center gap-2">
                <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <span className="hidden md:block w-12 h-[1px] bg-border-light dark:bg-border-dark"></span>
              <div className="flex items-center gap-2">
                <span>{post.reading_time || 5} Minute Read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cinematic Featured Image */}
        {post.feature_image && (
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-16 md:mb-24 animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
              <img 
                src={post.feature_image} 
                alt={post.title} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div>
        )}

        {/* Layout Grid */}
        <div className="border-t border-border-light dark:border-border-dark bg-white dark:bg-bg-dark">
          <div className="container mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Sidebar: Table of Contents */}
              <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-bg-dark border-r border-border-light dark:border-border-dark p-8 xl:p-12">
                <div className="sticky top-24 space-y-12 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                <div className="mb-12">
                  <TableOfContents />
                </div>
                
                <div className="pt-12 border-t border-border-light dark:border-border-dark">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8 block">Share Story</span>
                  <div className="flex gap-6">
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-6 xl:col-span-6 bg-white dark:bg-bg-dark p-8 md:p-12 xl:p-20">
              <div className="mb-12">
                <AffiliateDisclosure />
              </div>

              {/* Table of Contents Mobile */}
              <div className="lg:hidden mb-12">
                <TableOfContents />
              </div>

              {/* Comparison Table Section */}
              <div className="mb-16 p-8 md:p-12 bg-white dark:bg-gray-900/30 border border-border-light dark:border-border-dark relative">
                <div className="absolute -top-4 left-8 bg-primary px-4 py-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white">The Edit</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-10 italic">The Quick Comparison</h2>
                <ComparisonTable products={COMPARISON_PRODUCTS} title="" />
              </div>

              {/* Render Real Ghost HTML Content */}
              <div className="editorial-content prose prose-lg dark:prose-invert max-w-none">
                <GhostContent html={post.html} />
              </div>

              {/* Author Box Component */}
              <div className="mt-32 pt-16 border-t border-border-light dark:border-border-dark">
                <AuthorBox 
                  name={post.primary_author?.name || 'Sarah Jenkins'}
                  role="Editor in Chief"
                  bio="Sarah is a certified esthetician and beauty editor with over a decade of experience in the luxury skincare market. She curates the finest finds for the modern woman."
                  image={post.primary_author?.profile_image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"}
                  socials={{
                    instagram: "#",
                    twitter: "#",
                    website: "#"
                  }}
                />
              </div>

              {/* Newsletter Section */}
              <div className="mt-32 p-12 bg-gray-900 dark:bg-gray-800 text-center">
                <h3 className="text-white font-serif text-3xl font-bold mb-4">The Haven Letter</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Join our inner circle for exclusive beauty insights and luxury finds.
                </p>
                <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="flex-grow bg-transparent border-b border-gray-700 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="bg-primary px-8 py-4 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary-dark transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Read Next Section - To keep audience longer */}
              <div className="mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <h3 className="text-2xl font-serif font-bold italic">Read Next</h3>
                  <div className="h-[1px] flex-grow bg-border-light dark:border-border-dark"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {trendingPosts.slice(0, 2).map((p) => (
                    <Link key={p.id} href={`/post/${p.slug}`} className="group block">
                      <div className="aspect-[16/10] overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
                        {p.feature_image && (
                          <img 
                            src={p.feature_image} 
                            alt={p.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-primary mb-2 block">
                        {p.primary_tag?.name || 'Editorial'}
                      </span>
                      <h4 className="text-xl font-serif font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                        {p.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Trending Now */}
            <aside className="lg:col-span-3 hidden lg:block border-l border-border-light dark:border-border-dark p-8 xl:p-12 bg-white dark:bg-bg-dark">
              <div className="sticky top-24 space-y-12 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-gray-500 dark:text-gray-400 mb-8">Trending</h3>
                  <div className="space-y-8">
                    {trendingPosts.map((p, i) => (
                      <Link key={p.id} href={`/post/${p.slug}`} className="group block">
                        <div className="flex flex-col gap-3">
                          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
                            {p.feature_image && (
                              <img 
                                src={p.feature_image} 
                                alt={p.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            )}
                            <div className="absolute top-0 left-0 bg-white dark:bg-gray-900 px-3 py-2">
                              <span className="text-[11px] font-sans font-bold text-gray-900 dark:text-white">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                            </div>
                          </div>
                          <h4 className="text-[17px] font-serif font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-3">
                            {p.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="relative aspect-[3/4] overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop" 
                    alt="Ad" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="border border-white/40 p-6 backdrop-blur-sm">
                      <span className="text-[10px] uppercase tracking-widest text-white font-bold mb-4 block">Summer Collection</span>
                      <h3 className="text-white font-serif text-2xl font-bold mb-6 italic">The Glow Edit</h3>
                      <button className="text-[9px] uppercase tracking-widest font-bold text-white border-b border-white pb-1">Shop The Look</button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        </div>
      </article>
    </div>
  );
}
