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

const currentYear = new Date().getFullYear();

export const InlineBlock = (props: InlineBlocksType) => {
  switch (props.blockType) {
    case 'currentYear':
      return <>{currentYear}</>;
    case 'yearsFrom': {
      const year = (props as YearsFrom).year;
      return <>{currentYear - year}</>;
    }
    case 'dynamicDataInstance': {
      const dataInstance = (props as DynamicDataInstance).dataInstance;
      return <>{dataInstance.value}</>;
    }
    default:
      return null;
  }
};
