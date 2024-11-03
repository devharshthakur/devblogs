// src/lib/markdown.ts

/**
 * This file handles markdown processing using remark and rehype
 * Features:
 * - GitHub Flavored Markdown support
 * - Syntax highlighting
 * - Table of contents generation
 * - Custom component mapping
 * - Image optimization
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import { getBlogPost } from '@/lib/blog-posts';
import { BlogPost, TableOfContents } from '@/types/blog';

/**
 * Processes markdown content into HTML with enhanced features
 */
export async function processMarkdown(content: string): Promise<string> {
   const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypePrism)
      .use(rehypeStringify)
      .process(content);

   return result.toString();
}

/**
 * Generates table of contents from markdown content
 */
export function generateToc(content: string): TableOfContents {
   const headings = content.match(/#{1,3}\s+.+/g) || [];
   const toc = {
      items: headings.map((heading) => {
         const level = heading.match(/^#+/)?.[0].length || 1;
         const title = heading.replace(/^#+\s+/, '');
         const url = `#${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

         return { title, url, level };
      }),
   };

   return toc;
}

/**
 * Gets and processes a blog post
 */
export async function getProcessedBlogPost(slug: string): Promise<BlogPost | null> {
   const post = getBlogPost(slug);

   if (!post) {
      return null;
   }

   const processedContent = await processMarkdown(post.content);
   const toc = generateToc(post.content);

   return {
      ...post,
      content: processedContent,
      toc,
   };
}
