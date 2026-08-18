-- LatexBlog — Supabase schema. Idempotent + editor-safe: mọi tạo mới đều
-- guard bằng IF NOT EXISTS / CREATE OR REPLACE / DO block, chạy lại bao lần cũng được.
-- Cài: Authentication > Providers > Google; Site URL + Redirect URLs.
-- Storage: bucket public "avatars" tự tạo ở cuối.

-- ============ comments ============
create table if not exists public.comments (
    id          uuid primary key default gen_random_uuid(),
    post_slug   text not null,
    user_id     uuid not null references auth.users (id) on delete cascade,
    author_name text not null,
    avatar_url  text not null default '',
    body        text not null check (char_length(body) between 1 and 4000),
    parent_id   uuid references public.comments (id) on delete cascade,
    created_at  timestamptz not null default now()
);

create index if not exists comments_post_slug_idx on public.comments (post_slug, created_at);
alter table public.comments add column if not exists parent_id  uuid references public.comments (id) on delete cascade;
alter table public.comments add column if not exists avatar_url text not null default '';
create index if not exists comments_parent_idx on public.comments (parent_id, created_at);

alter table public.comments enable row level security;

-- Hàm gán user_id + author_name + avatar_url từ session/profile (không tin client).
-- Trigger comments_set_author (đã tồn tại từ lần chạy đầu) gọi hàm này theo tên,
-- nên CREATE OR REPLACE thay body là đủ, không cần tạo lại trigger.
create or replace function public.set_comment_author()
returns trigger language plpgsql security definer as $$
declare p_name text; p_avatar text;
begin
    new.user_id := auth.uid();
    select display_name, avatar_url into p_name, p_avatar
      from public.profiles where id = auth.uid();
    new.author_name := coalesce(nullif(p_name, ''),
        auth.jwt() -> 'user_metadata' ->> 'full_name',
        auth.jwt() -> 'user_metadata' ->> 'name',
        auth.jwt() -> 'user_metadata' ->> 'email', 'Bạn');
    new.avatar_url := coalesce(nullif(p_avatar, ''),
        auth.jwt() -> 'user_metadata' ->> 'avatar_url', '');
    return new;
end $$;

