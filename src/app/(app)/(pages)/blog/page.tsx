import { Metadata } from 'next';

import { BlogTemplate } from '@/components/BlogTemplate';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { getRobots } from '@/utils/generateNotFoundMetadata';
import { mergeOpenGraph } from '@/utils/mergeOpenGraph';
import { getPosts } from '@/utils/posts';

const Page = async () => {
  const { data, totalPages } = await getPosts();

  if (!data) {
    return <PayloadRedirects url={'/blog'} />;
  }

  return <BlogTemplate posts={data} totalPages={totalPages} />;
};

export default Page;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'WIP';
  const description = 'WIP';
  const url = 'WIP';
  const ogImage = null;
  const robots = getRobots();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: '/blog',
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
    robots,
  };
}
