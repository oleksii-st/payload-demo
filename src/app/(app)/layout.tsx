import './globals.css';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { ReactNode } from 'react';

import { Layout } from '@/components/Layout';
import { cn } from '@/utils/cn';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/api/media/file/favicon.ico" />
      </head>

      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
