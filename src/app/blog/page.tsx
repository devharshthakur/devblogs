import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
               <Link href="/" className="text-2xl font-bold">
                  My Blog
               </Link>
               <Button asChild variant="outline">
                  <Link href="/">Back Home</Link>
               </Button>
            </div>
         </header>

         {/* Main Content */}
         <main className="container mx-auto px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold">All Blog Posts</h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
               {posts.map((post) => (
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
         </main>
      </div>
   );
};

export default BlogPage;
