import React, { useState } from 'react';
import { Menu, X, Building2, Calendar, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
  onOpenPortalDemo: () => void;
  onOpenCompanyProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenConsultation,
  onOpenPortalDemo,
  onOpenCompanyProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation items specified in PRD Section 4.1:
  // Home • Services • Solutions • Our Work • Insights • About • Contact
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'work', label: 'Our Work' },
    { id: 'insights', label: 'Insights' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 lg:gap-8 h-20">
          {/* Zone 1: Brand Wordmark (PRD Section 3.1 & 4.1) */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-md bg-[#083321] flex items-center justify-center text-emerald-400 font-bold text-lg tracking-wider border border-emerald-700/30 group-hover:bg-[#0c472f] transition-colors shadow-2xs">
                <span className="text-white">E</span>
                <span className="text-emerald-400 font-extrabold -ml-0.5">X</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#083321] whitespace-nowrap">
                  EVOLVELABX
                </span>
                <span className="text-[10px] tracking-wider uppercase text-emerald-800 font-semibold -mt-1 hidden sm:block">
                  Technology That Moves Business Forward
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (PRD Section 4.1: Home • Services • Solutions • Our Work • Insights • About • Contact) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#083321] cursor-pointer ${
                  activeTab === link.id
                    ? 'text-[#083321] font-bold'
                    : 'text-slate-600'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#083321] rounded-full transition-all duration-300" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action (PRD Section 4.1: Book a Consultation) + Client Portal link */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPortalDemo}
              className="px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 border border-emerald-200/80 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer hover:shadow-2xs"
              title="Preview the interactive client portal and lead dashboard"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Client Portal</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="px-4 xl:px-5 py-2.5 text-xs font-bold text-white bg-[#083321] hover:bg-[#0c472f] active:bg-[#062417] rounded-lg transition-all shadow-sm hover:shadow-emerald-900/10 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Book a Consultation</span>
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenConsultation}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#083321] rounded-md whitespace-nowrap"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-950/10 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-emerald-50 text-[#083321] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortalDemo();
              }}
              className="w-full text-center py-2.5 px-4 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-emerald-700" />
              Client Portal Demo
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCompanyProfile();
              }}
              className="w-full text-center py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              Company Profile Deck
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center py-3 px-4 text-sm font-bold text-white bg-[#083321] rounded-lg shadow-sm cursor-pointer"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
