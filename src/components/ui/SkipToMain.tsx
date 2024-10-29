import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export const SkipToMain = ({ className, ...rest }: ComponentProps<'a'>) => {
  return (
    <a
      href="#main"
      className={cn(
        'absolute top-2 left-2 p-4 bg-[var(--background-color)] text-text translate-y-[calc(-100%-8px)] transform-all duration-300',
        'focus-visible:translate-y-0',
        className,
      )}
      {...rest}
    >
      Skip to main content
    </a>
  );
};
