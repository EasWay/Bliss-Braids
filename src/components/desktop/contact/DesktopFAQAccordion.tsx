'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book online through our booking system or contact us directly via WhatsApp. We\'ll confirm your appointment and share our exact location.'
  },
  {
    question: 'Do you require a deposit?',
    answer: 'Yes, we require a 50 GHS deposit via Mobile Money to secure your appointment. This is deducted from your final service cost.'
  },
  {
    question: 'What should I bring to my appointment?',
    answer: 'It depends on whether you will bring you own hair extensions and other hair products, or you will source from us.'
  },
  {
    question: 'Can I reschedule my appointment?',
    answer: 'Yes, please contact us via WhatsApp at least 24 hours in advance to reschedule. We understand that plans can change!'
  }
];

export default function DesktopFAQAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="space-y-4">
      {faqs.map((faq, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/10 transition-colors group">
              <span className="text-lg font-semibold text-white pr-4">
                {faq.question}
              </span>
              <ChevronDown className="w-6 h-6 text-white/60 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="px-6 pb-5 pt-2">
              <p className="text-base text-white/80 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}