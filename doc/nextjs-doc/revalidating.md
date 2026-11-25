# Revalidating

> Source: [Revalidating](https://nextjs.org/docs/app/getting-started/revalidating)

## Table of Contents

- [Time-based revalidation](#time-based-revalidation)
- [On-demand revalidation](#on-demand-revalidation)
- [Choosing what to revalidate](#choosing-what-to-revalidate)

---

> These notes cover revalidation with Cache Components in Next.js 16.4.6. For apps not using Cache Components, see the [previous caching model](https://nextjs.org/docs/app/guides/caching-without-cache-components).

Revalidation updates cached content while letting the application serve cached results in the meantime.

## Time-based revalidation

Use `cacheLife()` inside a `'use cache'` scope to choose how long a result stays fresh. It accepts a built-in profile or a custom object with `stale`, `revalidate`, and `expire` values.

| Profile | Revalidate after | Expire after |
| --- | --- | --- |
| `seconds` | 1 second | 60 seconds |
| `minutes` | 1 minute | 1 hour |
| `hours` | 1 hour | 1 day |
| `days` | 1 day | 1 week |
| `weeks` | 1 week | 30 days |
| `max` | 30 days | 1 year |

For example:

```ts
import { cacheLife } from 'next/cache'

async function getProducts() {
  'use cache'
  cacheLife('hours')
  return db.query('SELECT * FROM products')
}
```

Very short-lived caches may be excluded from prerendering and become dynamic holes.

## On-demand revalidation

Use `cacheTag()` inside a cached function to label related entries, then invalidate them after data changes.

| API | Behavior | Where to use |
| --- | --- | --- |
| `revalidateTag(tag, 'max')` | Serves stale content while fresh data is generated in the background. | Server Actions and Route Handlers |
| `updateTag(tag)` | Immediately expires the tag so the user sees their own change. | Server Actions only |
| `revalidatePath(path)` | Revalidates cached data for a route path. | Server Actions and Route Handlers |

Prefer tag-based invalidation when possible because it is more precise than invalidating a whole path. For content that changes infrequently, a long cache lifetime plus a CMS webhook that calls `revalidateTag` can avoid unnecessary periodic refreshes.

In serverless environments, in-memory cache entries may not survive between invocations; configure durable shared storage if needed.
