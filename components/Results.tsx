import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GiftType, UserResult } from '../types';
import { GIFT_DEFINITIONS, QUESTIONS } from '../constants';
import GiftCoach from './GiftCoach';

interface ResultsProps {
  answers: Record<number, number>;
  onRetake: () => void;
}

const Results: React.FC<ResultsProps> = ({ answers, onRetake }) => {
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null);

  // Calculate scores
  const results = useMemo(() => {
    const scores: Partial<Record<GiftType, number>> = {};
    const counts: Partial<Record<GiftType, number>> = {};

    Object.keys(answers).forEach((qId) => {
      const id = parseInt(qId);
      const question = QUESTIONS.find(q => q.id === id);
      const score = answers[id];
      if (question) {
        scores[question.gift] = (scores[question.gift] || 0) + score;
        counts[question.gift] = (counts[question.gift] || 0) + 1;
      }
    });

    const calculated: UserResult[] = Object.keys(GIFT_DEFINITIONS).map((key) => {
      const gift = key as GiftType;
      const totalScore = scores[gift] || 0;
      const count = counts[gift] || 1;
      const maxPossible = count * 5;
      return {
        gift,
        score: totalScore,
        percentage: Math.round((totalScore / maxPossible) * 100)
      };
    });

    // Sort by percentage descending
    return calculated.sort((a, b) => b.percentage - a.percentage);
  }, [answers]);

  const topGifts = results.slice(0, 3);
  const dataForChart = results.map(r => ({
    name: r.gift.substring(0, 3), // Short name for mobile
    full: r.gift,
    score: r.percentage
  }));

  if (selectedGift) {
    return (
      <GiftCoach 
        gift={selectedGift} 
        onBack={() => setSelectedGift(null)} 
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Your Spiritual Gifts Profile</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Based on your responses, these are the areas where you are naturally gifted to serve.
          Remember, this is a tool for discovery. Prayer and community confirmation are essential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Top 3 Cards */}
        {topGifts.map((result, index) => {
          const def = GIFT_DEFINITIONS[result.gift];
          return (
            <div 
              key={result.gift} 
              className={`
                bg-white rounded-2xl shadow-lg border p-6 flex flex-col
                ${index === 0 ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-100'}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`
                  text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide
                  ${index === 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}
                `}>
                  #{index + 1} Top Gift
                </span>
                <span className="text-2xl font-bold text-slate-800">{result.percentage}%</span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{def.name}</h3>
              <p className="text-sm text-slate-500 italic mb-4">{def.biblicalReference}</p>
              <p className="text-slate-600 mb-6 flex-grow">{def.description}</p>
              
              <button
                onClick={() => setSelectedGift(result.gift)}
                className="w-full py-3 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>Learn & Apply</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Full Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-12">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Full Profile Overview</h3>
        <div className="h-64 md:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataForChart} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {dataForChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index < 3 ? '#4f46e5' : '#cbd5e1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRetake}
          className="text-slate-500 hover:text-slate-800 font-medium underline underline-offset-4"
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
};

export default Results;