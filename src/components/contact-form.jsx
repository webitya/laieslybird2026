export default function ContactForm() {
  return (
    <form method="POST" action="/api/contact" className="grid gap-4 p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
        Contact Us
      </h2>

      <input
        type="text"
        name="name"
        required
        placeholder="Your Name"
        className="w-full rounded-lg border border-purple-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition"
        aria-label="Name"
      />

      <input
        type="email"
        name="email"
        required
        placeholder="youremail@gmail.com"
        className="w-full rounded-lg border border-purple-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition"
        aria-label="Email"
      />

      <textarea
        name="message"
        required
        placeholder="How can we help?"
        className="w-full min-h-32 rounded-lg border border-purple-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition resize-none"
        aria-label="Message"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-purple-700 hover:shadow-lg focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
      >
        Send Message
      </button>
    </form>
  );
}
