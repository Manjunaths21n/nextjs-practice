# Image Optimization

> Source: [Image Optimization](https://nextjs.org/docs/app/getting-started/images)

## Table of Contents

- [Why use `next/image`](#why-use-nextimage)
- [Local images](#local-images)
- [Remote images](#remote-images)

---

The Next.js `<Image>` component extends `<img>` with image sizing and optimization, layout-shift prevention, lazy loading, optional blur placeholders, and on-demand resizing.

```tsx
import Image from 'next/image'
```

## Local images

Images in the root `public` folder are referenced from the site root:

```tsx
<Image src="/profile.png" alt="Profile photo" width={500} height={500} />
```

- Provide descriptive `alt` text.
- For files imported statically, Next.js can infer width, height, and blur data automatically.
- Width and height establish the aspect ratio and help prevent layout shift while an image loads.
- Use `fill` when an image should fill its parent; size the parent appropriately.

## Remote images

Remote URLs are not available during the build, so provide `width` and `height` (or use `fill`). Restrict allowed remote sources with `images.remotePatterns` in `next.config.ts`:

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.example.com',
        pathname: '/products/**',
      },
    ],
  },
}
```

Keep patterns as specific as practical. See the [Image component reference](https://nextjs.org/docs/app/api-reference/components/image) for supported properties and configuration.
