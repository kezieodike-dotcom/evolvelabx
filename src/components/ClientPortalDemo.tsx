import React, { useState } from 'react';
import { X, CheckCircle2, Clock, FileText, Users, ArrowUpRight, ShieldCheck, Download, ChevronRight, Filter } from 'lucide-react';
import { ConsultationSubmission } from '../types';

interface ClientPortalDemoProps {
  isOpen: boolean;
  onClose: () => void;
  leads: ConsultationSubmission[];
  onOpenConsultation: () => void;
}

export const ClientPortalDemo: React.FC<ClientPortalDemoProps> = ({
  isOpen,
  onClose,
  leads,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'leads' | 'documents'>('milestones');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Assigned' | 'Discovery Scheduled'>('All');

  if (!isOpen) return null;

  const demoMilestones = [
    {
      phase: '01. Discovery & Architecture Audit',
      status: 'Completed',
      date: 'Sprint 1 · 2 Weeks',
      deliverables: ['Stakeholder interview telemetry', 'Target ERD Schema blueprint', 'NDPA 2023 compliance audit'],
      lead: 'Lead Architect: B. Alabi',
    },
    {
      phase: '02. UI/UX & Interactive System Prototype',
      status: 'Completed',
      date: 'Sprint 2 · 2 Weeks',
      deliverables: ['High-fidelity interactive prototype', 'Payment gateway sandbox integration', 'RBAC permission matrix'],
      lead: 'Principal Designer: K. Okon',
    },
    {
      phase: '03. Core Software Engineering & API Pipelines',
      status: 'In Progress',
      date: 'Sprint 3–5 · Current Cycle',
      deliverables: ['PostgreSQL high-concurrency database', 'Automated document extraction service', 'CI/CD deployment pipeline'],
      lead: 'Senior Full-Stack Lead: O. Adeleke',
    },
    {
      phase: '04. Staff Training & SOP Workshop',
      status: 'Scheduled',
      date: 'Sprint 6 · Upcoming',
      deliverables: ['Role-specific video standard operating procedures', '3 on-site department bootcamps', 'User adoption scorecards'],
      lead: 'Enablement Lead: A. Danjuma',
    },
    {
      phase: '05. Production Handover & 24/7 SLA Support',
      status: 'Scheduled',
      date: 'Sprint 7 · Final Gate',
      deliverables: ['Zero-downtime cutover', '24/7 monitoring dashboard', '12-Month defect warranty agreement'],
      lead: 'Operations Director: E. Vance',
    },
  ];

  const filteredLeads = statusFilter === 'All' ? leads : leads.filter((l) => l.status === statusFilter || statusFilter === 'New');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full my-6 shadow-2xl border border-emerald-950/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-[#083321] text-white px-6 py-5 flex items-center justify-between border-b border-emerald-800/40 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                PRD Appendix B · Enterprise Client & Operations Portal Demo
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              EvolveLabX Client Command & Project Milestone Hub
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-navigation tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'milestones'
                  ? 'bg-white text-[#083321] shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Project Sprint Tracker
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'leads'
                  ? 'bg-white text-[#083321] shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Lead Dispatcher & CRM</span>
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-bold">
                {leads.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'documents'
                  ? 'bg-white text-[#083321] shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Document Vault & SLAs
            </button>
          </div>

          <span className="text-[11px] text-slate-500 hidden md:block">
            Simulated Enterprise Project: <strong>Amber Palms Resort PMS & Booking Engine</strong>
          </span>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto grow">
          {activeTab === 'milestones' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Active Project Velocity</h4>
                  <p className="text-xs text-emerald-800">
                    Phase 3 (Core Software Engineering) is 60% complete · On track for UAT deployment.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-700 block">TARGET COMPLETION</span>
                  <span className="text-sm font-bold text-emerald-950">14 Business Days</span>
                </div>
              </div>

              <div className="space-y-4">
                {demoMilestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          m.status === 'Completed'
                            ? 'bg-emerald-600'
                            : m.status === 'In Progress'
                            ? 'bg-amber-500 animate-pulse'
                            : 'bg-slate-300'
                        }`} />
                        <h5 className="font-bold text-slate-900 text-sm">{m.phase}</h5>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 font-mono">{m.date}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          m.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : m.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-500 font-semibold block">Key Deliverables:</span>
                        <div className="flex flex-wrap gap-2">
                          {m.deliverables.map((del, dIdx) => (
                            <span key={dIdx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-slate-500 italic shrink-0">{m.lead}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Commercial Inquiries & Lead Pipeline</h4>
                  <p className="text-xs text-slate-500">
                    Logged via website consultation forms with 1-business-day response SLA countdown.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="text-xs border border-slate-200 rounded px-2 py-1 bg-white"
                  >
                    <option value="All">All Inquiries</option>
                    <option value="New">New Submissions</option>
                    <option value="Assigned">Assigned to Partner</option>
                    <option value="Discovery Scheduled">Discovery Scheduled</option>
                  </select>
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl">
                  <p className="text-sm text-slate-500">No leads recorded in this filter view.</p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Lead / Company</th>
                        <th className="p-3">Service Interest</th>
                        <th className="p-3">Budget Range</th>
                        <th className="p-3">Date Requested</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3 font-mono font-bold text-emerald-800">{lead.id}</td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{lead.fullName}</span>
                            <span className="text-slate-500">{lead.companyName} ({lead.country})</span>
                          </td>
                          <td className="p-3 text-slate-700 max-w-xs truncate">{lead.serviceInterest}</td>
                          <td className="p-3 text-slate-600 font-mono">{lead.budgetRange}</td>
                          <td className="p-3 text-slate-600">{lead.preferredDate} · {lead.preferredTime}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Project Governance & Contracts</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Master Services Agreement (MSA)', size: '280 KB', type: 'Executed Legal Agreement' },
                  { title: 'Statement of Work: SOW-2026-081', size: '420 KB', type: 'Approved Architecture Scope' },
                  { title: 'NDPA 2023 Data Processing Addendum', size: '190 KB', type: 'Statutory Data Protection' },
                  { title: '99.98% High Availability SLA Guarantee', size: '150 KB', type: 'Operational SLA' },
                ].map((doc, dIdx) => (
                  <div key={dIdx} className="p-4 border border-slate-200 rounded-xl bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{doc.title}</span>
                        <span className="text-[11px] text-slate-500">{doc.type} · {doc.size}</span>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>End-to-end encrypted client telemetry · ISO 27001 aligned</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg"
          >
            Close Portal Demo
          </button>
        </div>
      </div>
    </div>
  );
};
