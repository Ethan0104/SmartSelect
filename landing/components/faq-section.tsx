import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "Is it free?",
      answer: "Yes, it's 100% free!",
    },
    {
      question: "Is this open source?",
      answer: (
        <>
          Yes, all the code is available at{" "}
          <Link
            href="https://github.com/Ethan0104/SmartSelect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://github.com/Ethan0104/SmartSelect
          </Link>
        </>
      ),
    },
    {
      question: "How can I request a feature or report a bug?",
      answer: (
        <>
          You can always send an email anytime to{" "}
          <Link href="mailto:ethanw010404@gmail.com" className="text-primary hover:underline">
            support
          </Link>
          !
        </>
      ),
    },
  ]

  return (
    <section id="faq" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Got questions? We've got answers.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-white">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
