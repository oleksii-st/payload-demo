import { Field, NumberFieldSingleValidation } from 'payload';

import { SectionLayout } from '@/payload-types';

const minValueValidator: NumberFieldSingleValidation = (value: number | null | undefined) =>
  Number(value) >= 0 ? true : 'Value must be equal or greater than 0';

const rewriteFieldDefaults = (
  fields: Field[],
  overrideDefaults?: Partial<SectionLayout>,
): Field[] => {
  if (!overrideDefaults) {
    return fields;
  }

  return fields.map((field) => {
    if (!('name' in field)) {
      return field;
    }

    const defaultValueFromOverrides = overrideDefaults[field.name as keyof SectionLayout];
    if (defaultValueFromOverrides !== undefined) {
      if (field.type !== 'ui') {
        field.defaultValue = defaultValueFromOverrides;
      }
    }

    return field;
  });
};

export const SECTION_LAYOUT = (overrideDefaults?: Partial<SectionLayout>): Field => {
  const fields: Field[] = [
    {
      type: 'checkbox',
      name: 'hideSection',
      label: 'Hide section',
      defaultValue: false,
    },
    {
      type: 'number',
      name: 'paddingTop',
      label: 'Padding top, px',
      defaultValue: 24,
      required: true,
      validate: minValueValidator,
    },
    {
      type: 'number',
      name: 'paddingBottom',
      label: 'Padding Bottom, px',
      defaultValue: 24,
      required: true,
      validate: minValueValidator,
    },
    {
      type: 'array',
      name: 'breakpoints',
      label: 'Breakpoints',
      fields: [
        {
          type: 'number',
          name: 'minWidth',
          label: 'Min width, px',
          required: true,
          validate: minValueValidator,
        },
        {
          type: 'number',
          name: 'paddingTop',
          label: 'Padding top, px',
          defaultValue: 24,
          required: true,
          validate: minValueValidator,
        },
        {
          type: 'number',
          name: 'paddingBottom',
          label: 'Padding Bottom, px',
          defaultValue: 24,
          required: true,
          validate: minValueValidator,
        },
      ],
      defaultValue: [
        {
          minWidth: 767,
          paddingTop: 48,
          paddingBottom: 48,
        },
      ],
    },
  ];

  return {
    type: 'group',
    name: 'sectionLayout',
    label: 'Section layout',
    interfaceName: 'sectionLayout',
    fields: rewriteFieldDefaults(fields, overrideDefaults),
  };
};
