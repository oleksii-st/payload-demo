import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogTemplate } from '@/components/BlogTemplate';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { Blog } from '@/payload-types';
import { generateBlogMetadata } from '@/utils/generateNotFoundMetadata';
import { getCachedGlobal } from '@/utils/getGlobals';
import { getPosts } from '@/utils/posts';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const page = parseInt(slug);

  if (!page) {
    return <PayloadRedirects url={`/blog/${slug}`} />;
  }

  const { data, totalPages } = await getPosts({ page });
  const blog: Blog = (await getCachedGlobal('blog', 2)()) as Blog;

  if (!data) {
    return <PayloadRedirects url={'/blog'} />;
  }

  return <BlogTemplate page={page} title={blog.title} posts={data} totalPages={totalPages} />;
};

export default Page;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = parseInt(slug);

  if (!page) {
    notFound();
  }

  return generateBlogMetadata(page);
}

export async function generateStaticParams() {
  const { totalPages } = await getPosts();

  return Array.from({ length: totalPages }, (_, i) => ({ slug: `${i + 1}` })).filter(
    (_, index) => index,
  );
}
