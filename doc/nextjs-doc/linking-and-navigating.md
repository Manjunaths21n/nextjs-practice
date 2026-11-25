# Linking and Navigating

> Source: [Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)

## Table of Contents

- [How navigation works](#how-navigation-works)
- [Making navigation responsive](#making-navigation-responsive)
- [Native History API](#native-history-api)

---

## How navigation works

Next.js renders routes on the server. It combines server rendering with prefetching, streaming, and client-side transitions to make navigation feel fast.

- **Prerendering** creates and caches route output at build time or during revalidation.
- **Dynamic rendering** creates route output in response to a request.
- On the first visit, Next.js also sends HTML. Later client navigations use the React Server Component (RSC) payload.
- `<Link>` prefetches routes when links enter the viewport. Static routes are fully prefetched; dynamic routes are skipped or partially prefetched.
- Client-side transitions update the page without a full reload, preserving shared layouts and UI.

## Making navigation responsive

- Add a `loading.tsx` in a dynamic route segment to show an immediate fallback and allow partial prefetching. Next.js places it inside the segment layout and wraps the page in Suspense.
- Add `generateStaticParams` when dynamic route values can be generated at build time.
- For delayed navigation feedback, use `useLinkStatus` in a Client Component.
- Use `<Link prefetch={false}>` to avoid prefetching, for example in very large lists. The route will then load when clicked.
- `<Link>` needs hydration before prefetch can begin; reducing client JavaScript can help.

```tsx
import Link from 'next/link'

<Link href="/blog">Blog</Link>
<Link href="/contact" prefetch={false}>Contact</Link>
```

Use `<Link>` for normal navigation. A plain `<a>` performs a browser navigation rather than a Next.js client-side transition.

## Native History API

`window.history.pushState()` and `window.history.replaceState()` update the URL without reloading. Next.js integrates these calls with the router, so `usePathname` and `useSearchParams` update.

- `pushState` adds a history entry; the Back button can return to the previous URL.
- `replaceState` replaces the current entry.
- If a handler is the only place that needs the URL, read `window.location` there instead of subscribing with a router hook.
