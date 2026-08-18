const { test, expect } = require('@playwright/test');

test('trang bài render tiêu đề, prose và KaTeX', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await expect(page.locator('.lb-post-head h1')).toContainText('Đạo hàm');
  // KaTeX render công thức thật
  await expect(page.locator('.lb-prose .katex').first()).toBeVisible({ timeout: 15000 });
});

test('mục lục (TOC) xuất hiện với scrollspy', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await expect(page.locator('.lb-toc a').first()).toBeVisible();
  const n = await page.locator('.lb-toc a').count();
  expect(n).toBeGreaterThan(0);
});

test('bài viết liên quan (theo tag)', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await expect(page.locator('.lb-related__item').first()).toBeVisible();
});

test('reading tool A+ tăng cỡ chữ', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await page.click('[data-size="1"]');
  const scale = await page.evaluate(() => document.documentElement.style.getPropertyValue('--read-scale'));
  expect(scale).toBe('1.3');
});

test('reading time hiển thị', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await expect(page.locator('.lb-post-meta')).toContainText('phút đọc');
});

test('nút like + chia sẻ + popup share', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await expect(page.locator('.lb-actions__btn').first()).toBeVisible();
  await page.click('.lb-actions__sharewrap .lb-actions__btn');
  await expect(page.locator('.lb-share')).toBeVisible();
  const items = await page.locator('.lb-share__item').count();
  expect(items).toBeGreaterThanOrEqual(5);
});
