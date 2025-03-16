import { Metadata } from 'next';

import { BlogTemplate } from '@/components/BlogTemplate';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { Blog } from '@/payload-types';
import { generateBlogMetadata } from '@/utils/generateNotFoundMetadata';
import { getCachedGlobal } from '@/utils/getGlobals';
import { getPosts } from '@/utils/posts';

const Page = async () => {
  const { data, totalPages } = await getPosts();
  const blog: Blog = (await getCachedGlobal('blog', 2)()) as Blog;

  if (!data) {
    return <PayloadRedirects url={'/blog'} />;
  }

  return <BlogTemplate title={blog.title} posts={data} totalPages={totalPages} />;
};

export default Page;

export async function generateMetadata(): Promise<Metadata> {
  return generateBlogMetadata();
}
