import React from 'react';
import { X, Download, ShieldCheck, CheckCircle2, Building2, Cpu, Globe, Award, Printer } from 'lucide-react';
import { TRUST_METRICS, VERIFIED_PARTNERS } from '../data/mockData';

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-6 shadow-2xl border border-emerald-950/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#083321] text-white px-6 py-5 flex items-center justify-between border-b border-emerald-800/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                PRD FR-09 · Corporate Capabilities Deck
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              EvolveLabX Company Profile & Procurement Statement
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors"
              title="Print Document"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800 text-sm">
          {/* Executive Overview */}
          <div className="border-b border-slate-200 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#083321]">
                  Evolve Limited (t/a EVOLVELABX)
                </h3>
                <p className="text-xs text-slate-500">
                  Headquarters: Victoria Island, Lagos, Nigeria · International Operations: London, UK
                </p>
              </div>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-semibold self-start">
                Enterprise Vendor Profile 2026/2027
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed text-sm">
              EvolveLabX is a premium technology consulting, software engineering, and AI automation firm serving mid-market corporations, boutique hospitality chains, logistics networks, and international institutions. We guide organizations through the complete lifecycle: <strong>Discover → Design → Build → Train → Improve</strong>.
            </p>
          </div>

          {/* Core Verified Metrics */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Demonstrated Delivery Benchmarks
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRUST_METRICS.map((metric, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xl font-bold font-mono text-[#083321]">{metric.value}</div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">{metric.label}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{metric.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Service Pillars */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Core Commercial Practices
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-emerald-900 block mb-1">01. Technology Consulting</span>
                <p className="text-xs text-slate-600">
                  Enterprise technology audits, legacy system migration roadmaps, vendor evaluations, and NDPA 2023 statutory compliance.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-emerald-900 block mb-1">02. Software Engineering</span>
                <p className="text-xs text-slate-600">
                  Custom high-concurrency web platforms, microservices APIs, PostgreSQL databases, and real-time inventory synchronization.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-emerald-900 block mb-1">03. AI & Workflow Automation</span>
                <p className="text-xs text-slate-600">
                  Intelligent document & invoice processing, automated approval queues, and multi-channel notification bots.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-emerald-900 block mb-1">04. Corporate Training & SLAs</span>
                <p className="text-xs text-slate-600">
                  Role-specific staff bootcamps, video standard operating procedures (SOPs), and 99.98% managed support desk agreements.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance & Certifications */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Compliance, Legal Standing & Security Governance</span>
            </div>
            <ul className="text-xs text-emerald-900 space-y-1 list-disc pl-5">
              <li>Statutory compliance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>.</li>
              <li>Enterprise data encryption: TLS 1.3 in-transit and AES-256 for all stored database records.</li>
              <li>ISO 27001 aligned software engineering and code review workflows.</li>
              <li>Standard Master Services Agreement (MSA) with 12-month defect warranty and client code ownership.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-mono">
            Document Reference: EVX-CORP-PROFILE-2026.PDF
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              Save / Print PDF
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg"
            >
              Request Formal Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
