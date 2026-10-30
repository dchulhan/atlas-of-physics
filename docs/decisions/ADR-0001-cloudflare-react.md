# ADR-0001: React multi-page delivery on Cloudflare

Date: 2026-10-30. Status: accepted for this refactor; deployment pending.

## Context
The imported application consists of static HTML chapter shells and imperative
Three.js scenes with extensive numerical checks. The requested estate stack is
React/TypeScript/Vite/Tailwind on Cloudflare. Rewriting the scientific engine
would increase regression risk without changing the hosting requirement.

## Decision
Extract catalogue metadata and repeated chapter structure into typed React.
Keep chapter-level full document navigation, URLs and imperative scene code.
Use Vite's explicit multi-page build and import maps generated at build time
through `import.meta.glob`, not browser import maps or CDN Three.js.
Host the output using Cloudflare Workers Static Assets. Use Tailwind utilities
without Preflight. Do not add databases, auth or a Worker API without a feature
requiring them. Preserve MIT licensing and upstream attribution.

## Consequences
The application has a consistent estate build and deployment path, while the
scientific modules remain JavaScript. Typechecking covers the new TS boundary,
not all legacy JS. The React chapter root mounts once and must not rerender;
future client-side routing requires disposal of WebGL and event listeners first.
Early view-transition code remains a small classic script in public/.
