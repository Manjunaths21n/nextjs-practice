# Server and Client Components

> Source: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

## Table of Contents

- [Choosing a component type](#choosing-a-component-type)
- [Rendering and navigation](#rendering-and-navigation)
- [Composing the two types](#composing-the-two-types)
- [Protecting the server-client boundary](#protecting-the-server-client-boundary)

---

Layouts and pages are **Server Components by default**. Use Client Components only where interactivity or browser-only behavior is needed.

## Choosing a component type

| Server Component | Client Component |
| --- | --- |
| Fetch data near the source, including databases and APIs. | State, event handlers, lifecycle logic, and custom hooks. |
| Keep secrets on the server. | Browser APIs such as `window` and `localStorage`. |
| Reduce JavaScript sent to the browser. | Interactive UI that must run in the browser. |

Mark a Client Component with `'use client'` at the top of its file, before imports:

```tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

The directive establishes a client module-graph boundary: imports used by that Client Component are included in the client bundle. Keep the boundary close to interactive UI instead of marking an entire page or layout as client-side.

## Rendering and navigation

- On the server, Server Components render into the **React Server Component (RSC) payload**. It contains rendered server output, placeholders and references for Client Components, and props passed to them.
- On the first load, the browser displays prerendered HTML, reconciles the component trees with the RSC payload, then hydrates Client Components to enable interactivity.
- On subsequent navigations, the RSC payload is prefetched and cached; Client Components render on the client.

## Composing the two types

- Pass data from a Server Component to a Client Component as **serializable props**.
- A Server Component can pass another Server Component as `children` to a Client Component. This lets server-rendered UI be composed inside interactive wrappers such as modals.
- React context is not supported in Server Components. Put providers in a Client Component and render them as deep in the tree as practical.
- Wrap third-party components that require client features in a Client Component if the library does not mark its own entry point with `'use client'`.

## Protecting the server-client boundary

Do not let server-only modules or secrets enter the client bundle. Import `server-only` in sensitive server modules to make accidental client imports fail during the build. `client-only` can mark modules that depend on browser APIs. These packages are optional; Next.js handles their markers internally.
