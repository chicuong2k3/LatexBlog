-- Tạo test user cho E2E — INSERT trực tiếp auth.users với bcrypt hash CỐ ĐỊNH
-- (sinh bằng bcryptjs, tương thích x/crypto/bcrypt mà GoTrue dùng để verify;
--  pgcrypto crypt() không verify được trong GoTrue của phiên bản này).
-- Guard bằng WHERE NOT EXISTS (auth.users.email là partial unique index).
insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
select
  gen_random_uuid(),
  'authenticated', 'authenticated',
  'test@latexblog.dev',
  '$2a$10$Yq9mTgKyF6ez0ypXEMaitujDBl6.jT.5/EMadylK3WUG8rRUqFxIG',
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Test User"}'::jsonb,
  now(), now()
where not exists (select 1 from auth.users where email = 'test@latexblog.dev');

-- Cấp admin + tên hiển thị (profiles.id là PK nên ON CONFLICT (id) hợp lệ).
insert into public.profiles (id, display_name, avatar_url, is_admin)
select u.id, 'Test User', '', true
from auth.users u
where u.email = 'test@latexblog.dev'
on conflict (id) do update set display_name = 'Test User', is_admin = true;

-- Kiểm tra: phải thấy email_confirmed_at có giá trị và is_admin = t
select u.email, p.display_name, p.is_admin, u.email_confirmed_at
from auth.users u
left join public.profiles p on p.id = u.id
where u.email = 'test@latexblog.dev';
