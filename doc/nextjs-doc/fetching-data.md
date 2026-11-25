# Fetching Data

> Source: [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)

## Table of Contents

- [Server Components](#server-components)
- [Streaming data](#streaming-data)
- [Client Components](#client-components)
- [Avoiding request waterfalls](#avoiding-request-waterfalls)

---

## Server Components

Fetch data in an async Server Component using `fetch`, an ORM, or a database client:

```tsx
export default async function Page() {
  const response = await fetch('https://api.example.com/posts')
  const posts = await response.json()
  return <PostList posts={posts} />
}
```

- Identical `fetch` calls in a component tree are memoized by default.
- In Next.js 16.4.6, `fetch` is **not cached by default**. Use Cache Components (`'use cache'`) when a result should be reused; see [Caching](./caching.md).
- Server-side database access keeps query code and credentials out of the client bundle. Still authenticate and authorize access.

## Streaming data

Streaming sends ready parts of a page before slower data finishes.

- `loading.tsx` provides a route-segment fallback and wraps its page subtree in Suspense.
- Use `<Suspense>` around a specific async component for a more targeted fallback.
- Put uncached or runtime-dependent work behind a Suspense boundary; otherwise it can block the route.
- Design loading UI to communicate what is loading, such as a skeleton or preview of the upcoming content.

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <h1>Blog</h1>
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostList />
      </Suspense>
    </>
  )
}
```

In a Client Component, React's `use` API can read a Promise started in a Server Component. The Client Component should be inside a Suspense boundary. SWR or TanStack Query are alternatives for client-side fetching.

## Avoiding request waterfalls

- If one request needs another request's result, they are sequential; consider streaming the later work.
- Start independent requests before awaiting them, then use `Promise.all` to wait for results together. `Promise.all` rejects if any request fails; use `Promise.allSettled` when partial outcomes are needed.
- `React.cache` can deduplicate ORM or database calls **within a single request**; it is not a shared cache across requests.
- Preload data by starting the request before other blocking work. Reuse the same memoized or cached data-fetching function where it is consumed.
