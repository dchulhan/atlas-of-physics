# Operations

## Setup and local development
Use Node 22.12+ (22 LTS recommended), pnpm 10.28.2, Git and Python 3.10+ for the
offline credential gate. Run `bash scripts/setup`.
The first install needs the npm registry and Playwright browser downloads.
`pnpm dev` serves http://127.0.0.1:8137. `pnpm preview` serves an existing build.
`pnpm cf:preview` builds and serves using the local Cloudflare runtime.

## Deployment
Run `bash scripts/verify`. Authenticate Wrangler separately using an authorised
Cloudflare account, then explicitly run `pnpm deploy`. Wrangler serves `dist/`
using static assets. No D1/R2/Queues bindings are required. No custom domain is
configured. A deployment has not been performed by this refactor.
Cloudflare Pages can alternatively consume the same `pnpm build` / `dist` output;
use one deployment mechanism per environment and avoid SPA fallback rewrites.

## Recovery and monitoring
Check catalogue, chapter deep link, practice answer and equation links after a
release. Use Cloudflare deployment/error logs and browser console for diagnosis.
If a release fails, roll back to the previous Cloudflare deployment version or
rebuild the previous reviewed Git commit with its lockfile and deploy explicitly.
Git is the backup for code/content; there is no application database to restore.
Never cache unversioned HTML as immutable. Hashed `/assets/` files may be cached
for a year; chapter HTML uses platform defaults.
