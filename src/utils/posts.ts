import configPromise from '@payload-config';
import { getPayload, SelectType } from 'payload';

import { Post, Search } from '@/payload-types';

type GetPostsArguments = {
  page?: number;
  draft?: boolean;
};

type GetPostsResult = {
  data: Post[];
  totalPages: number;
};

export const PAGE_SIZE = 6;
const LIMIT = 100000;

export const getPosts = async (args?: GetPostsArguments): Promise<GetPostsResult> => {
  const { page = 1, draft = false } = args ?? {};

  const payload = await getPayload({ config: configPromise });
  const data = (await payload.find({
    collection: 'posts',
    draft,
    limit: PAGE_SIZE,
    page,
    ...{
      where: {
        _status: {
          equals: 'published',
        },
      },
    },
  })) as unknown as { docs: Post[]; totalPages: number };

  return {
    data: data.docs,
    totalPages: data.totalPages,
  } as GetPostsResult;
};

export type PostMeta = Pick<Post, 'meta' | 'slug' | 'updatedAt'>;

type GetAllPostsArguments = {
  draft?: boolean;
};

export const getAllPosts = async (args?: GetAllPostsArguments): Promise<PostMeta[]> => {
  const { draft = false } = args ?? {};
  const payload = await getPayload({ config: configPromise });
  const posts = (await payload.find({
    collection: 'posts',
    draft,
    select: {
      id: true,
      meta: true,
      slug: true,
      updatedAt: true,
    },
    limit: LIMIT,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })) as unknown as { docs: PostMeta[] };

  return posts.docs;
};

type GetPostArguments = {
  slug: string;
  draft?: boolean;
};

export const getPost = async ({
  slug,
  draft = false,
}: GetPostArguments): Promise<Post | undefined> => {
  const payload = await getPayload({ config: configPromise });
  return (
    (await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      where: {
        ...(!draft
          ? {
              _status: {
                equals: 'published',
              },
            }
          : {}),
        slug: {
          equals: slug,
        },
      },
    })) as unknown as { docs: Post[] }
  ).docs[0];
};

type SearchPostsArguments = {
  page?: number;
  query: string;
  limit?: number;
  select?: SelectType;
};

type SearchPostsResult = {
  data: Post[];
  totalPages: number;
  totalDocs: number;
};

export const searchPosts = async (args?: SearchPostsArguments): Promise<SearchPostsResult> => {
  const { page = 1, query, limit = PAGE_SIZE, select } = args ?? {};

  const payload = await getPayload({ config: configPromise });
  const searches = (await payload.find({
    collection: 'search',
    draft: false,
    limit,
    page,
    where: {
      and: [
        {
          title: {
            like: query,
          },
        },
        {
          content: {
            like: query,
          },
        },
      ],
    },
  })) as unknown as { docs: Search[]; totalPages: number; totalDocs: number };

  const postIds = searches.docs.map(({ doc }) =>
    typeof doc.value === 'string' ? doc.value : doc.value.id,
  );

  const posts = (
    (await payload.find({
      collection: 'posts',
      draft: false,
      limit: PAGE_SIZE,
      ...(select
        ? {
            select,
          }
        : {}),
      where: {
        id: {
          in: postIds,
        },
        _status: {
          equals: 'published',
        },
      },
    })) as unknown as { docs: Post[] }
  ).docs;

  return {
    data: posts,
    totalPages: searches.totalPages,
    totalDocs: searches.totalDocs,
  } as SearchPostsResult;
};
