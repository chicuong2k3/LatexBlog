-- Đặt mật khẩu email/password cho user nguyenchicuongk21@gmail.com (test E2E).
-- Chạy trong SQL Editor. Idempotent (chạy lại được).
--
-- QUAN TRỌNG: bật provider Email ở Authentication → Sign In / Providers → Email (ON)
-- nếu chưa bật — nếu tắt thì mọi login bằng mật khẩu đều bị chặn.
--
-- Nếu script này báo "fallback bcrypt" mà login vẫn lỗi (instance dùng pbkdf2/argon2),
-- dùng cách chắc chắn: tests/e2e/set-password.mjs (service_role) hoặc Dashboard Add user.

do $$
declare
  uid uuid;
  target_email text := 'nguyenchicuongk21@gmail.com';
  pwd text := 'Test1234!';
begin
  select id into uid from auth.users where email = target_email;

  if uid is null then
    -- User chưa tồn tại: tạo mới (thử admin helper, fallback INSERT trực tiếp)
    begin
      select id into uid from auth.admin_create_user(
        jsonb_build_object(
          'email', target_email,
          'password', pwd,
          'email_confirm', true,
          'user_metadata', jsonb_build_object('full_name', 'Chủ blog')
        ),
        true
      );
      raise notice 'Tạo user qua auth.admin_create_user';
    exception when others then
      raise notice 'auth.admin_create_user không có trên phiên bản này — INSERT trực tiếp';
      insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at,
                              raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
      values (gen_random_uuid(), 'authenticated', 'authenticated', target_email,
              '$2a$10$Yq9mTgKyF6ez0ypXEMaitujDBl6.jT.5/EMadylK3WUG8rRUqFxIG', now(),
              '{"provider":"email","providers":["email"]}'::jsonb,
              '{"full_name":"Chủ blog"}'::jsonb, now(), now())
      returning id into uid;
    end;
  else
    -- User đã tồn tại (Google): đặt mật khẩu qua admin helper (hash đúng format),
    -- fallback UPDATE trực tiếp.
    begin
      perform auth.admin_update_user_by_id(uid, jsonb_build_object('password', pwd));
      raise notice 'Đã đặt mật khẩu qua auth.admin_update_user_by_id';
    exception when others then
      raise notice 'auth.admin_update_user_by_id không có — fallback UPDATE encrypted_password';
      update auth.users
      set encrypted_password = '$2a$10$Yq9mTgKyF6ez0ypXEMaitujDBl6.jT.5/EMadylK3WUG8rRUqFxIG'
      where id = uid;
    end;
  end if;

  -- Cấp admin
  insert into public.profiles (id, display_name, avatar_url, is_admin)
  select uid, 'Chủ blog', '', true
  on conflict (id) do update set is_admin = true;

  raise notice 'Xong cho %', target_email;
end $$;

-- Kiểm tra
select u.email, p.display_name, p.is_admin, u.email_confirmed_at
from auth.users u
left join public.profiles p on p.id = u.id
where u.email = 'nguyenchicuongk21@gmail.com';
