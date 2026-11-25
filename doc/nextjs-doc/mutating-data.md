# Mutating Data

> Source: [Mutating Data](https://nextjs.org/docs/app/getting-started/mutating-data)

## Table of Contents

- [Server Functions and Server Actions](#server-functions-and-server-actions)
- [Creating and invoking actions](#creating-and-invoking-actions)
- [Updating the UI after a mutation](#updating-the-ui-after-a-mutation)

---

## Server Functions and Server Actions

A **Server Function** is an async function that runs on the server and can be called from the client. A Server Function used to handle a mutation or form is called a **Server Action**.

Define one with the `'use server'` directive, either inside an async function or at the top of a file whose exports are server functions. Actions are invoked using `POST`.

> **Security:** Server Functions can be called through direct requests, not only through your UI. Authenticate the user and authorize the requested operation inside every action.

## Creating and invoking actions

Forms can invoke actions with their `action` prop. The action receives the submitted `FormData`.

```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  // Validate input, authorize the user, and save the post.
}
```

```tsx
import { createPost } from './actions'

export function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

- Server Component forms support progressive enhancement and can submit before JavaScript loads.
- Client Components can import an action from a `'use server'` file, pass it to a form or button, or receive it as a prop.
- Client Components cannot define Server Functions themselves.
- Actions are dispatched and awaited one at a time by the client; they are intended for mutations, not parallel data fetching.
- Use React's `useActionState` or transition hooks to show pending feedback.

## Updating the UI after a mutation

| API | Effect |
| --- | --- |
| `refresh()` | Refreshes the current client router; does not revalidate tagged data. |
| `revalidateTag()` / `updateTag()` | Revalidates tagged cached data. |
| `revalidatePath()` | Revalidates data associated with a route path. |
| `redirect()` | Navigates after the mutation; call revalidation first if needed. |

Server Actions can also read, set, and delete cookies. Setting or deleting a cookie causes the current page and layouts to rerender on the server so the UI reflects it.
