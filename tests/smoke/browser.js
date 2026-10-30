import assert from 'node:assert/strict';
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { preview } from 'vite';

const chapters = JSON.parse(readFileSync(new URL('../../src/chapters.json', import.meta.url), 'utf8'));
const server = await preview({ preview: { port: 8138, strictPort: true } });
const origin = 'http://127.0.0.1:8138';
let browser;
try {
  mkdirSync('test-results', { recursive: true });
  browser = await chromium.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const errors = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  // Font availability is not part of application correctness. All application
  // assets, including Three.js, must work with external hosts unavailable.
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  context.on('page', page => {
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  });
  let page = await context.newPage();
  await page.goto(origin);
  await page.locator('a.card').last().waitFor();
  assert.equal(await page.locator('a.card').count(), 15);
  await page.waitForFunction(() => [...document.images].filter(i => i.loading !== 'lazy').every(i => i.complete && i.naturalWidth > 0));
  await page.close();
  for (const chapter of chapters) {
    page = await context.newPage();
    await page.goto(`${origin}/${chapter.slug}/#2`);
    await page.waitForFunction(() => window.__atlas && document.querySelector('#pagenum')?.textContent.startsWith('3 /'));
    await page.locator('#sheet .practice .q').first().waitFor();
    assert.equal(await page.locator('#dots button').count(), chapter.pages);
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => document.querySelector('#pagenum')?.textContent.startsWith('4 /'));
    await page.locator('#sheet .practice .q').first().waitFor();
    const choice = page.locator('#sheet .q [data-c]').first();
    if (await choice.count()) {
      await choice.evaluate(button => button.click());
      await page.locator('#sheet .q.done .why').first().waitFor({ state: 'visible' });
    }
    const finalIndex = chapter.pages - 1;
    await page.evaluate(i => { location.hash = `#${i}`; }, finalIndex);
    await page.waitForFunction(n => document.querySelector('#pagenum')?.textContent.startsWith(`${n} /`), chapter.pages);
    await page.locator('#sheet .practice .q').first().waitFor();
    console.log(`PASS ${chapter.slug}: deep link, navigation, practice, final page`);
    await page.close();
  }
  page = await context.newPage();
  await page.goto(`${origin}/equations/`);
  assert.ok(await page.locator('a[href*="/#"]').count() > 100);
  await page.close();
  const animated = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await animated.newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(origin);
  await page.locator('a.card').first().click();
  await page.waitForFunction(() => window.__atlas);
  await page.goBack();
  await page.locator('a.card').last().waitFor();
  await page.close();
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  page = await mobile.newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${origin}/newton/#4`);
  await page.waitForFunction(() => document.querySelector('#pagenum')?.textContent.startsWith('5 /'));
  await page.getByRole('button', { name: 'Next page', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#pagenum')?.textContent.startsWith('6 /'));
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  await page.screenshot({ path: 'test-results/mobile.png' });
  await page.goto(origin);
  await page.locator('a.card').last().waitFor();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  assert.ok(await page.locator('a.card img').first().evaluate(img => img.getBoundingClientRect().height < 110));
  await page.screenshot({ path: 'test-results/catalogue.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log('PASS catalogue, equations, mobile pager and overflow; no application errors');
} finally {
  await browser?.close();
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
}
