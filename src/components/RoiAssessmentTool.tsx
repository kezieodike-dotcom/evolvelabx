import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Sparkles, Clock, TrendingUp, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RoiAssessmentToolProps {
  onScheduleWithAssessment: (summary: string, service: string) => void;
}

export const RoiAssessmentTool: React.FC<RoiAssessmentToolProps> = ({
  onScheduleWithAssessment,
}) => {
  const [industry, setIndustry] = useState<'hospitality' | 'retail' | 'corporate' | 'logistics' | 'education'>('hospitality');
  const [friction, setFriction] = useState<'spreadsheets' | 'legacy' | 'commissions' | 'approvals'>('commissions');
  const [teamSize, setTeamSize] = useState<'sme' | 'mid' | 'enterprise'>('mid');

  // Dynamic calculations based on industry & friction
  const getProjections = () => {
    let hours = 32;
    let latency = 65;
    let architecture = 'Custom Direct Booking Engine & Real-time PMS Synchronization';
    let service = 'Hospitality Technology & Direct Booking Engine';
    let timeline = '8–10 Weeks';

    if (industry === 'hospitality') {
      hours = teamSize === 'sme' ? 24 : teamSize === 'mid' ? 45 : 90;
      latency = 72;
      architecture = 'Direct Guest Booking Engine + Automated Room & POS Inventory Sync';
      service = 'Hospitality Technology & Guest Reservation Engine';
      timeline = '8–10 Weeks';
    } else if (industry === 'retail') {
      hours = teamSize === 'sme' ? 20 : teamSize === 'mid' ? 38 : 80;
      latency = 60;
      architecture = 'Event-Driven Omnichannel Inventory Broker & Paystack/Terminal Settlement Engine';
      service = 'Retail Omnichannel & Multi-Branch Inventory Sync';
      timeline = '10–12 Weeks';
    } else if (industry === 'corporate') {
      hours = teamSize === 'sme' ? 28 : teamSize === 'mid' ? 52 : 110;
      latency = 68;
      architecture = 'Digital Procurement Engine with Granular RBAC & Document OCR Pipelines';
      service = 'Enterprise ERP & Procurement Automation';
      timeline = '12–14 Weeks';
    } else if (industry === 'logistics') {
      hours = teamSize === 'sme' ? 30 : teamSize === 'mid' ? 55 : 120;
      latency = 75;
      architecture = 'Mobile Driver Proof-of-Delivery, GPS Waybill Verification & Fuel Telemetry';
      service = 'Software Engineering & Cloud Systems';
      timeline = '10–12 Weeks';
    } else {
      hours = teamSize === 'sme' ? 18 : teamSize === 'mid' ? 35 : 70;
      latency = 55;
      architecture = 'Student Portal, Automated CBT Online Examination & Tuition Settlement';
      service = 'Software Engineering & Cloud Systems';
      timeline = '8–10 Weeks';
    }

    return { hours, latency, architecture, service, timeline };
  };

  const projections = getProjections();

  const handleApplyToBooking = () => {
    const summary = `Assessment Summary: Industry: ${industry.toUpperCase()} (${teamSize.toUpperCase()}), Primary Friction: ${friction}. Target Architecture: ${projections.architecture}. Projected Latency Reduction: ${projections.latency}%.`;
    onScheduleWithAssessment(summary, projections.service);
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/15 shadow-xl p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold block mb-1">
            Interactive Operational Assessment
          </span>
          <h3 className="text-2xl font-extrabold text-[#083321] tracking-tight">
            Digital Transformation & Operational Readiness Estimator
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Simulate the operational efficiency impact of custom systems engineering and automated workflows for your organization.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Real-World Benchmark Telemetry</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left: Input Selection */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Industry */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              1. Select Industry Sector
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'hospitality', label: 'Hospitality & Hotels' },
                { id: 'retail', label: 'Retail & Distribution' },
                { id: 'corporate', label: 'Corporate & Finance' },
                { id: 'logistics', label: 'Fleet & Logistics' },
                { id: 'education', label: 'Higher Education' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndustry(item.id as any)}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border text-left transition-all ${
                    industry === item.id
                      ? 'border-[#083321] bg-[#083321] text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Core Friction */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              2. Primary Operational Friction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'commissions', label: 'High third-party commissions / OTA dependency' },
                { id: 'spreadsheets', label: 'Manual spreadsheet reconciliation & data re-entry' },
                { id: 'legacy', label: 'Outdated legacy software crashing under peak traffic' },
                { id: 'approvals', label: 'Slow internal procurement & invoice approval cycles' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFriction(item.id as any)}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border text-left transition-all ${
                    friction === item.id
                      ? 'border-emerald-700 bg-emerald-50 text-[#083321]'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Team Size */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              3. Operational Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sme', label: '10 – 40 Staff', sub: 'Growing SME' },
                { id: 'mid', label: '40 – 200 Staff', sub: 'Mid-Market' },
                { id: 'enterprise', label: '200+ Staff', sub: 'Large Enterprise' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTeamSize(item.id as any)}
                  className={`p-2.5 text-center rounded-lg border transition-all ${
                    teamSize === item.id
                      ? 'border-[#083321] bg-[#083321] text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-xs font-bold">{item.label}</span>
                  <span className={`text-[10px] block ${teamSize === item.id ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {item.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Benchmark Projection */}
        <div className="lg:col-span-5 bg-[#083321] text-white rounded-xl p-6 flex flex-col justify-between border border-emerald-800/40 shadow-inner">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Projected Impact Telemetry
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50">
                BENCHMARK ESTIMATE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-lg">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Time Reclaimed</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${industry}-${friction}-${teamSize}-hours`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold font-mono tracking-tight text-white"
                  >
                    ~{projections.hours} hrs<span className="text-xs text-emerald-300 font-sans font-normal"> / week</span>
                  </motion.div>
                </AnimatePresence>
                <p className="text-[10px] text-emerald-200/60 mt-0.5">Automated data pipelines & sync</p>
              </div>

              <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-lg">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Latency Reduction</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${industry}-${friction}-${teamSize}-latency`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold font-mono tracking-tight text-white"
                  >
                    -{projections.latency}%
                  </motion.div>
                </AnimatePresence>
                <p className="text-[10px] text-emerald-200/60 mt-0.5">Friction elimination</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/80 border border-emerald-800/80 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recommended Architecture</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={`${industry}-${friction}-${teamSize}-arch`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs text-white leading-relaxed font-medium"
                >
                  {projections.architecture}
                </motion.p>
              </AnimatePresence>
              <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-emerald-300/80">
                <span>Estimated Lifecycle:</span>
                <span className="font-mono text-emerald-200 font-semibold">{projections.timeline}</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleApplyToBooking}
              className="w-full py-3 px-4 text-xs font-semibold text-[#083321] bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Schedule Consultation With This Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-emerald-300/60 text-center mt-2">
              Pre-populates your discovery consultation with these architectural specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
