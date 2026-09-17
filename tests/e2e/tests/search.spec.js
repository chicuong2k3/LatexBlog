const { test, expect } = require('@playwright/test');

test('kính lúp mở popup tìm kiếm', async ({ page }) => {
  await page.goto('/');
  await page.click('.lb-nav-right .lb-nav-icon');
  await expect(page.locator('.lb-searchmodal')).toBeVisible();
});

test('tìm trong popup chuyển tới trang search với kết quả', async ({ page }) => {
  await page.goto('/');
  await page.click('.lb-nav-right .lb-nav-icon');
  await page.fill('.lb-searchmodal input[name="q"]', 'ma trận');
  await page.press('.lb-searchmodal input[name="q"]', 'Enter');
  await expect(page).toHaveURL(/\/search\?q=/);
  await expect(page.locator('#search-results .lb-post').first()).toBeVisible({ timeout: 15000 });
});

test('popup có 2 chế độ: bài viết và bình luận', async ({ page }) => {
  await page.goto('/');
  await page.click('.lb-nav-right .lb-nav-icon');
  const modes = await page.locator('.lb-searchmodal__modes button').count();
  expect(modes).toBe(2);
  await page.click('.lb-searchmodal__modes button >> nth=1');
  await expect(page.locator('.lb-searchmodal__cmode input')).toBeVisible();
});

test('Esc đóng popup tìm kiếm', async ({ page }) => {
  await page.goto('/');
  await page.click('.lb-nav-right .lb-nav-icon');
  await page.keyboard.press('Escape');
  await expect(page.locator('.lb-searchmodal')).toBeHidden();
});
