import React, { ComponentProps } from 'react';

import { RichText } from '@/components/RichText';
import { CMSLink } from '@/components/ui/CMSLink';
import { Footer as FooterType } from '@/payload-types';
import { cn } from '@/utils/cn';

type FooterProps = ComponentProps<'footer'> & FooterType;

export const Footer = ({ columns, copyrightMessage, className, ...rest }: FooterProps) => {
  return (
    <footer className={cn('shadow-3xl sm:shadow-none', className)} {...rest}>
      <div className="container">
        <div className={cn('flex flex-col gap-4 py-8 text-md', 'sm:text:lg sm:py-6')}>
          {!!columns?.length && (
            <div
              className={cn('flex flex-col gap-4 items-center', 'sm:flex-row sm:justify-between')}
            >
              {columns?.map((column, index) => (
                <div key={index} className={cn('flex flex-col text-center gap-4', 'sm:flex-row')}>
                  {column.navItems?.map(
                    ({ link }, index) =>
                      link && <CMSLink key={index} className="text-link" {...link} />,
                  )}
                </div>
              ))}
            </div>
          )}

          {copyrightMessage && (
            <div className="text-center">
              <RichText content={copyrightMessage} inline />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
