import nodemailer from "nodemailer"

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com"
const smtpPort = Number(process.env.SMTP_PORT || 465)
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const fromEmail = process.env.EMAIL_FROM || "LaieslyBird <no-reply@laieslybird@gmail.com>"

export function getTransporter() {
  if (!smtpUser || !smtpPass) {
    console.warn("[LaieslyBird] SMTP creds not set")
  }
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  })
}

function shell({ title, subtitle, bodyHtml }) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf5ff;padding:24px;font-family:Arial,Helvetica,sans-serif">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e9d5ff;border-radius:12px;overflow:hidden">
          <tr>
            <td style="background:#7c3aed;color:#fff;padding:20px 24px">
              <h1 style="margin:0;font-size:20px">${title}</h1>
              <p style="margin:6px 0 0 0;opacity:.95">${subtitle}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;color:#312e81">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:#faf5ff;color:#6b21a8;padding:16px 24px;font-size:12px">
              © ${new Date().getFullYear()} LaieslyBird • laieslybird@gmail.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`
}

export async function sendWelcomeSubscribe({ to, name }) {
  const transporter = getTransporter()
  const html = shell({
    title: "Welcome to LaieslyBird!",
    subtitle: "CEO & Co‑Founder roadmaps, tutorials, and more",
    bodyHtml: `
      <p>Hi ${name || "there"},</p>
      <p>Thanks for subscribing to LaieslyBird. You’ll receive roadmaps, videos, PDFs, and deep dives to guide your leadership journey.</p>
      <p>— The LaieslyBird Team</p>
    `,
  })
  await transporter.sendMail({
    from: fromEmail,
    to,
    subject: "Welcome to LaieslyBird",
    html,
  })
}

export async function sendWelcomeContact({ to, name }) {
  const transporter = getTransporter()
  const html = shell({
    title: "We received your message",
    subtitle: "Thanks for contacting LaieslyBird",
    bodyHtml: `
      <p>Hi ${name || "there"},</p>
      <p>Thanks for reaching out. We’ll respond shortly.</p>
      <p>— The LaieslyBird Team</p>
    `,
  })
  await transporter.sendMail({
    from: fromEmail,
    to,
    subject: "Thanks for contacting LaieslyBird",
    html,
  })
}

export async function sendAdminReply({ to, subject, messageHtml }) {
  const transporter = getTransporter()
  const html = shell({
    title: subject || "Message from LaieslyBird",
    subtitle: "Admin response",
    bodyHtml: messageHtml || "<p>Hello!</p>",
  })
  await transporter.sendMail({
    from: fromEmail,
    to,
    subject: subject || "Reply from LaieslyBird",
    html,
  })
}
