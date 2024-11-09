# Payload Demo

A Next.js project using Payload CMS with TypeScript and modern React.

## Prerequisites

- Node.js (LTS version recommended)
- Yarn 4.5.1
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
yarn install
```

3. Set up your environment variables (create a `.env` file based on `.env.example`)

4. You can use restore database to not fill it manual with `yarn preset`. This step is optional

User's credentials for this DB:

**Admin path**: http://localhost:3000/admin <br/>
**Login**: `test@gmail.com` <br/>
**Password**: `Test` <br/>

5. Run the development server:

```bash
yarn dev
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code using Prettier
- `yarn generate:types` - Generate Payload types
- `yarn prepare` - Setup Husky git hooks
- `yarn presets` - Restore database from example

## Code Quality Tools

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
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
yarn lint
yarn format
```

4. Submit a pull request

## Package Manager

This project uses Yarn 4.5.1. Please do not use npm or older versions of Yarn to maintain consistency.
