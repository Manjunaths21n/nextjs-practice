"use client";

import { useEffect, useState } from "react";

type ServerTime = {
  time: string;
  id: string;
};

export default function ClientData() {
  const [data, setData] = useState<ServerTime | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/server-time")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json() as Promise<ServerTime>;
      })
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading in the browser...</p>;
  }

  return (
    <div className="rounded border border-gray-400 p-4">
      <p>Fetched in the browser at (UTC): {data.time}</p>
      <p>Response ID: {data.id}</p>
    </div>
  );
}
