import type { SerializedLexicalNode } from 'lexical';
import React, { ComponentProps } from 'react';

import { serializeLexical } from './serialize';

import { cn } from '@/utils/cn';
import { RichTextType } from '@/utils/types';

type RichTextProps = Omit<ComponentProps<'div'>, 'content'> & {
  content?: RichTextType;
};

export const RichText = ({ className, content, ...rest }: RichTextProps) => {
  if (!content) {
    return null;
  }

  const hasRoot = 'root' in content;

  if (!hasRoot) {
    return null;
  }

  const contentTyped = content as { root: { children: SerializedLexicalNode[] } };

  return (
    <div className={cn('rich-text', className)} {...rest}>
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: contentTyped.root.children })}
    </div>
  );
};
