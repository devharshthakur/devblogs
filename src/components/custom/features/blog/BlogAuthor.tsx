import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { BlogAuthor as BlogAuthorType } from '@/types/blog';

interface BlogAuthorProps {
   author: BlogAuthorType;
}

const BlogAuthor = ({ author }: BlogAuthorProps) => {
   // Creates initials from author name (e.g., "John Doe" -> "JD")
   const initials = author.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

   return (
      <HoverCard>
         {/* Main author display - Avatar + Name */}
         <HoverCardTrigger className="flex items-center gap-2">
            <Avatar>
               {author.avatar ? (
                  <AvatarImage src={author.avatar} alt={author.name} />
               ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
               )}
            </Avatar>
            <span className="text-sm font-medium">{author.name}</span>
         </HoverCardTrigger>

         {/* Hover card content - Shows more details when hovering */}
         <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
               <Avatar>
                  {author.avatar ? (
                     <AvatarImage src={author.avatar} alt={author.name} />
                  ) : (
                     <AvatarFallback>{initials}</AvatarFallback>
                  )}
               </Avatar>
               <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{author.name}</h4>
                  {author.bio && <p className="text-sm text-muted-foreground">{author.bio}</p>}
               </div>
            </div>
         </HoverCardContent>
      </HoverCard>
   );
};

export default BlogAuthor;
