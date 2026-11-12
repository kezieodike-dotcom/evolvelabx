import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Calendar, ArrowRight } from 'lucide-react';

export interface FAQItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
  category?: string;
}

export interface AccordionFAQProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  items?: FAQItem[];
  faqs?: FAQItem[];
  questions?: FAQItem[];
  onOpenConsultation?: () => void;
  defaultOpenIndex?: number;
  className?: string;
}

export const AccordionFAQ: React.FC<AccordionFAQProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Clear answers to common questions regarding our architecture, engagement models, and delivery guarantees.',
  eyebrow = 'Advisory & Procurement FAQ',
  items,
  faqs,
  questions,
  onOpenConsultation,
  defaultOpenIndex = 0,
  className = '',
}) => {
  // Normalize incoming list of FAQs from any of the standard prop names
  const faqList: FAQItem[] = items || faqs || questions || [];

  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex >= 0 && defaultOpenIndex < faqList.length ? [defaultOpenIndex] : []
  );

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleExpandAll = () => {
    if (openIndices.length === faqList.length) {
      setOpenIndices([]);
    } else {
      setOpenIndices(faqList.map((_, i) => i));
    }
  };

  return (
    <section 
      className={`rounded-3xl bg-[#F5F2EA] border border-[#102238]/10 shadow-xl p-6 sm:p-10 lg:p-12 space-y-8 ${className}`}
    >
      {/* Header with Brand Midnight Navy (#102238) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#102238]/10">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7A66A] block mb-1.5">
              {eyebrow}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#102238] tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-[#242B34]/80 mt-2 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleExpandAll}
            className="text-xs font-bold text-[#102238] hover:text-[#083321] px-3 py-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#102238]/10 transition-colors shadow-2xs"
          >
            {openIndices.length === faqList.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Accordion Items List */}
      <div className="space-y-3">
        {faqList.map((item, index) => {
          const questionText = item.question || item.q || '';
          const answerText = item.answer || item.a || '';
          const isOpen = openIndices.includes(index);
          const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-[#102238]/30 bg-white shadow-md'
                  : 'border-[#102238]/10 bg-white/75 hover:bg-white hover:border-[#102238]/20'
              }`}
            >
              {/* Question Trigger */}
              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102238] rounded-2xl group cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={`text-xs font-mono font-bold mt-0.5 shrink-0 transition-colors duration-200 ${
                      isOpen ? 'text-[#C7A66A]' : 'text-[#242B34]/40 group-hover:text-[#102238]'
                    }`}
                  >
                    {formattedIndex}
                  </span>
                  <div>
                    <h4
                      className={`text-sm sm:text-base font-bold transition-colors duration-200 text-[#102238] ${
                        isOpen ? 'text-[#102238]' : 'group-hover:text-[#083321]'
                      }`}
                    >
                      {questionText}
                    </h4>
                    {item.category && (
                      <span className="text-[11px] font-medium text-[#C7A66A] block mt-0.5">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ease-in-out ${
                    isOpen
                      ? 'rotate-180 bg-[#102238] text-white'
                      : 'bg-[#F5F2EA] text-[#102238] group-hover:bg-[#102238] group-hover:text-white'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Smooth Height Transition with CSS Grid */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#242B34]/85 leading-relaxed border-t border-[#102238]/5 ml-9 sm:ml-10">
                    <p>{answerText}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consultation Action Card in Midnight Navy & Warm Ivory accents */}
      {onOpenConsultation && (
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#102238]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#102238] text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-[#C7A66A]" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#102238]">
                Have a specific architectural or procurement question?
              </h5>
              <p className="text-xs text-[#242B34]/70 mt-0.5">
                Our Senior Technical Partners review project briefs and respond within one business day.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#102238] hover:bg-[#1a3454] active:bg-[#0c1a2c] rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span>Book a Discovery Consultation</span>
          </button>
        </div>
      )}
    </section>
  );
};
