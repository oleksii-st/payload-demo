import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/ui/Pagination';
import { Post } from '@/payload-types';
import { cn } from '@/utils/cn';

type BlogTemplateProps = {
  posts: Post[];
  page?: number;
  totalPages: number;
};

export const BlogTemplate = ({ page = 1, posts, totalPages }: BlogTemplateProps) => {
  const baseUrl = '/blog';

  const title = 'Blog'; // To do: add a setting

  return (
    <div className="container break-words">
      <div className="my-6 mb:mt-0">
        {title && <h1 className="mb-5">{title}</h1>}

        <div className="mb-8">
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
                />
              );
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} baseUrl={baseUrl} />
        )}
      </div>
    </div>
  );
};
