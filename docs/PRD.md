# Product requirements

Atlas of Physics serves students and teachers studying AP Physics 1 and Physics C.
Preserve all fifteen interactive chapters, their diagrams, explanations, practice
questions, equation sheet and chapter-to-chapter comparisons while adopting the
estate's TypeScript/React/Vite/Cloudflare delivery stack.

## Acceptance criteria
- All 15 chapter routes and their numeric hash deep links remain valid.
- Existing numerical and answer-key checks pass without model changes.
- Practice loads from production bundles, answers reveal and pages navigate.
- The equation sheet retains its 361 checked chapter links.
- Desktop keyboard and mobile pager navigation work without horizontal overflow.
- Production simulations work without a third-party JavaScript CDN.
- A frozen pnpm installation can typecheck, test and build for Cloudflare.

## Non-goals
No login, payments, tracking, API, database or changes to physics content.
No redesign or wholesale TypeScript rewrite of the numerical/rendering engines.
AP is a College Board trademark; this project is not endorsed by the College Board.
