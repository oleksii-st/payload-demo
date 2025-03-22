import Link from 'next/link';
import React, { ComponentProps, ReactNode } from 'react';

import { Link as LinkType, Page, Post } from '@/payload-types';

type CMSLinkProps = Omit<ComponentProps<'a'>, 'type'> & LinkType & { children?: ReactNode };

export type GenerateSlugType = {
  type?: LinkType['type'];
  url?: string | null;
  reference?: LinkType['reference'];
};

const generateHref = (args: GenerateSlugType): string => {
  const { reference, url, type } = args;

  if ((type === 'custom' || type === undefined) && url) {
    return url;
  }

  if (type === 'reference' && reference?.value && typeof reference.value !== 'string') {
    if (reference.relationTo === 'pages') {
      const value = reference.value as Page;
      const breadcrumbs = value?.breadcrumbs;
      const hasBreadcrumbs = breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
      if (hasBreadcrumbs) {
        if (breadcrumbs[breadcrumbs.length - 1]?.url === '/home') {
          return '/';
        }

        return breadcrumbs[breadcrumbs.length - 1]?.url as string;
      }
    }

    if (reference.relationTo === 'posts') {
      const value = reference.value as Post;

      return `/blog/${value.slug}`;
    }

    return `/${reference.relationTo}/${reference.value.slug}`;
  }

  return '';
};

export const CMSLink = ({
  type,
  url,
  label,
  reference,
  newTab,
  disableIndex,
  children,
  ...rest
}: CMSLinkProps) => {
  let href = generateHref({ type, url, reference });

  if (!href) {
    return (
      <span {...rest}>
        {label}
        {children}
      </span>
    );
  }

  const hrefIsLocal = ['tel:', 'mailto:', '/'].some((prefix) => href.startsWith(prefix));

  if (!hrefIsLocal) {
    try {
      const objectURL = new URL(href);
      if (objectURL.origin === process.env.NEXT_PUBLIC_SITE_URL) {
        href = objectURL.href.replace(process.env.NEXT_PUBLIC_SITE_URL, '');
      }
    } catch (e) {
      console.error(`Failed to format url: ${href}`, e);
    }
  }

  const additionalProps: Record<string, string> = {};

  if (newTab) {
    additionalProps.target = '_blank';
  }

  if (disableIndex) {
    additionalProps.rel = 'noopener noreferrer';
  }

  return (
    <Link href={href} {...additionalProps} {...rest}>
      {label}
      {children}
    </Link>
  );
};
