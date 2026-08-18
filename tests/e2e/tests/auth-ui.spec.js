const { test, expect } = require('@playwright/test');

// Các luồng UI cần đăng nhập — mô phỏng Alpine auth store để test phần giao diện
// (Google OAuth thật không tự động hoá được).

async function signInMock(page, { admin = false } = {}) {
  await page.evaluate((admin) => {
    const s = Alpine.store('auth');
    s.signedIn = true;
    s.userId = 'test-user';
    s.displayName = 'Tester';
    s.avatar = '';
    s.email = 't@test.com';
    s.isAdmin = admin;
  }, admin);
  await page.waitForTimeout(400);
}

// Chờ comment component nạp xong dữ liệu thật rồi mới inject — tránh race bị reload ghi đè.
async function waitCommentsReady(page) {
  await page.waitForFunction(() => {
    const el = document.querySelector('.lb-comments');
    if (!el) return false;
    try { return Alpine.$data(el).loading === false; } catch (e) { return false; }
  }, { timeout: 15000 });
}

test('nav hiện tên user + nút Viết bài khi admin', async ({ page }) => {
  await page.goto('/');
  await signInMock(page, { admin: true });
  await expect(page.locator('.lb-nav-user__name')).toHaveText('Tester');
  await expect(page.locator('a[href="/write"]')).toBeVisible();
});

test('comment form + rich editor toolbar hiện khi đăng nhập', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await signInMock(page);
  await expect(page.locator('.lb-comments__form')).toBeVisible();
  await expect(page.locator('.lb-rte__area[data-rte="main"]')).toBeVisible();
  const btns = await page.locator('.lb-rte__toolbar button').count();
  expect(btns).toBeGreaterThanOrEqual(5);
});

test('rich editor: gõ text cập nhật body', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await signInMock(page);
  await page.click('.lb-rte__area[data-rte="main"]');
  await page.keyboard.type('xin chào thế giới');
  await page.waitForTimeout(300);
  const body = await page.evaluate(() => Alpine.$data(document.querySelector('.lb-comments')).body);
  expect(body).toContain('xin chào');
});

test('nút công thức mở popup math', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await signInMock(page);
  await page.click('.lb-rte__toolbar button >> nth=5'); // nút Σ
  await expect(page.locator('.lb-rte-math')).toBeVisible();
});

test('nút Trả lời prefill @tên', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await signInMock(page);
  await waitCommentsReady(page);
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-comments'));
    d.error = '';
    d.comments = [{
      id: 'x1', user_id: 'test-user', author_name: 'Tester', body: 'xin chào',
      created_at: new Date().toISOString(), depth: 0, avatar_url: '',
    }];
  });
  await page.waitForTimeout(300);
  await page.click('.lb-comment__reply:has-text("Trả lời")');
  const val = await page.evaluate(() => document.querySelector('.lb-comments__replyform .lb-rte__area').innerHTML);
  expect(val).toContain('@Tester');
});

test('nút Sửa chỉ hiện cho comment của mình trong 5 phút', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await signInMock(page);
  await waitCommentsReady(page);
  const old = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const fresh = new Date().toISOString();
  await page.evaluate(({ old, fresh }) => {
    const d = Alpine.$data(document.querySelector('.lb-comments'));
    d.error = '';
    d.comments = [
      { id: 'a', user_id: 'test-user', author_name: 'T', body: 'mới', created_at: fresh, depth: 0 },
      { id: 'b', user_id: 'test-user', author_name: 'T', body: 'cũ', created_at: old, depth: 0 },
      { id: 'c', user_id: 'other', author_name: 'X', body: 'người khác', created_at: fresh, depth: 0 },
    ];
  }, { old, fresh });
  await page.waitForTimeout(300);
  await expect(page.locator('.lb-comment:has-text("mới") .lb-comment__reply:has-text("Sửa")')).toBeVisible();
  await expect(page.locator('.lb-comment:has-text("cũ") .lb-comment__reply:has-text("Sửa")')).toBeHidden();
  await expect(page.locator('.lb-comment:has-text("người khác") .lb-comment__reply:has-text("Sửa")')).toBeHidden();
});

test('nút Xóa admin hiện và mở form sửa đúng', async ({ page }) => {
  await page.goto('/posts/dao-ham-va-y-nghia-hinh-hoc');
  await signInMock(page, { admin: true });
  await waitCommentsReady(page);
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-comments'));
    d.error = '';
    d.comments = [{ id: 'z', user_id: 'anyone', author_name: 'Spam', body: 'quảng cáo', created_at: new Date().toISOString(), depth: 0 }];
  });
  await page.waitForTimeout(300);
  await expect(page.locator('.lb-comment:has-text("quảng cáo") .lb-comment__reply:has-text("Xóa")')).toBeVisible();
  // bấm Sửa (comment của mình) -> form prefill
  await page.evaluate(() => {
    const d = Alpine.$data(document.querySelector('.lb-comments'));
    d.comments = [{ id: 'y', user_id: 'test-user', author_name: 'Tester', body: 'nội dung gốc', created_at: new Date().toISOString(), depth: 0 }];
  });
  await page.waitForTimeout(300);
  await page.click('.lb-comment:has-text("nội dung gốc") .lb-comment__reply:has-text("Sửa")');
  const val = await page.evaluate(() => document.querySelector('.lb-comments__editform .lb-rte__area').innerHTML);
  expect(val).toContain('nội dung gốc');
});
