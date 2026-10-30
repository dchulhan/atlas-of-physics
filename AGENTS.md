# Maintainer contract

## Read first
README.md, PROJECT.yaml, STATUS.md, docs/ARCHITECTURE.md and docs/decisions/ADR-0001-cloudflare-react.md.

## Commands
- Setup: `bash scripts/setup` (Node 22.12+ and pnpm 10).
- Development: `pnpm dev`.
- Physics subset: `node kinematics/checks.mjs`.
- Typecheck: `pnpm typecheck`.
- Build: `pnpm build`.
- Verification, locally and in CI: `bash scripts/verify`.
- Browser installation: `pnpm exec playwright install chromium`.
- Local Cloudflare preview: `pnpm cf:preview`.
- Explicit deployment: `pnpm deploy`.

## Always
- Preserve physics, lesson content, practice answers and existing chapter/hash URLs.
- Read the complete tracked tree and scoped instructions before editing.
- Keep changes scoped, reversible and in British English; update affected docs.
- Keep React and imperative simulation DOM ownership separate. See the ADR.
- Run actual verification; distinguish local evidence from remote CI.
- Preserve upstream MIT attribution.

## Ask first
Production deployment, custom domains, credentials, billing, destructive changes,
authentication and changes to scientific content or assessment answers.

## Never
Commit secrets, weaken verification, force-push, add unexplained dependencies,
or claim physics/browser correctness from a structural audit score.

## Definition of done
Acceptance criteria pass, verification evidence is recorded, docs match the code,
and the proposed Git diff has been inspected. A draft PR is not human approval.
