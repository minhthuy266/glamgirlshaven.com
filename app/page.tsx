import Link from 'next/link';
import { ArrowRight, Heart, Star, ShoppingBag, Pin } from 'lucide-react';
import { AffiliateDisclosure } from '@/src/components/affiliate/AffiliateDisclosure';
import { ProductReviewBox } from '@/src/components/affiliate/ProductReviewBox';
import { getPosts } from '@/src/lib/ghost';

// Mock Data for sidebar
const AMAZON_FAVORITES = [
  {
    id: 'a1',
    name: 'CeraVe Hydrating Facial Cleanser',
    price: '$14.99',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    reviews: '124K',
  },
  {
    id: 'a2',
    name: 'Revlon One-Step Volumizer',
    price: '$39.87',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop',
    rating: 4.6,
    reviews: '350K',
  },
  {
    id: 'a3',
    name: 'COSRX Snail Mucin 96% Power Repairing Essence',
    price: '$17.00',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop',
    rating: 4.7,
    reviews: '89K',
  },
];

export default async function Home() {
  const posts = await getPosts();
  
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">No posts found</h1>
        <p className="text-gray-600">Please check your Ghost CMS connection.</p>
      </div>
    );
  }

  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);
  const recentPosts = posts.slice(3);

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
      
      {/* Luxury Split Hero Section */}
      <section className="relative border-b border-border-light dark:border-border-dark overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          {/* Left: Content */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 relative">
            <div className="absolute top-8 left-8 hidden xl:block">
              <span className="rail-text">Featured Editorial</span>
            </div>
            
            <div className="max-w-lg animate-in fade-in slide-in-from-left-8 duration-1000">
              {featuredPost.primary_tag && (
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block">
                  {featuredPost.primary_tag.name}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-[0.9] tracking-tighter">
                <Link href={`/post/${featuredPost.slug}`} className="hover:text-primary transition-colors duration-500">
                  {featuredPost.title}
                </Link>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base mb-8 leading-relaxed font-serif italic line-clamp-2">
                {featuredPost.custom_excerpt || featuredPost.excerpt}
              </p>
              <Link 
                href={`/post/${featuredPost.slug}`} 
                className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 dark:text-white group"
              >
                Read the Story 
                <span className="w-10 h-[1px] bg-gray-900 dark:bg-white transition-all duration-500 group-hover:w-16"></span>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-[50vh] lg:h-auto overflow-hidden">
            {featuredPost.feature_image && (
              <img 
                src={featuredPost.feature_image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md p-4 border border-white/20 hidden md:block">
              <span className="text-[10px] uppercase tracking-widest text-white font-bold">Issue No. 04 — 2024</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
        
        {/* Secondary Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {posts.slice(1, 4).map((post, idx) => (
            <article key={post.id} className="flex flex-col">
              <Link href={`/post/${post.slug}`} className="relative aspect-[4/5] overflow-hidden mb-6 group">
                {post.feature_image && (
                  <img 
                    src={post.feature_image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
              </Link>
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-3 block">
                  {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 leading-tight hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h2>
                <Link href={`/post/${post.slug}`} className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary hover:text-primary-dark transition-colors">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-12 border-b border-border-light dark:border-border-dark pb-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white italic">The Latest</h2>
              <Link href="/category/all" className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-primary transition-colors">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {posts.slice(4).map((post) => (
                <article key={post.id} className="group">
                  <div className="relative overflow-hidden aspect-[3/2] mb-6">
                    {post.feature_image && (
                      <img 
                        src={post.feature_image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary mb-3 block">
                      {post.primary_tag?.name || 'Beauty'}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/post/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-6 line-clamp-2 leading-relaxed">
                      {post.custom_excerpt || post.excerpt}
                    </p>
                    <Link href={`/post/${post.slug}`} className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-900 dark:text-white border-b border-gray-900 dark:border-white w-max pb-1 hover:text-primary hover:border-primary transition-all">
                      Read Story
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-24 pt-16 border-t border-border-light dark:border-border-dark text-center">
              <button className="px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary dark:hover:bg-primary transition-colors">
                Load More Stories
              </button>
            </div>
          </div>

          {/* Luxury Sidebar */}
          <aside className="lg:col-span-4 space-y-16">
            
            {/* About Widget */}
            <div className="relative p-8 border border-border-light dark:border-border-dark text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" 
                  alt="Author" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-serif text-3xl font-bold mb-4">Sarah Jenkins</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-8 leading-relaxed uppercase tracking-widest font-bold">
                Editor in Chief
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 leading-relaxed italic font-serif">
                "Curating the finest in beauty and wellness for the modern woman who values substance as much as style."
              </p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Signature_of_Sarah_Palin.svg/1200px-Signature_of_Sarah_Palin.svg.png" alt="Signature" className="h-10 mx-auto opacity-40 dark:invert" />
            </div>

            {/* Newsletter */}
            <div className="bg-gray-900 dark:bg-gray-800 p-12 text-center">
              <h3 className="text-white font-serif text-3xl font-bold mb-4">The Haven Letter</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Join our inner circle for exclusive beauty insights and luxury finds.
              </p>
              <form className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors text-center"
                />
                <button className="w-full bg-primary py-4 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary-dark transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Amazon Favorites */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] flex-grow bg-border-light dark:border-border-dark"></div>
                <h3 className="font-serif text-xl font-bold italic">Curated Finds</h3>
                <div className="h-[1px] flex-grow bg-border-light dark:border-border-dark"></div>
              </div>
              <div className="space-y-10">
                {AMAZON_FAVORITES.map((item) => (
                  <div key={item.id} className="group flex gap-6 items-center">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-primary text-xs font-bold mb-2">{item.price}</p>
                      <Link href="#" className="text-[9px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-1">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
