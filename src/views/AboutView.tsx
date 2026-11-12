import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Calendar, 
  ArrowRight, 
  Layers, 
  Users, 
  Sparkles,
  Building2,
  FileCheck
} from 'lucide-react';
import { APPROACH_STEPS, VERIFIED_PARTNERS } from '../data/mockData';

interface AboutViewProps {
  onOpenConsultation: () => void;
  onOpenCompanyProfile: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenConsultation,
  onOpenCompanyProfile,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
          Company Overview & Heritage
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083321] tracking-tight">
          We Advise, Build, Automate and Enable.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          EvolveLabX is the technology consulting, software engineering, and digital transformation arm of Evolve Limited. Headquartered in Lagos with international advisory reach, we help businesses bridge the gap between strategic vision and dependable technical execution.
        </p>
      </div>

      {/* Brand Identity & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 className="text-lg font-bold text-[#083321]">
            Business-First Problem Solving
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We never write code for the sake of code. Every system architecture, database schema, and automation workflow must tie directly to measurable revenue, margin expansion, or operational latency reduction.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h3 className="text-lg font-bold text-[#083321]">
            End-to-End Enablement
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike traditional web agencies that abandon clients post-launch, we train your employees, author video standard operating procedures (SOPs), and provide 24/7 managed support with strict 99.98% SLAs.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h3 className="text-lg font-bold text-[#083321]">
            Rigorous Governance & NDPA Compliance
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We engineer for compliance from day one. All client databases, transaction pipelines, and consumer records strictly comply with the Nigeria Data Protection Act 2023 and ISO 27001 data protection principles.
          </p>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            Our Delivery Discipline
          </span>
          <h2 className="text-3xl font-extrabold text-[#083321] tracking-tight">
            The 5-Gate Transformation Lifecycle
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A battle-tested methodology designed to eliminate scope creep and ensure zero adoption failure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {APPROACH_STEPS.map((step, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-800">GATE {step.step}</span>
              <h4 className="text-lg font-bold text-slate-900">{step.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-900 font-semibold">
                Deliverable: {step.deliverable}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Presence Map Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Regional & Global Footprint
          </span>
          <h3 className="text-2xl font-bold text-[#083321]">
            Dual Hub Presence: West Africa & International
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our engineering center is based in Lagos, providing deep contextual understanding of regional banking rails (Paystack, Flutterwave, Interswitch), local regulatory frameworks (NDPA 2023), and on-site corporate training capabilities.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Concurrently, our international advisory partners in London and North America ensure all architectures conform to world-class software engineering and security benchmarks.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onOpenCompanyProfile}
              className="px-5 py-2.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-emerald-800" />
              <span>Download Executive Capabilities Pack</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Lagos Technology Headquarters</h4>
                <p className="text-xs text-slate-500 mt-0.5">Victoria Island, Lagos State, Nigeria</p>
                <span className="text-[11px] text-emerald-800 font-medium block mt-2">
                  Specialization: On-site Discovery, Engineering, Corporate Training & Client SLAs
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">International Advisory Desk</h4>
                <p className="text-xs text-slate-500 mt-0.5">London, United Kingdom & Remote Engineering</p>
                <span className="text-[11px] text-emerald-800 font-medium block mt-2">
                  Specialization: Cloud Infrastructure, Security Pentesting & International Procurement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Intent CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#083321] text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">Ready to Discuss Your Organization's Next System?</h3>
          <p className="text-xs text-emerald-100/70 mt-1 max-w-xl">
            Schedule an executive discovery session. We evaluate your operational challenges and present a scoped roadmap within 48 hours.
          </p>
        </div>
        <button
          onClick={onOpenConsultation}
          className="px-6 py-3 text-xs font-bold text-[#083321] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          Book an Executive Consultation
        </button>
      </div>
    </div>
  );
};
