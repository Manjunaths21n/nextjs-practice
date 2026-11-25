# Layouts and Pages

> Source: [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

## Table of Contents

- [How routing works](#how-routing-works)
- [Creating a page](#creating-a-page)
- [Creating a layout](#creating-a-layout)
- [Nested routes and layouts](#nested-routes-and-layouts)
- [Dynamic route segments](#dynamic-route-segments)
- [Reading search parameters](#reading-search-parameters)
- [Linking between pages](#linking-between-pages)
- [Route props helpers](#route-props-helpers)

---

## How routing works

Next.js uses **file-system-based routing**:

- Folders define route segments that map to URL segments.
- Special files such as `page` and `layout` define the UI for each segment.
- A route becomes publicly accessible when it has a `page` or `route` file.

## Creating a page

A **page** is UI rendered for a specific route. Create a `page` file in the `app` directory and default-export a React component.

| File               | URL  |
| ------------------ | ---- |
| `app/page.tsx`     | `/`  |
| `app/blog/page.tsx`| `/blog` |

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

## Creating a layout

A **layout** is shared UI around multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.

- Export a React component by default from a `layout` file.
- It receives a `children` prop containing the page or nested layout.
- The root layout (`app/layout.tsx`) is required and must include `<html>` and `<body>`.

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>Shared site header</header>
        <main>{children}</main>
      </body>
    </html>
  )
}
```

## Nested routes and layouts

A nested route is made from multiple URL segments. For example, `/blog/[slug]` contains the root segment, `blog`, and the dynamic `[slug]` leaf segment.

```text
app/
├── layout.tsx
├── page.tsx                 -> /
└── blog/
    ├── layout.tsx           -> wraps /blog and its child routes
    ├── page.tsx             -> /blog
    └── [slug]/
        └── page.tsx         -> /blog/:slug
```

Layouts in the folder hierarchy nest automatically through their `children` props:

```text
app/layout.tsx
└── app/blog/layout.tsx
    ├── app/blog/page.tsx
    └── app/blog/[slug]/page.tsx
```

The root layout wraps the blog layout, which wraps the matching blog page.

## Dynamic route segments

Square brackets create a dynamic segment, allowing routes to be generated from data (for example, blog posts or product pages).

| File path                       | Example URL          | Parameter |
| ------------------------------- | -------------------- | --------- |
| `app/blog/[slug]/page.tsx`      | `/blog/first-post`   | `slug`    |

In the current App Router, `params` is a `Promise`; await it to read the segment value:

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <h1>Blog post: {slug}</h1>
}
```

Nested layouts within dynamic segments can also access `params`. See [Dynamic Segments](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) for more.

## Reading search parameters

A Server Component page can read query-string values with its `searchParams` prop. This prop is a `Promise`:

```tsx
// URL: /products?category=books
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { category } = await searchParams

  return <h1>Category: {category}</h1>
}
```

| Use | When |
| --- | ---- |
| `searchParams` page prop | Query values are needed on the server, such as for data loading, filtering, or pagination. |
| `useSearchParams` hook | Query values are used in a Client Component. |
| `new URLSearchParams(window.location.search)` | Read query values inside a callback or event handler without triggering rerenders. |

Using the `searchParams` prop opts the page into **dynamic rendering**, because the values depend on the incoming request.

## Linking between pages

Use Next.js `<Link>` from `next/link` for navigation. It extends the HTML `<a>` element with features such as prefetching and client-side navigation.

```tsx
import Link from 'next/link'

export default function PostLink({ slug }: { slug: string }) {
  return <Link href={`/blog/${slug}`}>Read post</Link>
}
```

`<Link>` is the primary way to navigate. Use the `useRouter` hook for more advanced, programmatic navigation.

## Route props helpers

Next.js provides globally available helper types for route props:

| Helper | Provides |
| ------ | -------- |
| `PageProps` | `params` and `searchParams` for a page. |
| `LayoutProps` | `children` and named slots (for example, a folder named `@analytics`) for a layout. |

The helpers are generated by `next dev`, `next build`, or `next typegen`. They do not need to be imported.

```tsx
// app/blog/[slug]/page.tsx
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  return <h1>Blog post: {slug}</h1>
}
```

```tsx
// app/dashboard/layout.tsx
export default function Layout(props: LayoutProps<'/dashboard'>) {
  return <section>{props.children}</section>
}
```

**Good to know:** On static routes, `params` resolves to an empty object (`{}`).