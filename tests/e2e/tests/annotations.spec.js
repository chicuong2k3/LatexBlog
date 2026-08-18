const { test, expect } = require('@playwright/test');

// Tô sáng + ghi chú + chia sẻ quote — cần đăng nhập (mock auth store).

test('right-click lên đoạn đã chọn hiện menu tô sáng (3 nút)', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await page.evaluate(() => {
    const s = Alpine.store('auth');
    s.signedIn = true;
    s.userId = 'u1';
  });
  await page.waitForTimeout(400);
  const p = page.locator('.lb-prose p').first();
  const box = await p.boundingBox();
  if (!box) throw new Error('không có đoạn văn');
  await page.mouse.move(box.x + 10, box.y + 10);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width - 10, box.y + 10, { steps: 10 });
  await page.mouse.up();
  await page.mouse.click(box.x + 20, box.y + 20, { button: 'right' });
  await expect(page.locator('.lb-hlmenu')).toBeVisible();
  expect(await page.locator('.lb-hlmenu button').count()).toBe(3);
});

test('menu ghi chú mở popup nhập note', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await page.evaluate(() => {
    const s = Alpine.store('auth');
    s.signedIn = true;
    s.userId = 'u1';
  });
  await page.waitForTimeout(400);
  // mở menu trực tiếp qua component
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-post-page'));
    d._pendingQuote = 'đoạn test';
    d.menuOpen = true;
  });
  await page.waitForTimeout(200);
  await page.click('.lb-hlmenu button >> nth=1'); // Ghi chú
  await expect(page.locator('.lb-hlnote')).toBeVisible();
  await expect(page.locator('.lb-hlnote .lb-rte__area')).toBeVisible();
});

test('menu có nút Chia sẻ đoạn', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-post-page'));
    d._pendingQuote = 'đoạn test';
    d.menuOpen = true;
  });
  await page.waitForTimeout(200);
  await expect(page.locator('.lb-hlmenu button').nth(2)).toContainText(/Chia sẻ/);
});
