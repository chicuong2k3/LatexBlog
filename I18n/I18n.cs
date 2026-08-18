using System.Threading;

namespace LatexBlog.I18n;

public static class I18n
{
    private static readonly AsyncLocal<string?> _lang = new();

    public static string Lang
    {
        get => _lang.Value ?? "vi";
        set => _lang.Value = value;
    }

    private static string Pick(string key, string vi, string en) => Lang == "en" ? en : vi;

    public static string SiteTitle => Pick("SiteTitle", "LatexBlog", "LatexBlog");
    public static string HeroSubtitle => Pick("HeroSubtitle", "Viết bằng LaTeX, xuất bản bằng Blazor.", "Written in LaTeX, published with Blazor.");
    public static string MenuHome => Pick("MenuHome", "Trang chủ", "Home");
    public static string MenuTags => Pick("MenuTags", "Thẻ", "Tags");
    public static string MenuSearch => Pick("MenuSearch", "Tìm kiếm", "Search");
    public static string SearchTitle => Pick("SearchTitle", "Tìm kiếm", "Search");
    public static string SearchPlaceholder => Pick("SearchPlaceholder", "Tìm kiếm bài viết…", "Search posts…");
    public static string SearchHint => Pick("SearchHint", "Gõ để tìm theo tiêu đề, tóm tắt hoặc thẻ.", "Type to search by title, summary or tags.");
    public static string LoadMore => Pick("LoadMore", "Xem thêm", "Load more");
    public static string NoPosts => Pick("NoPosts", "Chưa có bài viết nào.", "No posts yet.");
    public static string NoResults => Pick("NoResults", "Không tìm thấy bài viết phù hợp.", "No matching posts found.");
    public static string PostedOn => Pick("PostedOn", "Đăng ngày", "Posted on");
    public static string Toc => Pick("Toc", "Mục lục", "Contents");
    public static string TagPageTitle => Pick("TagPageTitle", "Bài viết theo thẻ", "Posts tagged");
    public static string NotFoundTitle => Pick("NotFoundTitle", "Không tìm thấy trang", "Page not found");
    public static string NotFoundMessage => Pick("NotFoundMessage", "Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.", "The page you are looking for does not exist or has moved.");
    public static string BackHome => Pick("BackHome", "Về trang chủ", "Back home");
    public static string ThemeToDark => Pick("ThemeToDark", "Chuyển sang giao diện tối", "Switch to dark theme");
    public static string ThemeToLight => Pick("ThemeToLight", "Chuyển sang giao diện sáng", "Switch to light theme");
    public static string ToggleMenu => Pick("ToggleMenu", "Mở menu", "Open menu");
    public static string Footer => Pick("Footer", "© 2026 LatexBlog", "© 2026 LatexBlog");
    public static string CopyCode => Pick("CopyCode", "Sao chép", "Copy");
    public static string Copied => Pick("Copied", "Đã chép!", "Copied!");

