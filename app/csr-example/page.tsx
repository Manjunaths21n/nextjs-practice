// import Link from "next/link";
// import ClientData from "./ClientData";

// export default function CsrExamplePage() {
//   console.log('---CSR Page rendered!---')
//   return (
//     <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
//       <h1 className="text-2xl font-bold">Client-side rendering example</h1>
//       <p>
//         The server sends only the loading message. After the page loads, the
//         browser calls <code>/api/server-time</code> and renders the result.
//       </p>
//       <ClientData />
//       <p>
//         Check View Page Source: the time and ID are not in the HTML response.
//       </p>
//       <Link href="/" className="text-blue-600 underline">
//         Back to Home
//       </Link>
//     </main>
//   );
// }
"use client";

import { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);

  console.log("Client Component rendered");

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}