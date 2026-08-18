const { test, expect } = require('@playwright/test');

// Luồng xác thực THẬT với session từ global-setup + storageState.
// Cần chạy supabase/set-password.sql để đặt mật khẩu email/password.
// Nếu chưa, các test này skip.

// Đợi auth store nạp session (bất đồng bộ) trước khi quyết định skip/run.
async function waitSignedIn(page, timeoutMs = 8000) {
  return page.evaluate((timeoutMs) => new Promise((resolve) => {
    const start = Date.now();
    (function poll() {
      try {
        const s = Alpine.store('auth');
        if (s && s.signedIn) return resolve(true);
        if (s && s.ready && !s.signedIn) return resolve(false);
      } catch (e) { /* chưa có Alpine */ }
      if (Date.now() - start > timeoutMs) return resolve(false);
      setTimeout(poll, 100);
    })();
  }), timeoutMs);
}

test('đã đăng nhập tự động từ storageState', async ({ page }) => {
  await page.goto('/');
  test.skip(!(await waitSignedIn(page)), 'Chưa có session test — chạy supabase/set-password.sql');
  await expect(page.locator('.lb-nav-user__name')).toBeVisible();
});

test('form bình luận hiện khi đăng nhập thật', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  test.skip(!(await waitSignedIn(page)), 'Chưa có session test');
  await expect(page.locator('.lb-comments__form')).toBeVisible();
  await expect(page.locator('.lb-rte__toolbar button').first()).toBeVisible();
});

test('đăng bình luận thật lên Supabase rồi dọn sạch', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  test.skip(!(await waitSignedIn(page)), 'Chưa có session test');
  const marker = 'e2e-' + Date.now();
  await expect(page.locator('.lb-comments__form')).toBeVisible();
  await page.click('.lb-rte__area');
  await page.keyboard.type('bình luận tự động ' + marker);
  await page.click('.lb-comments__form button[type="submit"]');
  await expect(page.locator('.lb-comment').filter({ hasText: marker }).first()).toBeVisible({ timeout: 15000 });
  // dọn: xoá comment test (user là admin)
  await page.evaluate(async (marker) => {
    try {
      const sb = await window.lbLoadSupabase();
      const { data } = await sb.from('comments').select('id').ilike('body', '%' + marker + '%').order('created_at', { ascending: false }).limit(1);
      if (data && data[0]) await sb.rpc('admin_delete_comment', { p_id: data[0].id });
    } catch (e) { /* best-effort */ }
  }, marker);
});

test('trang /write hiện editor vì user là admin', async ({ page }) => {
  await page.goto('/write');
  test.skip(!(await waitSignedIn(page)), 'Chưa có session test');
  await expect(page.locator('.lb-write__form')).toBeVisible();
  await expect(page.locator('#w-title')).toBeVisible();
});

test('trang profile hiện thông tin user thật', async ({ page }) => {
  await page.goto('/profile');
  test.skip(!(await waitSignedIn(page)), 'Chưa có session test');
  await expect(page.locator('#lb-name')).toBeVisible();
});
