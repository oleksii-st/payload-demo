import configPromise from '@payload-config';
import { getPayload } from 'payload';

import { Post } from '@/payload-types';

type GetPostsArguments = {
  page?: number;
  draft?: boolean;
};

type GetPostsResult = {
  data: Post[];
  totalPages: number;
};

const PAGE_SIZE = 6;
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
