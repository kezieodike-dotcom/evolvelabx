import React, { useState } from 'react';
import { Search, ArrowRight, User, Calendar, Clock, BookOpen, Filter } from 'lucide-react';
import { INSIGHTS_DATA } from '../data/mockData';
import { InsightArticle } from '../types';

interface InsightsViewProps {
  onSelectArticle: (article: InsightArticle) => void;
  onOpenConsultation: () => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  onSelectArticle,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Digital Transformation',
    'AI and Automation',
    'Software Engineering',
    'Hospitality Technology',
    'Business Operations',
    'Technology Training',
  ];

  const filteredArticles = INSIGHTS_DATA.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
          Knowledge & Strategy
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#083321] tracking-tight">
          Enterprise Technology Insights & Guides
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Actionable analyses on architecture, software engineering, AI workflow automation, NDPA 2023 compliance, and hotel systems.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#083321] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search insights..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-white"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-16 text-center border border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500">No articles found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-emerald-700/50 shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-emerald-800">{article.category}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#083321] leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">{article.date}</span>
                <span className="text-emerald-900 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Corporate Advisory Box */}
      <div className="p-8 rounded-3xl bg-[#083321] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/40">
        <div>
          <h3 className="text-xl font-bold">Need a Custom Operational Audit for Your Executive Team?</h3>
          <p className="text-xs text-emerald-100/70 mt-1 max-w-xl">
            We evaluate your software architecture, identify manual bottlenecks, and provide an actionable technology roadmap.
          </p>
        </div>
        <button
          onClick={onOpenConsultation}
          className="px-6 py-2.5 text-xs font-bold text-[#083321] bg-emerald-400 hover:bg-emerald-300 rounded-lg whitespace-nowrap shrink-0 transition-colors"
        >
          Book an Advisory Session
        </button>
      </div>
    </div>
  );
};
