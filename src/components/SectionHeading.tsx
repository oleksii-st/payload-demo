import React, { ComponentProps, ReactNode } from 'react';

type SectionHeadingProps = ComponentProps<'h1' | 'h2'> & {
  isFirst?: boolean;
  children: ReactNode;
};

export const SectionHeading = ({ isFirst = false, children, ...rest }: SectionHeadingProps) => {
  const Tag = isFirst ? 'h1' : 'h2';

  return <Tag {...rest}>{children}</Tag>;
};
