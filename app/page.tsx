import type { Metadata } from 'next';
import { getPosts, GhostPost } from '@/src/lib/ghost';
import HomeClient from './HomeClient';

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2600&auto=format&fit=crop';

export const metadata: Metadata = {
  title: 'GlamGirls Haven — Luxury Beauty',
  description:
    'A luxury beauty and lifestyle editorial platform featuring curated skincare, makeup, and wellness insights.',
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

const AMAZON_FAVORITES = [
  {
    id: 'a1',
    title: 'CeraVe Hydrating Facial Cleanser',
    slug: 'viral-drugstore-dupes',
    feature_image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop',
    custom_excerpt: '$14.99|Skincare',
  },
  {
    id: 'a2',
    title: 'Revlon One-Step Volumizer',
    slug: 'restore-damaged-hair',
    feature_image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop',
    custom_excerpt: '$39.87|Hair',
  },
  {
    id: 'a3',
    title: 'COSRX Snail Mucin 96% Power',
    slug: 'clean-girl-makeup-guide',
    feature_image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop',
    custom_excerpt: '$17.00|Skincare',
  },
];

export default async function HomePage() {
  const posts = (await getPosts()) as GhostPost[];

  const hotPost =
    posts.find((p) => p.tags?.some((t) => t.slug === 'beauty-finds' || t.slug === 'skincare')) ||
    posts[0];

  const organizationPosts = posts.filter((p) =>
    p.tags?.some((t) =>
      ['skincare', 'wellness', 'makeup'].includes(t.slug),
    ),
  );
  
  // If no organizationPosts, fallback to posts
  const finalOrganizationPosts = organizationPosts.length > 0 ? organizationPosts : posts.slice(0, 4);
  const trendingPosts = posts.filter((p) => p.id !== hotPost?.id);

  const heroBgImage = FALLBACK_HERO;

  return (
    <HomeClient
      hotPost={hotPost}
      organizationPosts={finalOrganizationPosts}
      trendingPosts={trendingPosts}
      amazonProducts={AMAZON_FAVORITES as any}
      heroBgImage={heroBgImage}
    />
  );
}
