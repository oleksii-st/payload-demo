import { notFound, redirect } from 'next/navigation';

import { getCachedRedirects } from '@/utils/getRedirects';

interface Redirect {
  from: string;
  to?: {
    type: string;
    reference?: {
      value: string | { breadcrumbs?: { url: string }[] };
    };
    url?: string;
  };
}

export const PayloadRedirects = async ({ url }: { url: string }) => {
  let redirectUrl: string | null = null;

  try {
    const redirects = await getCachedRedirects()();
    const currentRedirect = redirects.find((redirect) => redirect.from === url);

    if (!currentRedirect) {
      return notFound();
    }

    redirectUrl = getRedirectUrl(currentRedirect as unknown as Redirect);

    if (!redirectUrl) {
      return notFound();
    }
  } catch (error) {
    console.log(error);
    return notFound();
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }
};

function getRedirectUrl(redirect: Redirect): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_SITEMAP_URL ?? '';

  if (!redirect.to) {
    return null;
  }

  if (redirect.to.type === 'reference') {
    const value = redirect.to.reference?.value;
    if (typeof value === 'string') {
      return value;
    }
    if (value && 'breadcrumbs' in value) {
      const lastBreadcrumb = value.breadcrumbs?.at(-1)?.url;
      if (lastBreadcrumb === '/home') {
        return baseUrl;
      }
      return lastBreadcrumb ? new URL(String(lastBreadcrumb), baseUrl).toString() : null;
    }
  }

  return redirect.to.url ?? null;
}
