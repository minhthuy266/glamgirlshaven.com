import { MetadataRoute } from 'next';
import { getPosts } from '@/src/lib/ghost';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://glamgirlshaven.com';
  
  // Standard routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/disclosure',
    '/privacy',
    '/terms',
    '/category/skincare',
    '/category/makeup',
    '/category/haircare',
    '/category/wellness-self-love',
    '/category/fragrance-body',
    '/category/nails-beauty-tools',
    '/category/beauty-tips-hacks',
    '/category/gift-guides',
    '/category/all',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Ghost Post routes
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Error generating post sitemap URLs', error);
  }

  return [...routes, ...postRoutes];
}
