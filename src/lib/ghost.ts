export const GHOST_API_URL = process.env.NEXT_PUBLIC_GHOST_API_URL || 'https://glamgirlshaven.com';
export const GHOST_CONTENT_API_KEY = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '1337fc59d0b12e61b33bacafc2';

export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  html: string;
  url: string;
  excerpt?: string;
  custom_excerpt?: string;
  feature_image?: string;
  published_at: string;
  reading_time: number;
  primary_author?: {
    name: string;
    profile_image?: string;
  };
  primary_tag?: {
    name: string;
    slug: string;
  };
  tags?: {
    name: string;
    slug: string;
  }[];
}

const MOCK_POSTS: GhostPost[] = [
  {
    id: '1',
    title: '5 Viral Drugstore Dupes for High-End Skincare You Need to Try',
    slug: 'viral-drugstore-dupes',
    html: '<p>Save your money without compromising on quality...</p>',
    url: '#',
    excerpt: 'Save your money without compromising on quality. These drugstore alternatives perform just as well as their luxury counterparts.',
    feature_image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop',
    published_at: new Date().toISOString(),
    reading_time: 5,
    primary_author: { name: 'Sarah' },
    primary_tag: { name: 'Skincare', slug: 'skincare' }
  }
];

async function fetchWithTimeout(url: string, options: any = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function getPosts(): Promise<GhostPost[]> {
  const url = `${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors`;
  console.log('Fetching Ghost posts from:', url);
  try {
    const res = await fetchWithTimeout(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      console.error('Failed to fetch Ghost posts:', res.status, await res.text());
      return MOCK_POSTS;
    }
    
    const data = await res.json();
    console.log(`Fetched ${data.posts?.length || 0} posts`);
    return data.posts && data.posts.length > 0 ? data.posts : MOCK_POSTS;
  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    return MOCK_POSTS;
  }
}

export async function getPostsByTag(tagSlug: string): Promise<GhostPost[]> {
  const url = `${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_CONTENT_API_KEY}&filter=tag:${tagSlug}&include=tags,authors`;
  console.log(`Fetching Ghost posts for tag ${tagSlug} from:`, url);
  try {
    const res = await fetchWithTimeout(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      console.error(`Failed to fetch Ghost posts for tag ${tagSlug}:`, res.status, await res.text());
      return MOCK_POSTS.filter(p => p.primary_tag?.slug === tagSlug);
    }
    
    const data = await res.json();
    console.log(`Fetched ${data.posts?.length || 0} posts for tag ${tagSlug}`);
    return data.posts && data.posts.length > 0 ? data.posts : MOCK_POSTS.filter(p => p.primary_tag?.slug === tagSlug);
  } catch (error) {
    console.error(`Error fetching Ghost posts for tag ${tagSlug}:`, error);
    return MOCK_POSTS.filter(p => p.primary_tag?.slug === tagSlug);
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  const url = `${GHOST_API_URL}/ghost/api/content/posts/slug/${slug}/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors`;
  console.log(`Fetching Ghost post by slug ${slug} from:`, url);
  try {
    const res = await fetchWithTimeout(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      console.error(`Failed to fetch Ghost post ${slug}:`, res.status, await res.text());
      return MOCK_POSTS.find(p => p.slug === slug) || null;
    }
    
    const data = await res.json();
    const post = data.posts?.[0] || null;
    console.log(`Fetched post: ${post ? post.title : 'Not Found'}`);
    return post || MOCK_POSTS.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching Ghost post ${slug}:`, error);
    return MOCK_POSTS.find(p => p.slug === slug) || null;
  }
}
