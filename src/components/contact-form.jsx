export default function ContactForm() {
  return (
    <form method="POST" action="/api/contact" className="grid gap-3">
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
        aria-label="Name"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="youremail@gmail.com"
        className="w-full rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
        aria-label="Email"
      />
      <textarea
        name="message"
        required
        placeholder="How can we help?"
        className="min-h-28 w-full rounded-md border border-purple-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
        aria-label="Message"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
      >
        Send message
      </button>
    </form>
  )
}
