import Link from 'next/link';
import React from 'react';

import { Button } from './ui/Button';

import { Media } from '@/components/Media';
import type { Post } from '@/payload-types';
import { cn } from '@/utils/cn';
import { getTextFromRichText } from '@/utils/getTextFromRichText';

type PostCardProps = Pick<Post, 'title' | 'slug' | 'image' | 'content' | 'publishedAt'> & {
  isFirst: boolean;
};

export const PostCard = ({ image, slug, title, content, isFirst }: PostCardProps) => {
  const link = `/${slug}`;
  const pageSlug = slug?.split('/').at(-1);
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <article className="bg-white dark:bg-gray-800/40 rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link
        href={link}
        className={cn(
          'w-full aspect-[4/3] rounded-t-lg overflow-hidden',
          'focus-visible:outline-0 focus-visible:border-4 focus-visible:border-black dark:focus-visible:border-white',
        )}
        style={{ viewTransitionName: `${pageSlug}-image` }}
      >
        {image && (
          <Media
            width="464"
            height="248"
            source={image}
            className={cn(
              'w-full m-0 h-full object-cover transition duration-300 scale-100',
              'hover:scale-110',
            )}
            sizes={`(min-width: 1440px) 464px, 100vw`}
            loading={loading}
          />
        )}
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <header>
          <Link
            href={link}
            className={cn(
              'not-prose dark:text-white block font-bold text-xl text-left text-black mb-2',
              'hover:underline',
            )}
            style={{ viewTransitionName: `${pageSlug}-title` }}
          >
            {title}
          </Link>
        </header>
        <p
          className="text-gray-600 dark:text-gray-300 mb-4 flex-grow max-h-[80px] line-clamp-3"
          style={{ viewTransitionName: `${pageSlug}-description` }}
        >
          {getTextFromRichText(content).split(/\s+/).slice(0, 30).join(' ')}
        </p>

        <Button href={link} variant="default" size="lg" className="w-full mt-auto">
          Read more
        </Button>
      </div>
    </article>
  );
};
