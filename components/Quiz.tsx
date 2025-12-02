import React, { useState, useCallback } from 'react';
import { QUESTIONS } from '../constants';
import { QuizState } from '../types';

interface QuizProps {
  onComplete: (answers: Record<number, number>) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onCancel }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(0);

  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  const handleAnswer = useCallback((questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const currentQuestions = QUESTIONS.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const canProceed = currentQuestions.every(q => answers[q.id] !== undefined);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(p => p + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header / Progress */}
      <div className="mb-8 sticky top-0 bg-[#f8fafc] z-10 py-4 border-b border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-slate-800">Assessment</h2>
          <span className="text-sm font-medium text-slate-500">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-8 mb-12">
        {currentQuestions.map((q) => (
          <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 animate-fade-in">
            <p className="text-lg font-medium text-slate-800 mb-6">{q.text}</p>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full flex justify-between items-center sm:gap-4 relative">
                {/* Labels for mobile readability */}
                <span className="absolute -top-6 left-0 text-xs text-slate-400 sm:hidden">Never</span>
                <span className="absolute -top-6 right-0 text-xs text-slate-400 sm:hidden">Always</span>

                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(q.id, val)}
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all
                      ${answers[q.id] === val 
                        ? 'bg-indigo-600 text-white transform scale-110 shadow-md ring-2 ring-indigo-300' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'}
                    `}
                    aria-label={`Rate ${val} out of 5`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="hidden sm:flex w-full justify-between text-xs text-slate-400 font-medium px-1 mt-2 sm:mt-0 sm:w-auto sm:flex-col sm:h-12 sm:justify-center">
                <span>Always</span>
                <span>Never</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-200">
        <button
          onClick={currentPage === 0 ? onCancel : handlePrev}
          className="px-6 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
        >
          {currentPage === 0 ? 'Cancel' : 'Back'}
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`
            px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all transform
            ${canProceed 
              ? 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5' 
              : 'bg-slate-300 cursor-not-allowed'}
          `}
        >
          {currentPage === totalPages - 1 ? 'Finish Assessment' : 'Next Page'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;