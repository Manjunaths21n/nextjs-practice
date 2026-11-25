'use client';
import Link from 'next/link';

export default function MainPage() {

  return (
    <div className="users-container flex flex-col gap-2 items-center justify-center">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Link href="/users">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 w-100"
        >
          View All Users
        </button>
      </Link>
      <Link href="/ssr-example" prefetch={false} className="text-blue-600 underline">
        See the server-side rendering example
      </Link>
      <Link href="/csr-example" prefetch={false} className="text-blue-600 underline">
        See the client-side rendering example
      </Link>
      <Link href="/ssg-example" className="text-blue-600 underline">
        See the static site generation example
      </Link>
    </div>
  );
}
// import ServerComponent from "./ssr-example/page";
// import ClientComponent from "./csr-example/page";

// export default function Page() {
//   console.log("Page rendered");

//   return (
//     <>
//       <ServerComponent />
//       <ClientComponent />
//     </>
//   );
// }