// @ts-check
// LatexBlog E2E — Playwright.
// Cách chạy:
//   1. Chạy app:  dotnet run --urls http://127.0.0.1:5080
//   2. npm install && npx playwright install chromium
//   3. (tuỳ chọn) chạy supabase/test-user.sql để có user test cho luồng xác thực thật
//   4. npx playwright test
// App phải đang chạy. Đổi port qua biến môi trường BASE_URL.
const path = require('path');
const { defineConfig } = require('@playwright/test');

const AUTH_STATE = path.join(__dirname, '.auth', 'user.json');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  globalSetup: require.resolve('./global-setup.js'),
  projects: [
    {
      // Tất cả test mặc định (không cần đăng nhập — các luồng UI đã mock auth store).
      name: 'chromium',
      testIgnore: /real-auth\.spec\.js/,
      use: { baseURL: process.env.BASE_URL || 'http://127.0.0.1:5080', headless: true, locale: 'vi-VN' },
    },
    {
      // Luồng xác thực THẬT (session từ global-setup). Skip nếu chưa có test user.
      name: 'auth',
      testMatch: /real-auth\.spec\.js/,
      use: { baseURL: process.env.BASE_URL || 'http://127.0.0.1:5080', headless: true, locale: 'vi-VN', storageState: AUTH_STATE },
    },
  ],
});
