// src/app/page.tsx

/**
 * Home page component for the blog
 * Features:
 * - Hero section with blog introduction
 * - Featured/latest blog posts
 * - Navigation to other sections
 * - GitHub profile link
 * - Responsive layout
 *
 * This component fetches blog posts from markdown files
 * and displays them in a grid layout using shadcn/ui components
 */

import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGithub } from 'react-icons/fa';

// Configuration
const GITHUB_HANDLE = 'your-github-handle';
const LATEST_POSTS_LIMIT = 3;

export default function BlogHome() {
   // Get latest blog posts
   const latestPosts = getAllBlogPosts().slice(0, LATEST_POSTS_LIMIT);

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <header className="border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
               <Link href="/" className="text-2xl font-bold">
                  My Blog
               </Link>
               <nav className="flex items-center gap-4">
                  <Button asChild variant="outline">
                     <Link href="/blog">Blog</Link>
                  </Button>
                  <Button asChild variant="outline">
                     <Link href="/about">About</Link>
                  </Button>
                  <Button asChild variant="outline">
                     <Link href="/contact">Contact</Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                     <Link href={`https://github.com/${GITHUB_HANDLE}`} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                     </Link>
                  </Button>
               </nav>
            </div>
         </header>

         {/* Main Content */}
         <main className="container mx-auto flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-4 py-12">
            {/* Hero Section */}
            <section className="mb-16 max-w-2xl text-center">
               <h1 className="mb-6 text-4xl font-bold">Welcome to My Blog</h1>
               <p className="mb-8 text-xl text-muted-foreground">
                  Explore my thoughts on web development, design, and more.
               </p>
            </section>

            {/* Latest Posts Section */}
            <section className="w-full max-w-4xl">
               <h2 className="mb-8 text-center text-2xl font-semibold">Latest Posts</h2>
               <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {latestPosts.map((post) => (
                     <Card key={post.slug} className="flex flex-col">
                        <CardHeader>
                           <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="mt-auto flex justify-between">
                           <Button asChild variant="default">
                              <Link href={`/blog/${post.slug}`}>Read More</Link>
                           </Button>
                           <div className="flex flex-col items-end">
                              <span className="text-sm text-muted-foreground">
                                 {new Date(post.date).toLocaleDateString()}
                              </span>
                              {post.readingTime && (
                                 <span className="text-xs text-muted-foreground">{post.readingTime}</span>
                              )}
                           </div>
                        </CardFooter>
                     </Card>
                  ))}
               </div>

               {/* View More Button */}
               <div className="mt-12 text-center">
                  <Button asChild size="lg">
                     <Link href="/blog">View All Posts</Link>
                  </Button>
               </div>
            </section>
         </main>
      </div>
   );
}
