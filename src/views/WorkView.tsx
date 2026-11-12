import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  Building2,
  Filter
} from 'lucide-react';
import { CASE_STUDIES_DATA } from '../data/mockData';
import { CaseStudy } from '../types';

interface WorkViewProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenConsultation: () => void;
}

export const WorkView: React.FC<WorkViewProps> = ({
  onSelectCaseStudy,
  onOpenConsultation,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredStudies = filter === 'all' 
    ? CASE_STUDIES_DATA 
    : CASE_STUDIES_DATA.filter((s) => s.industry === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
          Verified Evidence
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083321] tracking-tight">
          Case Studies & Quantified Client Outcomes
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Every project is backed by verified business outcomes. We do not publish speculative mockups as completed work; these are audited deployments delivering real commercial impact.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'all', label: 'All Deployments' },
          { id: 'hospitality', label: 'Hospitality & Resorts' },
          { id: 'logistics', label: 'Supply Chain & Logistics' },
          { id: 'retail', label: 'Retail & Omnichannel' },
          { id: 'ngo', label: 'NGOs & Healthcare' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === tab.id
                ? 'bg-[#083321] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            onClick={() => onSelectCaseStudy(study)}
            className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-700/50 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-emerald-800">
                  {study.industryLabel} · {study.location}
                </span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 group-hover:text-emerald-800">
                  Case Details <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#083321] mb-3 leading-snug group-hover:text-emerald-900">
                {study.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {study.summary}
              </p>

              {/* Quantified Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 mb-6">
                {study.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-[#083321]">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {study.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 text-[11px] font-mono bg-slate-100 text-slate-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="italic">"{study.testimonial.quote.slice(0, 60)}..."</span>
              <span className="font-bold text-slate-800 shrink-0 ml-2">{study.client}</span>
            </div>
          </div>
        ))}
      </div>

      {/* High-Intent Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-[#083321]">
          Need Custom Technology Architecture For Your Organization?
        </h3>
        <p className="text-sm text-slate-600">
          We conduct a thorough discovery audit, construct a vendor-neutral architecture blueprint, and provide transparent implementation milestones.
        </p>
        <button
          onClick={onOpenConsultation}
          className="px-6 py-3 text-xs font-bold text-white bg-[#083321] hover:bg-[#0c472f] rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
        >
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Book an Architecture Consultation</span>
        </button>
      </div>
    </div>
  );
};
