import { NextResponse } from 'next/server';
import { getPosts } from '@/src/lib/ghost';

export const dynamic = 'force-dynamic';

/**
 * GET /api/posts
 * Lightweight endpoint used by the client-side Header search overlay.
 * Only returns the fields needed for search (id, title, slug, tags).
 */
export async function GET() {
  try {
    const posts = await getPosts();
    // Return only what the search UI needs — not html/full content
    const slim = posts.map(({ id, title, slug, tags, primary_tag, feature_image, excerpt, custom_excerpt }) => ({
      id,
      title,
      slug,
      tags,
      primary_tag,
      feature_image,
      excerpt,
      custom_excerpt,
    }));
    return NextResponse.json(slim, {
      status: 200,
      headers: {
        // Cache for 5 minutes on the edge; revalidate in background
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    console.error('[/api/posts] Failed to fetch posts:', err);
    return NextResponse.json([], { status: 200 });
  }
}
