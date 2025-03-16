import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchQuery?: string;
}

interface PageNumberProps {
  page: number;
  currentPage: number;
  baseUrl: string;
  searchQuery?: string;
}

interface PageNumberListProps {
  pageNumbers: number[];
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchQuery?: string;
}

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  page: number;
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchQuery?: string;
}

type GetHrefArguments = {
  baseUrl: string;
  page: number;
  searchQuery?: string;
};

const getHref = ({ baseUrl, page, searchQuery }: GetHrefArguments): string => {
  if (searchQuery) {
    const pageParam = page > 1 ? `&page=${page}` : '';
    return `/search?q=${searchQuery}${pageParam}`;
  }

  return page > 1 ? `${baseUrl}/${page}` : baseUrl;
};

const PageNumber = ({ page, currentPage, baseUrl, searchQuery }: PageNumberProps) => {
  const isCurrentPage = page === currentPage;
  const className = cn(isCurrentPage ? 'pointer-events-none' : 'no-underline');
  const buttonStyles = buttonVariants({
    variant: isCurrentPage ? 'default' : 'outline',
    size: 'icon',
  });

  if (isCurrentPage) {
    return (
      <div className={cn(buttonStyles, className)} aria-current="page">
        {page}
      </div>
    );
  }

  const href = getHref({ page, baseUrl, searchQuery });

  return (
    <Button
      href={href}
      variant={isCurrentPage ? 'default' : 'outline'}
      size="icon"
      className={className}
    >
      {page}
    </Button>
  );
};

const PageNumberList = ({
  pageNumbers,
  currentPage,
  totalPages,
  baseUrl,
  searchQuery,
}: PageNumberListProps) => {
  return (
    <>
      {pageNumbers[0] > 1 && (
        <>
          <PageNumber
            page={1}
            currentPage={currentPage}
            baseUrl={baseUrl}
            searchQuery={searchQuery}
          />
          {pageNumbers[0] > 2 && <span className="px-2">...</span>}
        </>
      )}
      {pageNumbers.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          page={pageNumber}
          currentPage={currentPage}
          baseUrl={baseUrl}
          searchQuery={searchQuery}
        />
      ))}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <PageNumber
            page={totalPages}
            currentPage={currentPage}
            baseUrl={baseUrl}
            searchQuery={searchQuery}
          />
        </>
      )}
    </>
  );
};

const NavigationButton = ({
  direction,
  page,
  currentPage,
  totalPages,
  baseUrl,
  searchQuery,
}: NavigationButtonProps) => {
  const isDisabled = direction === 'prev' ? currentPage === 1 : currentPage === totalPages;
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const label = direction === 'prev' ? 'Previous page' : 'Next page';

  const className = cn(isDisabled && 'opacity-50 disabled');
  const buttonStyles = buttonVariants({ variant: 'outline', size: 'icon' });

  if (isDisabled) {
    return (
      <div className={cn(className, buttonStyles)} aria-label={label}>
        <Icon className="h-4 w-4" />
      </div>
    );
  }

  const href = getHref({ page, baseUrl, searchQuery });

  return (
    <Button variant="outline" size="icon" className={className} href={href} aria-label={label}>
      <Icon className="h-4 w-4" />
    </Button>
  );
};

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
): number[] => {
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

export function Pagination({ currentPage, totalPages, baseUrl, searchQuery }: PaginationProps) {
  const mobilePageNumbers = getPageNumbers(currentPage, totalPages, 1);
  const desktopPageNumbers = getPageNumbers(currentPage, totalPages, 4);

  return (
    <nav className="flex justify-center items-center space-x-2" aria-label="Pagination">
      <NavigationButton
        direction="prev"
        page={currentPage - 1}
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
        searchQuery={searchQuery}
      />
      <div className="hidden sm:flex items-center space-x-2">
        <PageNumberList
          pageNumbers={desktopPageNumbers}
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
          searchQuery={searchQuery}
        />
      </div>
      <div className="flex sm:hidden items-center space-x-2">
        <PageNumberList
          pageNumbers={mobilePageNumbers}
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
          searchQuery={searchQuery}
        />
      </div>
      <NavigationButton
        direction="next"
        page={currentPage + 1}
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
        searchQuery={searchQuery}
      />
    </nav>
  );
}
