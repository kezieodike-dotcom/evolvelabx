import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Shield, Globe, ArrowRight, Download, Copy, Check } from 'lucide-react';
import { ConsultationSubmission } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSubmitted?: (lead: ConsultationSubmission) => void;
  initialService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onLeadSubmitted,
  initialService = 'Technology Consulting & Digital Transformation',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    country: 'Nigeria',
    serviceInterest: initialService,
    projectSummary: '',
    budgetRange: '$15,000 – $50,000 (₦22.5M – ₦75M)',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '11:00 AM',
    timeZone: 'WAT (West Africa Time / Lagos GMT+1)',
    meetingFormat: 'virtual' as 'virtual' | 'onsite',
    consentAccepted: false,
  });

  const [submittedLead, setSubmittedLead] = useState<ConsultationSubmission | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.businessEmail.trim() || !formData.businessEmail.includes('@') || !formData.businessEmail.includes('.')) {
      errs.businessEmail = 'Please provide a valid business email address';
    }
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.projectSummary.trim() || formData.projectSummary.length < 15) {
      errs.projectSummary = 'Please provide a brief summary of the business challenge (minimum 15 characters)';
    }
    if (!formData.consentAccepted) {
      errs.consentAccepted = 'Consent is required under the Nigeria Data Protection Act (NDPA 2023)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const refNumber = Math.floor(1000 + Math.random() * 9000);
    const newLead: ConsultationSubmission = {
      id: `EVX-2026-${refNumber}`,
      ...formData,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'New',
    };

    setSubmittedLead(newLead);
    if (onLeadSubmitted) {
      onLeadSubmitted(newLead);
    }
  };

  const handleDownloadICS = () => {
    if (!submittedLead) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EvolveLabX//Consultation Scheduler//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
SUMMARY:EvolveLabX Technology Consultation (${submittedLead.serviceInterest})
DESCRIPTION:Executive technology consultation with EvolveLabX Advisory.\\nReference: ${submittedLead.id}\\nProject: ${submittedLead.projectSummary}\\nMeeting Format: ${submittedLead.meetingFormat === 'virtual' ? 'Virtual Video Conference (Google Meet Link to follow)' : 'Executive On-Site Session'}
STATUS:CONFIRMED
LOCATION:${submittedLead.meetingFormat === 'virtual' ? 'Google Meet Video Call' : 'Client Office / EvolveLabX Lagos Hub'}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `EvolveLabX_Consultation_${submittedLead.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyDetails = () => {
    if (!submittedLead) return;
    const text = `EvolveLabX Consultation Confirmation
Reference ID: ${submittedLead.id}
Client: ${submittedLead.fullName} (${submittedLead.companyName})
Service: ${submittedLead.serviceInterest}
Requested Date: ${submittedLead.preferredDate} at ${submittedLead.preferredTime} (${submittedLead.timeZone})
Guaranteed SLA: Acknowledged within 1 business day`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl border border-emerald-950/15 overflow-hidden">
        {/* Header */}
        <div className="bg-[#083321] text-white px-6 py-5 flex items-center justify-between border-b border-emerald-800/40">
          <div>
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">
              Direct Commercial Acquisition
            </div>
            <h2 className="text-xl font-bold tracking-tight">Book an Executive Consultation</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedLead ? (
          /* Confirmation Screen conforming to PRD 1.2 & 6.3 */
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3.5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-950">
                  Consultation Request Successfully Logged
                </h3>
                <p className="text-xs text-emerald-800">
                  Reference Code: <span className="font-mono font-bold">{submittedLead.id}</span> · SLA Response: Guaranteed acknowledgement within 1 business day.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 space-y-3.5 bg-slate-50/60 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Lead Principal</span>
                  <span className="font-semibold text-slate-900">{submittedLead.fullName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Organization</span>
                  <span className="font-semibold text-slate-900">{submittedLead.companyName} ({submittedLead.country})</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Service Focus</span>
                  <span className="font-semibold text-slate-900">{submittedLead.serviceInterest}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Proposed Date & Time</span>
                  <span className="font-semibold text-slate-900">{submittedLead.preferredDate} · {submittedLead.preferredTime}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                <span className="text-slate-500 block mb-1">Time Zone & Format:</span>
                <span>{submittedLead.timeZone} · {submittedLead.meetingFormat === 'virtual' ? 'Virtual Video Conference (Google Meet link dispatched upon assignment)' : 'Executive On-site Session'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleDownloadICS}
                className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-[#083321] bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-800" />
                Add to Calendar (.ics)
              </button>
              <button
                onClick={handleCopyDetails}
                className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                {copied ? 'Copied Confirmation' : 'Copy Reference Details'}
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Assigned directly to Senior Advisory Partner</span>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Lead Capture Form */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
            <p className="text-xs text-slate-600">
              Speak directly with an enterprise technology consultant. We evaluate your business challenge, define technical feasibility, and present an actionable transformation roadmap.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Babatunde Williams"
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  } focus:outline-none focus:border-emerald-600`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-600 mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  value={formData.businessEmail}
                  onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  placeholder="bwilliams@company.com"
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.businessEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  } focus:outline-none focus:border-emerald-600`}
                />
                {errors.businessEmail && <p className="text-[11px] text-rose-600 mt-0.5">{errors.businessEmail}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Amber Hospitality Group"
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.companyName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  } focus:outline-none focus:border-emerald-600`}
                />
                {errors.companyName && <p className="text-[11px] text-rose-600 mt-0.5">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Primary Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-600"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Canada">Canada</option>
                  <option value="Other International">Other International</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Primary Service or Solution of Interest
              </label>
              <select
                value={formData.serviceInterest}
                onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="Technology Consulting & Digital Transformation">Technology Consulting & Digital Transformation</option>
                <option value="Software Engineering & Cloud Platforms">Software Engineering & Custom Web Platforms</option>
                <option value="AI & Workflow Automation">AI & Workflow Automation Pipelines</option>
                <option value="Corporate Technology Training & Staff Enablement">Corporate Technology Training & Staff Enablement</option>
                <option value="Hospitality Technology & Guest Reservation Engine">Hospitality Technology (Hotel PMS & Direct Booking)</option>
                <option value="Retail Omnichannel & Multi-Branch Inventory Sync">Retail Omnichannel & Inventory Sync</option>
                <option value="Enterprise ERP & Procurement Automation">Enterprise ERP & Procurement Automation</option>
                <option value="NGO Field Data & Grant Compliance Portal">NGO Field Data & Grant Compliance Portal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Project Summary & Business Bottleneck *
              </label>
              <textarea
                rows={3}
                value={formData.projectSummary}
                onChange={(e) => setFormData({ ...formData, projectSummary: e.target.value })}
                placeholder="Briefly describe what your organization aims to build, automate, or resolve (e.g. manual inventory reconciliation across 4 store branches taking 15 hours weekly)..."
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.projectSummary ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                } focus:outline-none focus:border-emerald-600`}
              />
              {errors.projectSummary && <p className="text-[11px] text-rose-600 mt-0.5">{errors.projectSummary}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Estimated Project Budget Range
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-600"
                >
                  <option value="$5,000 – $15,000 (₦7.5M – ₦22.5M)">$5,000 – $15,000 (₦7.5M – ₦22.5M)</option>
                  <option value="$15,000 – $50,000 (₦22.5M – ₦75M)">$15,000 – $50,000 (₦22.5M – ₦75M)</option>
                  <option value="$50,000 – $150,000+ (₦75M – ₦225M+)">$50,000 – $150,000+ (₦75M – ₦225M+)</option>
                  <option value="To be scoped during discovery">To be scoped during discovery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Meeting Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, meetingFormat: 'virtual' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                      formData.meetingFormat === 'virtual'
                        ? 'border-emerald-700 bg-emerald-50 text-[#083321]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Virtual (Meet / Zoom)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, meetingFormat: 'onsite' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                      formData.meetingFormat === 'onsite'
                        ? 'border-emerald-700 bg-emerald-50 text-[#083321]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    On-Site (Lagos / HQ)
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Proposed Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Time Zone
                </label>
                <select
                  value={formData.timeZone}
                  onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                >
                  <option value="WAT (West Africa Time / Lagos GMT+1)">WAT (Lagos GMT+1)</option>
                  <option value="GMT / UTC (London)">GMT / UTC (London)</option>
                  <option value="EST (US Eastern)">EST (US Eastern)</option>
                </select>
              </div>
            </div>

            {/* NDPA 2023 Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAccepted}
                  onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I agree to allow EvolveLabX to process these details for the purpose of scheduling a commercial technology consultation in accordance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>.
                </span>
              </label>
              {errors.consentAccepted && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.consentAccepted}</p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Guaranteed response within 1 business day
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg shadow-sm flex items-center gap-2 transition-colors"
              >
                <span>Submit Consultation Request</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
