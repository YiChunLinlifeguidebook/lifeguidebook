import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

let cachedPosts: CollectionEntry<'blog'>[] | null = null;

export async function getSortedBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  if (cachedPosts) {
    return cachedPosts;
  }

  const posts = await getCollection('blog');
  cachedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return cachedPosts;
}
