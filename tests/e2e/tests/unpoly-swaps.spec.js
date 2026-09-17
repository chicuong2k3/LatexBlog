const { test, expect } = require('@playwright/test');

test('fragment request skips chrome but keeps target', async ({ request }) => {
  const res = await request.get('/tags/toan', { headers: { 'X-Up-Version': '3.10.2', 'X-Up-Target': '.lb-main' } });
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain('lb-main');
  expect(html).not.toContain('lb-nav');
});
