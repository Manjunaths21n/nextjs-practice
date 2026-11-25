# Proxy

> Source: [Proxy](https://nextjs.org/docs/app/getting-started/proxy)

## Table of Contents

- [What Proxy does](#what-proxy-does)
- [File convention](#file-convention)
- [Limitations](#limitations)

---

Starting with Next.js 16, **Middleware** is called **Proxy**; its functionality is the same. Proxy runs before a request completes and can rewrite or redirect it, modify request/response headers, or return a response directly.

## What Proxy does

Typical uses include:

- Changing headers for all or selected paths.
- Rewriting requests for experiments or A/B tests.
- Redirecting based on request properties.

For simple redirects, prefer `redirects` in `next.config.ts`. Use Proxy when the decision needs request data or more complex logic.

## File convention

Create a single `proxy.ts` (or `proxy.js`) at the project root or in `src`, alongside `app` or `pages`. Export a named `proxy` function or a default function. Use `config.matcher` to limit which paths invoke it.

```ts
import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/about/:path*',
}
```

You can keep implementation details in imported modules, but only one Proxy entry file is supported per project.

## Limitations

- Proxy is not designed for slow data fetching or full session management.
- Treat authorization checks in Proxy as optimistic checks; protect sensitive data and actions in the appropriate server-side code too.
- `'use cache'`, `'use server'`, and `fetch` caching options such as `cache`, `next.revalidate`, and `next.tags` do not apply in Proxy. Use an external cache or move that work to a supported context.
