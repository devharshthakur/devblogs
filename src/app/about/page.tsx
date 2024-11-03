import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdHome } from 'react-icons/md';

export default function AboutMe() {
   return (
      <div className="min-h-screen bg-background p-8">
         <nav className="mb-8">
            <Button asChild variant="ghost" size="icon">
               <Link href="/">
                  <MdHome className="h-6 w-6" />
                  <span className="sr-only">Home</span>
               </Link>
            </Button>
         </nav>

         <Card className="mx-auto max-w-3xl">
            <CardContent className="p-6">
               <h1 className="mb-4 text-3xl font-bold">About Me</h1>

               <div className="space-y-4">
                  <p>
                     I am basically a full stack web developer based in India & an undergraduate student in
                     &quot;Vidyalanakar Institute of Technology&quot; pursuing BE in Computer Engineering.
                  </p>

                  <p>
                     I&apos;ve always been fascinated by the intersection of technology and design. I got interested to
                     know how frontend interacts with backend in web applications, how it internally works & how they
                     are deployed. From there, I got interest in backend development in JavaScript (Node.js). I got
                     mainly interested in JavaScript/TypeScript and technologies based on it as I am into web
                     development.
                  </p>

                  <p>
                     I develop applications in Next.js. During this time, I got the opportunity to work with a variety
                     of famous technologies & managed services on a wide range of projects such as learning to connect
                     databases, creating APIs, creating projects in mono repos using Turborepo, etc.
                  </p>

                  <p>I&apos;m a fresher & am always eager to learn and grow.</p>

                  <div className="mt-6">
                     <p>
                        <strong>From:</strong> India
                     </p>
                     <p>
                        <strong>Based in:</strong> Mumbai
                     </p>
                  </div>
               </div>

               <div className="mt-8 flex space-x-4">
                  <Button asChild variant="outline">
                     <a
                        href="https://www.linkedin.com/in/harsh-thakur-bb6b18231/"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <FaLinkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                     </a>
                  </Button>
                  <Button asChild variant="secondary">
                     <a href="workharshthakur2002@gmail.com">
                        <MdEmail className="mr-2 h-4 w-4" />
                        Work Email
                     </a>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
