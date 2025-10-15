import { db } from "@/lib/db"

export async function GET() {
  const database = await db()
  const rows = await database
    .collection("contacts")
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray()
  const header = ["name", "email", "message", "status", "createdAt"]
  const csv = [
    header.join(","),
    ...rows.map((r) =>
      [q(r.name), q(r.email), q(r.message), q(r.status), q(r.createdAt?.toISOString() || "")].join(","),
    ),
  ].join("\n")
  return new Response(csv, {
    headers: {
      "content-type": "text/csv",
      "content-disposition": 'attachment; filename="contacts.csv"',
    },
  })
}

function q(s) {
  const str = (s ?? "").toString()
  if (str.includes(",") || str.includes('"') || str.includes("\n")) return `"${str.replace(/"/g, '""')}"`
  return str
}
