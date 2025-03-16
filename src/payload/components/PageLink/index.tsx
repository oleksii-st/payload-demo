'use client';

import { useAllFormFields } from '@payloadcms/ui';
import React from 'react';

const PageLink = () => {
  const [fields] = useAllFormFields();
  const getPath = (): string => {
    if (!('breadcrumbs' in fields)) {
      const slug = fields.slug.value;

      if (!slug) {
        return '';
      }

      return `/blog/${slug}`;
    }

    const breadcrumbsLength = fields.breadcrumbs.value as number;
    const pagePath = fields[`breadcrumbs.${breadcrumbsLength - 1}.url`]?.value;

    if (!pagePath) {
      return '';
    }

    const path = pagePath === '/home' ? '/' : pagePath;

    return path as string;
  };

  const path = getPath();
  const url = `${process.env.NEXT_PUBLIC_SITEMAP_URL}${path}`;

  if (!path) {
    return null;
  }

  return (
    <div className="field-type text" style={{ marginTop: '16px' }}>
      <div className="field-label">URL:</div>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    </div>
  );
};

export default PageLink;
