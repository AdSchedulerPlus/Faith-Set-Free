import React, { useState } from 'react';
import { ViewState } from './types';
import Quiz from './components/Quiz';
import Results from './components/Results';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LANDING');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStartQuiz = () => {
    setView('QUIZ');
  };

  const handleQuizComplete = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setView('RESULTS');
  };

  const handleRetake = () => {
    setAnswers({});
    setView('LANDING');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
              <span className="font-bold text-xl tracking-tight text-slate-800">Faith Set Free</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-slate-500">Biblical Gifts Discovery</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {view === 'LANDING' && (
          <div className="relative overflow-hidden">
             {/* Background decoration */}
            <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative z-10">
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Discover Your <span className="text-indigo-600">Divine Design</span>
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
                Uncover the spiritual gifts God has placed within you. Get personalized, biblical insights on how to use them effectively in your everyday life.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleStartQuiz}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-200"
                >
                  Start Assessment
                </button>
              </div>
              
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">📝</div>
                  <h3 className="font-bold text-lg mb-2">Accurate Assessment</h3>
                  <p className="text-slate-500 text-sm">Based on Romans 12 and 1 Corinthians 12 frameworks.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto">🌱</div>
                  <h3 className="font-bold text-lg mb-2">Practical Growth</h3>
                  <p className="text-slate-500 text-sm">Get actionable weekly plans to develop your gifts.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'QUIZ' && (
          <Quiz onComplete={handleQuizComplete} onCancel={() => setView('LANDING')} />
        )}

        {view === 'RESULTS' && (
          <Results answers={answers} onRetake={handleRetake} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Faith Set Free. Soli Deo Gloria.
          </p>
          <p className="text-slate-300 text-xs mt-2">
            This tool is for discovery and encouragement. It does not replace community confirmation or pastoral guidance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;