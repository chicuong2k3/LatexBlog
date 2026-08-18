const { test, expect } = require('@playwright/test');

// Các tính năng dựa trên Supabase không cần đăng nhập.
// (Luồng cần Google OAuth — đăng nhập, gửi bình luận, like, profile, /write —
//  không tự động hoá được; kiểm thủ công sau khi chạy setup.sql.)

test('khu vực bình luận render (kể cả khi trống)', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await expect(page.locator('.lb-comments__title')).toContainText('Bình luận');
});

test('nút like + lượt xem + chia sẻ trên trang bài', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await expect(page.locator('.lb-actions__btn--static')).toBeVisible();
  await expect(page.locator('.lb-actions__sharewrap')).toBeVisible();
});

test('chuông thông báo + nút đăng nhập trên nav', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.lb-notif')).toBeVisible();
  await expect(page.locator('.lb-nav-login, .lb-nav-user')).toBeVisible();
});

test('link Viết bài chỉ hiện cho admin', async ({ page }) => {
  // Chưa đăng nhập: không được thấy link /write ở nav
  await page.goto('/');
  const writeLinks = await page.locator('a[href="/write"]').count();
  expect(writeLinks).toBe(0);
});
