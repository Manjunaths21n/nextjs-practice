import Image from "next/image";
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
    <Suspense fallback={<p>Loading users...</p>}>
      <div className="users-container flex flex-col gap-2">
        <h1>Users</h1>
        {users.map((user: any) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </Suspense>
  );
}