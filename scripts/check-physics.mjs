import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const chapters = JSON.parse(readFileSync(new URL('../src/chapters.json', import.meta.url), 'utf8'));
for (const script of [...chapters.map(c => `${c.slug}/checks.mjs`), 'equations/check.mjs']) {
  const result = spawnSync(process.execPath, [script], { stdio: 'inherit', cwd: new URL('../', import.meta.url) });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
