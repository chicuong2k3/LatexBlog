using System.Text.Json;

namespace LatexBlog.Services;

public sealed record BookChapterMeta(
    string Slug, int Number, string Title, string Summary, string HtmlPath);

public sealed record BookMeta(
    string Slug, string Title, string? Author, string? OriginalTitle,
    string Language, string Summary, string[] Tags, string IntroPath,
    BookChapterMeta[] Chapters);

/// <summary>
/// Translated books = generated files under wwwroot/generated/books only.
/// This store intentionally has no dependency on PostStore or Supabase.
/// </summary>
public sealed class BookStore
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<BookStore> _logger;

    public BookStore(IWebHostEnvironment env, ILogger<BookStore> logger)
    {
        _env = env;
        _logger = logger;
    }

    private string GeneratedBooksDir =>
        Path.Combine(_env.WebRootPath, "generated", "books");

    public IReadOnlyList<BookMeta> All
    {
        get
        {
            var path = Path.Combine(GeneratedBooksDir, "index.json");
            if (!File.Exists(path))
            {
                _logger.LogWarning("books index.json missing at {Path} - run the book build script.", path);
                return Array.Empty<BookMeta>();
            }

            try
            {
                return JsonSerializer.Deserialize<BookMeta[]>(
                    File.ReadAllText(path),
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                    ?? Array.Empty<BookMeta>();
            }
            catch (JsonException ex)
            {
                _logger.LogWarning(ex, "books index.json is invalid at {Path}", path);
                return Array.Empty<BookMeta>();
            }
        }
    }

    public BookMeta? GetBook(string slug) =>
        All.FirstOrDefault(book => book.Slug == slug);

    public IReadOnlyList<BookMeta> Search(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Array.Empty<BookMeta>();

        var normalized = query.Trim();
        return All.Where(book =>
                book.Title.Contains(normalized, StringComparison.OrdinalIgnoreCase) ||
                book.Summary.Contains(normalized, StringComparison.OrdinalIgnoreCase) ||
                book.Author?.Contains(normalized, StringComparison.OrdinalIgnoreCase) == true ||
                book.OriginalTitle?.Contains(normalized, StringComparison.OrdinalIgnoreCase) == true ||
                book.Tags.Any(tag => tag.Contains(normalized, StringComparison.OrdinalIgnoreCase)))
            .ToList();
    }

    public string? GetIntroHtml(string slug)
    {
        var book = GetBook(slug);
        return book is null || string.IsNullOrWhiteSpace(book.IntroPath)
            ? null
            : ReadGeneratedHtml(book.Slug, book.IntroPath);
    }

    public string? GetChapterHtml(string bookSlug, string chapterSlug)
    {
        var book = GetBook(bookSlug);
        var chapter = book?.Chapters.FirstOrDefault(item => item.Slug == chapterSlug);
        return book is null || chapter is null
            ? null
            : ReadGeneratedHtml(book.Slug, chapter.HtmlPath);
    }

    private string? ReadGeneratedHtml(string bookSlug, string relativePath)
    {
        if (!IsSafeSegment(bookSlug) || !IsSafeRelativePath(relativePath))
            return null;

        var root = Path.GetFullPath(GeneratedBooksDir);
        var path = Path.GetFullPath(Path.Combine(root, bookSlug, relativePath));
        var rootPrefix = root.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar)
            + Path.DirectorySeparatorChar;
        if (!path.StartsWith(rootPrefix, StringComparison.OrdinalIgnoreCase) || !File.Exists(path))
            return null;

        return File.ReadAllText(path);
    }

    private static bool IsSafeRelativePath(string relativePath)
    {
        if (string.IsNullOrWhiteSpace(relativePath) || Path.IsPathRooted(relativePath))
            return false;
        return relativePath
            .Replace('\\', '/')
            .Split('/', StringSplitOptions.RemoveEmptyEntries)
            .All(IsSafePathSegment);
    }

    private static bool IsSafePathSegment(string segment)
    {
        const string htmlExtension = ".html";
        var stem = segment.EndsWith(htmlExtension, StringComparison.OrdinalIgnoreCase)
            ? segment[..^htmlExtension.Length]
            : segment;
        return IsSafeSegment(stem);
    }

    private static bool IsSafeSegment(string segment) =>
        segment.Length > 0 &&
        segment.All(character =>
            (character >= 'a' && character <= 'z') ||
            (character >= '0' && character <= '9') ||
            character == '-');
}
