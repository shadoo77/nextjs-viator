import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  const headerList = headers();
  const pathname = headerList.get('x-pathname') || '';

  if (!pathname) {
    redirect('/not-found');
  }

  return children;
}
