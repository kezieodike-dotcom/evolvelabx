import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Users, 
  FileText, 
  HelpCircle,
  Calendar,
  Sparkles,
  Cpu,
  ChevronDown,
  Check
} from 'lucide-react';
import { SERVICES_DATA, ASSET_IMAGES, SERVICES_FAQS } from '../data/mockData';
import { AccordionFAQ } from '../components/AccordionFAQ';
import { ServiceDetail } from '../types';

interface ServicesViewProps {
  onOpenConsultation: (service?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenConsultation }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('consulting');

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
          Enterprise Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083321] tracking-tight">
          Services Built for Measurable Business Transformation
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Every engagement answers seven fundamental commercial questions: Who is it for, what friction does it resolve, what will be delivered, and how will your team adopt it with lasting confidence.
        </p>
      </div>

      {/* Segmented Selector for the 4 pillars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SERVICES_DATA.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedServiceId(service.id)}
            className={`p-4 rounded-xl text-left border transition-all ${
              selectedServiceId === service.id
                ? 'bg-[#083321] text-white border-[#083321] shadow-md'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className={`text-xs font-mono font-bold block mb-1 ${selectedServiceId === service.id ? 'text-emerald-400' : 'text-emerald-800'}`}>
              {service.number}
            </span>
            <h3 className="font-bold text-sm leading-snug">
              {service.title.split('&')[0]}
            </h3>
            <span className={`text-[11px] block mt-1 line-clamp-1 ${selectedServiceId === service.id ? 'text-emerald-200/80' : 'text-slate-500'}`}>
              {service.shortDesc}
            </span>
          </button>
        ))}
      </div>

      {/* Deep-Dive Service Specification (Satisfying PRD Section 7 Questions) */}
      <div className="bg-white rounded-3xl border border-emerald-950/15 shadow-xl p-6 sm:p-10 lg:p-12 space-y-12">
        {/* Top Service Title & Overview */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Practice {currentService.number} Specification
            </span>
            <h2 className="text-3xl font-extrabold text-[#083321] tracking-tight">
              {currentService.title}
            </h2>
            <p className="text-base text-slate-700 mt-2 leading-relaxed">
              {currentService.fullDesc}
            </p>
          </div>

          <button
            onClick={() => onOpenConsultation(currentService.title)}
            className="px-6 py-3 text-xs font-bold text-white bg-[#083321] hover:bg-[#0c472f] rounded-xl transition-colors flex items-center gap-2 self-start lg:self-auto shrink-0 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Engage This Practice</span>
          </button>
        </div>

        {/* Visual asset display if available for this service */}
        {currentService.image && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/8] sm:aspect-[16/7] relative">
            <img
              src={currentService.image}
              alt={currentService.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <span className="text-xs font-bold text-white bg-[#083321]/90 px-3 py-1 rounded backdrop-blur-sm border border-emerald-500/30">
                Verified Production Environment
              </span>
            </div>
          </div>
        )}

        {/* The 7 Mandatory PRD Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Q1: Who is this service for? */}
          <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>1. Who is this service for?</span>
            </div>
            <div className="space-y-2">
              {currentService.targetAudience.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q2: What business problem does it solve? */}
          <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>2. What business problem does it solve?</span>
            </div>
            <div className="space-y-2">
              {currentService.problemsSolved.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q3: What will EvolveLabX deliver? */}
          <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>3. What will EvolveLabX deliver?</span>
            </div>
            <div className="space-y-2">
              {currentService.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q5: What must the client provide? */}
          <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>5. What must the client provide?</span>
            </div>
            <div className="space-y-2">
              {currentService.clientRequirements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="font-mono text-emerald-800 font-bold text-[11px] shrink-0">·</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Q4: How will the project be executed? */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>4. How will the project be executed? (Phased Lifecycle)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentService.processStages.map((stage, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                <span className="text-xs font-bold text-emerald-800 font-mono block mb-1">
                  Gate 0{idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{stage.phase}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Q6 & Q7: Support SLA & Next Steps */}
        <div className="p-6 bg-[#083321] text-white rounded-2xl border border-emerald-800/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>6. Training, Adoption & Managed SLA</span>
            </div>
            <p className="text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              {currentService.slaSupport}
            </p>
          </div>

          <div className="shrink-0 space-y-2 text-right">
            <span className="text-[11px] text-emerald-300 block uppercase tracking-wider font-semibold">
              7. Next Step:
            </span>
            <button
              onClick={() => onOpenConsultation(currentService.title)}
              className="px-6 py-2.5 text-xs font-bold text-[#083321] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Schedule Discovery Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Services FAQ Accordion */}
      <AccordionFAQ
        eyebrow="Practice & Delivery Inquiries"
        title="Frequently Asked Questions About Our Services"
        subtitle="Detailed insights into our Discovery audit, IP code ownership, NDPA 2023 compliance, and managed SLA support desk."
        items={SERVICES_FAQS}
        onOpenConsultation={() => onOpenConsultation(currentService.title)}
      />
    </div>
  );
};
