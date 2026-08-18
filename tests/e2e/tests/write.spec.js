const { test, expect } = require('@playwright/test');

// Trang viết bài admin — mock auth store (isAdmin) để hiện editor.

test('editor /write hiện đủ trường + toolbar khi admin', async ({ page }) => {
  await page.goto('/write');
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const s = Alpine.store('auth');
    s.signedIn = true;
    s.userId = 'u1';
    s.isAdmin = true;
    const d = Alpine.$data(document.querySelector('.lb-write'));
    d.ready = true;
  });
  await page.waitForTimeout(400);
  await expect(page.locator('.lb-write__form')).toBeVisible();
  await expect(page.locator('#w-title')).toBeVisible();
  await expect(page.locator('#w-slug')).toBeVisible();
  await expect(page.locator('#w-date')).toBeVisible();
  await expect(page.locator('#w-tags')).toBeVisible();
  await expect(page.locator('.lb-editor__toolbar button').first()).toBeVisible();
});

test('nút B chèn ** vào body editor', async ({ page }) => {
  await page.goto('/write');
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const s = Alpine.store('auth');
    s.signedIn = true; s.userId = 'u1'; s.isAdmin = true;
    const d = Alpine.$data(document.querySelector('.lb-write'));
    d.ready = true;
  });
  await page.waitForTimeout(400);
  await page.click('.lb-editor__toolbar button >> nth=0');
  const val = await page.evaluate(() => document.querySelector('.lb-editor textarea').value);
  expect(val).toBe('****');
});

test('list bài viết DB hiện khi có data (inject)', async ({ page }) => {
  await page.goto('/write');
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const s = Alpine.store('auth');
    s.signedIn = true; s.userId = 'u1'; s.isAdmin = true;
    const d = Alpine.$data(document.querySelector('.lb-write'));
    d.ready = true;
    d.posts = [{ slug: 'bai-moi', title: 'Bài viết thử', date: '2026-08-18', tags: ['toan'], summary: 'x', body_md: '# x', published: true }];
  });
  await page.waitForTimeout(400);
  await expect(page.locator('.lb-write__row')).toContainText('Bài viết thử');
});
