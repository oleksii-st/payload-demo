import { ComponentProps } from 'react';

import { RichText } from '@/components/RichText';
import { NotFound } from '@/payload-types';
import { cn } from '@/utils/cn';

export type ErrorMessageProps = ComponentProps<'div'> & {
  heading?: NotFound['heading'];
  description?: NotFound['description'];
};

export const ErrorMessage = ({ heading, description, className, ...rest }: ErrorMessageProps) => {
  return (
    <div className={cn('my-auto', className)} {...rest}>
      <div className="container">
        {heading && <h1 className={cn('text-center mb-4 text-6xl')}>{heading}</h1>}

        {description && <RichText className={'rich-text-big'} content={description} />}
      </div>
    </div>
  );
};
