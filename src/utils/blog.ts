import { getCollection } from 'astro:content';

/**
 * Get all blog posts, optionally sorted by publication date
 * @param {boolean} sorted - Whether to sort posts by date (default: true)
 * @returns {Promise<Array>} Array of blog posts
 */
export async function getAllBlogPosts(sorted = true) {
  const posts = await getCollection('blog');

  if (sorted) {
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  }

  return posts;
}
