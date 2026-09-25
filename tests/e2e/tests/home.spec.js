const { test, expect } = require('@playwright/test');

test('head dùng Unpoly, không còn htmx', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('script[src*="htmx"]').count()).toBe(0);
  expect(await page.locator('script[src*="unpoly"]').count()).toBeGreaterThan(0);
});

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

test('home masonry: danh sách bài xếp cột bằng pretext', async ({ page }) => {
  await page.goto('/');
  const list = page.locator('.lb-post-list');
  await expect(list).toHaveClass(/lb-post-list--masonry/);
  const first = list.locator('.lb-post').first();
  await expect(first).toHaveCSS('position', 'absolute');
  const box = await first.boundingBox();
  expect(box.width).toBeGreaterThan(200);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('home masonry: card mới từ htmx được đưa vào lưới và xếp lại', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.lb-post-list')).toHaveClass(/lb-post-list--masonry/);
  const before = await page.locator('.lb-post-list .lb-post').count();
  await page.evaluate(() => {
    const wrap = document.querySelector('.lb-posts .lb-wrap');
    const card = document.createElement('article');
    card.className = 'lb-post';
    card.innerHTML =
      '<span class="lb-post-num">04</span>' +
      '<div class="lb-post-body"><h3><a href="/posts/x">Bài viết mới qua htmx</a></h3>' +
      '<p>Một đoạn tóm tắt khá dài để kiểm tra việc xếp cột bằng pretext, đủ chữ để wrap nhiều dòng.</p></div>' +
      '<div class="lb-post-meta"><span class="lb-date">Đăng ngày 2026-08-20</span>' +
      '<div class="lb-post-tags"><a href="/tags/toan" class="lb-tag">toan</a></div></div>';
    wrap.appendChild(card);
    wrap.dispatchEvent(new Event('htmx:afterSwap', { bubbles: true }));
  });
  await expect(page.locator('.lb-post-list .lb-post')).toHaveCount(before + 1);
  await expect(page.locator('.lb-post-list .lb-post').last()).toHaveCSS('position', 'absolute');
});

test('home masonry: fallback khi tắt JS', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('.lb-post-list')).not.toHaveClass(/lb-post-list--masonry/);
  await expect(page.locator('.lb-post').first()).toBeVisible();
  await ctx.close();
});

test('home hero: tự co cỡ chữ để quote vừa đúng 2 dòng', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(
    () => document.querySelector('.lb-hero h1').style.fontSize !== ''
  );
  const h1 = page.locator('.lb-hero h1');
  const style = await h1.getAttribute('style');
  expect(style).toMatch(/font-size:\s*\d+(\.\d+)?px/);
  const fs = parseFloat(style.match(/font-size:\s*([\d.]+)px/)[1]);
  const h = (await h1.boundingBox()).height;
  expect(fs).toBeGreaterThanOrEqual(2.4 * 16); // >= clamp min
  expect(fs).toBeLessThanOrEqual(4.2 * 16);    // <= clamp max
  expect(h).toBeGreaterThan(fs * 1.5);         // more than one line
  expect(h).toBeLessThan(fs * 3);              // no more than ~3 lines
});

test('hero có canvas 3D đúng kích thước và không gây tràn ngang', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas[data-lb-orbits]');
  await expect(canvas).toHaveCount(1);
  await expect(canvas).toHaveAttribute('aria-hidden', 'true');
  const box = await canvas.boundingBox();
  expect(box.width).toBeGreaterThan(300);
  expect(box.height).toBeGreaterThan(150);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('canvas không chặn bôi đen chữ trên hero', async ({ page }) => {
  await page.goto('/');
  const pe = await page.locator('canvas[data-lb-orbits]')
    .evaluate((c) => getComputedStyle(c).pointerEvents);
  expect(pe).toBe('none');
});
