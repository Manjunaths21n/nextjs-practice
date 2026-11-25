// import Link from "next/link";
// import { connection } from "next/server";
// import { Suspense } from "react";

// async function RequestDetails() {
//   await connection();

//   const renderedAt = new Date().toISOString();
//   const requestId = crypto.randomUUID();

//   return (
//     <div className="rounded border border-gray-400 p-4">
//       <p>Server render time (UTC): {renderedAt}</p>
//       <p>Render ID: {requestId}</p>
//     </div>
//   );
// }

// export default function SsrExamplePage() {
// console.log('---SSR Page rendered!---')
//   return (
//     <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
//       <h1 className="text-2xl font-bold">Server-side rendering example</h1>
//       <p>
//         The server creates these values when it receives a request. Reload the
//         page to see them change.
//       </p>
//       <Suspense fallback={<p>Rendering on the server...</p>}>
//         <RequestDetails />
//       </Suspense>
//       <p>
//         The loading message is a static fallback. The request-specific content
//         is rendered on the server and streamed to your browser.
//       </p>
//       <Link href="/" className="text-blue-600 underline">
//         Back to Home
//       </Link>
//     </main>
//   );
// }
export default function ServerComponent() {
  console.log("Server Component rendered");

  return <h2>Server Component</h2>;
}