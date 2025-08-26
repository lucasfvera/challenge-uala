# Ualá Web Developer Challenge

This project serves as a solution for the Ualá challenge for Web Developer. You can read more about it in ["Web Developer Challenge"](./docs/CHALLENGE.md)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Testing**: Jest with React Testing Library
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js configuration

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- Git

## Running Locally

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd challenge-uala
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```bash
# API Configuration
URL_SERVICE_TRANSACTIONS=https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json
```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build and Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

## Code Quality

```bash
# Lint code
pnpm lint
```

## Project Architecture

### Directory Structure

```
src/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components
│   ├── atoms/          # Basic building blocks (buttons, icons)
│   ├── molecules/      # Composite components (tabs, sidebar)
│   └── organisms/      # Complex components (filters, summaries)
│   └── ui/             # Components from Shadcn
├── services/           # API and business logic
├── utils/              # Utility functions and helpers
└── assets/             # Static assets and icons
```

### Component Architecture

The project follows Atomic Design principles:
- **Atoms**: Basic and minimum reusable UI elements (buttons, icons, inputs)
- **Molecules**: Simple combinations of atoms (tabs, form fields)
- **Organisms**: Complex UI sections (filters drawer, transaction list)

### State Management

- Uses React Context for global state (filters, theme)
- Local component state with React hooks
- Server-side data fetching with Next.js App Router and URL params
- Page state implemented in URL when possible

### Technical Decisions & Comments

**Framework: Next.js**\
We want to have a Fullstack framework like Next.js mainly for SSR.
Since this would be under an auth layer, we don't care much about SEO at this point.

**UI Library: Shadcn**\
We will cover accessibility with this headless UI. Also it's easy to build styles on top of it with Tailwind CSS.
It's maintained but also the gist of it is that it clones the components into our own repo to maintain them and tweak them.

**Theming with Tailwind CSS**
It works really well with headless libs like Shadcn. Also it's easy to do a mobile-first approach.

- Transactions can be cached


**Components**
- Decorative images like logos or stylistic icons, do not need `alt` attribute.
- Icons are treated as components (under components/atoms/icons) to reuse them and change their colors easily. I preferred a simple approach like creating the icon manually but there are more sophisticated solutions like svgr library.
- Tab Navigation in Transactions Page: We leverage Next.js cache mechanism to fetch the data and then filter it (calculate the total earnings).

