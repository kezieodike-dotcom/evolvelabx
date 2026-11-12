import React from 'react';
import { X, Calendar, Clock, User, Share2, CheckCircle2, ArrowRight } from 'lucide-react';
import { InsightArticle } from '../types';

interface ArticleModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenConsultation,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-6 shadow-2xl border border-emerald-950/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#083321] text-white px-6 py-6 border-b border-emerald-800/40 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <span>{article.category}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {article.title}
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
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <User className="w-4 h-4 text-emerald-700" />
            <div>
              <span className="font-bold text-slate-900">{article.author.name}</span>
              <span className="text-slate-500 ml-1">({article.author.role})</span>
            </div>
          </div>

          <div className="text-sm font-medium text-slate-700 italic border-l-2 border-emerald-600 pl-4 py-1">
            {article.summary}
          </div>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Strategic Takeaways for Leadership
            </h4>
            <div className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Need guidance applying these principles to your tech stack?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#083321] hover:bg-[#0c472f] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Request Advisory Session</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
