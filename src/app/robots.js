export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
