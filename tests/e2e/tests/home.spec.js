const { test, expect } = require('@playwright/test');

test('trang chủ render hero, danh sách bài và cụm thẻ', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.lb-hero h1')).toBeVisible();
  await expect(page.locator('.lb-post').first()).toBeVisible();
  await expect(page.locator('.lb-tagcloud__chips .lb-tag').first()).toBeVisible();
});

test('featured card hiển thị bài mới nhất', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.lb-featured h2 a')).toBeVisible();
  await expect(page.locator('.lb-featured h2 a')).toHaveAttribute('href', /\/posts\//);
});

test('toggle dark mode đổi data-theme', async ({ page }) => {
  await page.goto('/');
  const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  await page.click('.lb-theme-btn');
  await page.waitForTimeout(200);
  const after = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(after).not.toBe(before);
});

test('chuyển ngôn ngữ sang EN', async ({ page }) => {
  await page.goto('/?lang=en');
  await expect(page.locator('.lb-nav-links a').first()).toHaveText('Home');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('back-to-top hiện khi cuộn xuống', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 800));
  await expect(page.locator('#lb-top')).toHaveClass(/is-visible/);
});

test('phím tắt / mở popup tìm kiếm', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  await expect(page.locator('.lb-searchmodal')).toBeVisible();
});
