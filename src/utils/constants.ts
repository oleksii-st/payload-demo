export const BASE_URL = process.env.NEXT_PUBLIC_SITEMAP_URL as string;
export const IS_PRODUCTION = process.env.ENVIRONMENT === 'production';
export const IS_DEVELOPMENT = process.env.ENVIRONMENT === 'development';
export const TOO_MANY_REQUEST_MESSAGE = 'Too many requests! Try again later.';
