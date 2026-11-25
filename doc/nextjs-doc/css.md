# CSS

> Source: [CSS](https://nextjs.org/docs/app/getting-started/css)

## Table of Contents

- [Styling options](#styling-options)
- [CSS ordering](#css-ordering)
- [Development and production](#development-and-production)

---

Next.js supports Tailwind CSS, CSS Modules, global CSS, external stylesheets, Sass, and CSS-in-JS.

## Styling options

| Option | Best for | How to use |
| --- | --- | --- |
| Tailwind CSS | Utility-first styling. | Configure the Tailwind PostCSS plugin, import Tailwind in global CSS, and use utility classes. |
| CSS Modules | Component-scoped styles. | Create `*.module.css`, import it, and use its class names. |
| Global CSS | Styles intended to affect the whole app. | Import a stylesheet in the root layout. |
| External stylesheets | CSS shipped by a dependency. | Import from the package in the App Router. |
| Sass / CSS-in-JS | Other styling approaches. | Follow the separate Next.js guides for each. |

Example CSS Module:

```css
/* app/blog/blog.module.css */
.blog {
  padding: 24px;
}
```

```tsx
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}>Blog</main>
}
```

Keep global styles for genuinely global rules. Next.js currently does not remove global stylesheets during navigation, which can cause conflicts; use CSS Modules for scoped component styling.

## CSS ordering

Production CSS is chunked and merged. The order of stylesheet imports in the JavaScript/TypeScript module graph affects the resulting CSS order. To make ordering predictable:

- Keep CSS imports in a small number of entry files.
- Import app-wide styles in the root.
- Use a consistent CSS Module naming convention.
- Be cautious with auto-sorting imports; it can change CSS ordering.
- `cssChunking` can control chunking behavior.

## Development and production

Development applies CSS changes with Fast Refresh. Production builds concatenate and minify CSS into route code-split files. Check production output when stylesheet ordering matters; development and production ordering can differ.
