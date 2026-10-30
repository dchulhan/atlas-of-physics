# Gotchas

2026-10-30; owner: dchulhan; decision: ADR-0001-cloudflare-react.
- Do not enable StrictMode replay or rerender the chapter root after bootstrap.
  The inherited engine owns that DOM. Revisit after implementing explicit disposal.
- Keep public/cover.js a classic head script: it reads document.currentScript.
- Runtime imports constructed from location.href break after bundling. Use the
  fixed Vite glob mappings for practice and chapter modules.
- Do not add Tailwind Preflight globally; it changes the established book layout.
- Chapter URLs and hash indexes are externally linkable; preserve them.
- The original tools/ Chrome default is macOS-specific; set CHROME elsewhere.