    public static string HeroPre => Pick("HeroPre", "Toán học ", "Math glows ");
    public static string HeroNeon => Pick("HeroNeon", "sáng đèn", "neon-bright");
    public static string HeroMid => Pick("HeroMid", " giữa phố ", " on a ");
    public static string HeroViolet => Pick("HeroViolet", "đêm", "night street");
    public static string HeroEnd => Pick("HeroEnd", ".", ".");
    public static string HeroLead => Pick("HeroLead", "Công thức không chỉ đúng — mà còn phát sáng.", "Formulas are not just correct — they glow.");
    public static string LatestPost => Pick("LatestPost", "Bài mới nhất", "Latest post");
    public static string ReadMore => Pick("ReadMore", "Đọc tiếp", "Read more");
    public static string PostsTitle => Pick("PostsTitle", "Bài viết", "Posts");
    public static string PostsCount => Pick("PostsCount", "bài", "posts");
    public static string MatrixLabel => Pick("MatrixLabel", "Ma trận xoay một góc θ trong mặt phẳng", "Rotation matrix by angle θ in the plane");
    public static string FooterTagline => Pick("FooterTagline", "Sakura không tàn, chỉ chuyển màu đèn.", "Sakura never dies, it just changes its neon.");
    public static string Comments => Pick("Comments", "Bình luận", "Comments");
    public static string CommentsDisabled => Pick("CommentsDisabled", "Bình luận chưa được bật trên blog này.", "Comments are not enabled on this blog.");
    public static string CommentsLoading => Pick("CommentsLoading", "Đang tải bình luận…", "Loading comments…");
    public static string SignInGoogle => Pick("SignInGoogle", "Đăng nhập bằng Google", "Sign in with Google");
    public static string SignOut => Pick("SignOut", "Đăng xuất", "Sign out");
    public static string CommentPlaceholder => Pick("CommentPlaceholder", "Viết bình luận…", "Write a comment…");
    public static string PostComment => Pick("PostComment", "Gửi bình luận", "Post comment");
    public static string NoComments => Pick("NoComments", "Chưa có bình luận nào. Hãy là người đầu tiên.", "No comments yet. Be the first.");
    public static string CommentingAs => Pick("CommentingAs", "Bình luận với tư cách", "Commenting as");
    public static string SignIn => Pick("SignIn", "Đăng nhập", "Sign in");
    public static string Reply => Pick("Reply", "Trả lời", "Reply");
    public static string Cancel => Pick("Cancel", "Hủy", "Cancel");
    public static string ReplyPlaceholder => Pick("ReplyPlaceholder", "Trả lời bình luận…", "Reply to comment…");
    public static string PostReply => Pick("PostReply", "Gửi trả lời", "Post reply");
    public static string TagsTitle => Pick("TagsTitle", "Thẻ", "Tags");
    public static string Close => Pick("Close", "Đóng", "Close");

    public static string Like => Pick("Like", "Thích", "Like");
    public static string Share => Pick("Share", "Chia sẻ", "Share");
    public static string CopyLink => Pick("CopyLink", "Sao chép liên kết", "Copy link");
    public static string Profile => Pick("Profile", "Trang cá nhân", "Profile");
    public static string ProfileSignIn => Pick("ProfileSignIn", "Đăng nhập để xem trang cá nhân.", "Sign in to view your profile.");
    public static string EditName => Pick("EditName", "Tên hiển thị", "Display name");
    public static string EditAvatar => Pick("EditAvatar", "Ảnh đại diện", "Avatar");
    public static string ChangeAvatar => Pick("ChangeAvatar", "Đổi ảnh đại diện", "Change avatar");
    public static string Save => Pick("Save", "Lưu", "Save");
    public static string Saved => Pick("Saved", "Đã lưu!", "Saved!");
    public static string LikedPosts => Pick("LikedPosts", "Bài viết đã thích", "Liked posts");
    public static string NoLikedPosts => Pick("NoLikedPosts", "Bạn chưa thích bài viết nào.", "You have not liked any posts.");
    public static string Loading => Pick("Loading", "Đang tải…", "Loading…");
    public static string NameEmpty => Pick("NameEmpty", "Tên không được để trống.", "Name cannot be empty.");
    public static string LoadMoreComments => Pick("LoadMoreComments", "Xem thêm bình luận", "Load more comments");
    public static string Preview => Pick("Preview", "Xem trước", "Preview");
    public static string Bold => Pick("Bold", "In đậm", "Bold");
    public static string Italic => Pick("Italic", "In nghiêng", "Italic");
    public static string Code => Pick("Code", "Mã nguồn", "Code");
    public static string InlineMath => Pick("InlineMath", "Công thức toán", "Math");
    public static string DisplayMath => Pick("DisplayMath", "Công thức dòng riêng", "Display math");
    public static string Link => Pick("Link", "Chèn liên kết", "Insert link");
    public static string Quote => Pick("Quote", "Trích dẫn", "Quote");
    public static string List => Pick("List", "Danh sách", "List");

