import React from 'react';

import { Media } from '@/components/Media';
import { SectionHeading } from '@/components/SectionHeading';
import { Grid as GridType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { Block } from '@/utils/types';

export type SocialsProps = Block<GridType>;

export const Grid = ({ heading, images, isFirst }: SocialsProps) => {
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <section className="my-5 sm:my-8">
      <div className="container">
        {heading && <SectionHeading isFirst={isFirst}>{heading}</SectionHeading>}

        {!!images?.length && (
          <div className="flex gap-6 flex-wrap items-center">
            {images.map(({ icon }, index) => {
              if (!icon) {
                return null;
              }

              return (
                <div key={index} className={cn('w-[calc(50%-12px)]', 'sm:w-[calc(25%-18px)]')}>
                  <Media
                    className={cn('m-0 w-full aspect-square rounded-2xl')}
                    sizes={'(min-width: 576px) 342px, 500px'}
                    source={icon}
                    width={500}
                    height={500}
                    loading={loading}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
