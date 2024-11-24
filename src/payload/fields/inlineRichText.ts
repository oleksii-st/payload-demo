import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical';
import { RichTextField } from 'payload';

const INLINE_RICH_TEXT_FIELDS = [
  'toolbarInline',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'superscript',
  'inlineCode',
  'align',
];

export const INLINE_RICH_TEXT = (
  overrides?: Omit<RichTextField, 'editor' | 'type'>,
): RichTextField => {
  const { name = 'text', label = 'Text', ...rest } = overrides ?? {};

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
      ],
    }),
    admin: {
      components: {
        Field: '@/payload/components/InlineRichText/',
      },
    },
    ...rest,
  };
};
