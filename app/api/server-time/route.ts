import { connection } from "next/server";

export async function GET() {
  await connection();

  return Response.json({
    time: new Date().toISOString(),
    id: crypto.randomUUID(),
  });
}
