# Payload Demo

A Next.js project using Payload CMS with TypeScript and modern React.

## Guides

- [How to manage section layout in Payload CMS](https://oleksii-s.dev/blog/how-to-manage-section-layout-in-payload-cms) - [PR](https://github.com/oleksii-st/payload-demo/pull/31)
- [How to build inline rich text field in Payload CMS](https://oleksii-s.dev/blog/how-to-build-inline-rich-text-field-in-payload-cms) - [PR](https://github.com/oleksii-st/payload-demo/pull/49)
- [How to build color input in Payload CMS 3](https://oleksii-s.dev/blog/how-to-build-color-input-in-payload-cms-3) - [PR](https://github.com/oleksii-st/payload-demo/pull/67)
- [How to add dynamic data in rich text using inline blocks in Payload CMS](https://oleksii-s.dev/blog/how-to-add-dynamic-data-in-rich-text-using-inline-blocks-in-payload-cms) - [PR](https://github.com/oleksii-st/payload-demo/pull/78)

## Prerequisites

- Node.js (LTS version recommended)
- PNPM
- MongoDB (for database)

## Tech Stack

- **Framework:** Next.js 15
- **CMS:** Payload CMS 3
- **Database:** MongoDB
- **UI Libraries:**
  - @faceless-ui/modal
  - @faceless-ui/scroll-info
- **Rich Text Editor:** Lexical (via @payloadcms/richtext-lexical)
- **Styling:** Tailwind CSS
- **Type Checking:** TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables (create a `.env` file based on `.env.example`)

4. You can use restore database to not fill it manual with `pnpm preset`. This step is optional

User's credentials for this DB:

**Admin path**: http://localhost:3000/admin <br/>
**Login**: `test@gmail.com` <br/>
**Password**: `Test` <br/>

5. Run the development server:

```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm generate:types` - Generate Payload types
- `pnpm preset` - Restore database from example

## Code Quality Tools

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **lint-staged** - Run linters on staged files

## Features

- SEO optimization (via @payloadcms/plugin-seo)
- Nested documents support
- URL redirects management
- Vercel Blob storage integration
- Rich text editing with Lexical
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript

## Project Structure

```
payload-demo/
├── components/        # React components
├── pages/            # Next.js pages
├── public/           # Static assets
├── styles/           # CSS styles
├── types/            # TypeScript types
└── payload/          # Payload CMS configuration
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure code quality:

```bash
pnpm lint
```

4. Submit a pull request
