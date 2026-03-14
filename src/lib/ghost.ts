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
    html: '<p>Save your money without compromising on quality. These drugstore alternatives perform just as well as their luxury counterparts. We tested 20 different products to find these top 5 winners.</p>',
    url: '#',
    excerpt: 'Save your money without compromising on quality. These drugstore alternatives perform just as well as their luxury counterparts.',
    feature_image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop',
    published_at: new Date().toISOString(),
    reading_time: 5,
    primary_author: { name: 'Sarah' },
    primary_tag: { name: 'Skincare', slug: 'skincare' },
    tags: [{ name: 'Skincare', slug: 'skincare' }, { name: 'Amazon Finds', slug: 'amazon-finds' }]
  },
  {
    id: '2',
    title: 'The Ultimate Guide to "Clean Girl" Makeup for Beginners',
    slug: 'clean-girl-makeup-guide',
    html: '<p>The "clean girl" aesthetic is all about minimalism and enhancing your natural beauty...</p>',
    url: '#',
    excerpt: 'The "clean girl" aesthetic is all about minimalism and enhancing your natural beauty. Learn how to achieve this effortless look.',
    feature_image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop',
    published_at: new Date().toISOString(),
    reading_time: 7,
    primary_author: { name: 'Sarah' },
    primary_tag: { name: 'Makeup', slug: 'makeup' },
    tags: [{ name: 'Makeup', slug: 'makeup' }]
  },
  {
    id: '3',
    title: 'How to Restore Damaged Hair: A 3-Step Routine',
    slug: 'restore-damaged-hair',
    html: '<p>Heat styling and chemical treatments can take a toll on your locks. Discover our proven 3-step routine to bring back your hair\'s health.</p>',
    url: '#',
    excerpt: 'Heat styling and chemical treatments can take a toll on your locks.',
    feature_image: 'https://images.unsplash.com/photo-1527799822343-202673ea41e5?q=80&w=1000&auto=format&fit=crop',
    published_at: new Date().toISOString(),
    reading_time: 4,
    primary_author: { name: 'Sarah' },
    primary_tag: { name: 'Haircare', slug: 'haircare' },
    tags: [{ name: 'Haircare', slug: 'haircare' }]
  },
  {
    id: '4',
    title: 'Morning Rituals for Intentional Wellness',
    slug: 'morning-wellness-rituals',
    html: '<p>Start your day with purpose. From meditation to the perfect cup of tea, these rituals will transform your morning...</p>',
    url: '#',
    excerpt: 'Start your day with purpose. These ritual will transform your morning.',
    feature_image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
    published_at: new Date().toISOString(),
    reading_time: 6,
    primary_author: { name: 'Sarah' },
    primary_tag: { name: 'Wellness', slug: 'wellness-self-love' },
    tags: [{ name: 'Wellness', slug: 'wellness-self-love' }]
  },
  {
    id: '5',
    title: 'The Best Fall Fragrances to Wear This Season',
    slug: 'best-fall-fragrances',
    html: '<p>Warm, spicy, and woody. Find your new signature scent with our editor\'s top picks for autumn.</p>',
    url: '#',
    excerpt: 'Find your new signature scent with our editor\'s top picks for autumn.',
    feature_image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
    published_at: new Date().toISOString(),
    reading_time: 5,
    primary_author: { name: 'Sarah' },
    primary_tag: { name: 'Fragrance', slug: 'fragrance-body' },
    tags: [{ name: 'Fragrance', slug: 'fragrance-body' }]
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
  // Check mock first if it's a known mock slug to avoid unnecessary API errors in logs
  const mockPost = MOCK_POSTS.find(p => p.slug === slug);
  
  const url = `${GHOST_API_URL}/ghost/api/content/posts/slug/${slug}/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors`;
  console.log(`Fetching Ghost post by slug ${slug} from: ${url}`);
  
  try {
    const res = await fetchWithTimeout(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      // Only log as error if it's NOT a mock slug, otherwise it's expected
      if (!mockPost) {
        const errorText = await res.text().catch(() => 'No error body');
        console.error(`Failed to fetch Ghost post ${slug}: ${res.status}`, errorText);
      }
      return mockPost || null;
    }
    
    const data = await res.json();
    const post = data.posts?.[0] || null;
    return post || mockPost || null;
  } catch (error) {
    if (!mockPost) {
      console.error(`Error fetching Ghost post ${slug}:`, error);
    }
    return mockPost || null;
  }
}
