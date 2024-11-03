// src/types/blog.ts

/**
 * This file defines the core types used throughout the blog application
 * It provides TypeScript interfaces for blog posts and their metadata
 * These types ensure consistency in data structure across the application
 *
 * Key types:
 * - BlogPost: Represents a complete blog post including content
 * - BlogMeta: Represents just the metadata of a blog post
 * - BlogAuthor: Represents author information
 */

export interface BlogAuthor {
   name: string;
   avatar?: string;
   bio?: string;
}

export interface BlogMeta {
   slug: string; // URL-friendly identifier for the post
   title: string; // Post title
   date: string; // Publication date in ISO format
   excerpt: string; // Brief description/preview of the post
   author: BlogAuthor; // Author information
   tags: string[]; // Categories/tags for the post
   readingTime?: string; // Estimated reading time
   featured?: boolean; // Whether this is a featured post
}

export interface BlogPost extends BlogMeta {
   content: string; // The full HTML content of the post
   toc?: TableOfContents; // Optional table of contents
}

export interface TocItem {
   title: string;
   url: string;
   items?: TocItem[];
}

export interface TableOfContents {
   items: TocItem[];
}
