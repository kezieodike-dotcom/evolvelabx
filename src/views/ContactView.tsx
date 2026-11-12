import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  Building2,
  Sparkles
} from 'lucide-react';
import { ConsultationSubmission } from '../types';
import { AccordionFAQ } from '../components/AccordionFAQ';
import { FAQS_DATA } from '../data/mockData';

interface ContactViewProps {
  onLeadSubmitted?: (lead: ConsultationSubmission) => void;
  onOpenCompanyProfile: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onLeadSubmitted,
  onOpenCompanyProfile,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    country: 'Nigeria',
    serviceInterest: 'Technology Consulting & Digital Transformation',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
          Direct Commercial Acquisition
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083321] tracking-tight">
          Contact Our Advisory & Engineering Team
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Schedule an executive technology consultation or submit a scoped project brief. Our senior partners evaluate technical feasibility and respond within one business day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Details & SLA commitment */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#083321] text-white border border-emerald-800/40 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Response Guarantee (PRD §1.2)
              </span>
              <h3 className="text-xl font-bold">1 Business Day Response SLA</h3>
              <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                90% of qualified consultation requests are acknowledged and assigned to a Lead Solutions Architect within one business day.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-900/80 space-y-4 text-xs text-emerald-100/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-sans text-sm">Lagos Technology Hub</strong>
                  <span>Victoria Island, Lagos State, Nigeria</span>
                  <span className="text-[11px] text-emerald-300 block mt-0.5">Focus: West Africa Operations, On-Site Bootcamps & Local Rail Integrations</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-sans text-sm">International Engineering Desk</strong>
                  <span>London, United Kingdom</span>
                  <span className="text-[11px] text-emerald-300 block mt-0.5">Focus: Global Architecture, Cloud Pentesting & Procurement</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <a href="mailto:advisory@evolvelabx.com" className="text-white hover:text-emerald-300 font-medium transition-colors">
                    advisory@evolvelabx.com
                  </a>
                  <span className="text-[11px] text-emerald-300 block">General Consulting & Project Briefs</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NDPA 2023 Compliant Handling</span>
              </div>
              <button
                type="button"
                onClick={onOpenCompanyProfile}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
              >
                Capabilities Deck →
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <span className="font-bold text-slate-900 block">Consultation Format Options</span>
            <p className="leading-relaxed">
              We offer both virtual conferences (via secure Google Meet with screen sharing for architecture walkthroughs) and on-site executive discovery sessions at client offices in Lagos or our Victoria Island center.
            </p>
          </div>
        </div>

        {/* Right Column: Embedded Lead Capture & Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-emerald-950/15 shadow-xl p-6 sm:p-10">
          {submittedLead ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3.5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-950">
                    Consultation Request Successfully Logged
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Reference Code: <span className="font-mono font-bold">{submittedLead.id}</span> · SLA: Acknowledged within 1 business day.
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
                  type="button"
                  onClick={handleDownloadICS}
                  className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-[#083321] bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-800" />
                  Add to Calendar (.ics)
                </button>
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  {copied ? 'Copied Confirmation' : 'Copy Reference Details'}
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSubmittedLead(null)}
                  className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                >
                  ← Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-3 mb-2">
                <h2 className="text-xl font-bold text-[#083321] tracking-tight">
                  Request an Executive Technology Consultation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your project requirements to be assigned to a Senior Solutions Architect.
                </p>
              </div>

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
                  placeholder="Describe your current software challenge, scale, or desired workflow automation..."
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
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        formData.meetingFormat === 'virtual'
                          ? 'border-emerald-700 bg-emerald-50 text-[#083321]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Virtual (Meet/Zoom)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, meetingFormat: 'onsite' })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        formData.meetingFormat === 'onsite'
                          ? 'border-emerald-700 bg-emerald-50 text-[#083321]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      On-Site (Lagos/HQ)
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
                    className="mt-0.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500 cursor-pointer"
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
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Submit Consultation Request</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Embedded FAQ */}
      <AccordionFAQ
        eyebrow="Consultation & Engagement FAQ"
        title="Frequently Asked Questions About Consultations"
        subtitle="What to prepare, confidentiality agreements, and how discovery calls are executed."
        items={FAQS_DATA}
      />
    </div>
  );
};
