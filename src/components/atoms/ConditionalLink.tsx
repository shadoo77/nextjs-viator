'use client';

import { PropsWithChildren, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { type LinkProps } from 'next/link';
import NextLink from './NextLink';

type Props = {
  children: React.ReactNode;
  href: string;
  isLink?: boolean;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>;

export default function ConditionalLink({
  children,
  href,
  isLink,
  ...rest
}: PropsWithChildren<Props>) {
  return !isLink ? (
    <div {...rest}>{children}</div>
  ) : (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
}
