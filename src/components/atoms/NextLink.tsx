'use client';

import { PropsWithChildren, AnchorHTMLAttributes } from 'react';
import NextLink from 'next/link';
import { type LinkProps } from 'next/link';
import { useParams } from 'next/navigation';

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({ children, href, ...rest }: PropsWithChildren<Props>) {
  const { locale } = useParams();

  return (
    <NextLink href={`/${locale}/${href}`} {...rest}>
      {children}
    </NextLink>
  );
}
