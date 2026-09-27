namespace LatexBlog.Services;

/// <summary>
/// The single source of truth for the reader-facing brand. Every page title,
/// meta tag, feed entry and structured-data node reads from here, so a rename is
/// one edit instead of a hunt across a dozen files.
/// </summary>
public static class SiteInfo
{
    public const string Brand = "AIM";

    /// <summary>
    /// Builds a page title: the supplied segments followed by the brand, joined
    /// with an em dash. Blank segments are dropped so an optional part — a
    /// chapter's book, a missing title — disappears instead of leaving a dangling
    /// dash. With no usable segments the title is the bare brand.
    /// </summary>
    public static string Title(params string?[] parts)
    {
        var segments = parts
            .Where(p => !string.IsNullOrWhiteSpace(p))
            .Select(p => p!.Trim())
            .ToList();

        if (segments.Count == 0)
        {
            return Brand;
        }

        segments.Add(Brand);
        return string.Join(" — ", segments);
    }
}
