import { ErrorMessage } from '@/components/ErrorMessage';
import { NotFound as NotFoundType } from '@/payload-types';
import { generateNotFoundMetadata } from '@/utils/generateNotFoundMetadata';
import { getCachedGlobal } from '@/utils/getGlobals';

export default async function NotFound() {
  const notFound: NotFoundType = (await getCachedGlobal('notFound', 2)()) as NotFoundType;

  return <ErrorMessage {...notFound} />;
}

export const generateMetadata = generateNotFoundMetadata;
