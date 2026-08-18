// Global setup: tự đăng nhập bằng test user (email/password) và lưu storageState
// để các test có session thật (auth flow thật, không cần Google OAuth).
// Nếu chưa tạo test user (supabase/test-user.sql), thất bại nhẹ nhàng:
// lưu storageState rỗng, các test thật sẽ skip.
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5080';
  const email = process.env.TEST_EMAIL || 'nguyenchicuongk21@gmail.com';
  const password = process.env.TEST_PASSWORD || 'Test1234!';
  const dir = path.join(__dirname, '.auth');
  const statePath = path.join(dir, 'user.json');
  fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  let ok = false;
  try {
    await page.goto(baseURL + '/');
    await page.waitForFunction(() => typeof window.lbLoadSupabase === 'function', null, { timeout: 15000 });
    const res = await page.evaluate(async ({ email, password }) => {
      try {
        const sb = await window.lbLoadSupabase();
        const { error } = await sb.auth.signInWithPassword({ email, password });
        return error ? { ok: false, msg: error.message } : { ok: true };
      } catch (e) { return { ok: false, msg: e.message }; }
    }, { email, password });
    if (res.ok) {
      await page.waitForTimeout(600); // đợi session lưu localStorage
      await page.context().storageState({ path: statePath });
      ok = true;
    } else {
      console.log('[global-setup] không đăng nhập được test user:', res.msg);
    }
  } catch (e) {
    console.log('[global-setup] lỗi:', e.message);
  }
  await browser.close();
  if (!ok) fs.writeFileSync(statePath, JSON.stringify({ cookies: [], origins: [] }));
};
