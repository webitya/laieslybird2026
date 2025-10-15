export const dynamic = "force-dynamic"
export const revalidate = 0
export const metadata = { title: "Admin Login" }

export default function AdminLogin({ searchParams }) {
  const error = searchParams?.error
  return (
    <div className="mx-auto max-w-sm rounded-lg border border-purple-200 bg-white p-6">
      <h1 className="mb-4 text-xl font-semibold text-purple-800">Admin Login</h1>
      {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">Invalid credentials</p>}
      <form method="POST" action="/api/admin/login" className="grid gap-3">
        <input
          name="username"
          required
          placeholder="Username"
          className="rounded-md border border-purple-300 px-3 py-2 text-sm"
        />
        <input
          name="password"
          required
          type="password"
          placeholder="Password"
          className="rounded-md border border-purple-300 px-3 py-2 text-sm"
        />
        <button className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700">Sign in</button>
      </form>
    </div>
  )
}
