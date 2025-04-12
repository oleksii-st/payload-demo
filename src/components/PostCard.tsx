import Link from 'next/link';
import React from 'react';

import { Media } from '@/components/Media';
import { HighlightQuery } from '@/components/ui/HighlightQuery';
import type { Post } from '@/payload-types';
import { cn } from '@/utils/cn';
import { getTextFromRichText } from '@/utils/getTextFromRichText';

type PostCardProps = Pick<Post, 'title' | 'slug' | 'image' | 'content' | 'publishedAt'> & {
  isFirst: boolean;
  searchQuery?: string;
};

export const PostCard = ({ image, slug, title, content, isFirst, searchQuery }: PostCardProps) => {
  const link = `/blog/${slug}`;
  const pageSlug = slug?.split('/').at(-1);
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link
        href={link}
        className={cn(
          'w-full aspect-[4/3] rounded-t-lg overflow-hidden',
          'focus-visible:outline-0 focus-visible:border-4 focus-visible:border-black',
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
              'not-prose block font-bold text-xl text-left text-black mb-2',
              'hover:underline',
            )}
            style={{ viewTransitionName: `${pageSlug}-title` }}
          >
            {title}
          </Link>
        </header>
        <p
          className="text-gray-600 mb-4 flex-grow max-h-[80px] line-clamp-3"
          style={{ viewTransitionName: `${pageSlug}-description` }}
        >
          <HighlightQuery
            text={getTextFromRichText(content)}
            query={searchQuery}
            removeOffset={3}
            maxLength={40}
          />
        </p>
      </div>
    </article>
  );
};
