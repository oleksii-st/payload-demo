import { ComponentProps, ReactNode } from 'react';

import { Spinner } from '@/icons/Spinner';
import { cn } from '@/utils/cn';

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode;
  isLoading?: boolean;
};
export const Button = ({ isLoading, disabled, className, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      className={cn(
        'min-w-[185px] flex gap-2 justify-center items-center rounded-md px-6 py-2 bg-blue-700 text-white text-lg font-medium transition-all opacity-100',
        '[&:not([disabled]):hover]:bg-blue-900',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        className,
      )}
    >
      {isLoading ? (
        <>
          <Spinner className="size-6 animate-spin" /> Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};
