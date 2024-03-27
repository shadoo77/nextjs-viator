'use client';

import { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { type LinkProps } from 'next/link';
import { useParams } from 'next/navigation';

export default function Link({ children, href, ...rest }: PropsWithChildren<LinkProps>) {
  const { locale } = useParams();

  return (
    <NextLink href={`/${locale}/${href}`} {...rest}>
      {children}
    </NextLink>
  );
}
