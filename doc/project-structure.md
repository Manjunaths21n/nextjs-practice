# Project Structure and Organization

> Source: [Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)

## Table of Contents

- [Folder and file conventions](#folder-and-file-conventions)
  - [Top-level folders](#top-level-folders)
  - [Top-level files](#top-level-files)
  - [Routing files](#routing-files)
  - [Nested routes](#nested-routes)
  - [Dynamic routes](#dynamic-routes)
  - [Route groups and private folders](#route-groups-and-private-folders)
  - [Parallel and intercepted routes](#parallel-and-intercepted-routes)
  - [Metadata file conventions](#metadata-file-conventions)
- [Organizing your project](#organizing-your-project)
  - [Component hierarchy](#1-component-hierarchy)
  - [Colocation](#2-colocation)
  - [Private folders](#3-private-folders)
  - [Route groups](#4-route-groups)
  - [`src` folder](#5-src-folder)

---

## Folder and file conventions

### Top-level folders

Used to organize the application's code and static assets.

| Folder   | Purpose                            |
| -------- | ---------------------------------- |
| `app`    | App Router                         |
| `pages`  | Pages Router                       |
| `public` | Static assets to be served         |
| `src`    | Optional application source folder |

### Top-level files

Used to configure the application, manage dependencies, run proxy, integrate monitoring tools, and define environment variables.

### Routing files

| File           | Purpose                       |
| -------------- | ----------------------------- |
| `page`         | Exposes a route               |
| `layout`       | Shared UI (header, nav, etc.) |
| `loading`      | Loading UI / skeletons        |
| `error`        | Error UI (error boundary)     |
| `global-error` | Global error UI               |
| `route`        | API endpoint                  |
| `template`     | Re-rendered layout            |
| `default`      | Parallel route fallback page  |
| `not-found`    | Not found UI                  |

### Nested routes

- Folders define URL segments; nesting folders nests the segments in the URL.
- Layouts at any level wrap their child segments.
- A route becomes public only when a `page` or `route` file exists in it.

| Path                        | URL pattern     | Notes                         |
| --------------------------- | --------------- | ----------------------------- |
| `app/layout.tsx`            | —               | Root layout wraps all routes  |
| `app/blog/layout.tsx`       | —               | Wraps `/blog` and descendants |
| `app/page.tsx`              | `/`             | Public route                  |
| `app/blog/page.tsx`         | `/blog`         | Public route                  |
| `app/blog/authors/page.tsx` | `/blog/authors` | Public route                  |

### Dynamic routes

Values are accessible through the `params` prop.

| Type              | Path                            | URL pattern                                                          |
| ----------------- | ------------------------------- | -------------------------------------------------------------------- |
| Single            | `app/blog/[slug]/page.tsx`      | `/blog/my-first-post`                                                |
| Catch-all         | `app/shop/[...slug]/page.tsx`   | `/shop/clothing`, `/shop/clothing/shirts`                            |
| Optional catch-all | `app/docs/[[...slug]]/page.tsx` | `/docs`, `/docs/layouts-and-pages`, `/docs/api-reference/use-router` |

### Route groups and private folders

- **Route groups** `(group)`: organize code without changing the URL.
- **Private folders** `_folder`: colocate non-routable files.

| Path                            | URL pattern | Notes                                     |
| ------------------------------- | ----------- | ----------------------------------------- |
| `app/(marketing)/page.tsx`      | `/`         | Group omitted from URL                    |
| `app/(shop)/cart/page.tsx`      | `/cart`     | Share layouts within `(shop)`             |
| `app/blog/_components/Post.tsx` | —           | Not routable; safe place for UI utilities |
| `app/blog/_lib/data.ts`         | —           | Not routable; safe place for utils        |

### Parallel and intercepted routes

Used for specific UI patterns, such as slot-based layouts or modal routing.

- `@slot`: named slot rendered by a parent layout.
- Intercepting patterns: render another route inside the current layout without changing the URL.

| Pattern          | Meaning              | Typical use case                         |
| ---------------- | -------------------- | ---------------------------------------- |
| `@folder`        | Named slot           | Sidebar + main content                   |
| `(.)folder`      | Intercept same level | Preview sibling route in a modal         |
| `(..)folder`     | Intercept parent     | Open a child of the parent as an overlay |
| `(..)(..)folder` | Intercept two levels | Deeply nested overlay                    |
| `(...)folder`    | Intercept from root  | Show arbitrary route in current view     |

### Metadata file conventions

- **App icons**: `favicon`, `icon`, `apple-icon`
- **Open Graph and Twitter images**: `opengraph-image`, `twitter-image`
- **SEO**: `sitemap`, `robots`

---

## Organizing your project

Next.js is **unopinionated** about how project files are organized and colocated, but it provides several features to help.

### 1. Component hierarchy

Components in special files render in this order (outermost to innermost):

1. `layout.js`
2. `template.js`
3. `error.js` (React error boundary)
4. `loading.js` (React Suspense boundary)
5. `not-found.js` (React error boundary for "not found" UI)
6. `page.js` or nested `layout.js`

```text
Layout -> Template -> ErrorBoundary (fallback: error) -> Suspense (fallback: loading)
       -> ErrorBoundary (fallback: not-found) -> Page
```

In nested routes, the components of a segment are rendered **inside** the components of its parent segment:

```text
Layout -> ErrorBoundary (fallback: error) -> Suspense -> ... (nested level repeats the same order)
```

### 2. Colocation

- In the `app` directory, nested folders define the route structure.
- A route is **not publicly accessible** until a `page.js` or `route.js` file is added to the segment.
- Even then, only the content returned by `page.js` or `route.js` is sent to the client.
- Therefore, project files can be **safely colocated** inside route segments without being routable.

> **Good to know:** Colocating files in `app` is optional; they can be kept outside the `app` directory.

### 3. Private folders

- Create one by prefixing a folder name with an underscore: `_folderName`.
- The folder and all its subfolders are opted out of routing.
- Not required for colocation (it is already safe), but useful for:
  - Separating UI logic from routing logic.
  - Consistently organizing internal files across a project and the Next.js ecosystem.
  - Sorting and grouping files in code editors.
  - Avoiding naming conflicts with future Next.js file conventions.

### 4. Route groups

- Create one by wrapping a folder name in parentheses: `(folderName)`.
- The folder name is **not included** in the URL path.
- Useful for:
  - Organizing routes by site section, intent, or team (e.g. marketing, admin).
  - Enabling nested layouts at the same route segment level (multiple root layouts, or a layout for a subset of routes).

### 5. `src` folder

- Optional folder that stores application code (including `app`).
- Separates application code from project configuration files, which mostly live in the project root.