    public static string Edit => Pick("Edit", "Sửa", "Edit");
    public static string Edited => Pick("Edited", "(đã sửa)", "(edited)");
    public static string Notifications => Pick("Notifications", "Thông báo", "Notifications");
    public static string MarkAllRead => Pick("MarkAllRead", "Đọc hết", "Mark all read");
    public static string NotificationsEmpty => Pick("NotificationsEmpty", "Chưa có thông báo.", "No notifications.");
    public static string NotifReply => Pick("NotifReply", "đã trả lời bình luận của bạn", "replied to your comment");
    public static string NotifMention => Pick("NotifMention", "đã nhắc đến bạn", "mentioned you");

    public static string Highlight => Pick("Highlight", "Tô sáng", "Highlight");
    public static string Note => Pick("Note", "Ghi chú", "Note");
    public static string NotePlaceholder => Pick("NotePlaceholder", "Viết ghi chú cho đoạn này…", "Write a note for this passage…");
    public static string BackToTop => Pick("BackToTop", "Về đầu trang", "Back to top");
    public static string Highlights => Pick("Highlights", "Đoạn đã tô & ghi chú", "Highlights & notes");
    public static string NoHighlights => Pick("NoHighlights", "Chưa có đoạn nào được tô.", "No highlights yet.");
    public static string Delete => Pick("Delete", "Xóa", "Delete");
    public static string SignInToAnnotate => Pick("SignInToAnnotate", "Đăng nhập để tô sáng và ghi chú.", "Sign in to highlight and take notes.");
    public static string RelatedPosts => Pick("RelatedPosts", "Bài viết liên quan", "Related posts");
    public static string Views => Pick("Views", "lượt xem", "views");
    public static string ViewCount => Pick("ViewCount", "Lượt xem", "Views");

    public static string WritePost => Pick("WritePost", "Viết bài", "Write post");
    public static string PostEditor => Pick("PostEditor", "Viết bài mới", "New post");
    public static string Slug => Pick("Slug", "Đường dẫn (slug)", "Slug");
    public static string Summary => Pick("Summary", "Tóm tắt", "Summary");
    public static string Publish => Pick("Publish", "Xuất bản", "Publish");
    public static string DbPosts => Pick("DbPosts", "Bài viết trên blog", "Blog posts");
    public static string ReadingTime => Pick("ReadingTime", "phút đọc", "min read");
    public static string FocusMode => Pick("FocusMode", "Chế độ đọc", "Focus mode");
    public static string About => Pick("About", "Về tôi", "About");
    public static string Stats => Pick("Stats", "Thống kê", "Stats");
    public static string ExportComments => Pick("ExportComments", "Tải bình luận (JSON)", "Download comments (JSON)");
    public static string ExportHighlights => Pick("ExportHighlights", "Tải ghi chú (JSON)", "Download highlights (JSON)");
    public static string CommentsWritten => Pick("CommentsWritten", "bình luận đã viết", "comments written");
    public static string HighlightsMade => Pick("HighlightsMade", "đoạn đã tô", "highlights");
    public static string PostsLiked => Pick("PostsLiked", "bài đã thích", "posts liked");
    public static string SearchComments => Pick("SearchComments", "Tìm trong bình luận", "Search comments");
    public static string ShareQuote => Pick("ShareQuote", "Chia sẻ đoạn này", "Share this passage");
    public static string NoAdmin => Pick("NoAdmin", "Bạn không có quyền quản trị.", "You are not an admin.");
    public static string TitleLabel => Pick("TitleLabel", "Tiêu đề", "Title");
    public static string PostDate => Pick("PostDate", "Ngày đăng", "Date");
    public static string PostTags => Pick("PostTags", "Thẻ (cách nhau bằng dấu phẩy)", "Tags (comma separated)");
    public static string PingSitemap => Pick("PingSitemap", "Ping Google sitemap", "Ping Google sitemap");
    public static string BodyMarkdown => Pick("BodyMarkdown", "Nội dung (Markdown + công thức $…$)", "Content (Markdown + $…$ math)");
    public static string Insert => Pick("Insert", "Chèn", "Insert");
}
