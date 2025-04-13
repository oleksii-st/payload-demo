'use client';

import { useRouter } from 'next/navigation';
import React, { ComponentProps, FormEventHandler, useState } from 'react';

import { Cross } from '@/icons/Cross';
import { Search } from '@/icons/Search';
import { cn } from '@/utils/cn';

type SearchFormProps = {
  defaultQuery: string;
  hideClear?: boolean;
  buttonsPosition?: 'left' | 'right';
} & Omit<ComponentProps<'form'>, 'onSubmit' | 'onChange'>;

export const SearchForm = ({
  defaultQuery,
  className,
  hideClear = false,
  buttonsPosition = 'right',
  ...props
}: SearchFormProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('mb-12', className)} {...props}>
      <div className="max-w-[600px] mx-auto flex flex-col gap-2">
        <div
          className={cn('flex items-center border-b border-gray-300 py-2 search-wrapper', {
            'flex-row-reverse': buttonsPosition === 'left',
          })}
        >
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter your search query"
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {!hideClear && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="flex-shrink-0 mr-2 p-1 reset"
              aria-label="Clear search"
            >
              <Cross className="size-[20px]" />
            </button>
          )}
          <button type="submit" aria-label="Submit search" className="flex-shrink-0 py-1">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};
