import type { Metadata } from 'next';
import { getPosts, getPostsByTag, GhostPost, SITE_URL } from '@/src/lib/ghost';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

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
  const [posts, verdictPosts, academyPosts, trendingTaggedPosts] = await Promise.all([
    getPosts(),
    getPostsByTag('editors-verdict'),
    getPostsByTag('academy'),
    getPostsByTag('trending'),
  ]);

  // Select Hero Post: ONLY change if explicitly tagged as 'hero' or 'featured'
  const heroPost = posts.find((p) => p.tags?.some((t) => t.slug === 'hero' || t.slug === 'featured'));
  
  // Always use the pink nail polish image as default unless a heroPost with a valid image exists
  const heroBgImage = heroPost?.feature_image || FALLBACK_HERO;
  
  const hotPost = heroPost || posts[0] || null;

  // Use real Academy-tagged posts ONLY
  const finalAcademyPosts = academyPosts;

  // Use Trending-tagged posts ONLY
  const finalTrendingPosts = trendingTaggedPosts;

  // Use real Verdict-tagged Ghost posts ONLY
  const verdictProducts: GhostPost[] = verdictPosts.slice(0, 4);

  const slim = (posts: GhostPost[]) =>
    posts.map(({ id, title, slug, tags, primary_tag, feature_image, excerpt, custom_excerpt }) => ({
      id,
      title,
      slug,
      tags,
      primary_tag,
      feature_image,
      excerpt,
      custom_excerpt,
    })) as GhostPost[];

  return (
    <HomeClient
      hotPost={hotPost ? slim([hotPost])[0] : undefined}
      masterclassPosts={slim(finalAcademyPosts)}
      trendingPosts={slim(finalTrendingPosts)}
      verdictProducts={slim(verdictProducts)}
      heroBgImage={heroBgImage}
      allPosts={slim(posts)}
    />
  );
}
