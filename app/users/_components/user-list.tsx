
async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  return res.json();
}

export async function UsersList() {
  const users = await getUsers();

  return (
    <>
      {users.map((user: { id: number; name: string; email: string }) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </>
  );
}
