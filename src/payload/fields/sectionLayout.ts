import { Field, NumberFieldSingleValidation } from 'payload';

const minValueValidator: NumberFieldSingleValidation = (value: number | null | undefined) =>
  Number(value) >= 0 ? true : 'Value must be equal or greater than 0';

export const SECTION_LAYOUT: Field = {
  type: 'group',
  name: 'sectionLayout',
  label: 'Section layout',
  fields: [
    {
      type: 'number',
      name: 'paddingTop',
      label: 'Padding top',
      defaultValue: 24,
      required: true,
      validate: minValueValidator,
    },
    {
      type: 'number',
      name: 'paddingBottom',
      label: 'Padding Bottom',
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
          label: 'Min width',
          required: true,
          validate: minValueValidator,
        },
        {
          type: 'number',
          name: 'paddingTop',
          label: 'Padding top',
          defaultValue: 24,
          required: true,
          validate: minValueValidator,
        },
        {
          type: 'number',
          name: 'paddingBottom',
          label: 'Padding Bottom',
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
  ],
};
