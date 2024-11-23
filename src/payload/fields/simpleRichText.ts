import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical';
import { RichTextField } from 'payload';

const SIMPLE_RICH_TEXT_FIELDS = [
  'toolbarInline',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'superscript',
  'inlineCode',
  'paragraph',
  'heading',
  'unorderedList',
  'orderedList',
  'align',
];

export const SIMPLE_RICH_TEXT = (
  overrides?: Omit<RichTextField, 'editor' | 'type'>,
): RichTextField => {
  const { name = 'description', label = 'Description', ...rest } = overrides ?? {};

  return {
    type: 'richText',
    name,
    label,
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures.filter(({ key }) => SIMPLE_RICH_TEXT_FIELDS.includes(key)),
        LinkFeature({
          enabledCollections: ['pages'],
        }),
      ],
    }),
    ...rest,
  };
};
