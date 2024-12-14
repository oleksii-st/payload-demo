type CurrentYearBlock = {
  blockType: 'currentYear';
};

type YearsFrom = {
  blockType: 'yearsFrom';
  year: number;
};

type DynamicDataInstance = {
  blockType: 'dynamicDataInstance';
  dataInstance: {
    value: string;
  };
};

export type InlineBlocksType = CurrentYearBlock | YearsFrom | DynamicDataInstance;

export const InlineBlock = (props: InlineBlocksType) => {
  switch (props.blockType) {
    case 'currentYear':
      return <>{new Date().getFullYear()}</>;
    case 'yearsFrom': {
      const year = (props as YearsFrom).year;
      return <>{new Date().getFullYear() - year}</>;
    }
    case 'dynamicDataInstance': {
      const dataInstance = (props as DynamicDataInstance).dataInstance;
      return <>{dataInstance.value}</>;
    }
    default:
      return null;
  }
};
