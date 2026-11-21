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
    </div>
  );
}
