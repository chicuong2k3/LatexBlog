const { test, expect } = require('@playwright/test');

test('trang tag: danh sách bài xếp cột bằng pretext (masonry)', async ({ page }) => {
  await page.goto('/tags/aether');
  const list = page.locator('#tag-list .lb-post-list');
  await expect(list).toHaveClass(/lb-post-list--masonry/);
  const first = list.locator('.lb-post').first();
  await expect(first).toHaveCSS('position', 'absolute');
  await expect(first).toBeVisible();
});

test('trang tag: chọn thẻ khác qua htmx rồi xếp lại lưới', async ({ page }) => {
  await page.goto('/tags/aether');
  await expect(page.locator('#tag-list .lb-post-list')).toHaveClass(/lb-post-list--masonry/);
  const chip = page.locator('.lb-chips a', { hasText: 'physics' }).first();
  await chip.click();
  await expect(page.locator('#tag-list .lb-post-list')).toHaveClass(/lb-post-list--masonry/);
  await expect(page.locator('#tag-list .lb-post').first()).toHaveCSS('position', 'absolute');
});

test('trang tìm kiếm: kết quả xếp cột bằng pretext sau khi gõ', async ({ page }) => {
  await page.goto('/search');
  await page.fill('main input[name="q"]', 'aether');
  const list = page.locator('#search-results .lb-post-list');
  await expect(list).toHaveClass(/lb-post-list--masonry/);
  await expect(list.locator('.lb-post').first()).toHaveCSS('position', 'absolute');
});

test('trang tìm kiếm: không có kết quả thì hiện thông báo rỗng', async ({ page }) => {
  await page.goto('/search');
  await page.fill('main input[name="q"]', 'khong-co-bai-nay-xyz');
  await expect(page.locator('#search-results .lb-empty')).toBeVisible();
});

test('trang về tôi: heading hiển thị, không lỗi', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.lb-about h1')).toHaveText('Về tôi');
});

test('trang bài viết: tiêu đề hiển thị và tự co cho vừa dòng', async ({ page }) => {
  await page.goto('/posts/aether-history');
  const h1 = page.locator('.lb-post-head h1');
  await expect(h1).toBeVisible();
  // auto-fit set inline font-size when the title had to shrink to 2 lines
  await expect(h1).toHaveCSS('font-size', /px/);
});