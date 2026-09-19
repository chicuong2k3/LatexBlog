const { test, expect } = require('@playwright/test');

// Trang cá nhân — đẩy dữ liệu trực tiếp vào component (mock auth + data).

test('profile hiện form sửa, stats, bài đã thích', async ({ page }) => {
  await page.goto('/profile');
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-profile'));
    d.signedIn = true;
    d.displayName = 'Tester';
    d.avatar = '';
    d.nameInput = 'Tester';
    d.email = 't@test.com';
    d.loading = false;
    d.likedPosts = [{ slug: 's1', title: 'Bài A', summary: 'tóm tắt', date: '2026-01-01' }];
    d.stats = { liked: 3, comments: 5 };
  });
  await page.waitForTimeout(500);
  await expect(page.locator('#lb-name')).toHaveValue('Tester');
  await expect(page.locator('.lb-stat').first()).toContainText('3');
  await expect(page.locator('.lb-post-body h3 a')).toHaveText('Bài A');
});

test('avatar là label clickable (không còn input riêng)', async ({ page }) => {
  await page.goto('/profile');
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-profile'));
    d.signedIn = true;
    d.displayName = 'T'; d.nameInput = 'T'; d.loading = false;
  });
  await page.waitForTimeout(300);
  await expect(page.locator('.lb-avatar-edit')).toBeVisible();
  expect(await page.locator('.lb-avatar-edit__file').count()).toBe(1);
  expect(await page.locator('#lb-avatar').count()).toBe(0);
});

test('nút export bình luận tồn tại', async ({ page }) => {
  await page.goto('/profile');
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-profile'));
    d.signedIn = true; d.nameInput = 'T'; d.loading = false;
  });
  await page.waitForTimeout(300);
  await expect(page.locator('.lb-profile__exports button').first()).toBeVisible();
  expect(await page.locator('.lb-profile__exports button').count()).toBe(2);
});
