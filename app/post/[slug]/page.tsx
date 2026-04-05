import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { parse } from 'node-html-parser';
import { getPostBySlug, getPosts } from '@/src/lib/ghost';
import PostClient from './PostClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Return empty array so Next.js doesn't try to build all 1000+ posts at build time.
  // Posts will be built On-Demand (ISR) on the first visit and cached indefinitely.
  return [];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };

  const siteUrl = 'https://glamgirlshaven.com';
  const url = `${siteUrl}/post/${post.slug}`;
  const image = post.feature_image || 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=90&w=2600&auto=format&fit=crop';
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

  // 3. (Style injection removed — handled properly by node-html-parser in step 5a)

  // 4. CLEAN UP ALL RESIZING PATHS (CRITICAL FIX FOR 500 ERRORS)
  // Removed redundant regex removal of srcset/sizes as it's now handled by node-html-parser.

  // 3. Fix relative image URLs (Use GHOST API URL, not Site URL)
  const ghostBase = (process.env.NEXT_PUBLIC_GHOST_API_URL || process.env.GHOST_API_URL || 'https://api.glamgirlshaven.com').replace(/\/$/, '');
  processedHtml = processedHtml.replace(
    /src="(\/content\/images\/)/g,
    `src="${ghostBase}$1`
  );

  // 4b. Transform inline-styled ribbon cards into class-based HTML.
  //     Ghost custom HTML blocks use ALL inline styles (display:flex, white-space:nowrap)
  //     which beat any external CSS. We strip inline styles and add classes instead.
  processedHtml = processedHtml.replace(
    /<div\s+style="[^"]*display:\s*flex[^"]*"[^>]*>\s*<span\s+style="[^"]*"[^>]*>([\s\S]*?)<\/span>\s*<a\s+([^>]*href="[^"]*(?:amazon\.[a-z.]+|amzn\.to)[^"]*"[^>]*)style="[^"]*"([^>]*)>([\s\S]*?)<\/a>\s*<\/div>/gi,
    (match, spanText, aBeforeStyle, aAfterStyle, linkText) => {
      return `<div class="gh-ribbon-card"><span class="gh-ribbon-text">${spanText}</span><a ${aBeforeStyle} class="gh-ribbon-action" ${aAfterStyle}>${linkText}</a></div>`;
    }
  );

  // 4c. Strip Ghost inline styles on product card containers so CSS classes win on mobile
  processedHtml = processedHtml.replace(
    /(<div\s[^>]*class="[^"]*kg-product-card-container[^"]*")[^>]*style="[^"]*"([^>]*>)/gi,
    '$1$2'
  );
  processedHtml = processedHtml.replace(
    /(<a\s[^>]*class="[^"]*kg-product-card-button[^"]*")[^>]*style="[^"]*"([^>]*>)/gi,
    '$1$2'
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

  // ── SERVER-SIDE HTML MODIFICATION (Add unique IDs to headings + extract TOC) ──
  const toc: { id: string; text: string; level: number }[] = [];
  const idCounts = new Map<string, number>();

  processedHtml = processedHtml.replace(/<h(2|3)([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
    // Extract raw text and decode basic HTML entities
    const text = content
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Generate base slug
    const baseId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `section-${toc.length}`;

    // Ensure uniqueness
    let id = baseId;
    if (idCounts.has(id)) {
      const count = idCounts.get(id)! + 1;
      idCounts.set(id, count);
      id = `${id}-${count}`;
    } else {
      idCounts.set(id, 1);
    }

    toc.push({ level: parseInt(level), id, text });

    // Inject unique ID back into HTML
    let newAttrs = attrs;
    if (/id="/i.test(newAttrs)) {
      newAttrs = newAttrs.replace(/id="[^"]*"/i, `id="${id}"`);
    } else {
      newAttrs = ` id="${id}"${newAttrs}`;
    }

    return `<h${level}${newAttrs}>${content}</h${level}>`;
  });

  // 5. Fix Hydration Mismatch + CRITICAL mobile image fixes using node-html-parser
  const root = parse(processedHtml);

  // 5a. Fix images for mobile: Simplify image tags to solve iOS Safari rendering bugs.
  //     We REMOVE srcset and sizes because they often point to 404 thumbnails on the Ghost server,
  //     or cause iOS Safari to calculate a 0px width on mobile viewports.
  //     We also point src to the best available URL then let the browser handle it directly.
  const allImgs = root.querySelectorAll('img');
  allImgs.forEach(img => {
    let bestUrl = img.getAttribute('src') || '';
    const srcSet = img.getAttribute('srcset');
    
    // If we have a srcset, try to pick the largest available image.
    if (srcSet) {
      const candidates = srcSet.split(',').map(s => s.trim().split(' ')[0]);
      if (candidates.length > 0) {
        bestUrl = candidates[candidates.length - 1];
      }
    }

    // Apply absolute URL if it's a relative path from Ghost.
    // CRITICAL: We must use the Ghost API URL, NOT the public site URL, for images.
    if (bestUrl && bestUrl.startsWith('/content/')) {
      const ghostBase = process.env.NEXT_PUBLIC_GHOST_API_URL || process.env.GHOST_API_URL || 'https://api.glamgirlshaven.com';
      // Ensure no trailing slash on base and leading slash on path
      const base = ghostBase.replace(/\/$/, '');
      bestUrl = `${base}${bestUrl}`;
    }

    img.removeAttribute('srcset');
    img.removeAttribute('sizes');

    // Use OUR proxy API instead of Ghost domain directly.
    // This solves: 1. CORS issues, 2. SSL/Mixed Content blocks, 3. Bot-detection headers.
    if (bestUrl && bestUrl.startsWith('http')) {
      const proxiedSrc = `/api/proxy-image?url=${encodeURIComponent(bestUrl)}`;
      img.setAttribute('src', proxiedSrc);
    }

    // Fixed height, auto width, centered
    img.setAttribute('style', 'height:400px;width:auto;max-width:100%;display:block;margin:0 auto;object-fit:contain;background:#f9f9f9;');
    img.setAttribute('loading', 'eager'); 
    img.setAttribute('decoding', 'async');
  });

  // 5b. Fix <p> containing block-level elements (hydration mismatch)
  const pTags = root.querySelectorAll('p');
  pTags.forEach(p => {
    if (p.querySelector('div, figure, ul, ol, li, h1, h2, h3, h4, h5, h6, blockquote, pre, table')) {
      p.tagName = 'div';
      p.setAttribute('class', 'ghost-p-wrapper text-text-light dark:text-gray-300 text-[17px] md:text-[19px] leading-[1.8] mb-8');
    }
  });
  processedHtml = root.toString();

  // Inject mobile overrides AFTER node-html-parser so the style tag is preserved.
  // A <style> in the document body is parsed & applied by all modern browsers.
  processedHtml += `<style>
@media (max-width:768px){
  .gh-ribbon-card{display:block!important;padding:1.25rem!important;}
  .gh-ribbon-text{display:block!important;margin-bottom:.75rem!important;text-align:left!important;}
  .gh-ribbon-action{display:block!important;width:100%!important;box-sizing:border-box!important;white-space:normal!important;height:auto!important;min-height:44px!important;padding:.75rem 1rem!important;line-height:1.4!important;text-align:center!important;}
  .kg-product-card-container{display:flex!important;flex-direction:column!important;padding:1rem!important;gap:1rem!important;}
  .kg-product-card-image{width:100%!important;height:200px!important;align-self:auto!important;border-right:none!important;border-bottom:1px solid #f2ebeb!important;grid-column:auto!important;grid-row:auto!important;}
  .kg-product-card-button{display:block!important;width:100%!important;margin:.75rem 0 0 0!important;box-sizing:border-box!important;white-space:normal!important;height:auto!important;min-height:44px!important;padding:.75rem 1rem!important;line-height:1.4!important;text-align:center!important;}
}
</style>`;

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
      <PostClient post={post} trendingPosts={trendingPosts} processedHtml={processedHtml} tocData={toc} />
    </>
  );
}
