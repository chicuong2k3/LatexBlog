const { test, expect } = require('@playwright/test');

test('trang chủ: tiêu đề chỉ còn AIM', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('AIM');
});

test('trang tĩnh: tiêu đề kết thúc bằng — AIM', async ({ page }) => {
  for (const path of ['/about', '/tags', '/tags/aether', '/books', '/search']) {
    await page.goto(path);
    await expect(page).toHaveTitle(/ — AIM$/);
  }
});

test('trang bài viết: tiêu đề kết thúc bằng — AIM', async ({ page }) => {
  await page.goto('/posts/he-phuong-trinh-ma-tran');
  await expect(page).toHaveTitle(/ — AIM$/);
});

test('header: chữ trên cùng là AIM', async ({ page }) => {
  await page.goto('/');
  // \s* because toHaveText does not collapse the wordmark's own line breaks
  await expect(page.locator('.lb-brand')).toHaveText(/^\s*AIM\s*$/);
});

test('meta description nhắc AIM và không còn tên cũ', async ({ page }) => {
  await page.goto('/');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toContain('AIM');
  expect(description).not.toContain('Alternative World');
});

test('feed rss.xml đặt tiêu đề kênh là AIM', async ({ request }) => {
  const response = await request.get('/rss.xml');
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain('<title>AIM</title>');
});

test('manifest: cả name và short_name đều là AIM', async ({ request }) => {
  const response = await request.get('/manifest.webmanifest');
  expect(response.ok()).toBeTruthy();
  const manifest = JSON.parse(await response.text());
  expect(manifest.name).toBe('AIM');
  expect(manifest.short_name).toBe('AIM');
});

test('json-ld trang chủ nói AIM', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
  const node = JSON.parse(raw);
  expect(node.name).toBe('AIM');
  expect(node.publisher.name).toBe('AIM');
});
