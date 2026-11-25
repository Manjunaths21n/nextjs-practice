# Font Optimization

> Source: [Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)

## Table of Contents

- [Google fonts](#google-fonts)
- [Local fonts](#local-fonts)
- [Applying fonts](#applying-fonts)

---

`next/font` optimizes fonts and self-hosts them as part of the build. For Google Fonts, this avoids browser requests to Google and helps prevent layout shift.

## Google fonts

Import a font from `next/font/google`, configure it, and apply its generated `className`:

```tsx
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })
```

Variable fonts are recommended for performance and flexibility. If the font is not variable, specify the required `weight`.

## Local fonts

Import `localFont` from `next/font/local`. The `src` path is relative to the file where `localFont` is called; local font files can live in `app`, `public`, or elsewhere in the project.

```tsx
import localFont from 'next/font/local'

const siteFont = localFont({ src: './fonts/site-font.woff2' })
```

For a family with multiple font files, provide an array of paths and describe each file's `weight` and `style`.

## Applying fonts

Fonts are scoped to the component where their class is applied. For an app-wide font, create it in the root layout and apply `className` to `<html>` or another root element. A nested layout or component can use a separate font locally.
