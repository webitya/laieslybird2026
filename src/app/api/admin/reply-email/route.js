import { NextResponse } from "next/server"
import { sendAdminReply } from "../../../../lib/email"
import { db, ObjectId } from "../../../../lib/db"

export async function POST(req) {
  try {
    const body = await req.json()
    const { to, subject, html, contactId } = body

    if (!to || !subject || !html) {
      return NextResponse.json({ error: "Missing required fields: to, subject, html" }, { status: 400 })
    }

    try {
      await sendAdminReply({ to, subject, messageHtml: html })
    } catch (emailErr) {
      console.error("[LaieslyBird] Email send failed:", emailErr?.message)
      return NextResponse.json({ error: "Failed to send email. Check SMTP configuration." }, { status: 500 })
    }

    if (contactId) {
      try {
        const database = await db()
        const contacts = database.collection("contacts")
        await contacts.updateOne(
          { _id: new ObjectId(contactId) },
          { $set: { status: "replied", repliedAt: new Date() } },
        )
      } catch (dbErr) {
        console.warn("[LaieslyBird] Failed to update contact status:", dbErr?.message)
        // Don't fail the response if DB update fails; email was sent successfully
      }
    }

    return NextResponse.json({ success: true, message: "Reply sent successfully" })
  } catch (err) {
    console.error("[LaieslyBird] Reply API error:", err?.message)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
