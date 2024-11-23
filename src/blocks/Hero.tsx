import React from 'react';

import { Media } from '@/components/Media';
import { RichText } from '@/components/RichText';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Hero as HeroType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { Block } from '@/utils/types';

export type HeroProps = Block<HeroType>;

export const Hero = ({
  image,
  heading,
  subheading,
  description,
  isFirst,
  sectionLayout,
}: HeroProps) => {
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <Section {...sectionLayout}>
      <div className="container">
        <div
          className={cn(
            'max-w-[500px] mx-auto flex flex-col gap-4',
            'sm:max-w-full sm:flex-row sm:gap-8 sm:items-center',
            'md:gap-14',
          )}
        >
          {image && (
            <div className="sm:w-[calc(50%-16px)]">
              <Media
                className="w-full rounded-full my-0"
                sizes="(min-width: 768px) 50vw, (min-width: 1440px) 692px, 100vw"
                source={image}
                width={414}
                height={414}
                loading={loading}
              />
            </div>
          )}

          {Boolean(heading || subheading || description) && (
            <div className={cn('text-center', 'sm:text-left sm:w-[calc(50%-16px)]')}>
              {heading && (
                <SectionHeading isFirst={isFirst} className={cn('h1 mb-4', 'sm:md-8 sm:text-left')}>
                  {heading}
                </SectionHeading>
              )}

              {subheading && (
                <p className={cn('m-0 text-xl', 'sm:text-2xl', 'md:text-4xl')}>{subheading}</p>
              )}

              {description && <RichText content={description} />}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};
