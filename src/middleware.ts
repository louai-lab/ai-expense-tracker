// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware()

// export const config = {
//   matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

// middleware.ts or src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Apply middleware to all routes except those in `_next`, static files, and API routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Apply middleware to all API routes
    '/api/:path*',
    // Exclude specific webhook routes from middleware
    '/api/webhooks/:path*',
  ],
};

