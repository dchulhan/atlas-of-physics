# Technical requirements

Use React 19, strict TypeScript for new application code, Vite 8, Tailwind v4,
pnpm 10 and Wrangler 4. Retain the original Three.js release and numerical JS
modules. Dependency versions resolve through the committed pnpm lockfile.

`vite.config.ts` explicitly builds all seventeen HTML entries. Unknown paths must
return 404 rather than the catalogue. Wrangler configures static assets with
trailing-slash HTML handling and a custom 404 page. Tailwind utilities are scoped
to the catalogue and omit Preflight to preserve the book's established CSS.

Run the same verification entry point locally and in CI. CI installs Chromium
and system libraries, then runs typechecking, numerical tests, the production
build and browser smoke tests. Deployment is an explicit operator action.
See ARCHITECTURE.md for module boundaries and TESTING.md for coverage limits.
