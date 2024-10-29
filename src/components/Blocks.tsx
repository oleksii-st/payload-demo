import { Grid } from '@/blocks/Grid';
import { Hero } from '@/blocks/Hero';
import { RichTextBlock } from '@/blocks/RichText';
import { Page, ReusableContent } from '@/payload-types';

type LayoutBlocks = Page['layout'];

type BlockComponent = typeof Hero | typeof RichTextBlock | typeof Grid;

const blockComponents: Record<string, BlockComponent> = {
  hero: Hero,
  richText: RichTextBlock,
  grid: Grid,
};

type BlocksProps = {
  blocks: LayoutBlocks;
  isFirst?: boolean;
};

export const Blocks = ({ blocks, isFirst = true }: BlocksProps) => {
  if (!blocks.length) {
    return null;
  }

  const getBlocksToShow = (block: LayoutBlocks[number]) => {
    const blockType = block.blockType;

    const isRepeatableContent = blockType === 'reusableContentBlock';
    const isBlockExist = Object.keys(blockComponents).includes(blockType);
    const isBlockHidden = 'hideBlock' in block ? block.hideBlock : false;

    return isRepeatableContent || (isBlockExist && !isBlockHidden);
  };

  const renderBlocks = (block: LayoutBlocks[number], index: number) => {
    const blockType = block.blockType;
    const Block = blockComponents[blockType];

    const hasReusableContent = 'reusableContent' in block;
    const isRepeatableContent = hasReusableContent && typeof block.reusableContent !== 'string';

    if (isRepeatableContent) {
      return (
        <Blocks
          key={index}
          blocks={(block.reusableContent as ReusableContent).layout}
          isFirst={isFirst && index === 0}
        />
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Block key={index} {...(block as any)} isFirst={isFirst && index === 0} />;
  };

  return <>{blocks.filter(getBlocksToShow).map(renderBlocks)}</>;
};
