import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Mail, MapPin, Phone, Lock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
  onOpenCompanyProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenConsultation,
  onOpenCompanyProfile,
}) => {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [briefEmail, setBriefEmail] = useState('');
  const [legalModal, setLegalModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (briefEmail.includes('@') && briefEmail.includes('.')) {
      setEmailSubscribed(true);
      setBriefEmail('');
    }
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#041a11] text-emerald-100/80 border-t border-emerald-900/40">
        {/* Top executive strip */}
        <div className="border-b border-emerald-900/30 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  EX
                </div>
                <span className="text-xl font-bold tracking-tight text-white">EVOLVELABX</span>
              </div>
              <p className="text-sm text-emerald-200/70 max-w-xl">
                Technology Consulting · Software Engineering · AI Automation · Corporate Training. We advise, build, automate and enable.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenCompanyProfile}
                className="px-4 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-lg transition-colors whitespace-nowrap"
              >
                Download Capabilities Deck
              </button>
              <button
                onClick={onOpenConsultation}
                className="px-5 py-2 text-xs font-semibold text-[#041a11] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Directory */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Col 1: Presence & Compliance */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Operational Presence
              </h4>
              <div className="space-y-3 text-sm text-emerald-100/70">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Lagos Technology Hub</span>
                    <span>Victoria Island, Lagos State, Nigeria</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">International Engineering Desk</span>
                    <span>London, United Kingdom & Remote Global Operations</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:advisory@evolvelabx.com" className="hover:text-emerald-300 transition-colors">
                    advisory@evolvelabx.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-900/40">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nigeria Data Protection Act (NDPA) 2023 Compliant</span>
                </div>
                <p className="text-[11px] text-emerald-200/50 mt-1 leading-relaxed">
                  All enterprise telemetry, customer databases, and consulting briefs are governed under strict cryptographic encryption and NDPA statutory oversight.
                </p>
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-4">
                Core Services
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors text-left">
                    Technology Consulting
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors text-left">
                    Software Engineering
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors text-left">
                    AI & Workflow Automation
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors text-left">
                    Corporate Tech Training
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors text-left">
                    Managed Infrastructure SLAs
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors text-left text-emerald-400 font-semibold">
                    Contact Advisory Desk →
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Industry Solutions */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-4">
                Industry Solutions
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-white transition-colors text-left">
                    Hospitality & Resorts
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-white transition-colors text-left">
                    Retail & Omnichannel
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-white transition-colors text-left">
                    Corporate & Enterprise
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-white transition-colors text-left">
                    Logistics & Supply Chain
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-white transition-colors text-left">
                    NGOs & Development
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('solutions')} className="hover:text-white transition-colors text-left">
                    Higher Education
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Executive Briefing Newsletter */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                Executive Briefing
              </h4>
              <p className="text-xs text-emerald-200/70 mb-3 leading-relaxed">
                Bi-weekly dispatch on enterprise systems, automation roadmaps, and African tech governance.
              </p>
              {emailSubscribed ? (
                <div className="p-3 bg-emerald-900/40 border border-emerald-700/50 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed. You will receive our next quarterly advisory brief.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={briefEmail}
                    onChange={(e) => setBriefEmail(e.target.value)}
                    placeholder="Work email address"
                    required
                    className="w-full px-3 py-2 text-xs bg-emerald-950/80 border border-emerald-800/80 rounded-lg text-white placeholder-emerald-400/40 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 text-xs font-semibold text-[#041a11] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    Subscribe to Briefing
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar: Copyright, legal notices, SLA acknowledgement */}
          <div className="pt-12 mt-12 border-t border-emerald-900/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
            <div>
              © 2026 EVOLVELABX · Evolve Limited (Nigeria & Global Operations). All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button onClick={() => setLegalModal('privacy')} className="hover:text-emerald-200 transition-colors">
                Privacy Policy & NDPA
              </button>
              <button onClick={() => setLegalModal('terms')} className="hover:text-emerald-200 transition-colors">
                Terms of Engagement
              </button>
              <button onClick={() => setLegalModal('sla')} className="hover:text-emerald-200 transition-colors">
                SLA & Availability Targets
              </button>
              <button onClick={() => setLegalModal('cookies')} className="hover:text-emerald-200 transition-colors">
                Data Minimization
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Dialog Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 text-slate-800 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#083321]">
                {legalModal === 'privacy' && 'Privacy Policy & Nigeria Data Protection Act (NDPA 2023)'}
                {legalModal === 'terms' && 'Terms of Engagement & Master Services Agreement (MSA)'}
                {legalModal === 'sla' && 'Service Level Agreement (SLA) & Uptime Commitments'}
                {legalModal === 'cookies' && 'Data Minimization & Analytics Policy'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-sm text-slate-600 leading-relaxed">
              {legalModal === 'privacy' && (
                <>
                  <p>
                    EvolveLabX and Evolve Limited operate in strict compliance with the Nigeria Data Protection Act 2023 (NDPA). We act as both a Data Controller for direct prospective client inquiries and a Data Processor when building and operating custom database software for our clients.
                  </p>
                  <p className="font-semibold text-slate-800">Key Privacy Commitments:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Data Minimization: We collect only the information required to evaluate and respond to technology briefs (name, company, business email, and requirements).</li>
                    <li>End-to-End Encryption: All consultation submissions and stored database records use TLS 1.3 in transit and AES-256 encryption at rest.</li>
                    <li>No Third-Party Monetization: We never sell, lease, or monetize client enquiry data to advertising networks.</li>
                    <li>Subject Rights: Any party may request data rectification, export, or statutory erasure by writing to compliance@evolvelabx.com.</li>
                  </ul>
                </>
              )}

              {legalModal === 'terms' && (
                <>
                  <p>
                    All commercial technology consulting, software engineering, and automation deliverables provided by EvolveLabX are governed by formalized Statements of Work (SOW) executed under our standard Master Services Agreement (MSA).
                  </p>
                  <p className="font-semibold text-slate-800">Engagement Framework:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Intellectual Property: Upon full payment, the client receives exclusive, irrevocable ownership of custom application source code and bespoke architectural models.</li>
                    <li>Staged Delivery Gates: Every project operates with gate approvals: Discover → Design Prototype → Build Sprint → UAT/Train → Handover.</li>
                    <li>Warranty & Security: Custom codebases include a standard 12-month defect warranty covering any deviations from approved technical specifications.</li>
                  </ul>
                </>
              )}

              {legalModal === 'sla' && (
                <>
                  <p>
                    For clients with active Managed Support agreements, EvolveLabX guarantees the following target service levels:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Target System Availability: 99.98% monthly uptime for containerized cloud deployments.</li>
                    <li>Enquiry Response Time: 90% of qualified consultation requests acknowledged within one business day.</li>
                    <li>Severity-1 Incident Response: Within 60 minutes for mission-critical production outages.</li>
                    <li>Automated Daily Snapshots: 30-day point-in-time database recovery across geo-redundant storage.</li>
                  </ul>
                </>
              )}

              {legalModal === 'cookies' && (
                <>
                  <p>
                    EvolveLabX enforces a privacy-first web architecture. We do not use third-party behavioral ad trackers or cross-site fingerprinting cookies.
                  </p>
                  <p>
                    Essential cookies are used solely to preserve session state (such as theme preferences and submitted lead progress), and anonymous aggregate analytics are recorded strictly to measure page latency and Core Web Vitals.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
