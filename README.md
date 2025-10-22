Interest — Next.js Calculators

A small Next.js + TypeScript project of calculators and date utilities (Nepali/Bikram Sambat support) with a light/dark theme and accessible UI components.

This repository uses Next.js 15 (App Router), React 19, Tailwind CSS and several UI libraries (Radix, lucide-react, react-day-picker). It includes a set of calculator components under `src/components/common/calculators` such as simple interest, compound interest and age calculators.

## Quick start

Prerequisites:
- Node.js (v18 or newer recommended)
- npm, pnpm, or yarn

Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or with pnpm
pnpm dev
# or with yarn
yarn dev
```

Open http://localhost:3000 in your browser.

Available scripts (from `package.json`):
- `dev` — start Next.js in development mode (uses Turbopack)
- `build` — build the app for production
- `start` — run the production server after build
- `lint` — run ESLint

## Project structure (important parts)

- `app/` — Next.js App Router pages and layouts
  - `app/page.tsx` — home page
  - `app/layout.tsx` — root layout
  - `globals.css` — global styles
- `src/components/` — reusable UI and calculator components
  - `common/` — Navbar, Footer, ThemeProvider, calculator components
  - `ui/` — design system primitives (buttons, inputs, modal, toast, calendar)
- `src/lib/` — utilities and shared logic (`calculator.ts`, `utils.ts`, `types.ts`)
- `public/` — static assets
- `styles/` — third-party stylesheet overrides (daypicker, nepali-datepicker)

## Features

- Multiple calculators: Simple interest, Compound interest, Age calculator, Bank interest helper, Quick calculations
- Nepali (Bikram Sambat) date support and Nepali date-picker integration
- Theme toggle (light/dark) with `next-themes`
- Accessible components (Radix UI primitives) and small design system

## Notes about dependencies

- Next.js: 15.x (App Router)
- React: 19.x
- Tailwind CSS 4
- Several Radix UI packages for accessible primitives

If you need to upgrade or pin versions for deployment, check `package.json`.

## Development tips

- Edit UI in `src/components/ui/*` and `src/components/common/*`.
- Add new calculators under `src/components/common/calculators` and export them from the calculator index if needed.
- Use `react-hook-form` for forms and `zod` for validation (already included).
- Styling is mostly Tailwind — run `npm run dev` and change classes for live feedback.

## Linting & Types

- Project includes TypeScript types and ESLint config. Run:

```bash
npm run lint
```

Fix types with your editor (tsserver) or run the TypeScript compiler if you add new files.

## Deploy

This app is ready to deploy on Vercel. In most cases you can:

1. Push the repo to GitHub.
2. Import the repository in the Vercel dashboard.
3. Set the root to the repository (no special build settings required).

If you deploy elsewhere, build using:

```bash
npm run build
npm run start
```

## Contribution

Contributions are welcome. Please open issues for bugs or feature requests and create pull requests for fixes.

Suggested workflow:

1. Fork the repo.
2. Create a feature branch.
3. Run and test locally.
4. Open a PR with a clear description.

## License

Add a license file if you intend to make this project open source. This repository does not currently include a LICENSE file — add one (for example, MIT) to clarify usage rights.

---

If you'd like, I can also:

- Add a short `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`
- Add basic tests for calculator functions in `src/lib/calculator.ts`
- Add a simple GitHub Actions workflow for linting and building on push

Tell me which of those you'd like next, or if you want the README expanded with screenshots and example inputs/outputs.