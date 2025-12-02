import React, { useEffect, useState } from 'react';
import { GiftType } from '../types';
import { GIFT_DEFINITIONS } from '../constants';
import { getDetailedGiftAnalysis } from '../services/geminiService';

interface GiftCoachProps {
  gift: GiftType;
  onBack: () => void;
}

const GiftCoach: React.FC<GiftCoachProps> = ({ gift, onBack }) => {
  const definition = GIFT_DEFINITIONS[gift];
  
  // AI Data States
  const [analysis, setAnalysis] = useState<{
    summary: string;
    biblicalRoleModels: string[];
    potentialPitfalls: string[];
    growthPlan: string;
  } | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchAnalysis = async () => {
      setLoadingAnalysis(true);
      const data = await getDetailedGiftAnalysis(gift);
      if (mounted) {
        setAnalysis(data);
        setLoadingAnalysis(false);
      }
    };
    fetchAnalysis();
    return () => { mounted = false; };
  }, [gift]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Results
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{definition.name}</h1>
              <p className="opacity-90 italic">{definition.biblicalReference}</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <span className="text-2xl">🕊️</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow bg-slate-50 p-6 md:p-8 space-y-8">
            {loadingAnalysis ? (
                 <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                   <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                   <p>Consulting the archives...</p>
                 </div>
              ) : analysis ? (
                <>
                  <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                      Summary
                    </h3>
                    <p className="text-slate-600 leading-relaxed bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      {analysis.summary}
                    </p>
                  </section>

                  <div className="grid md:grid-cols-2 gap-6">
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
                        Biblical Examples
                      </h3>
                      <ul className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 space-y-2">
                        {analysis.biblicalRoleModels.map((m, i) => (
                          <li key={i} className="flex items-center text-slate-700">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">3</span>
                        Watch Out For
                      </h3>
                      <ul className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 space-y-2">
                        {analysis.potentialPitfalls.map((p, i) => (
                          <li key={i} className="flex items-center text-slate-700">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">4</span>
                      This Week's Growth Plan
                    </h3>
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 text-indigo-900">
                      {analysis.growthPlan}
                    </div>
                  </section>
                </>
              ) : (
                <div className="text-center text-red-500">Could not load analysis.</div>
              )}
        </div>
      </div>
    </div>
  );
};

export default GiftCoach;