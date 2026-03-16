import type { Metadata } from 'next';
import { getPosts, getPostsByTag, GhostPost, SITE_URL } from '@/src/lib/ghost';
import HomeClient from './HomeClient';

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2600&auto=format&fit=crop';

export const metadata: Metadata = {
  title: { default: 'GlamGirls Haven — Luxury Beauty', template: '%s | GlamGirls Haven' },
  description:
    'A luxury beauty and lifestyle editorial platform featuring curated skincare, makeup, and wellness insights.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'GlamGirls Haven — Luxury Beauty',
    description:
      'A luxury beauty and lifestyle editorial platform featuring curated skincare, makeup, and wellness insights.',
    type: 'website',
    images: [{ url: FALLBACK_HERO, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [FALLBACK_HERO],
  },
};

export default async function HomePage() {
  // Fetch all posts + specific sections in parallel
  const [posts, verdictPosts, masterclassPosts, trendingTaggedPosts] = await Promise.all([
    getPosts(),
    getPostsByTag('editors-verdict'),
    getPostsByTag('masterclass'),
    getPostsByTag('trending'),
  ]);

  // Select Hero Post: ONLY change if explicitly tagged as 'hero' or 'featured'
  const heroPost = posts.find((p) => p.tags?.some((t) => t.slug === 'hero' || t.slug === 'featured'));
  
  // Always use the pink nail polish image as default unless a heroPost with a valid image exists
  const heroBgImage = heroPost?.feature_image || FALLBACK_HERO;
  
  const hotPost = heroPost || posts[0] || null;

  // Use real Masterclass-tagged posts; fall back to specific categories if none tagged
  const finalMasterclassPosts = masterclassPosts.length > 0 
    ? masterclassPosts 
    : posts.filter((p) => p.tags?.some((t) => ['skincare', 'wellness', 'makeup'].includes(t.slug)));

  // Use Trending-tagged posts first, otherwise fallback to general posts (excluding hot post)
  const finalTrendingPosts = trendingTaggedPosts.length > 0
    ? trendingTaggedPosts
    : posts.filter((p) => hotPost ? p.id !== hotPost.id : true);

  // Use real Verdict-tagged Ghost posts; fall back to first 3 site posts if none tagged
  const verdictProducts: GhostPost[] = verdictPosts.length > 0 ? verdictPosts.slice(0, 4) : posts.slice(0, 4);

  return (
    <HomeClient
      hotPost={hotPost}
      masterclassPosts={finalMasterclassPosts}
      trendingPosts={finalTrendingPosts}
      verdictProducts={verdictProducts}
      heroBgImage={heroBgImage}
    />
  );
}
