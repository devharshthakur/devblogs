import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MdHome } from 'react-icons/md';

export const metadata = {
   title: 'Blog Posts | My Developer Blog',
   description: 'Browse all blog posts about web development, design, and more.',
};

const BlogPage = () => {
   const posts = getAllBlogPosts();

   return (
      <div className="min-h-screen bg-background">
         {/* Header */}
         <header className="border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
               <Button asChild variant="ghost" size="default">
                  <Link href="/">
                     <MdHome className="h-15 w-15" />
                     <span className="sr-only">Home</span>
                  </Link>
               </Button>
            </div>
         </header>

         {/* Main Content */}
         <main className="container mx-auto px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold">All Blog Posts</h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
               {posts.map((post) => (
                  <Card
                     key={post.slug}
                     className="mx-auto flex w-full max-w-[500px] flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                     <CardHeader className="bg-primary/5 p-6">
                        <CardTitle className="line-clamp-2 text-2xl font-semibold text-primary">{post.title}</CardTitle>
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
         </main>
      </div>
   );
};

export default BlogPage;
