// Đặt mật khẩu email/password cho user (GoTrue tự hash đúng format, không cần đoán).
// Chạy 1 lần:
//   SUPABASE_URL=https://<proj>.supabase.co \
//   SERVICE_ROLE_KEY=<key từ Dashboard → Settings → API> \
//   node set-password.mjs
// Key service_role là bí mật — chỉ chạy local, không commit.
const base = process.env.SUPABASE_URL;
const key = process.env.SERVICE_ROLE_KEY;
const email = process.env.TEST_EMAIL || 'nguyenchicuongk21@gmail.com';
const password = process.env.TEST_PASSWORD || 'Test1234!';

if (!base || !key) {
  console.error('Cần: SUPABASE_URL và SERVICE_ROLE_KEY (Dashboard → Settings → API → service_role)');
  process.exit(1);
}

const admin = async (path, method, body) => {
  const res = await fetch(base + '/auth/v1/admin/' + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + key,
      apikey: key,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, json: await res.json().catch(() => ({})) };
};

const list = await admin('users', 'GET');
const u = list.json.users && list.json.users.find((x) => x.email === email);

if (u) {
  const r = await admin('users/' + u.id, 'PUT', { password });
  console.log(r.status === 200 ? `OK: đã đặt mật khẩu cho ${email}` : 'LỖI: ' + JSON.stringify(r.json));
} else {
  const r = await admin('users', 'POST', {
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Chủ blog' },
  });
  console.log(r.status === 200 ? `OK: đã tạo user ${email} với mật khẩu` : 'LỖI: ' + JSON.stringify(r.json));
}
