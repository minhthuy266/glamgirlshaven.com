// This module is SERVER-SIDE ONLY.
// Adding 'server-only' ensures Next.js throws a build error if a client
// component tries to import anything from this file.
import 'server-only';

import type { GhostPost } from './types';
export type { GhostPost };

export const GHOST_API_URL = process.env.GHOST_API_URL || 'https://api.glamgirlshaven.com';
export const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY || '';

if (!GHOST_CONTENT_API_KEY) {
  // Use warn instead of error to avoid triggering fatal dev overlays in Next.js 15
  console.warn(
    '[ghost.ts] CRITICAL: GHOST_CONTENT_API_KEY env var is not set. ' +
    'All Ghost API requests will return empty results. Set this variable to enable real content.'
  );
}
if (process.env.NODE_ENV === 'production' && !process.env.GHOST_API_URL) {
  console.warn('[ghost.ts] WARNING: GHOST_API_URL env var is not set. Falling back to hardcoded production URL.');
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://glamgirlshaven.com';


async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000) {
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

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop';

const normalizeUrl = (url?: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  
  // Ghost relative paths
  if (url.startsWith('/content/images') || url.startsWith('content/images')) {
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${GHOST_API_URL}${cleanPath}`;
  }
  
  // Any other relative path starting with /
  if (url.startsWith('/')) {
    return `${GHOST_API_URL}${url}`;
  }
  
  return url;
};

const mapPost = (p: any): GhostPost => ({
  ...p,
  feature_image: normalizeUrl(p.feature_image) || DEFAULT_COVER,
  primary_author: p.primary_author ? {
    ...p.primary_author,
    profile_image: normalizeUrl(p.primary_author.profile_image)
  } : undefined
});

// Base query params shared by all list requests
const BASE_PARAMS = `key=${GHOST_CONTENT_API_KEY}&include=tags,authors&limit=50`;

export async function getPosts(): Promise<GhostPost[]> {
  if (!GHOST_CONTENT_API_KEY) return [];

  const url = `${GHOST_API_URL}/ghost/api/content/posts/?${BASE_PARAMS}&filter=status:published`;
  try {
    const res = await fetchWithTimeout(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status !== 401 && res.status !== 403) {
        console.warn('Failed to fetch Ghost posts:', res.status);
      }
      return [];
    }

    const data = await res.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];

    if (data.meta?.pagination?.pages > 1) {
      console.warn(`[ghost.ts] getPosts: ${data.meta.pagination.total} posts exist but only fetched first 50. Consider paginating.`);
    }

    return posts.map(mapPost);
  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    return [];
  }
}

export async function getPostsByTag(tagSlug: string): Promise<GhostPost[]> {
  if (!GHOST_CONTENT_API_KEY) return [];

  // Important: Join filters with '+' (url-encoded as %2B) into a single 'filter' parameter
  const url = `${GHOST_API_URL}/ghost/api/content/posts/?${BASE_PARAMS}&filter=status:published%2Btag:${tagSlug}`;
  try {
    const res = await fetchWithTimeout(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status !== 401 && res.status !== 403) {
        console.warn(`Failed to fetch Ghost posts for tag ${tagSlug}:`, res.status);
      }
      return [];
    }

    const data = await res.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];
    return posts.map(mapPost);
  } catch (error) {
    console.error(`Error fetching Ghost posts for tag ${tagSlug}:`, error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!GHOST_CONTENT_API_KEY) return null;

  const url = `${GHOST_API_URL}/ghost/api/content/posts/slug/${slug}/?${BASE_PARAMS}`;

  try {
    const res = await fetchWithTimeout(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status !== 401 && res.status !== 403) {
        console.error(`Failed to fetch Ghost post ${slug}: ${res.status}`);
      }
      return null;
    }

    const data = await res.json();
    const post = Array.isArray(data.posts) ? data.posts[0] : null;
    return post ? mapPost(post) : null;
  } catch (error) {
    console.warn(`Error fetching Ghost post ${slug}:`, error);
    return null;
  }
}
