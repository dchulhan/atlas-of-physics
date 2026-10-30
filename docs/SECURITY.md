# Security

This is a public static educational application. There are no accounts, secrets,
server-side data stores, payments or application telemetry. Browser/session
storage is used only by the existing book transition behaviour. Google Fonts
receives ordinary font requests; there is no Vercel analytics script.

Lessons and practice contain trusted HTML committed to the repository. They
must not accept untrusted HTML without a separate sanitisation design. Navigation
selects from a fixed chapter manifest. Unknown chapter bootstrap and failed
module loads show a visible error. WebGL must be available for simulations.

`public/_headers` adds nosniff, same-origin framing and referrer policy. No broad
CSP is claimed: the inherited engine uses inline styles/HTML and external fonts.
Cloudflare deployment credentials belong in the operator environment, never in
Vite-prefixed variables or committed files. Rotate any exposed token and revoke
its access. Report vulnerabilities privately to repository owner dchulhan.

Verification includes a bounded offline credential check adapted from the scaffold.
It detects selected GitHub/AWS token formats and private-key headers in working
tree text files. It does not scan Git history, ignored files, entropy, generic
API keys or dependency vulnerabilities; passing it is not a security certification.
