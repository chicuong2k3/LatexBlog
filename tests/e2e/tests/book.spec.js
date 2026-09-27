const { test, expect } = require('@playwright/test');

const CHAPTER = '/books/newton-principia/dinh-nghia';

test('chương sách render công thức bằng KaTeX', async ({ page }) => {
  await page.goto(CHAPTER);
  await expect(page.locator('.lb-prose .katex').first()).toBeVisible({ timeout: 15000 });
});

test('lớp chú giải hiện trên chương sách', async ({ page }) => {
  await page.goto(CHAPTER);
  await expect(page.locator('.lb-prose blockquote').first()).toContainText('Chú giải');
});

test('tiêu đề chương sách hiện trên trang', async ({ page }) => {
  await page.goto(CHAPTER);
  await expect(page.locator('header.lb-post-head h1')).toHaveText(
    'Những khái niệm cơ bản về vật chất và chuyển động'
  );
});
