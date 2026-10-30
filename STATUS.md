# Current state

Last verified: 2026-10-30. Refactor prepared for review; not deployed.

## Working
- React 19 / TypeScript catalogue and shared chapter structure; Vite 8 and Tailwind v4.
- All 15 original physics chapters, practice, equation links and numeric hash URLs.
- Locally bundled Three.js 0.186.1; no Vercel analytics dependency.
- pnpm 10 lockfile, Cloudflare static-asset config and shared local/CI verification.

## Verification evidence
- Frozen offline pnpm install: passed.
- `bash scripts/verify`: passed (credential gate, TypeScript, all 15 numerical suites,
  361 equation links, production build, Chromium browser checks).
- Browser checks: all chapters at deep links, next/final pages and practice answers;
  catalogue images, equation links, mobile paging/overflow, animated opening/back
  navigation and no application page errors. Desktop checks block external hosts.
- `wrangler deploy --dry-run`: passed; 104 assets discovered, no bindings required.
- Git diff confirms physics models, worlds, lesson data and practice answers unchanged.
- Catalogue and mobile chapter screenshots visually inspected.

## Limitations
Tests ran with Node 24.22.1, pnpm 10.28.2 and Chromium software rendering. The normal
Playwright browser download was unavailable in the execution environment; a local
packaged Chromium was supplied through CHROME. CI uses Playwright's regular install.
The configured Node 22 CI job has not yet been observed completing.
Cloudflare local runtime startup was blocked by the environment's network-interface
restriction (`uv_interface_addresses`); no Cloudflare runtime or live deployment
success is claimed. No credentials or custom domains were configured.

The inherited simulation engine remains JavaScript. New TypeScript checks cover
the application boundary. The shared Three.js/book bundle is approximately 776 kB
minified (201 kB gzip), which triggers Vite's default chunk-size warning. Google
Fonts remains external. Safari/iOS and real GPU performance need manual review;
unsupported or interrupted view transitions fall back safely.

## Next actions
Review the draft PR and its CI results, then perform an authorised Cloudflare
preview/deployment smoke test before assigning a production domain.
