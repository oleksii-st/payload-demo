import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import { Spinner } from '@/icons/Spinner';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center group break-words hover:-darken active:-darken no-underline not-prose rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&.disabled]:pointer-events-none [&.disabled]:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default: 'font-bold',
        destructive:
          'bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
        outline:
          'border border-neutral-200 bg-transparent text-black dark:text-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 + active:bg-neutral-100 active:text-neutral-900 dark:active:bg-neutral-800 dark:active:text-neutral-50',
        secondary:
          'font-bold border-2 hover: active: hover:text-accent-text active:text-accent-text border-accent',
        thirdly:
          'font-bold bg-transparent text-text border-2 border-text hover:bg-text active:bg-text hover:text-[var(--background-color)] active:text-[var(--background-color)]',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'min-h-10 px-4 py-2 rounded-full',
        sm: 'min-h-9 rounded-md px-3',
        lg: 'min-h-10 rounded-md px-8',
        xl: 'min-h-12 min-w-[165px] rounded-full px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  ComponentProps<'a'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    asChild?: boolean;
    withArrow?: boolean;
  };

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  children,
  href,
  withArrow = false,
  isLoading = false,
  ...rest
}: ButtonProps) => {
  const content = isLoading ? (
    <>
      <Spinner className="w-[1em] h-[1em] mr-2 animate-spin" /> Loading...
    </>
  ) : (
    children
  );

  const props = {
    children: withArrow ? (
      <>
        {content}{' '}
        <ArrowRight
          className={cn(
            'ml-2 h-6 w-6 translate-x-0 transition-transform duration-300',
            'group-hover:translate-x-1',
            'group-active:translate-x-1',
          )}
        />
      </>
    ) : (
      <>{content}</>
    ),
    className: cn(buttonVariants({ variant, size, className }), {
      'pointer-events-none': isLoading,
    }),
    ...rest,
  };

  if (asChild) {
    return <Slot {...props} />;
  }

  if (href) {
    return <Link {...props} href={href} />;
  }

  return <button {...props} />;
};
Button.displayName = 'Button';

export { Button, buttonVariants };
