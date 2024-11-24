'use client';

import {
  AlignFeatureClient,
  BoldFeatureClient,
  InlineCodeFeatureClient,
  InlineToolbarFeatureClient,
  ItalicFeatureClient,
  LinkFeatureClient,
  RichTextField,
  StrikethroughFeatureClient,
  SuperscriptFeatureClient,
  UnderlineFeatureClient,
} from '@payloadcms/richtext-lexical/client';
import { ComponentProps } from 'react';

type RichTextFieldProps = ComponentProps<typeof RichTextField>;

const InlineRichText = ({
  field,
  path,
  schemaPath,
}: {
  field: RichTextFieldProps['field'];
  path: RichTextFieldProps['path'];
  schemaPath: string;
}) => {
  const clientFeatures = {
    toolbarInline: {
      clientFeatureProps: {
        featureKey: 'toolbarInline',
        order: 0,
      },
      clientFeatureProvider: InlineToolbarFeatureClient,
    },
    link: {
      clientFeatureProps: {
        enabledCollections: ['pages'],
        featureKey: 'link',
        order: 1,
      },
      clientFeatureProvider: LinkFeatureClient,
    },
    align: {
      clientFeatureProps: {
        featureKey: 'align',
        order: 2,
      },
      clientFeatureProvider: AlignFeatureClient,
    },
    inlineCode: {
      clientFeatureProps: {
        featureKey: 'inlineCode',
        order: 3,
      },
      clientFeatureProvider: InlineCodeFeatureClient,
    },
    superscript: {
      clientFeatureProps: {
        featureKey: 'superscript',
        order: 4,
      },
      clientFeatureProvider: SuperscriptFeatureClient,
    },
    strikethrough: {
      clientFeatureProps: {
        featureKey: 'strikethrough',
        order: 5,
      },
      clientFeatureProvider: StrikethroughFeatureClient,
    },
    underline: {
      clientFeatureProps: {
        featureKey: 'underline',
        order: 6,
      },
      clientFeatureProvider: UnderlineFeatureClient,
    },
    bold: {
      clientFeatureProps: {
        featureKey: 'bold',
        order: 7,
      },
      clientFeatureProvider: BoldFeatureClient,
    },
    italic: {
      clientFeatureProps: {
        featureKey: 'italic',
        order: 8,
      },
      clientFeatureProvider: ItalicFeatureClient,
    },
  };
  const featureClientSchemaMap = {
    link: {
      [`${schemaPath}.lexical_internal_feature.link.fields`]: [
        {
          name: 'text',
          type: 'text',
          label: 'Text to display',
          required: true,
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          options: [
            {
              label: 'Custom URL',
              value: 'custom',
            },
            {
              label: 'Internal Link',
              value: 'internal',
            },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Enter a URL',
          required: true,
        },
        {
          name: 'doc',
          type: 'relationship',
          label: 'Choose a document to link to',
          relationTo: ['pages'],
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
        },
      ],
    },
  };

  return (
    <div className="inline-rich-text">
      <RichTextField
        path={path}
        schemaPath={schemaPath}
        initialLexicalFormState={{}}
        field={field}
        admin={{ hideGutter: false }}
        permissions={true}
        clientFeatures={clientFeatures}
        featureClientSchemaMap={
          featureClientSchemaMap as RichTextFieldProps['featureClientSchemaMap']
        }
        lexicalEditorConfig={undefined}
      />
    </div>
  );
};

export default InlineRichText;
