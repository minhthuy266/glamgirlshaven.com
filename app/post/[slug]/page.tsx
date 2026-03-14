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
  const image = post.feature_image || `${siteUrl}/og-default.jpg`;

  return {
    title: post.title,
    description: post.custom_excerpt || post.excerpt,
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
    dateModified: post.published_at,
    author: { '@type': 'Person', name: post.primary_author?.name || 'GlamGirls Haven' },
    publisher: {
      '@type': 'Organization',
      name: 'GlamGirls Haven',
      logo: { '@type': 'ImageObject', url: 'https://ui-avatars.com/api/?name=GlamGirls+Haven&background=B5838D&color=fff' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* We only need trendingPosts, but adding related if needed later */}
      <PostClient post={post} trendingPosts={trendingPosts} />
    </>
  );
}
