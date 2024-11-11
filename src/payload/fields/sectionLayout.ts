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
    },
    {
      type: 'number',
      name: 'paddingBottom',
      label: 'Padding Bottom',
      defaultValue: 24,
    },
  ],
};
