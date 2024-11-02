/* tslint:disable */
 
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    media: Media;
    pages: Page;
    'reusable-content': ReusableContent;
    users: User;
    redirects: Redirect;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsSelect?: {
    media: MediaSelect<false> | MediaSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    'reusable-content': ReusableContentSelect<false> | ReusableContentSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    redirects: RedirectsSelect<false> | RedirectsSelect<true>;
    'payload-locked-documents':
      | PayloadLockedDocumentsSelect<false>
      | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    header: Header;
    footer: Footer;
    notFound: NotFound;
    settings: Settings;
  };
  globalsSelect?: {
    header: HeaderSelect<false> | HeaderSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
    notFound: NotFoundSelect<false> | NotFoundSelect<true>;
    settings: SettingsSelect<false> | SettingsSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs?: {
    tasks: unknown;
    workflows?: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  publishedAt?: string | null;
  layout: (Hero | Grid | Richtext | ReusableContentBlock)[];
  disableIndex?: boolean | null;
  slug?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (string | null) | Media;
  };
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Hero".
 */
export interface Hero {
  image: string | Media;
  heading: string;
  subheading?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Grid".
 */
export interface Grid {
  heading?: string | null;
  images?:
    | {
        icon: string | Media;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'grid';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Richtext".
 */
export interface Richtext {
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'richText';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReusableContentBlock".
 */
export interface ReusableContentBlock {
  reusableContent?: (string | null) | ReusableContent;
  id?: string | null;
  blockName?: string | null;
  blockType: 'reusableContentBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reusable-content".
 */
export interface ReusableContent {
  id: string;
  title: string;
  layout: (Hero | Grid | Richtext)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  roles?: ('admin' | 'user')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'reusable-content';
        value: string | ReusableContent;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'redirects';
        value: string | Redirect;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  publishedAt?: T;
  layout?:
    | T
    | {
        hero?:
          | T
          | {
              image?: T;
              heading?: T;
              subheading?: T;
              id?: T;
              blockName?: T;
            };
        grid?:
          | T
          | {
              heading?: T;
              images?:
                | T
                | {
                    icon?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        richText?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
        reusableContentBlock?:
          | T
          | {
              reusableContent?: T;
              id?: T;
              blockName?: T;
            };
      };
  disableIndex?: T;
  slug?: T;
  meta?:
    | T
    | {
        overview?: T;
        title?: T;
        description?: T;
        image?: T;
        preview?: T;
      };
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reusable-content_select".
 */
export interface ReusableContentSelect<T extends boolean = true> {
  title?: T;
  layout?:
    | T
    | {
        hero?:
          | T
          | {
              image?: T;
              heading?: T;
              subheading?: T;
              id?: T;
              blockName?: T;
            };
        grid?:
          | T
          | {
              heading?: T;
              images?:
                | T
                | {
                    icon?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        richText?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects_select".
 */
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?:
    | T
    | {
        type?: T;
        reference?: T;
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  logo: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  columns?:
    | {
        navItems?:
          | {
              link?: Link;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  copyright?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Link".
 */
export interface Link {
  type?: ('reference' | 'custom') | null;
  newTab?: boolean | null;
  disableIndex?: boolean | null;
  reference?: {
    relationTo: 'pages';
    value: string | Page;
  } | null;
  url?: string | null;
  label?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notFound".
 */
export interface NotFound {
  id: string;
  heading?: string | null;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (string | null) | Media;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings".
 */
export interface Settings {
  id: string;
  container: number;
  horizontalPaddings: number;
  horizontalPaddingsDesktop: number;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header_select".
 */
export interface HeaderSelect<T extends boolean = true> {
  logo?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  columns?:
    | T
    | {
        navItems?:
          | T
          | {
              link?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    disableIndex?: T;
                    reference?: T;
                    url?: T;
                    label?: T;
                  };
              id?: T;
            };
        id?: T;
      };
  copyright?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notFound_select".
 */
export interface NotFoundSelect<T extends boolean = true> {
  heading?: T;
  description?: T;
  meta?:
    | T
    | {
        overview?: T;
        title?: T;
        description?: T;
        image?: T;
        preview?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings_select".
 */
export interface SettingsSelect<T extends boolean = true> {
  container?: T;
  horizontalPaddings?: T;
  horizontalPaddingsDesktop?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}
