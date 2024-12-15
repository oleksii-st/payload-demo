import { Block } from 'payload';

export const CURRENT_YEAR: Block = {
  slug: 'currentYear',
  fields: [],
};

export const YEARS_FROM: Block = {
  slug: 'yearsFrom',
  fields: [
    {
      type: 'number',
      name: 'year',
      label: 'Year',
      validate: (value: number | null | undefined) => {
        const numberValue = Number(value);

        if (numberValue < 0) {
          return 'Year cannot be a negative number.';
        }

        if (numberValue > new Date().getFullYear()) {
          return 'Year cannot be in the future.';
        }

        return true;
      },
      required: true,
    },
  ],
};

export const DYNAMIC_DATA_INSTANCE: Block = {
  slug: 'dynamicDataInstance',
  fields: [
    {
      type: 'relationship',
      relationTo: 'richTextDataInstances',
      name: 'dataInstance',
      label: 'Data instance',
      required: true,
      admin: {
        components: {
          Description: '@/payload/components/RichTextDataInstancesDescription/',
        },
      },
    },
  ],
};

export const INLINE_BLOCKS: Block[] = [CURRENT_YEAR, YEARS_FROM, DYNAMIC_DATA_INSTANCE];
