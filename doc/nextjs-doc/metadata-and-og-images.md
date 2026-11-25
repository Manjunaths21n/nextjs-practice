# Metadata and OG Images

> Source: [Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

## Table of Contents

- [Metadata APIs](#metadata-apis)
- [File-based metadata](#file-based-metadata)
- [Open Graph images](#open-graph-images)

---

Metadata improves search-engine and social sharing information. Next.js generates the relevant `<head>` tags from metadata exports or metadata files. The `metadata` object and `generateMetadata` function are supported in **Server Components only**.

## Metadata APIs

- Export a static `metadata` object from a page or layout when values are known.
- Use `generateMetadata()` when values depend on route data, such as a post title. It can access async `params` and `searchParams`.
- The charset and viewport tags are provided by default.
- When a page and its metadata need the same data, use React `cache()` to memoize the request within the render.
- Metadata for dynamically rendered pages can stream separately; prerendered pages resolve it during prerender. Streaming is disabled for bots that require metadata in `<head>`.

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Articles and updates',
}
```

## File-based metadata

Special files can provide metadata without exporting an object:

| Purpose | Examples |
| --- | --- |
| Favicons and app icons | `favicon.ico`, `icon.png`, `apple-icon.png` |
| Social preview images | `opengraph-image.jpg`, `twitter-image.jpg` |
| Search engine files | `robots.txt`, `sitemap.xml` |

More specific files in nested route folders take precedence for those routes.

## Open Graph images

Use a static `opengraph-image` file for a fixed preview. For route-specific or data-driven images, add `opengraph-image.tsx` and return an `ImageResponse` from `next/og`.

- `ImageResponse` can generate a different social card for each dynamic route.
- It supports common CSS and a subset of properties, including flexbox; CSS Grid is not supported.
- The generated image can define `size` and `contentType`.

See the [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) and [Open Graph image convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) references for full options.
