import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const database = await db()

    const [totalSubscribers, totalContacts, contactsByStatus, totalVisitors, visitorsToday] = await Promise.all([
      database.collection("subscribers").countDocuments(),
      database.collection("contacts").countDocuments(),
      database
        .collection("contacts")
        .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
        .toArray(),
      database.collection("visitors").countDocuments(),
      database.collection("visitors").countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      }),
    ])

    const subscribersThisMonth = await database.collection("subscribers").countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
    })

    const statusMap = {}
    contactsByStatus.forEach((item) => {
      statusMap[item._id] = item.count
    })

    return NextResponse.json({
      totalSubscribers,
      subscribersThisMonth,
      totalContacts,
      pendingContacts: statusMap.pending || 0,
      resolvedContacts: statusMap.resolved || 0,
      repliedContacts: statusMap.replied || 0,
      totalVisitors,
      visitorsToday,
    })
  } catch (error) {
    console.error("[v0] Stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
