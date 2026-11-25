# Error Handling

> Source: [Error Handling](https://nextjs.org/docs/app/getting-started/error-handling)

## Table of Contents

- [Expected errors](#expected-errors)
- [Not-found UI](#not-found-ui)
- [Uncaught exceptions](#uncaught-exceptions)
- [Global errors](#global-errors)

---

Next.js distinguishes **expected errors** in normal application flow from **uncaught exceptions** caused by unexpected failures.

## Expected errors

Handle expected outcomes explicitly instead of throwing them as exceptions.

- In Server Functions, return an error state (for example, a validation message) and display it with React's `useActionState`.
- In a Server Component, inspect the result and render an appropriate message or redirect.
- Use `notFound()` when a requested resource does not exist. Next.js renders the nearest `not-found.tsx` UI.

## Not-found UI

```tsx
import { notFound } from 'next/navigation'

export default async function Page() {
  const post = await getPost()
  if (!post) notFound()
  return <h1>{post.title}</h1>
}
```

Create `not-found.tsx` in the relevant route segment for its not-found UI.

## Uncaught exceptions

Create an `error.tsx` file in a route segment to provide a fallback for uncaught rendering errors. Error files must be Client Components. Errors bubble up to the nearest parent boundary, so place boundaries where recovery should be scoped.

- Use the error and retry/reset props to log failures and let the user attempt recovery.
- `catchError` from `next/error` can wrap a smaller component subtree.
- Error boundaries do **not** catch errors in event handlers or arbitrary asynchronous code. Handle those paths explicitly in the event logic.
- An unhandled error inside a React transition can bubble to the nearest error boundary.

## Global errors

`global-error.tsx` handles errors at the root layout level. It replaces that layout, so it must define its own `<html>` and `<body>` elements. It must also be a Client Component.
