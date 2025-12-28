import React, { useState } from 'react';
import { getMedicationAdvice } from './services/geminiService';
import { AdviceResponse, PatientProfile } from './types';
import RecommendationCard from './components/RecommendationCard';
import { WarningIcon, HeartHandIcon } from './components/Icons';

const App: React.FC = () => {
  // Patient Data State
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Hombre' | 'Mujer' | 'Otro'>('Mujer');
  const [weight, setWeight] = useState('');

  // App State
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdviceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const profile: PatientProfile = {
      age,
      gender,
      weight
    };

    try {
      const advice = await getMedicationAdvice(symptoms, profile);
      setResult(advice);
    } catch (err) {
      setError("Hubo un problema al consultar al asistente. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* --- AMBIENT MOVING LIGHTS BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Orb 1: Cyan */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
        {/* Orb 2: Blue */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
        {/* Orb 3: Indigo/Purple (Bottom) */}
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
        {/* Grid Overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Main Container: Flex centered for full height without scroll on initial view */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col justify-center min-h-screen py-6">
        
        {/* Header Section - Compacted */}
        <div className={`text-center transition-all duration-500 ${result ? 'mt-10 mb-8' : 'mb-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-medium text-cyan-300 tracking-wide uppercase">AI Powered Medicine</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-thin text-white mb-3 tracking-tight">
            Farma<span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Consejo</span>
          </h1>
          {!result && (
            <p className="text-base text-slate-400 max-w-xl mx-auto font-light leading-relaxed animate-fade-in-up">
              Asistente farmacéutico inteligente. Describe tus síntomas.
            </p>
          )}
        </div>

        {/* Main Form Card Wrapper with "Breathing" Neon Effect */}
        <div className={`relative group w-full max-w-3xl mx-auto transition-all duration-700 ${result ? 'hidden' : 'block'}`}>
          {/* Animated Gradient Border Layer */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-[2rem] opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
          
          {/* Card Content (Glassmorphism) */}
          <div className="relative bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-[1.9rem] shadow-2xl shadow-black/50 overflow-hidden">
            
            <form onSubmit={handleSubmit} className="relative z-10">
              
              {/* Patient Data Grid */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                  <h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] text-shadow-glow">
                    Perfil Clínico
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Age Input */}
                  <div className="group/input">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 ml-1 tracking-wide">EDAD</label>
                    <div className="relative transform transition-all duration-300 group-hover/input:-translate-y-0.5">
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="00"
                        min="0"
                        max="120"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-900/80 outline-none transition-all text-slate-200 placeholder:text-slate-700 font-light text-center text-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender Input */}
                  <div className="group/input">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 ml-1 tracking-wide">GÉNERO</label>
                    <div className="relative transform transition-all duration-300 group-hover/input:-translate-y-0.5">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-900/80 outline-none transition-all text-slate-200 appearance-none cursor-pointer text-center text-lg font-light"
                      >
                        <option value="Mujer">Mujer</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  {/* Weight Input */}
                  <div className="group/input">
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 ml-1 tracking-wide">PESO (KG)</label>
                    <div className="relative transform transition-all duration-300 group-hover/input:-translate-y-0.5">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="00"
                        min="1"
                        max="300"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-900/80 outline-none transition-all text-slate-200 placeholder:text-slate-700 font-light text-center text-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptoms Input */}
              <div className="p-2">
                <div className="relative">
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe lo que sientes..."
                    className="w-full h-32 p-5 text-lg sm:text-xl font-extralight rounded-xl border-0 focus:ring-0 resize-none text-slate-200 placeholder:text-slate-700 bg-transparent leading-relaxed tracking-wide"
                    disabled={loading}
                  />
                  {/* Subtle corner accent */}
                  <div className="absolute bottom-3 right-4 text-[10px] text-slate-600 font-mono opacity-50">AI_LISTENING...</div>
                </div>
              </div>
              
              {/* Toolbar Area */}
              <div className="flex flex-col sm:flex-row justify-between items-center px-6 pb-6 pt-2 gap-4">
                <div className="text-[9px] text-slate-500 font-medium uppercase tracking-widest opacity-60">
                  <span className="text-cyan-500 mr-2">●</span>Privacidad Protegida
                </div>
                <button
                  type="submit"
                  disabled={loading || !symptoms.trim() || !age}
                  className={`relative overflow-hidden rounded-xl px-8 py-3 font-medium text-white transition-all duration-300 w-full sm:w-auto text-sm
                    ${loading || !symptoms.trim() || !age
                      ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-800' 
                      : 'bg-cyan-600 shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] hover:bg-cyan-500 active:scale-[0.98] border border-cyan-400/30'
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white/70 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analizando...
                      </>
                    ) : (
                      'Analizar Síntomas'
                    )}
                  </span>
                  {/* Button Glow Effect */}
                  {!loading && (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mt-6 bg-rose-950/20 backdrop-blur-md border border-rose-500/20 text-rose-200 px-6 py-4 rounded-2xl flex items-center animate-fade-in-up shadow-lg">
            <WarningIcon className="h-5 w-5 mr-4 text-rose-500 shadow-rose-500/50 drop-shadow-md" />
            <span className="font-light">{error}</span>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="max-w-4xl mx-auto animate-fade-in-up mt-8 pb-10 space-y-8 w-full">
            
             {/* Back button to clear search */}
            <div className="flex justify-center">
               <button 
                onClick={() => setResult(null)}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 mb-4"
               >
                 ← Nueva Consulta
               </button>
            </div>

            {/* Urgent Warning if needed */}
            {result.shouldVisitDoctor && (
              <div className="relative overflow-hidden bg-rose-900/10 border border-rose-500/30 p-6 rounded-3xl flex flex-col sm:flex-row items-start gap-6 backdrop-blur-md">
                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl"></div>
                 <div className="bg-gradient-to-br from-rose-500 to-red-600 p-3 rounded-xl shrink-0 shadow-lg shadow-rose-900/50">
                    <WarningIcon className="h-8 w-8 text-white" />
                 </div>
                 <div className="relative z-10">
                   <h3 className="font-bold text-xl text-rose-100 tracking-wide mb-2">Atención Médica Requerida</h3>
                   <p className="text-rose-200/80 text-base leading-relaxed font-light">
                     Tus síntomas sugieren una condición que requiere valoración profesional. Por favor, acude a un médico antes de automedicarte.
                   </p>
                 </div>
              </div>
            )}

            {/* AI Summary */}
            <div className="relative pl-8 py-4 border-l-2 border-cyan-500/30">
              <div className="absolute left-[-5px] top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              <h3 className="text-cyan-300 font-medium text-xs uppercase tracking-[0.2em] mb-4 opacity-80">Diagnóstico Preliminar</h3>
              <p className="text-slate-100 leading-relaxed text-xl sm:text-2xl font-extralight drop-shadow-lg">
                {result.summary}
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 gap-6">
              {result.recommendations.map((med, index) => (
                <div key={index} className="transform transition-all hover:scale-[1.01]">
                   <RecommendationCard data={med} />
                </div>
              ))}
            </div>

            {/* Care Advice Section */}
            {result.careAdvice && result.careAdvice.length > 0 && (
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl border border-teal-500/20 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                    <HeartHandIcon className="h-5 w-5 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-thin text-teal-50">Cuidados <span className="font-medium text-teal-400">Adicionales</span></h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.careAdvice.map((advice, idx) => (
                    <div key={idx} className="group flex items-start gap-3 p-3 rounded-2xl bg-slate-950/30 border border-teal-900/30 hover:border-teal-500/30 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
                      <p className="text-slate-300 text-sm leading-relaxed font-light group-hover:text-slate-200 transition-colors">{advice}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="border-t border-slate-800/50 pt-6 text-center">
              <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Descargo de Responsabilidad</p>
              <p className="text-slate-500 text-xs max-w-2xl mx-auto font-light leading-relaxed opacity-70 hover:opacity-100 transition-opacity">
                {result.generalDisclaimer}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Global Animations Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 6s ease infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(34,211,238,0.5);
        }
      `}</style>
    </div>
  );
};

export default App;