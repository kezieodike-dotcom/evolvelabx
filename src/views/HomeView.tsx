import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Cpu, 
  Layers, 
  GraduationCap, 
  Calendar, 
  ArrowUpRight, 
  ChevronRight,
  TrendingUp,
  Clock,
  Laptop,
  Check,
  FileCheck,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ASSET_IMAGES, 
  SERVICES_DATA, 
  INDUSTRY_SOLUTIONS_DATA, 
  CASE_STUDIES_DATA, 
  INSIGHTS_DATA, 
  TRUST_METRICS, 
  APPROACH_STEPS,
  VERIFIED_PARTNERS 
} from '../data/mockData';
import { RoiAssessmentTool } from '../components/RoiAssessmentTool';
import { CaseStudy, InsightArticle } from '../types';

interface HomeViewProps {
  onOpenConsultation: (service?: string, summary?: string) => void;
  onOpenHospitalityDemo: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onSelectArticle: (article: InsightArticle) => void;
  setActiveTab: (tab: string) => void;
  onOpenCompanyProfile: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenConsultation,
  onOpenHospitalityDemo,
  onSelectCaseStudy,
  onSelectArticle,
  setActiveTab,
  onOpenCompanyProfile,
}) => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activeService = SERVICES_DATA[activePillarIndex];

  // Motion animation presets
  const fadeInUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Hero Section conforming to PRD Section 5.1 with fluid, premium motion */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white">
        {/* Ambient subtle decorative light meshes */}
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none animate-pulse" 
          style={{ animationDuration: '8s' }} 
        />
        <div 
          className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none animate-pulse" 
          style={{ animationDuration: '10s', animationDelay: '2s' }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (PRD Section 5.1) */}
            <motion.div 
              variants={containerStagger}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6"
            >
              {/* Eyebrow: Unboxed text with typographic separators */}
              <motion.div 
                variants={fadeInUp}
                custom={0}
                className="text-xs sm:text-sm font-bold tracking-widest text-emerald-800 uppercase flex items-center gap-2"
              >
                <span>TECHNOLOGY CONSULTING</span>
                <span aria-hidden="true" className="text-emerald-500">·</span>
                <span>SOFTWARE ENGINEERING</span>
                <span aria-hidden="true" className="text-emerald-500">·</span>
                <span>AI AUTOMATION</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                variants={fadeInUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#083321] leading-[1.1] max-w-2xl"
              >
                Build a Smarter Business With Technology.
              </motion.h1>

              {/* Supporting Text */}
              <motion.p 
                variants={fadeInUp}
                custom={2}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal"
              >
                We help organizations modernize operations, build connected digital systems, automate workflows and equip teams to use technology with confidence.
              </motion.p>

              {/* Dual CTAs (Single primary + secondary) */}
              <motion.div 
                variants={fadeInUp}
                custom={3}
                className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenConsultation()}
                  className="px-7 py-3.5 text-sm font-bold text-white bg-[#083321] hover:bg-[#0c472f] active:bg-[#062417] rounded-xl transition-colors shadow-md hover:shadow-emerald-950/20 flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('solutions')}
                  className="px-6 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs cursor-pointer"
                >
                  <span>Explore Our Solutions</span>
                </motion.button>
              </motion.div>

              {/* Regional Credibility & NDPA badge adjacent to hero */}
              <motion.div 
                variants={fadeInUp}
                custom={4}
                className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600"
              >
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>NDPA 2023 Compliant</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Guaranteed 1-Day Inquiry Response</span>
                </div>
                <div className="text-slate-500">
                  Dual Presence: Lagos & Global Desks
                </div>
              </motion.div>
            </motion.div>

            {/* Right Hero Visual Card with Smooth Ingress & Floating Badges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative group"
            >
              <div className="relative rounded-2xl overflow-hidden border border-emerald-900/15 shadow-2xl bg-slate-900 aspect-[16/10] sm:aspect-[16/11]">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="EvolveLabX modern executive technology headquarters and boardroom"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041a11]/90 via-[#041a11]/25 to-transparent pointer-events-none" />

                {/* Quantitative proof card embedded on image with smooth float */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  whileHover={{ y: -3 }}
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl text-slate-900 transition-shadow"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-[#083321] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Verified Impact Telemetry
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                      99.98% SLA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-extrabold font-mono text-slate-900">₦2.4B+</div>
                      <div className="text-[11px] text-slate-500">Processed Transaction Flow</div>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <div className="text-xl font-extrabold font-mono text-emerald-800">-68%</div>
                      <div className="text-[11px] text-slate-500">Process Latency Reduction</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Trust and Verified Partner Strip */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                Trust & Institutional Compliance
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Verified compliance standards and enterprise technological ecosystem credentials.
              </p>
            </div>
            <motion.button
              whileHover={{ x: 2 }}
              onClick={onOpenCompanyProfile}
              className="text-xs font-bold text-[#083321] hover:text-emerald-700 flex items-center gap-1 self-start md:self-auto cursor-pointer"
            >
              <span>Download Executive Capabilities Pack</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-1">
            {VERIFIED_PARTNERS.map((partner, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-emerald-600/30 transition-colors"
              >
                <span className="text-xs font-bold text-slate-900 block truncate">{partner.name}</span>
                <span className="text-[11px] text-emerald-800 font-medium block mt-0.5">{partner.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. What We Do: The 4 Core Pillars (PRD Section 5.2 & Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4 mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            What We Do
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#083321] tracking-tight">
              Four Specialized Practices. One Integrated Transformation Journey.
            </h2>
            <p className="text-sm text-slate-600 max-w-md">
              We eliminate the friction between strategy and code by combining business advisory, engineering, workflow automation, and staff training.
            </p>
          </div>
        </motion.div>

        {/* Interactive Pillar Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {SERVICES_DATA.map((service, index) => (
            <motion.button
              key={service.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePillarIndex(index)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                activePillarIndex === index
                  ? 'bg-[#083321] text-white border-[#083321] shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={`text-xs font-mono font-bold block mb-1 ${activePillarIndex === index ? 'text-emerald-400' : 'text-emerald-800'}`}>
                {service.number}
              </span>
              <h3 className="font-bold text-sm sm:text-base leading-snug">
                {service.title.split('&')[0]}
              </h3>
            </motion.button>
          ))}
        </div>

        {/* Active Pillar Deep Card with Smooth Cross-Fade Animation */}
        <div className="bg-white rounded-2xl border border-emerald-950/15 shadow-xl p-6 sm:p-8 lg:p-10 min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    Practice {activeService.number}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#083321] tracking-tight">
                    {activeService.title}
                  </h3>
                  <p className="text-base text-slate-700 mt-2 leading-relaxed font-normal">
                    {activeService.fullDesc}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                    Core Enterprise Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.deliverables.map((item, dIdx) => (
                      <motion.div 
                        key={dIdx} 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: dIdx * 0.05 + 0.1 }}
                        className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/80"
                      >
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Target Audience */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Built Specifically For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeService.targetAudience.map((aud, aIdx) => (
                      <span key={aIdx} className="text-xs text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenConsultation(activeService.title)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Request {activeService.title.split('&')[0]} Advisory</span>
                  </motion.button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    View Full Practice Details →
                  </button>
                </div>
              </div>

              {/* Right: Process & Guarantee */}
              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Execution Lifecycle
                </span>
                <div className="space-y-3">
                  {activeService.processStages.map((stage, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{stage.phase}</span>
                        <span className="text-[11px] text-slate-600 block leading-relaxed">{stage.description}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">SLA Commitment:</span>
                  <span className="text-xs font-bold text-[#083321] block mt-0.5">{activeService.slaSupport}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Business Challenges We Solve (PRD Section 5.2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#083321] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-emerald-800/40 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-12 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
              Operational Realities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              We Solve the Costly Frictions That Hold Growing Organizations Back.
            </h2>
            <p className="text-base text-emerald-100/70 mt-3 leading-relaxed">
              Software shouldn't create new burdens. We target the root causes of operational stagnation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              {
                title: 'Manual Workflows & Data Re-entry',
                desc: 'Teams losing 20–40 hours each week copying data between spreadsheets, emails, and disconnected desktop tools.',
                fix: 'Automated event-driven sync & intelligent document processing.',
              },
              {
                title: 'Outdated & Vulnerable Legacy Software',
                desc: 'Old internal platforms crashing during peak sales periods, risking security breaches and NDPA non-compliance penalties.',
                fix: 'Modern cloud architectures, PostgreSQL databases, and RBAC.',
              },
              {
                title: 'High Third-Party Fees & Intermediaries',
                desc: 'Hotels and retailers losing 15–25% in commissions to OTAs and third-party marketplaces due to poor direct experiences.',
                fix: 'High-conversion direct booking engines & instant payment rails.',
              },
              {
                title: 'Employee Resistance & Failed Adoption',
                desc: 'Expensive software investments abandoned within months because staff were handed dense manuals without proper training.',
                fix: 'Hands-on corporate bootcamps & bite-sized video SOPs.',
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-6 bg-emerald-950/70 border border-emerald-800/60 rounded-2xl flex flex-col justify-between hover:border-emerald-500/60 transition-colors"
              >
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-2">
                    0{idx + 1}. CHALLENGE
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-900/80">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                    EvolveLabX Solution:
                  </span>
                  <span className="text-xs font-medium text-emerald-200 block">
                    {item.fix}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. Interactive ROI & Operational Readiness Tool */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <RoiAssessmentTool
          onScheduleWithAssessment={(summary, service) => {
            onOpenConsultation(service, summary);
          }}
        />
      </motion.section>

      {/* 6. Industry Spotlight: Hospitality Technology (PRD Section 7.5 & Image Showcase) */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl border border-emerald-950/15 overflow-hidden bg-white shadow-xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Image Column */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={ASSET_IMAGES.hospitality}
                alt="Luxury boutique resort reception and guest lounge with sleek digital tablet terminal"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-emerald-900 rounded-md text-xs font-bold border border-emerald-200 shadow-sm">
                  Hospitality Industry Spotlight
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Sector Engineering
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#083321] tracking-tight">
                  Hospitality Technology & Direct Booking Systems
                </h3>
                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Boutique hotels and resort operators in Nigeria and internationally lose millions to 20%+ OTA commissions. We build custom direct reservation engines integrated with property management systems (PMS), housekeeping workflows, and local payment rails.
                </p>

                <div className="mt-5 space-y-2.5">
                  {[
                    'Direct booking engine with instant Paystack/Flutterwave/Card settlement',
                    'Real-time room inventory synchronization to eliminate double bookings',
                    'Housekeeping and maintenance mobile dispatch interface',
                    'Contactless digital folio & express check-out concierge',
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                  <span className="font-bold">Verified Proof:</span> Amber Palms Luxury Resort achieved a <strong>+142% increase in direct bookings</strong> and saved ₦48M in commissions in year one.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenHospitalityDemo}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Launch Live PMS Demonstrator</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenConsultation('Hospitality Technology & Guest Reservation Engine')}
                  className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Schedule Hotel Consultation
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. Our 5-Phase Approach (PRD Section 5.2 #6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
            The EvolveLabX Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#083321] tracking-tight">
            Discover. Design. Build. Train. Improve.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            We don't just develop technology. We help businesses implement it, adopt it, and create lasting commercial value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {APPROACH_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black font-mono text-emerald-800 block mb-1">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{step.name}</h3>
                <p className="text-xs text-slate-500 font-medium italic mb-3">
                  "{step.tagline}"
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px]">
                <span className="text-slate-500 block font-semibold mb-0.5">Key Deliverable:</span>
                <span className="text-emerald-900 font-medium block leading-snug">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. Selected Verified Work (PRD Section 5.2 #7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Demonstrated Capability
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#083321] tracking-tight">
              Selected Verified Projects & Deployments
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('work')}
            className="text-xs font-bold text-[#083321] hover:text-emerald-700 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASE_STUDIES_DATA.slice(0, 2).map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => onSelectCaseStudy(study)}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-800/40 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="text-xs font-semibold text-emerald-800">
                    {study.industryLabel} · {study.location}
                  </div>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1 group-hover:text-emerald-800">
                    Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#083321] mb-2 leading-snug group-hover:text-emerald-900 transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {study.summary}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 mb-4">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-lg font-bold font-mono text-[#083321]">{m.value}</div>
                      <div className="text-[10px] text-slate-600 font-medium leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="italic">"{study.testimonial.quote.slice(0, 65)}..."</span>
                <span className="font-semibold text-slate-800 shrink-0 ml-2">{study.client}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. Latest Insights / Technology Resources (PRD Section 5.2 #8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Thought Leadership & Guides
            </span>
            <h2 className="text-3xl font-extrabold text-[#083321] tracking-tight">
              Practical Insights for Business & Technology Leaders
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('insights')}
            className="text-xs font-bold text-[#083321] hover:text-emerald-700 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>Explore All 6 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS_DATA.slice(0, 3).map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => onSelectArticle(article)}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-700/40 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-emerald-800">{article.category}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#083321] mb-2 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-900 font-semibold">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. High-Intent Final CTA Section (PRD Appendix A & Section 5.2 #9) */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-gradient-to-br from-[#083321] via-[#05291a] to-[#041a11] text-white rounded-3xl p-8 sm:p-14 lg:p-16 border border-emerald-800/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle radial emerald background accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Direct Senior Advisory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let's Build Something That Works for Your Business.
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/70 leading-relaxed font-normal">
              Let's solve the business challenge behind your next technology project. Guaranteed executive response within one business day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0 relative z-10">
            <motion.button
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold text-[#083321] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#083321]" />
              <span>Book a Consultation</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCompanyProfile}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-white bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-emerald-300" />
              <span>Capabilities Statement</span>
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
