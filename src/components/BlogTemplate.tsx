import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/ui/Pagination';
import { SearchForm } from '@/components/ui/SearchForm';
import { Post } from '@/payload-types';
import { cn } from '@/utils/cn';

type BlogTemplateProps = {
  posts: Post[];
  page?: number;
  totalPages: number;
  title?: string;
  isSearch?: boolean;
  searchQuery?: string;
};

export const BlogTemplate = ({
  page = 1,
  posts,
  totalPages,
  title,
  isSearch,
  searchQuery,
}: BlogTemplateProps) => {
  const baseUrl = '/blog';

  return (
    <div className="container break-words">
      <div className="my-6 mb:mt-0">
        {title && (
          <h1 className="mb-5">
            {title} {page !== 1 && <> - Page {page}</>}
          </h1>
        )}

        {isSearch && <SearchForm defaultQuery={searchQuery ?? ''} />}

        <div className="mb-8">
          {posts?.length > 0 ? (
            <div className={cn('grid grid-cols-1 gap-6', 'sm:grid-cols-3')}>
              {posts?.map((post, index) => {
                return (
                  <PostCard
                    key={post.slug}
                    title={post.title}
                    slug={post.slug}
                    image={post.image}
                    content={post.content}
                    publishedAt={post.publishedAt}
                    isFirst={index === 0}
                    searchQuery={searchQuery}
                  />
                );
              })}
            </div>
          ) : (
            <div>Nothing found</div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            searchQuery={searchQuery}
            currentPage={page}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        )}
      </div>
    </div>
  );
};
