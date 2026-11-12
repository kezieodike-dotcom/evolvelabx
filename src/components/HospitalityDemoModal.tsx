import React, { useState } from 'react';
import { X, BedDouble, CheckCircle2, RefreshCw, Key, ShieldCheck, CreditCard, Sparkles, AlertCircle } from 'lucide-react';

interface HospitalityDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

interface Room {
  id: string;
  name: string;
  tier: string;
  ratePerNight: string;
  status: 'Available' | 'Reserved' | 'Checked-In' | 'Housekeeping Alert';
  guestName?: string;
  folioTotal?: string;
}

export const HospitalityDemoModal: React.FC<HospitalityDemoModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '101', name: 'Deluxe Oceanfront Suite', tier: 'Ocean Wing', ratePerNight: '₦185,000', status: 'Available' },
    { id: '204', name: 'Penthouse Garden Villa', tier: 'Private Villa', ratePerNight: '₦340,000', status: 'Available' },
    { id: '312', name: 'Executive Terrace Room', tier: 'Business Tower', ratePerNight: '₦125,000', status: 'Available' },
  ]);

  const [selectedRoomId, setSelectedRoomId] = useState('101');
  const [guestName, setGuestName] = useState('Chief T. Adeleke');
  const [paymentGateway, setPaymentGateway] = useState<'Paystack' | 'Flutterwave' | 'Direct Transfer'>('Paystack');
  const [syncLogs, setSyncLogs] = useState<string[]>([
    'System Initialized: Opera Cloud & Local POS endpoints connected via secure Webhooks.',
    'Inventory telemetry synced with direct booking engine (Zero double-booking lock active).',
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulateBooking = () => {
    setIsProcessing(true);
    const room = rooms.find((r) => r.id === selectedRoomId);
    if (!room) return;

    setTimeout(() => {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === selectedRoomId
            ? { ...r, status: 'Checked-In', guestName, folioTotal: r.ratePerNight }
            : r
        )
      );

      setSyncLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Booking Engine: Instant settlement verified via ${paymentGateway} (${room.ratePerNight}).`,
        `[${new Date().toLocaleTimeString()}] PMS Sync: Room #${room.id} assigned to ${guestName}. Digital folio created.`,
        `[${new Date().toLocaleTimeString()}] Housekeeping Dispatch: Auto-notification dispatched to Housekeeping Lead for Suite #${room.id}.`,
        `[${new Date().toLocaleTimeString()}] Digital Concierge: Automated WhatsApp greeting and Wi-Fi token dispatched to guest.`,
        ...prev,
      ]);

      setIsProcessing(false);
    }, 800);
  };

  const handleResetRooms = () => {
    setRooms([
      { id: '101', name: 'Deluxe Oceanfront Suite', tier: 'Ocean Wing', ratePerNight: '₦185,000', status: 'Available' },
      { id: '204', name: 'Penthouse Garden Villa', tier: 'Private Villa', ratePerNight: '₦340,000', status: 'Available' },
      { id: '312', name: 'Executive Terrace Room', tier: 'Business Tower', ratePerNight: '₦125,000', status: 'Available' },
    ]);
    setSyncLogs(['Sandbox state reset. All inventory marked Available for new reservation.']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-6 shadow-2xl border border-emerald-950/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#083321] text-white px-6 py-5 flex items-center justify-between border-b border-emerald-800/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                PRD Section 7.5 Interactive Architecture Demonstrator
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Hospitality PMS & Guest Folio Orchestrator
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
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Disclaimer adhering to PRD 7.5 */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Verified Architecture Demonstrator:</strong> This interactive sandbox illustrates how EvolveLabX builds custom direct booking engines and integrates them with hotel Property Management Systems (PMS), local payment gateways, and housekeeping dispatch.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Live Room State */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Room Inventory State
                </span>
                <button
                  onClick={handleResetRooms}
                  className="text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Demo
                </button>
              </div>

              <div className="space-y-3">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedRoomId === room.id
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-lg ${room.status === 'Checked-In' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          <BedDouble className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{room.name}</span>
                            <span className="text-xs font-mono text-slate-500">#{room.id}</span>
                          </div>
                          <span className="text-xs text-slate-500 block">{room.tier} · {room.ratePerNight} / night</span>
                          {room.guestName && (
                            <span className="text-xs text-emerald-800 font-semibold block mt-1">
                              Guest: {room.guestName}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        room.status === 'Checked-In'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {room.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulation Controls */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Simulate Direct Reservation
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Payment Settlement
                    </label>
                    <select
                      value={paymentGateway}
                      onChange={(e) => setPaymentGateway(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    >
                      <option value="Paystack">Paystack Gateway</option>
                      <option value="Flutterwave">Flutterwave Gateway</option>
                      <option value="Direct Transfer">Automated Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSimulateBooking}
                  disabled={isProcessing}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] disabled:opacity-50 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>{isProcessing ? 'Synchronizing Systems...' : 'Process Direct Booking & Trigger Event Pipeline'}</span>
                </button>
              </div>
            </div>

            {/* Right Col: Live Event & Telemetry Log */}
            <div className="lg:col-span-5 bg-slate-900 text-emerald-300 rounded-xl p-4 flex flex-col justify-between font-mono text-xs border border-slate-800">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="uppercase tracking-wider font-semibold">Orchestration Event Telemetry</span>
                  <span className="text-emerald-400">STATUS: LIVE</span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {syncLogs.map((log, index) => (
                    <div key={index} className="text-[11px] leading-relaxed text-emerald-300/90 border-l border-emerald-500/30 pl-2">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Housekeeping Protocol:</span>
                  <span className="text-white font-sans font-medium">Auto-Triggered</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Guest Folio Ledger:</span>
                  <span className="text-white font-sans font-medium">Real-Time Sync</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>OTA Double-Booking Prevention:</span>
                  <span className="text-emerald-400 font-sans font-medium">Enforced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Need custom hospitality engineering for your hotel or resort chain?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Close Sandbox
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg"
              >
                Discuss Hotel Solution
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
