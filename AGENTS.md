# AGENTS.md

## Commands
- Dev: `npm run dev` (Vite, http://localhost:5173)
- Build: `npm run build` (`tsc -b && vite build`) — typecheck runs first; fix TS errors before Vite.
- Lint: `npm run lint` (oxlint). No test runner configured.

## Structure
- Single Vite app; entry `src/main.tsx` → `src/App.tsx`.
- UI in `src/components/*`; data in `src/data/*`; types in `src/types/coffee.ts`.
- Styling: Tailwind v4 via `@tailwindcss/vite`; global styles in `src/index.css`.
- PWA: `public/manifest.json`; theme color in `index.html`.

## Conventions
- TypeScript strict app config (`tsconfig.app.json`).
- No comments in code unless asked.
- Fonts: Outfit (display) + Work Sans (body) loaded from Google Fonts in `index.html`.
- Dark mode via `.dark` class on root.
- Reduced-motion handled in `src/index.css`.

## Gotchas
- `oxlint` config is `.oxlintrc.json` (not `.eslintrc`).
- `dist/` is committed build output; rebuild after source changes.
- No automated tests; verify manually in browser.