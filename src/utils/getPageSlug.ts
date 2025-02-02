export const getPageSlug = (breadcrumbs: { url?: string }[]) => {
  return '/' + getPageSlugParts(breadcrumbs)?.join('/');
};

export const getPageSlugParts = (breadcrumbs: { url?: string }[]) => {
  return breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/');
};
