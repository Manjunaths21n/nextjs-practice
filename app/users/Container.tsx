const dynamic = 'force-dynamic';

import Link from "next/link";
import { Suspense } from "react";

async function getUsers() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return res.json();
}


export default async function UsersPage() {
  const users = await getUsers();

  return (

    <div className="users-container flex flex-col gap-2">
        <Suspense fallback={<p>Loading users...</p>}>
        <h1 className="text-2xl font-bold underline">Users</h1>
        {users.map((user: { id: number; name: string; email: string }) => (
          <p key={user.id}>{user.name} - {user.email}</p>
        ))}
    </Suspense>
    <Link href="/">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 w-100">
        Back to Home
      </button>
    </Link>
      </div>
  );
}