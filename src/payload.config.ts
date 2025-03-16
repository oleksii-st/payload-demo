import { fileURLToPath } from 'node:url';
import path from 'path';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { BlocksFeature, lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { buildConfig } from 'payload';

import { Media } from '@/payload/collections/Media';
import { Pages } from '@/payload/collections/Pages';
import { Posts } from '@/payload/collections/Posts';
import { ReusableContent } from '@/payload/collections/ReusableContent';
import { RichTextDataInstances } from '@/payload/collections/RichTextDataInstances';
import Users from '@/payload/collections/Users';
import { INLINE_BLOCKS } from '@/payload/fields/inlineBlocks';
import { Footer } from '@/payload/globals/Footer';
import { Header } from '@/payload/globals/Header';
import { NotFound } from '@/payload/globals/NotFound';
import { Settings } from '@/payload/globals/Settings/Settings';
import { BASE_URL } from '@/utils/constants';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: `${BASE_URL}/preview`,
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter(
        (feature) => feature.key !== 'relationship' && feature.key !== 'checklist',
      ),
      LinkFeature({
        enabledCollections: ['pages', 'posts'],
      }),
      BlocksFeature({
        inlineBlocks: INLINE_BLOCKS,
      }),
    ],
  }),
  collections: [Media, Pages, Posts, ReusableContent, Users, RichTextDataInstances],
  globals: [Header, Footer, NotFound, Settings],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    declare: false,
  },
  secret: process.env.PAYLOAD_SECRET || 'PAYLOAD_SECRET_PLACEHOLDER',
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts'],
      globals: ['notFound'],
      uploadsCollection: 'media',
    }),
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => String(doc.title),
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    redirectsPlugin({
      collections: ['pages'],
    }),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              [Media.slug]: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
          }),
        ]
      : []),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
});
