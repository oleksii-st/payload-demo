import { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Header as HeaderType, Footer as FooterType, Settings } from '@/payload-types';
import { cn } from '@/utils/cn';
import { getCachedGlobal } from '@/utils/getGlobals';

export const Layout = async ({ children }: { children: ReactNode }) => {
  const header: HeaderType = (await getCachedGlobal('header')()) as HeaderType;
  const footer: FooterType = (await getCachedGlobal('footer', 1)()) as FooterType;
  const { container, horizontalPaddings, horizontalPaddingsDesktop }: Settings =
    (await getCachedGlobal('settings', 1)()) as Settings;

  const styles = `
  html {
    --container-width: ${container}px;
    --container-padding: ${horizontalPaddings}px;
    --container-padding-desktop: ${horizontalPaddingsDesktop}px;
  `;

  return (
    <div className="flex flex-col min-h-[100vh]">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Header {...header} />
      <main
        className={cn(
          'prose prose-basic prose-code:text-[var(--code-inline-color)] prose-code:bg-[var(--code-inline-bg-color)] prose-code:before:content-none prose-code:after:content-none prose-code:px-0.5 prose-code:py-1 prose-h2:mt-0',
          'flex-auto flex flex-col max-w-full',
        )}
        id="main"
      >
        {children}
      </main>
      <Footer {...footer} />
    </div>
  );
};