-- ============ profiles (trang cá nhân) ============
create table if not exists public.profiles (
    id          uuid primary key references auth.users (id) on delete cascade,
    display_name text not null default '',
    avatar_url  text not null default '',
    updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
    insert into public.profiles (id, display_name, avatar_url)
    values (new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
        coalesce(new.raw_user_meta_data ->> 'avatar_url', ''))
    on conflict (id) do nothing;
    return new;
end $$;

-- ============ post_likes ============
create table if not exists public.post_likes (
    post_slug text not null,
    user_id   uuid not null references auth.users (id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (post_slug, user_id)
);

create index if not exists post_likes_slug_idx on public.post_likes (post_slug);
alter table public.post_likes enable row level security;

-- ============ Storage: bucket "avatars" (public) ============
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- ============ comments: edited_at + notifications + edit RPC ============
alter table public.comments add column if not exists edited_at timestamptz;

create table if not exists public.notifications (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references auth.users (id) on delete cascade, -- người nhận
    actor_id    uuid references auth.users (id) on delete cascade,          -- người gây ra
    actor_name  text not null default '',
    actor_avatar text not null default '',
    type        text not null check (type in ('reply', 'mention')),
    post_slug   text not null,
    comment_id  uuid references public.comments (id) on delete cascade,
    read        boolean not null default false,
    created_at  timestamptz not null default now()
);
create index if not exists notifications_user_idx
    on public.notifications (user_id, read, created_at desc);
alter table public.notifications enable row level security;

-- Tạo thông báo khi có reply hoặc @mention (chạy sau khi insert comment)
create or replace function public.notify_comment()
returns trigger language plpgsql security definer as $$
begin
    if new.parent_id is not null then
        insert into public.notifications (user_id, actor_id, actor_name, actor_avatar, type, post_slug, comment_id)
        select c.user_id, new.user_id, new.author_name, new.avatar_url, 'reply', new.post_slug, new.id
        from public.comments c
        where c.id = new.parent_id and c.user_id <> new.user_id;
    end if;
    insert into public.notifications (user_id, actor_id, actor_name, actor_avatar, type, post_slug, comment_id)
    select p.id, new.user_id, new.author_name, new.avatar_url, 'mention', new.post_slug, new.id
    from public.profiles p
    where p.id <> new.user_id
      and new.body ~ ('@' || replace(p.display_name, ' ', '[[:space:]]+'));
    return new;
end $$;

-- Sửa comment trong 5 phút: kiểm quyền + mốc thời gian ở server (không tin client)
create or replace function public.edit_comment(p_id uuid, p_body text)
returns public.comments language plpgsql security definer as $$
declare c public.comments;
begin
    select * into c from public.comments where id = p_id;
    if c is null or c.user_id <> auth.uid() then
        raise exception 'Bạn không có quyền sửa bình luận này';
    end if;
    if now() - c.created_at > interval '5 minutes' then
        raise exception 'Đã quá 5 phút, không thể sửa bình luận';
    end if;
    if char_length(p_body) < 1 or char_length(p_body) > 4000 then
        raise exception 'Nội dung không hợp lệ';
    end if;
    update public.comments set body = p_body, edited_at = now()
    where id = p_id returning * into c;
    return c;
end $$;
grant execute on function public.edit_comment to authenticated;

-- ============ posts (bài viết lưu DB — không cần deploy) ============
create table if not exists public.posts (
    slug       text primary key,
    title      text not null,
    date       date not null,
    tags       text[] not null default '{}',
    summary    text not null default '',
    body_md    text not null default '',
    published  boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
alter table public.posts enable row level security;

-- Quyền admin: chạy 1 lần để cấp quyền cho tài khoản của bạn:
--   update public.profiles set is_admin = true
--   where id = (select id from auth.users where email = 'email-cua-ban@gmail.com');
alter table public.profiles add column if not exists is_admin boolean not null default false;

-- Admin xoá comment bất kỳ (chống spam)
create or replace function public.admin_delete_comment(p_id uuid)
returns void language plpgsql security definer as $$
begin
    if not exists (select 1 from public.profiles where id = auth.uid() and is_admin) then
        raise exception 'Không có quyền';
    end if;
    delete from public.comments where id = p_id;
end $$;
grant execute on function public.admin_delete_comment to authenticated;

-- ============ post_views (đếm lượt xem) ============
create table if not exists public.post_views (
    post_slug text primary key,
    views     bigint not null default 0
);
alter table public.post_views enable row level security;

-- Tăng lượt xem (chạy qua RPC security definer để anon cũng gọi được)
create or replace function public.increment_views(p_slug text)
returns bigint language plpgsql security definer as $$
declare v bigint;
begin
    insert into public.post_views (post_slug, views) values (p_slug, 1)
    on conflict (post_slug) do update set views = post_views.views + 1
    returning views into v;
    return v;
end $$;
grant execute on function public.increment_views to anon, authenticated;

-- ============ highlights (tô sáng + ghi chú đoạn bài) ============
create table if not exists public.highlights (
    id         uuid primary key default gen_random_uuid(),
    user_id    uuid not null references auth.users (id) on delete cascade,
    post_slug  text not null,
    quote      text not null check (char_length(quote) between 1 and 500),
    note       text not null default '',
    color      text not null default 'yellow',
    created_at timestamptz not null default now()
);
create index if not exists highlights_user_idx on public.highlights (user_id, post_slug);
alter table public.highlights enable row level security;

-- Ép user_id từ session (không tin client), giống comments.
create or replace function public.set_highlight_user()
returns trigger language plpgsql security definer as $$
begin
    new.user_id := auth.uid();
    return new;
end $$;

-- ============ Policies + triggers (guard bằng DO block, chạy lại an toàn) ============
do $$
begin
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='comments' and policyname='comments_select') then
        create policy "comments_select" on public.comments for select using (true); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='comments' and policyname='comments_insert') then
        create policy "comments_insert" on public.comments for insert with check (auth.uid() = user_id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='comments' and policyname='comments_update') then
        create policy "comments_update" on public.comments for update using (auth.uid() = user_id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='comments' and policyname='comments_delete') then
        create policy "comments_delete" on public.comments for delete using (auth.uid() = user_id); end if;

    execute 'drop policy if exists "profiles_select_own" on public.profiles';
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles_select') then
        create policy "profiles_select" on public.profiles for select using (true); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles_insert_own') then
        create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles_update_own') then
        create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id); end if;

    if not exists (select 1 from pg_policies where schemaname='public' and tablename='post_likes' and policyname='likes_select') then
        create policy "likes_select" on public.post_likes for select using (true); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='post_likes' and policyname='likes_insert') then
        create policy "likes_insert" on public.post_likes for insert with check (auth.uid() = user_id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='post_likes' and policyname='likes_delete') then
        create policy "likes_delete" on public.post_likes for delete using (auth.uid() = user_id); end if;

    if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='avatars_read') then
        create policy "avatars_read" on storage.objects for select using (bucket_id = 'avatars'); end if;
    if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='avatars_write_own') then
        create policy "avatars_write_own" on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]); end if;
    if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='avatars_update_own') then
        create policy "avatars_update_own" on storage.objects for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]); end if;
    if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='avatars_delete_own') then
        create policy "avatars_delete_own" on storage.objects for delete using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]); end if;

    if not exists (select 1 from pg_policies where schemaname='public' and tablename='post_views' and policyname='post_views_select') then
        create policy "post_views_select" on public.post_views for select using (true); end if;

    if not exists (select 1 from pg_policies where schemaname='public' and tablename='posts' and policyname='posts_select') then
        create policy "posts_select" on public.posts for select using (published = true); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='posts' and policyname='posts_insert') then
        create policy "posts_insert" on public.posts for insert with check (exists (select 1 from public.profiles where id = auth.uid() and is_admin)); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='posts' and policyname='posts_update') then
        create policy "posts_update" on public.posts for update using (exists (select 1 from public.profiles where id = auth.uid() and is_admin)); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='posts' and policyname='posts_delete') then
        create policy "posts_delete" on public.posts for delete using (exists (select 1 from public.profiles where id = auth.uid() and is_admin)); end if;

    if not exists (select 1 from pg_policies where schemaname='public' and tablename='notifications' and policyname='notifications_select_own') then
        create policy "notifications_select_own" on public.notifications for select using (auth.uid() = user_id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='notifications' and policyname='notifications_update_own') then
        create policy "notifications_update_own" on public.notifications for update using (auth.uid() = user_id); end if;

    if not exists (select 1 from pg_policies where schemaname='public' and tablename='highlights' and policyname='highlights_select_own') then
        create policy "highlights_select_own" on public.highlights for select using (auth.uid() = user_id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='highlights' and policyname='highlights_insert_own') then
        create policy "highlights_insert_own" on public.highlights for insert with check (auth.uid() = user_id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='highlights' and policyname='highlights_delete_own') then
        create policy "highlights_delete_own" on public.highlights for delete using (auth.uid() = user_id); end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename='highlights' and policyname='highlights_update_own') then
        create policy "highlights_update_own" on public.highlights for update using (auth.uid() = user_id); end if;

    -- Tự tạo row profile khi có user mới.
    if not exists (select 1 from pg_trigger where tgname='on_auth_user_created' and tgrelid='auth.users'::regclass) then
        create trigger on_auth_user_created
            after insert on auth.users
            for each row execute function public.handle_new_user(); end if;
    if not exists (select 1 from pg_trigger where tgname='comments_notify' and tgrelid='public.comments'::regclass) then
        create trigger comments_notify
            after insert on public.comments
            for each row execute function public.notify_comment(); end if;
    if not exists (select 1 from pg_trigger where tgname='highlights_set_user' and tgrelid='public.highlights'::regclass) then
        create trigger highlights_set_user
            before insert on public.highlights
            for each row execute function public.set_highlight_user(); end if;
end $$;
