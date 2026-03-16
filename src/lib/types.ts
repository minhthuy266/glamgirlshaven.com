// Shared types — safe to import from both server and client components.
// Do NOT import ghost.ts functions here.

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
  updated_at?: string;
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
