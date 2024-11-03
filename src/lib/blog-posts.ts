// src/lib/blog-posts.ts

/**
 * This file handles all blog post related operations including:
 * - Reading markdown files from the content directory
 * - Parsing frontmatter metadata
 * - Sorting and filtering posts
 * - Generating reading time estimates
 * - Validating post metadata
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogMeta, BlogPost } from '@/types/blog';

// Constants
const POSTS_DIRECTORY = path.join(process.cwd(), 'src/content/posts');
const WORDS_PER_MINUTE = 200;

/**
 * Calculates estimated reading time for given text
 */
function calculateReadingTime(content: string): string {
   const words = content.trim().split(/\s+/).length;
   const minutes = Math.ceil(words / WORDS_PER_MINUTE);
   return `${minutes} min read`;
}

/**
 * Validates and processes post metadata
 */
function processPostMetadata(slug: string, data: matter.GrayMatterFile<string>['data']): BlogMeta {
   // Validate required fields
   if (!data.title || !data.date || !data.excerpt) {
      throw new Error(`Missing required fields in ${slug}`);
   }

   return {
      slug,
      title: String(data.title),
      date: new Date(data.date).toISOString(),
      excerpt: String(data.excerpt),
      author: {
         name: String(data.author || 'Anonymous'),
         avatar: data.authorAvatar,
         bio: data.authorBio,
      },
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: Boolean(data.featured),
   };
}

/**
 * Gets all blog posts metadata
 */
export function getAllBlogPosts(): BlogMeta[] {
   // Ensure the posts directory exists
   if (!fs.existsSync(POSTS_DIRECTORY)) {
      return [];
   }

   const fileNames = fs.readdirSync(POSTS_DIRECTORY);

   const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
         const slug = fileName.replace(/\.md$/, '');
         const fullPath = path.join(POSTS_DIRECTORY, fileName);
         const fileContents = fs.readFileSync(fullPath, 'utf8');
         const { data } = matter(fileContents);

         return processPostMetadata(slug, data);
      })
      .sort((a, b) => b.date.localeCompare(a.date));

   return allPostsData;
}

/**
 * Gets a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
   try {
      const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
         ...processPostMetadata(slug, data),
         content,
         readingTime: calculateReadingTime(content),
      };
   } catch (error) {
      console.error(`Error loading post ${slug}:`, error);
      return null;
   }
}

/**
 * Gets featured blog posts
 */
export function getFeaturedPosts(): BlogMeta[] {
   return getAllBlogPosts().filter((post) => post.featured);
}

/**
 * Gets posts by tag
 */
export function getPostsByTag(tag: string): BlogMeta[] {
   return getAllBlogPosts().filter((post) => post.tags.includes(tag.toLowerCase()));
}
