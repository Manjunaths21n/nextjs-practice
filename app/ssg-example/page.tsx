import Link from "next/link";
import { cacheLife } from "next/cache";

export default async function SsgExamplePage() {
  "use cache";
  cacheLife("max");

  const generatedAt = new Date().toISOString();
console.log('---SSG Page generated at:---')
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Static site generation example</h1>
      <p>
        This page is generated once and served from the cache. In a production
        build, it is generated during <code>next build</code>.
      </p>
      <div className="rounded border border-gray-400 p-4">
        <p>Page generated at (UTC): {generatedAt}</p>
      </div>
      <p>
        Reload the page: the time stays the same because the cached HTML is
        reused.
      </p>
      <Link href="/" className="text-blue-600 underline">
        Back to Home
      </Link>
    </main>
  );
}
