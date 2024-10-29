'use client';

import React from 'react';

import { RichText } from '@/components/RichText';
import { Richtext as RichTextBlockType } from '@/payload-types';
import { Block } from '@/utils/types';

export type RichTextBlockProps = Block<RichTextBlockType>;

export const RichTextBlock = ({ content }: RichTextBlockProps) => {
  return (
    <section className="my-5 sm:my-8">
      <div className="container">
        <RichText content={content} />
      </div>
    </section>
  );
};
