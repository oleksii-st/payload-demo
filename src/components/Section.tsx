import { ComponentProps, useId } from 'react';

import { SectionLayout } from '@/payload-types';

type SectionProps = SectionLayout & ComponentProps<'section'>;

const generateMediaQuery = (
  id: string,
  breakpoint: NonNullable<SectionLayout['breakpoints']>[number],
): string => {
  if (!breakpoint) {
    return '';
  }
  const { minWidth, paddingTop, paddingBottom } = breakpoint;

  return `
    @media screen and (min-width: ${minWidth}px) {
      [id="${id}"] {
        padding-top: ${paddingTop}px;
        padding-bottom: ${paddingBottom}px;
      }
    }
  `;
};

export const Section = ({
  hideSection = false,
  paddingTop,
  paddingBottom,
  breakpoints,
  children,
  ...rest
}: SectionProps) => {
  if (hideSection) {
    return null;
  }

  const id = rest.id ?? useId();

  const initialStyles = `
  [id="${id}"] {
    padding-top: ${paddingTop}px;
    padding-bottom: ${paddingBottom}px;
  }
`;

  const styles =
    initialStyles +
    (breakpoints
      ? breakpoints.map((breakpoint) => generateMediaQuery(id, breakpoint)).join('\n')
      : '');

  return (
    <section {...rest} id={id}>
      <style>{styles}</style>
      {children}
    </section>
  );
};
