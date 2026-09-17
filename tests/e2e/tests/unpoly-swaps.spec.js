const { test, expect } = require('@playwright/test');

test('home load-more appends posts without full reload', async ({ page }) => {
  await page.goto('/');
  const more = page.locator('#load-more');
  if (await more.count() === 0) test.skip();
  await more.locator('a, button').first().click();
  await expect(page.locator('.lb-post-list .lb-post').nth(3)).toBeVisible({ timeout: 10000 });
});

test('search page input swaps results live', async ({ page }) => {
  await page.goto('/search');
  await page.locator('.lb-main input[name="q"]').fill('ma trận');
  await expect(page.locator('#search-results .lb-post').first()).toBeVisible({ timeout: 10000 });
});
test('fragment request skips chrome but keeps target', async ({ request }) => {
  const res = await request.get('/tags/toan', { headers: { 'X-Up-Version': '3.10.2', 'X-Up-Target': '.lb-main' } });
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain('lb-main');
  expect(html).not.toContain('lb-nav');
});
