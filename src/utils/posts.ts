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
