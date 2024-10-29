import { deepMerge, Field } from 'payload';

type LinkType = (options?: {
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
}) => Field;

const link: LinkType = ({ overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    interfaceName: 'Link',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
            defaultValue: 'reference',
            admin: {
              layout: 'horizontal',
              width: '33.333%',
            },
          },
          {
            name: 'newTab',
            label: 'Open in new tab',
            type: 'checkbox',
            admin: {
              width: '33.333%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
          {
            name: 'disableIndex',
            label: 'Disable indexation for search engines',
            type: 'checkbox',
            admin: {
              width: '33.333%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'reference',
      label: 'Document to link to',
      type: 'relationship',
      relationTo: ['pages'],
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      label: 'Custom URL',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
  ];

  linkTypes.map((linkType) => ({
    ...linkType,
    admin: {
      ...linkType.admin,
      width: '50%',
    },
  }));

  linkResult.fields.push({
    type: 'row',
    fields: [
      ...linkTypes,
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        admin: {
          width: '50%',
        },
      },
    ],
  });

  return deepMerge<Field>(linkResult, overrides);
};

export default link;
