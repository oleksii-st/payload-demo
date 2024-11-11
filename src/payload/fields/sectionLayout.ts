import { Field } from 'payload';

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
    },
    {
      type: 'number',
      name: 'paddingTop',
      label: 'Padding Bottom',
      defaultValue: 24,
      required: true,
    },
  ],
};
