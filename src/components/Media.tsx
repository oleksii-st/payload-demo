import Image, { ImageProps } from 'next/image';

import { Media as MediaType } from '@/payload-types';

type MediaProps = Omit<ImageProps, 'alt' | 'src'> & {
  source: MediaType | string;
};

export const Media = ({ source, ...rest }: MediaProps) => {
  if (typeof source === 'string') {
    return (
      <Image
        alt={rest.width?.toString() ?? ''}
        src={source}
        width={Number(rest.width ?? 1408)}
        height={Number(rest.height ?? 1408)}
      />
    );
  }

  const { alt, url, width, height } = source;

  const src = `${process.env.NEXT_PUBLIC_SITEMAP_URL || ''}${url as string}`;
  return (
    <Image
      {...rest}
      alt={alt}
      src={src}
      width={Number(rest.width ?? width)}
      height={Number(rest.height ?? height)}
    />
  );
};
