// src/app/blog/[slug]/page.tsx

/**
 * This component renders individual blog posts
 * Features:
 * - Markdown rendering with syntax highlighting
 * - Table of contents
 * - Author information
 * - Related posts
 * - Previous/Next navigation
 * - Social share buttons
 * - Responsive layout
 */

import { getProcessedBlogPost } from '@/lib/markdown';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Generate static paths for all blog posts
export async function generateStaticParams() {
   const posts = getAllBlogPosts();
   return posts.map((post) => ({
      slug: post.slug,
   }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
   const resolvedParams = await Promise.resolve(params);
   const post = await getProcessedBlogPost(resolvedParams.slug);

   if (!post) {
      return {
         title: 'Post Not Found',
      };
   }

   return {
      title: post.title,
      description: post.excerpt,
      authors: [{ name: post.author.name }],
      keywords: post.tags,
   };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
   const resolvedParams = await Promise.resolve(params);
   const post = await getProcessedBlogPost(resolvedParams.slug);

   if (!post) {
      notFound();
   }

   // Get all posts for navigation
   const allPosts = getAllBlogPosts();
   const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
   const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
   const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

   // Get related posts (posts with matching tags)
   const relatedPosts = allPosts
      .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
      .slice(0, 3);

   return (
      <div className="container mx-auto px-4 py-8">
         <article className="mx-auto max-w-4xl">
            {/* Post Header */}
            <header className="mb-8">
               <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
               <div className="mb-4 flex items-center gap-4">
                  <Avatar>
                     <AvatarImage src={post.author.avatar} alt={post.author.name} />
                     <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                     <p className="font-medium">{post.author.name}</p>
                     <p className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()} · {post.readingTime}
                     </p>
                  </div>
               </div>
               <div className="flex gap-2">
                  {post.tags.map((tag) => (
                     <Link
                        key={tag}
                        href={`/blog/tag/${tag}`}
                        className="rounded-full bg-primary/10 px-2 py-1 text-sm text-primary transition-colors hover:bg-primary/20"
                     >
                        {tag}
                     </Link>
                  ))}
               </div>
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
               <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Social Share */}
            <div className="my-8 flex justify-center gap-4">
               <Button variant="outline" size="sm">
                  <FaTwitter className="mr-2 h-4 w-4" />
                  Share on Twitter
               </Button>
               <Button variant="outline" size="sm">
                  <FaLinkedin className="mr-2 h-4 w-4" />
                  Share on LinkedIn
               </Button>
               <Button variant="outline" size="sm">
                  <FaFacebook className="mr-2 h-4 w-4" />
                  Share on Facebook
               </Button>
            </div>

            {/* Author Bio */}
            {post.author.bio && (
               <Card className="my-8">
                  <CardHeader>
                     <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                           <AvatarImage src={post.author.avatar} alt={post.author.name} />
                           <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                           <h3 className="text-lg font-semibold">About {post.author.name}</h3>
                           <p className="text-muted-foreground">{post.author.bio}</p>
                        </div>
                     </div>
                  </CardHeader>
               </Card>
            )}

            {/* Post Navigation */}
            <nav className="my-8 flex justify-between">
               {previousPost && (
                  <Button variant="ghost" asChild>
                     <Link href={`/blog/${previousPost.slug}`}>
                        <FiChevronLeft className="mr-2 h-4 w-4" />
                        {previousPost.title}
                     </Link>
                  </Button>
               )}
               {nextPost && (
                  <Button variant="ghost" asChild className="ml-auto">
                     <Link href={`/blog/${nextPost.slug}`}>
                        {nextPost.title}
                        <FiChevronRight className="ml-2 h-4 w-4" />
                     </Link>
                  </Button>
               )}
            </nav>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
               <section className="my-8">
                  <h2 className="mb-4 text-2xl font-bold">Related Posts</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                     {relatedPosts.map((relatedPost) => (
                        <Card key={relatedPost.slug}>
                           <CardContent className="p-4">
                              <h3 className="mb-2 font-semibold">
                                 <Link href={`/blog/${relatedPost.slug}`} className="hover:underline">
                                    {relatedPost.title}
                                 </Link>
                              </h3>
                              <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </section>
            )}
         </article>
      </div>
   );
}
