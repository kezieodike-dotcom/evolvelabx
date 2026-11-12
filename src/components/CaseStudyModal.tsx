import React from 'react';
import { X, CheckCircle2, ArrowRight, TrendingUp, Cpu, Building2, Quote } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenConsultation,
}) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-6 shadow-2xl border border-emerald-950/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#083321] text-white px-6 py-6 border-b border-emerald-800/40 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <span>{caseStudy.industryLabel}</span>
              <span>·</span>
              <span>{caseStudy.location}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white max-w-xl">
              {caseStudy.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
            {caseStudy.metrics.map((m, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                <div className="text-2xl font-bold font-mono text-[#083321]">
                  {m.value}
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Problem & Challenge */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              The Operational Bottleneck
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution Architecture */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              The EvolveLabX Solution & Architecture
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {caseStudy.solution}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold mr-1">Technologies Deployed:</span>
              {caseStudy.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono bg-emerald-950 text-emerald-300 rounded border border-emerald-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-5 bg-gradient-to-r from-emerald-950 to-[#083321] text-white rounded-xl relative overflow-hidden">
            <Quote className="w-10 h-10 text-emerald-800/40 absolute top-2 right-2" />
            <p className="text-sm italic leading-relaxed text-emerald-50 mb-3 relative z-10">
              "{caseStudy.testimonial.quote}"
            </p>
            <div className="relative z-10">
              <span className="font-bold text-white text-xs block">{caseStudy.testimonial.author}</span>
              <span className="text-emerald-300 text-[11px] block">{caseStudy.testimonial.role}</span>
            </div>
          </div>

          {/* Handover & SLA */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Implementation Duration: <strong>{caseStudy.duration}</strong></span>
            <span>Status: <strong>Active 24/7 Managed SLA</strong></span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Interested in replicating these outcomes for your organization?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Discuss a Similar Project</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
