const { test, expect } = require('@playwright/test');

test('RSS feed hợp lệ', async ({ request }) => {
  const res = await request.get('/rss.xml');
  expect(res.status()).toBe(200);
  expect((await res.text())).toContain('<rss');
});

test('sitemap hợp lệ', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.status()).toBe(200);
  expect((await res.text())).toContain('<urlset');
});

test('bìa SVG tự sinh cho bài viết', async ({ request }) => {
  const res = await request.get('/cover/dao-ham-va-y-nghia-hinh-hoc.svg');
  expect(res.status()).toBe(200);
  expect((await res.headers())['content-type']).toContain('image/svg+xml');
  expect((await res.text())).toContain('<svg');
});

test('manifest PWA + service worker', async ({ request }) => {
  expect((await request.get('/manifest.webmanifest')).status()).toBe(200);
  expect((await request.get('/sw.js')).status()).toBe(200);
});

test('trang Về tôi', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.lb-about h1')).toBeVisible();
});

test('mọi response vary theo Unpoly headers', async ({ request }) => {
  const vary = (await request.get('/')).headers()['vary'] || '';
  expect(vary).toContain('X-Up-Target');
});

test('trang /write có gate đăng nhập', async ({ page }) => {
  await page.goto('/write');
  await expect(page.locator('.lb-write')).toBeVisible();
});
