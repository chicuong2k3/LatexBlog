const { test, expect } = require('@playwright/test');

test('chuông thông báo mở dropdown khi đăng nhập', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const s = Alpine.store('auth');
    s.signedIn = true;
    s.userId = 'u1';
  });
  await page.waitForTimeout(400);
  await page.click('.lb-notif .lb-nav-icon');
  await expect(page.locator('.lb-notif__panel')).toBeVisible();
  await expect(page.locator('.lb-notif__head strong')).toContainText(/Thông báo|Notifications/);
});

test('badge chưa đọc hiện khi có unread (inject)', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const s = Alpine.store('auth');
    s.signedIn = true;
    s.userId = 'u1';
  });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-notif'));
    d.list = [
      { id: 'n1', actor_name: 'A', actor_avatar: '', type: 'reply', post_slug: 'p', created_at: new Date().toISOString(), read: false },
      { id: 'n2', actor_name: 'B', actor_avatar: '', type: 'mention', post_slug: 'p2', created_at: new Date().toISOString(), read: true },
    ];
    d.unread = 1;
  });
  await page.waitForTimeout(300);
  await expect(page.locator('.lb-notif__badge')).toHaveText('1');
  await page.click('.lb-notif .lb-nav-icon');
  await expect(page.locator('.lb-notif__item')).toHaveCount(2);
});
