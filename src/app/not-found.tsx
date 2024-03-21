'use client';

import Link from 'next/link';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div>
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
      </body>
    </html>
  );
}
