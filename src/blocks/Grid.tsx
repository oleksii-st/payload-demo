import React from 'react';

import { Media } from '@/components/Media';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { CMSLink } from '@/components/ui/CMSLink';
import { Grid as GridType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { Block } from '@/utils/types';

export type SocialsProps = Block<GridType>;

export const Grid = ({ heading, images, isFirst, sectionLayout }: SocialsProps) => {
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <Section {...sectionLayout}>
      <div className="container">
        {heading && <SectionHeading isFirst={isFirst}>{heading}</SectionHeading>}

        {!!images?.length && (
          <div className="flex gap-6 flex-wrap items-center">
            {images.map(({ icon, link }, index) => {
              if (!icon) {
                return null;
              }

              const image = (
                <Media
                  className={cn('m-0 w-full aspect-square rounded-2xl')}
                  sizes={'(min-width: 576px) 342px, 500px'}
                  source={icon}
                  width={500}
                  height={500}
                  loading={loading}
                />
              );

              return (
                <div key={index} className={cn('w-[calc(50%-12px)]', 'sm:w-[calc(25%-18px)]')}>
                  {link ? <CMSLink {...link}>{image}</CMSLink> : image}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
};
