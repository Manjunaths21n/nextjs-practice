
import Link from "next/link";
import { Suspense } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

// Separate async Server Component
async function UsersList() {
  const users = await getUsers();

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}

// Page Component
export default function UsersPage() {
  return (
    <div className="users-container flex flex-col gap-2">
      <h1 className="text-2xl font-bold underline">
        Users
      </h1>

      <Suspense fallback={<p>Loading users...</p>}>
        <UsersList />
      </Suspense>

      <Link
        href="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
