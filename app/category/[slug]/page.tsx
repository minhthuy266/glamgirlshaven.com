import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getPosts, getPostsByTag } from '@/src/lib/ghost';

interface CategoryProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Category({ params }: CategoryProps) {
  const { slug } = await params;
  
  // Format slug to readable category name
  const categoryName = slug === 'all' 
    ? 'All Articles' 
    : slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(' And ', ' & ');

  // Fetch real posts from Ghost
  const posts = slug === 'all' 
    ? await getPosts() 
    : await getPostsByTag(slug);

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-20">
        <header className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Collections</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter">
            {categoryName}
          </h1>
          <div className="w-24 h-[1px] bg-primary mx-auto mb-8"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-serif italic text-lg leading-relaxed">
            Explore our curated selection of articles, expert tips, and luxury recommendations in {categoryName}.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="group flex flex-col"
              >
                <Link href={`/post/${post.slug}`} className="relative overflow-hidden mb-6 aspect-[4/5] bg-gray-100 dark:bg-gray-800">
                  {post.feature_image ? (
                    <img 
                      src={post.feature_image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </Link>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-primary">
                      {post.primary_tag?.name || 'Beauty'}
                    </span>
                    <span className="w-8 h-[1px] bg-border-light dark:bg-border-dark"></span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                      {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed italic font-serif">
                    {post.custom_excerpt || post.excerpt}
                  </p>
                  <Link href={`/post/${post.slug}`} className="mt-auto text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 dark:text-white border-b border-gray-900 dark:border-white w-max pb-1 hover:text-primary hover:border-primary transition-all">
                    Read Story
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-border-light dark:border-border-dark">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6 italic">No articles found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 font-serif italic">We couldn't find any articles in this collection yet.</p>
            <Link href="/" className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 dark:text-white border border-gray-900 dark:border-white px-10 py-4 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all">
              Back to Home
            </Link>
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-24 text-center">
            <button className="px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary dark:hover:bg-primary transition-colors">
              Load More Stories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

