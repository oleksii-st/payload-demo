import { BlocksFeature, lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical';
import { RichTextField } from 'payload';

import { INLINE_BLOCKS } from '@/payload/fields/inlineBlocks';

const INLINE_RICH_TEXT_FIELDS = [
  'toolbarInline',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'inlineCode',
  'align',
];

export const INLINE_RICH_TEXT = (
  overrides?: Omit<RichTextField, 'editor' | 'type'>,
): RichTextField => {
  const { name = 'text', label = 'Text', admin, ...rest } = overrides ?? {};

  return {
    type: 'richText',
    name,
    label,
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures.filter(({ key }) => INLINE_RICH_TEXT_FIELDS.includes(key)),
        LinkFeature({
          enabledCollections: ['pages'],
        }),
        BlocksFeature({
          inlineBlocks: INLINE_BLOCKS,
        }),
      ],
    }),
    admin: {
      ...admin,
      components: {
        Field: '@/payload/components/InlineRichText/',
      },
    },
    ...rest,
  };
};
