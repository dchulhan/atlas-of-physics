# Testing

`bash scripts/verify` is the shared local/CI entry point. It runs TypeScript,
all fifteen inherited physics/answer-key suites, equation-link validation,
a Vite production build and Playwright smoke tests against that build.

The browser suite checks catalogue images, all 15 chapter deep links, keyboard
navigation, practice loading/reveal, final-page navigation, equation links,
mobile pager and overflow. External hosts are blocked during desktop checks to
prove simulation assets are self-contained. Test screenshots are ignored output.

The TS check deliberately covers new TypeScript, not the inherited JS engine.
Numerical checks do not certify scientific/pedagogical accuracy. Browser checks
use Chromium software WebGL; Safari/iOS, real GPU performance, fine-grained
picking, every answer interaction and view-transition animation require manual
review. Existing tools/ scripts remain available for deeper specialist checks;
they expect a running server on 8137 and a CHROME executable path.
