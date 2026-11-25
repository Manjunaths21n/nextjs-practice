# Caching

> Source: [Caching](https://nextjs.org/docs/app/getting-started/caching)

## Table of Contents

- [Enable Cache Components](#enable-cache-components)
- [Cache data or UI](#cache-data-or-ui)
- [Stream uncached data](#stream-uncached-data)
- [Prerendering model](#prerendering-model)

---

> These notes cover the Cache Components model in Next.js 16.4.6. For apps not using Cache Components, follow the linked [previous caching model](https://nextjs.org/docs/app/guides/caching-without-cache-components) instead.

Caching stores the result of data fetching or computation so it can be reused. Cache Components are enabled with `cacheComponents: true`; recommended new-app defaults also enable partial prefetching.

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

## Cache data or UI

Use the `'use cache'` directive inside an async function or component. Arguments and captured values contribute to the cache key, so different inputs get different entries. Pair it with `cacheLife()` to set how long the result remains fresh.

```tsx
import { cacheLife } from 'next/cache'

async function getProducts() {
  'use cache'
  cacheLife('hours')
  return db.query('SELECT * FROM products')
}
```

- **Data-level caching:** cache a data function for reuse across components.
- **UI-level caching:** cache the rendered result of a component, page, or layout.
- A file-level `'use cache'` directive applies to all exported functions in that file.

## Stream uncached data

If data must be fresh at request time, do not put it in a shared cache. Wrap the async component in `<Suspense>` and provide a fallback. The fallback can be prerendered while the uncached result streams in.

Request-specific APIs such as `cookies()`, `headers()`, `params`, and `searchParams` need request-time values. Keep those reads inside a Suspense boundary. To cache work that depends on a runtime value, extract it and pass it as an argument to a cached function, or use `'use cache: private'` where appropriate.

## Prerendering model

With Cache Components, Next.js builds a static shell:

- Static and cached output can be included in the shell.
- Suspense fallbacks are included while uncached or runtime-dependent work streams at request time.
- Predictable values can be prerendered; for random values or timestamps, use request-time rendering (for example, `connection()`) or cache the result intentionally.
- For unknown dynamic route params, an App Shell can be served first and upgraded through ISR.

Cache storage may be in prerendered output, an instance cache, a configured remote cache, or the browser. In-memory entries may not persist in serverless deployments; use a remote cache when durable shared storage is required.
