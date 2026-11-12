import React, { useState } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  Briefcase, 
  HeartHandshake, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  Layers,
  ShieldCheck,
  Check
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS_DATA, ASSET_IMAGES, SOLUTIONS_FAQS } from '../data/mockData';
import { AccordionFAQ } from '../components/AccordionFAQ';
import { IndustryType } from '../types';

interface SolutionsViewProps {
  onOpenConsultation: (service?: string) => void;
  onOpenHospitalityDemo: () => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({
  onOpenConsultation,
  onOpenHospitalityDemo,
}) => {
  const [activeIndustryId, setActiveIndustryId] = useState<IndustryType>('hospitality');

  const currentSolution = INDUSTRY_SOLUTIONS_DATA.find((sol) => sol.id === activeIndustryId) || INDUSTRY_SOLUTIONS_DATA[0];

  const getIndustryIcon = (id: IndustryType) => {
    switch (id) {
      case 'hospitality': return <Building2 className="w-4 h-4" />;
      case 'retail': return <ShoppingBag className="w-4 h-4" />;
      case 'corporate': return <Briefcase className="w-4 h-4" />;
      case 'ngo': return <HeartHandshake className="w-4 h-4" />;
      case 'education': return <GraduationCap className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
          Sector Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083321] tracking-tight">
          Industry-Specific Systems Architecture
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Generic software fails because it ignores domain-specific operational nuances. We build specialized platforms engineered for hospitality, retail, corporate governance, NGOs, and education.
        </p>
      </div>

      {/* Industry Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {INDUSTRY_SOLUTIONS_DATA.map((solution) => (
          <button
            key={solution.id}
            onClick={() => setActiveIndustryId(solution.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeIndustryId === solution.id
                ? 'bg-[#083321] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {getIndustryIcon(solution.id)}
            <span>{solution.name}</span>
          </button>
        ))}
      </div>

      {/* Main Solution Showcase */}
      <div className="bg-white rounded-3xl border border-emerald-950/15 shadow-xl p-6 sm:p-10 lg:p-12 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              {currentSolution.badgeTitle}
            </span>
            <h2 className="text-3xl font-extrabold text-[#083321] tracking-tight">
              {currentSolution.name}
            </h2>
            <p className="text-sm font-semibold text-emerald-900 mt-1 italic">
              "{currentSolution.tagline}"
            </p>
            <p className="text-base text-slate-700 mt-3 leading-relaxed max-w-2xl">
              {currentSolution.summary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {currentSolution.hasInteractiveDemo && (
              <button
                onClick={onOpenHospitalityDemo}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Test Live PMS Demo</span>
              </button>
            )}
            <button
              onClick={() => onOpenConsultation(`${currentSolution.name} Solution`)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#083321] hover:bg-[#0c472f] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Discuss {currentSolution.name.split(' ')[0]} Project</span>
            </button>
          </div>
        </div>

        {/* Visual Showcase if available */}
        {currentSolution.image && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/7] relative">
            <img
              src={currentSolution.image}
              alt={currentSolution.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <span className="text-xs font-bold text-white bg-[#083321]/90 px-3 py-1 rounded backdrop-blur-sm border border-emerald-500/30">
                Custom Systems Architecture
              </span>
            </div>
          </div>
        )}

        {/* Challenges & Core Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Challenges */}
          <div className="lg:col-span-5 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Specific Industry Challenges Solved
            </h4>
            <div className="space-y-3">
              {currentSolution.businessChallenges.map((ch, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{ch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Modules */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Engineered Modules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentSolution.coreModules.map((mod, mIdx) => (
                <div key={mIdx} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-700/30 transition-colors">
                  <h5 className="font-bold text-slate-900 text-sm mb-1">{mod.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integrations & Verified Proof */}
        <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block mb-1">
                Demonstrated Proof Benchmark
              </span>
              <p className="text-sm font-bold text-[#083321]">
                {currentSolution.demonstratedProof}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-semibold mr-1">Integrations:</span>
              {currentSolution.integrations.map((tool, tIdx) => (
                <span key={tIdx} className="px-2 py-0.5 text-[11px] font-mono bg-white text-slate-700 rounded border border-slate-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Solutions FAQ Accordion */}
      <AccordionFAQ
        eyebrow="Sector Integration FAQ"
        title="Frequently Asked Questions About Industry Solutions"
        subtitle="Addressing hospitality PMS sync, multi-branch POS reconciliation, offline-first sync, and local payment integration."
        items={SOLUTIONS_FAQS}
        onOpenConsultation={() => onOpenConsultation(`${currentSolution.name} Solution`)}
      />
    </div>
  );
};
