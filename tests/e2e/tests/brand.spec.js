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
