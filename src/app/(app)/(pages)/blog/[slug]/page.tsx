import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { BlogTemplate } from '@/components/BlogTemplate';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { PostTemplate } from '@/components/PostTemplate';
import { Blog } from '@/payload-types';
import { generateBlogMetadata, getOgImage } from '@/utils/generateMetadata';
import { getCachedGlobal } from '@/utils/getGlobals';
import { mergeOpenGraph } from '@/utils/mergeOpenGraph';
import { getAllPosts, getPost, getPosts } from '@/utils/posts';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = parseInt(slug);
  const { isEnabled: draft } = await draftMode();

  if (!page) {
    const post = await getPost({ slug, draft });

    if (!post) {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITEMAP_URL ?? '';

    const url = `${baseUrl}/blog/${slug}`;
    const ogImage = getOgImage(post?.meta?.image as string);

    const title = post?.meta?.title ?? '';
    const description = post?.meta?.description || '';

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: mergeOpenGraph({
        title,
        description,
        url: `/blog/${slug}`,
        images: ogImage ? [{ url: ogImage }] : undefined,
      }),
    };
  }

  return generateBlogMetadata(page);
}

export async function generateStaticParams() {
  const { totalPages } = await getPosts();

  const pages = Array.from({ length: totalPages }, (_, i) => ({ slug: `${i + 1}` })).filter(
    (_, index) => index,
  );

  const allPosts = await getAllPosts();
  const posts = allPosts.map(({ slug }) => ({ slug: slug as string }));

  return [...pages, ...posts];
}
