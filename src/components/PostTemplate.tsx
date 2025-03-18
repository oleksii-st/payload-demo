import React from 'react';

import { Media } from '@/components/Media';
import { RichText } from '@/components/RichText';
import type { Post } from '@/payload-types';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formatDate';

type Props = {
  post: Post | null;
};

export const PostTemplate = ({ post }: Props) => {
  const { title = '', image = '', content, publishedAt } = post || {};

  const date = formatDate(publishedAt ?? '');

  return (
    <>
      <article className="container">
        <div className={cn('py-6', 'sm:py-12')}>
          <div className="flex gap-8 flex-col">
            <div className="flex-auto w-full">
              <h1 className="mb-6">{title}</h1>

              <div className="mb-3">
                <time className="text-gray-500 flex-shrink-0" dateTime={date}>
                  {date}
                </time>
              </div>
            </div>

            {image && (
              <div className="md:mx-0">
                <Media
                  width="800"
                  height="800"
                  source={image}
                  className={cn(
                    'w-full object-cover shadow-md mt-0 mb-6 aspect-[5/2]',
                    'md:rounded-lg',
                  )}
                  loading="eager"
                  sizes={`(min-width: 1440px) 1440px, (min-width: 992px) 100vw`}
                />
              </div>
            )}

            <div>
              <RichText content={content} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
