# Architecture

Vite builds a multi-page application: the catalogue, fifteen chapter documents
and the equation sheet. Cloudflare Workers Static Assets serves `dist/` directly.
There is no Worker application code, API, database or server-side session.

`src/main.tsx` renders the React catalogue from `src/chapters.json` and bundled
artwork. `src/chapter.tsx` renders the shared chapter structure, commits it
synchronously, then imports the selected chapter's `main.js`.
The existing engine takes exclusive ownership of simulation descendants after
bootstrap. React must not rerender that root. Full document navigation releases
the old renderer/listeners; SPA navigation would require an explicit teardown API.

The chapter directories retain reviewed JavaScript physics models, lesson data,
practice and Three.js worlds. `engine/` contains the shared renderer and book.
Vite statically discovers practice modules so their URLs survive asset hashing.
Three.js 0.186.1 is pinned to match upstream and bundled locally.
`public/cover.js` is an intentional early classic script for cross-document view
transitions; Vite copies it unchanged. `equations/build.mjs` remains the equation
sheet generator, with its corresponding link check.

Browser input is limited to navigation and simulation controls. Lesson HTML is
trusted, repository-authored content. No user HTML is accepted. Google Fonts
remains an optional external stylesheet/font source; fallback fonts work offline.

See [the migration decision](decisions/ADR-0001-cloudflare-react.md),
[contracts](CONTRACTS.md) and [operations](OPERATIONS.md).
