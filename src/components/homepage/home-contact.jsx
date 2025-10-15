import ContactForm from "@/components/contact-form"

export default function HomeContact() {
  return (
    <section className="rounded-xl border border-purple-200 bg-white p-6">
      <h2 className="mb-3 text-xl font-semibold text-purple-800">Contact</h2>
      <ContactForm />
    </section>
  )
}
