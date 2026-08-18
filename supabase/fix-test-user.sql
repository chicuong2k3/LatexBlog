-- FIX nhanh test user: xoá sạch + tạo mới với bcrypt hash chuẩn (xác minh bằng bcryptjs).
-- Chạy một lần trong SQL Editor.

delete from auth.users where email = 'test@latexblog.dev';

insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
values (
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'test@latexblog.dev',
  '$2a$10$Yq9mTgKyF6ez0ypXEMaitujDBl6.jT.5/EMadylK3WUG8rRUqFxIG',
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Test User"}'::jsonb,
  now(), now()
);

insert into public.profiles (id, display_name, avatar_url, is_admin)
select u.id, 'Test User', '', true
from auth.users u where u.email = 'test@latexblog.dev'
on conflict (id) do update set display_name = 'Test User', is_admin = true;

-- Kiểm tra: email_confirmed_at có ngày + is_admin = t
select u.email, p.display_name, p.is_admin, u.email_confirmed_at
from auth.users u left join public.profiles p on p.id = u.id
where u.email = 'test@latexblog.dev';
