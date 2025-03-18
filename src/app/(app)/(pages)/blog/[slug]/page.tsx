// import { Metadata } from 'next';
import { draftMode } from 'next/headers';
// import { notFound } from 'next/navigation';

import { BlogTemplate } from '@/components/BlogTemplate';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { PostTemplate } from '@/components/PostTemplate';
import { Blog } from '@/payload-types';
// import { generateBlogMetadata } from '@/utils/generateNotFoundMetadata';
import { getCachedGlobal } from '@/utils/getGlobals';
import { getPost, getPosts } from '@/utils/posts';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const page = parseInt(slug);
  const { isEnabled: draft } = await draftMode();

  if (!page) {
    const post = await getPost({ slug, draft });

    if (!post) {
      return <PayloadRedirects url={`/blog/${slug}`} />;
    }

    return <PostTemplate post={post} />;
  }

  const { data, totalPages } = await getPosts({ page });
  const blog: Blog = (await getCachedGlobal('blog', 2)()) as Blog;

  if (!data) {
    return <PayloadRedirects url={`/blog/${slug}`} />;
  }

  return <BlogTemplate page={page} title={blog.title} posts={data} totalPages={totalPages} />;
};

export default Page;

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const page = parseInt(slug);
//
//   if (!page) {
//     notFound();
//   }
//
//   return generateBlogMetadata(page);
// }

export async function generateStaticParams() {
  const { totalPages } = await getPosts();

  return Array.from({ length: totalPages }, (_, i) => ({ slug: `${i + 1}` })).filter(
    (_, index) => index,
  );
}
