import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/src/lib/ghost';
import PostClient from './PostClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };

  const siteUrl = 'https://glamgirlshaven.com';
  const url = `${siteUrl}/post/${post.slug}`;
  const image = post.feature_image || 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop';
  const description = post.custom_excerpt || post.excerpt || '';
  const title = post.title || 'GlamGirls Haven Article';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.custom_excerpt || post.excerpt,
      url,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.primary_author?.name || 'GlamGirls Haven'],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.custom_excerpt || post.excerpt,
      images: [image],
    },
    other: {
      'article:published_time': post.published_at,
      'article:author': post.primary_author?.name || 'GlamGirls Haven',
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  // Exclude known static routes
  const STATIC_ROUTES = ['about', 'shop', 'contact', 'privacy', 'terms', 'accessibility'];
  if (STATIC_ROUTES.includes(slug)) notFound();

  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPosts()]);
  if (!post) notFound();

  const trendingPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 5);

  // ── Process post HTML on the SERVER so images are in the initial render ──
  // This prevents the client-side flash where all images load simultaneously.
  let processedHtml = post.html || '';

  // Removed lazy-loading regex because Safari collapses off-screen lazy images 
  // without explicit dimensions, causing severe continuous layout jumping.

  // 1. Change lazy to eager to prevent flickering/unloading on scroll
  processedHtml = processedHtml.replace(/loading="lazy"/gi, 'loading="eager"');

  // 2. Add decoding="async" to images that don't have it
  processedHtml = processedHtml.replace(/<img(?![^>]*decoding)/g, '<img decoding="async"');

  // 3. Force stable dimensions style to prevent layout shifts
  processedHtml = processedHtml.replace(/<img(?![^>]*style="[^"]*width)/g, '<img style="width:100%;height:auto;"');

  // 4. Resize Ghost-hosted images via Ghost's built-in resize API
  //    Ghost resize URL: /content/images/size/w900/year/month/file.jpg
  processedHtml = processedHtml.replace(
    /(\/content\/images\/)(?!size\/)(\d{4}\/)/g,
    '$1size/w900/$2'
  );

  // 3. Fix relative image URLs
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://glamgirlshaven.com';
  processedHtml = processedHtml.replace(
    /src="(\/content\/images\/)/g,
    `src="${siteBase}$1`
  );

  // 4. Open Amazon links in new tab with nofollow
  processedHtml = processedHtml.replace(
    /<a(\s[^>]*?)href="(https?:\/\/(?:www\.)?(?:amazon\.[a-z.]+|amzn\.to)\/[^"]*?)"([^>]*?)>/g,
    (match, before, href, after) => {
      const hasTarget = /target=/i.test(before + after);
      const hasRel = /rel=/i.test(before + after);
      let tag = `<a${before}href="${href}"${after}`;
      if (!hasTarget) tag += ' target="_blank"';
      if (!hasRel) tag += ' rel="nofollow sponsored"';
      return tag + '>';
    }
  );

  // JSON-LD Schema
  const siteUrl = 'https://glamgirlshaven.com';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...(post.primary_tag
        ? [{ '@type': 'ListItem', position: 2, name: post.primary_tag.name, item: `${siteUrl}/category/${post.primary_tag.slug}` }]
        : []),
      { '@type': 'ListItem', position: post.primary_tag ? 3 : 2, name: post.title, item: `${siteUrl}/post/${post.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/post/${post.slug}` },
    headline: post.title,
    description: post.custom_excerpt || post.excerpt,
    image: [post.feature_image],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: { '@type': 'Person', name: post.primary_author?.name || 'GlamGirls Haven' },
    publisher: {
      '@type': 'Organization',
      name: 'GlamGirls Haven',
      logo: { '@type': 'ImageObject', url: 'https://ui-avatars.com/api/?name=GlamGirls+Haven&background=B5838D&color=fff' },
    },
  };

  // Product Review Schema (Crucial for Amazon Affiliate)
  const isReview = post.tags?.some(t => ['amazon-finds', 'product-review'].includes(t.slug));
  const reviewSchema = isReview ? {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'Product',
      'name': post.title.split('Review')[0].trim(),
      'image': post.feature_image,
      'description': post.custom_excerpt || post.excerpt
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': post.custom_excerpt?.match(/(\d\.\d)\s*\/\s*5/)?.[1] ?? '4.5',
      'bestRating': '5'
    },
    'author': { '@type': 'Person', 'name': post.primary_author?.name || 'GlamGirls Haven' },
    'publisher': { '@type': 'Organization', 'name': 'GlamGirls Haven' }
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {reviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}
      {/* We only need trendingPosts, but adding related if needed later */}
      <PostClient post={post} trendingPosts={trendingPosts} processedHtml={processedHtml} />
    </>
  );
}
