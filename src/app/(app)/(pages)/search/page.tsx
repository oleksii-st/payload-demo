import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import React from 'react';

import { BlogTemplate } from '@/components/BlogTemplate';
import { generateSearchMetadata } from '@/utils/generateMetadata';
import { searchPosts } from '@/utils/posts';

type Args = {
  searchParams: Promise<{
    q: string;
    page: string;
  }>;
};
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, page = '1' } = await searchParamsPromise;

  const { data, totalPages } = await searchPosts({ page: Number(page), query });

  if (query && totalPages && !data?.length && Number(page) > 1) {
    return notFound();
  }

  return (
    <BlogTemplate
      isSearch
      title="Search"
      posts={query ? data : []}
      page={Number(page)}
      totalPages={query ? totalPages : 0}
      searchQuery={query}
    />
  );
}

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: Args): Promise<Metadata> {
  const { q: query, page = '1' } = await searchParamsPromise;
  const { totalDocs, data } = await searchPosts({ page: Number(page), query });

  if (query && totalDocs && !data?.length) {
    return notFound();
  }

  return await generateSearchMetadata(Number(page), query);
}
