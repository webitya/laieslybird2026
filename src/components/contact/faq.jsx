"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function ContactFAQ() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="response-time" className="bg-white/10 rounded-lg backdrop-blur-lg p-3">
          <AccordionTrigger className="text-white font-medium">
            How soon can I expect a response?
          </AccordionTrigger>
          <AccordionContent className="text-white/80 text-sm">
            We usually reply within 24 hours, Monday–Saturday. For urgent inquiries, mark your email as “priority.”
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="partnership" className="bg-white/10 rounded-lg backdrop-blur-lg p-3">
          <AccordionTrigger className="text-white font-medium">
            Do you collaborate with startups or universities?
          </AccordionTrigger>
          <AccordionContent className="text-white/80 text-sm">
            Absolutely! We work with early-stage founders, accelerators, and educational institutions on leadership and growth programs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="resources" className="bg-white/10 rounded-lg backdrop-blur-lg p-3">
          <AccordionTrigger className="text-white font-medium">
            Where can I access LaieslyBird resources?
          </AccordionTrigger>
          <AccordionContent className="text-white/80 text-sm">
            You can explore curated roadmaps, case studies, and tutorials directly on our platform under “Resources.”
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
