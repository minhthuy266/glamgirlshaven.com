import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getPosts, getPostsByTag } from '@/src/lib/ghost';
import CategoryClient from './CategoryClient';

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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-20 relative overflow-hidden">
        {/* Chữ nền — clip trong vùng container max-w-7xl */}
        <div className="absolute top-16 right-0 text-[10rem] md:text-[18rem] leading-none font-serif font-bold text-primary/5 select-none pointer-events-none hidden lg:block">
          {categoryName}
        </div>

        <header className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-6 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold">
            <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
            <span className="text-primary/30">/</span>
            <span className="text-primary">Collections</span>
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
          <CategoryClient initialPosts={posts} categoryName={categoryName} />
        ) : (
          <div className="text-center py-32 border border-dashed border-border-light dark:border-border-dark">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6 italic">No articles found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 font-serif italic">We couldn't find any articles in this collection yet.</p>
            <Link href="/" className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 dark:text-white border border-gray-900 dark:border-white px-10 py-4 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

