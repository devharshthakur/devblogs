import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGithub } from 'react-icons/fa';
import { ModeToggle } from '@/components/custom/features/theme/ModeToggle';

// Configuration
const GITHUB_HANDLE = 'devharshthakur';
const LATEST_POSTS_LIMIT = 3;

export default function BlogHome() {
   // Get latest blog posts
   const latestPosts = getAllBlogPosts().slice(0, LATEST_POSTS_LIMIT);

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
               <Link href="/" className="text-2xl font-bold text-primary transition-colors hover:text-primary/80">
                  devharshthakur.in blogs
               </Link>
               <nav className="flex items-center gap-4">
                  <Button asChild variant="ghost" className="text-base">
                     <Link href="/about">About</Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                     <Link href={`https://github.com/${GITHUB_HANDLE}`} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                     </Link>
                  </Button>
                  <ModeToggle />
               </nav>
            </div>
         </header>

         {/* Main Content */}
         <main className="container mx-auto flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-4 py-16">
            {/* Hero Section */}
            <section className="mb-24 max-w-4xl text-center">
               <h1 className="mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-5xl font-extrabold tracking-tight">
                  Welcome to My Blog
               </h1>
               <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
                  Explore my thoughts on web development, design, and more. Dive into a world of tech insights and
                  creative solutions.
               </p>
               <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold">
                  <Link href="/blog">Explore All Posts</Link>
               </Button>
            </section>

            {/* Latest Posts Section */}
            <section className="w-full max-w-6xl">
               <h2 className="mb-12 text-center text-3xl font-bold text-secondary-foreground">Latest Posts</h2>
               <div className="grid w-full gap-12 md:grid-cols-2">
                  {latestPosts.map((post) => (
                     <Card
                        key={post.slug}
                        className="mx-auto flex w-full max-w-[600px] flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                     >
                        <CardHeader className="bg-primary/5 p-6">
                           <CardTitle className="line-clamp-2 text-2xl font-semibold text-primary">
                              {post.title}
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                           <p className="line-clamp-3 text-lg text-muted-foreground">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="mt-auto flex items-center justify-between bg-secondary/5 p-6">
                           <Button asChild variant="default" size="lg" className="rounded-full">
                              <Link href={`/blog/${post.slug}`}>Read More</Link>
                           </Button>
                           <div className="flex flex-col items-end">
                              <span className="text-sm font-medium text-muted-foreground">
                                 {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                 })}
                              </span>
                              {post.readingTime && (
                                 <span className="mt-1 text-xs text-muted-foreground">{post.readingTime}</span>
                              )}
                           </div>
                        </CardFooter>
                     </Card>
                  ))}
               </div>

               {/* View More Button */}
               <div className="mt-16 text-center">
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold">
                     <Link href="/blog">View All Posts</Link>
                  </Button>
               </div>
            </section>
         </main>
      </div>
   );
}
