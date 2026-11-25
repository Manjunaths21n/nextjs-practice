This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Server-side rendering example

Visit [http://localhost:3000/ssr-example](http://localhost:3000/ssr-example)
to see a server-rendered timestamp and render ID. Reload the page to generate
new values on the server; no external API is needed.

The example in `app/ssr-example/page.tsx` is a Server Component.
`connection()` waits for an incoming request before generating the values, so
they are not generated at build time. The surrounding `Suspense` boundary
allows Next.js to send a static loading fallback while the request-specific
content is rendered and streamed. You can also use View Page Source to inspect
the HTML response; streamed content may appear later in the response.

## Client-side rendering example

Visit [http://localhost:3000/csr-example](http://localhost:3000/csr-example).
The HTML contains only a loading message. After the page loads, the client
component in `app/csr-example/ClientData.tsx` fetches `/api/server-time` in the
browser and renders the result.

## Static site generation example

Visit [http://localhost:3000/ssg-example](http://localhost:3000/ssg-example).
`app/ssg-example/page.tsx` uses `"use cache"` with `cacheLife("max")`, so the
page is generated once (during `next build` in production) and the same
timestamp is served on every reload.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
