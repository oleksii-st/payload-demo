'use client';

import { useAllFormFields } from '@payloadcms/ui';
import React from 'react';

const PageLink = () => {
  const [fields] = useAllFormFields();
  const breadcrumbsLength = fields.breadcrumbs.value as number;
  const pagePath = fields[`breadcrumbs.${breadcrumbsLength - 1}.url`]?.value;
  const path = pagePath === '/home' ? '/' : pagePath;
  const url = `${process.env.NEXT_PUBLIC_SITEMAP_URL}${path}`;

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
