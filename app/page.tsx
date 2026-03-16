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
  // Fetch all posts + amazon-tagged posts in parallel
  const [posts, amazonPosts] = await Promise.all([
    getPosts(),
    getPostsByTag('amazon-finds'),
  ]);

  const hotPost =
    posts.find((p) => p.tags?.some((t) => t.slug === 'beauty-finds' || t.slug === 'skincare')) ||
    posts[0] || 
    null;

  const organizationPosts = posts.filter((p) =>
    p.tags?.some((t) => ['skincare', 'wellness', 'makeup'].includes(t.slug)),
  );

  const finalOrganizationPosts = organizationPosts.length > 0 ? organizationPosts : posts.slice(0, 4);
  const trendingPosts = posts.filter((p) => hotPost ? p.id !== hotPost.id : true);

  // Use hotPost's feature_image for hero, fall back to Unsplash default
  const heroBgImage = hotPost?.feature_image?.startsWith('http')
    ? hotPost.feature_image
    : FALLBACK_HERO;

  // Use real Amazon-tagged Ghost posts; fall back to first 3 site posts if none tagged
  const amazonProducts: GhostPost[] = amazonPosts.length > 0 ? amazonPosts.slice(0, 4) : posts.slice(0, 4);

  return (
    <HomeClient
      hotPost={hotPost}
      organizationPosts={finalOrganizationPosts}
      trendingPosts={trendingPosts}
      amazonProducts={amazonProducts}
      heroBgImage={heroBgImage}
    />
  );
}
