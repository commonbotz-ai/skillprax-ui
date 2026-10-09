import React, { useState } from 'react';
import { CinematicVideoBackground } from '../components/CinematicVideoBackground';
import { SkillTrackLogo } from '../components/SkillTrackLogo';
import { ArrowRight, Sparkles, User, Briefcase, GraduationCap, X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface UserProfileData {
  name: string;
  age: number;
  profession: string;
  educationBoard?: string;
  grade?: string;
}

export interface LaunchGatewayProps {
  onInitializeProfile: (profile: UserProfileData) => void;
  onDirectNavigate?: (screen: 'gateway' | 'profile' | 'workspace') => void;
}

export const LaunchGatewayPage: React.FC<LaunchGatewayProps> = ({
  onInitializeProfile,
  onDirectNavigate,
}) => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Form State with Clean Neutral Dummy Placeholders
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [profession, setProfession] = useState('Student');
  const [educationBoard, setEducationBoard] = useState('CBSE');
  const [grade, setGrade] = useState('Class 12');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInitializeProfile({
      name: name.trim() || 'explorer_01',
      age: Number(age) || 18,
      profession,
      educationBoard: profession === 'Student' ? educationBoard : undefined,
      grade: profession === 'Student' ? grade : undefined,
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* ASSET 1: Ambient Domain Schematics Canvas */}
      <CinematicVideoBackground />

      {/* Top Floating Badge Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <SkillTrackLogo mode="auto" size="md" showText={true} />
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous Engine v2.4</span>
          </span>
          {onDirectNavigate && (
            <button
              onClick={() => onDirectNavigate('profile')}
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 text-[#0284C7] hover:bg-white shadow-xs transition-colors"
            >
              Direct Telemetry ➔
            </button>
          )}
        </div>
      </div>

      {/* CENTRAL HERO STAGE */}
      <main className="relative z-10 w-full max-w-xl mx-auto my-auto text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          {/* Subtle Ambient Top Border Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0284C7] via-[#F59E0B] to-emerald-500" />

          {/* Top Brand Emblem Badge */}
          <div className="mb-6 flex flex-col items-center justify-center">
            <SkillTrackLogo mode="video" size="hero" showText={false} />
            <div className="mt-3">
              <span className="text-[#0284C7] font-black tracking-tight text-3xl sm:text-4xl">SKILL-</span>
              <span className="text-[#F59E0B] font-black tracking-tight text-3xl sm:text-4xl">TRACK</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1">
              Autonomous Mastery Engine
            </span>
          </div>

          {/* Headline & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            Autonomous Skill Mastery Engine
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-3 leading-relaxed max-w-md mx-auto">
            Precision Socratic diagnostic pathways tailored across all domains from first principles to elite execution.
          </p>

          {/* Feature Highlights Pills */}
          <div className="grid grid-cols-3 gap-2 my-6 text-[11px] font-bold text-slate-600">
            <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/60">
              <span className="block text-emerald-600 text-xs">5 Domains</span>
              <span>All Disciplines</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/60">
              <span className="block text-[#0284C7] text-xs">Socratic Gate</span>
              <span>70% Benchmark</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/60">
              <span className="block text-amber-600 text-xs">Telemetry</span>
              <span>Zero-Leak XP</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="btn-primary text-sm sm:text-base font-extrabold py-4 px-10 shadow-xl shadow-sky-500/25 w-full sm:w-auto"
            >
              <span>⚡ GET STARTED</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer System Status */}
      <footer className="relative z-10 text-center text-xs font-semibold text-slate-400 py-4">
        <span>Curated for CBSE Class 12, Engineering, Athletics, and Creative Disciplines</span>
      </footer>

      {/* =====================================================================
          PART 3: ONBOARDING & PROFILE SETUP MODAL
          ===================================================================== */}
      <AnimatePresence>
        {isOnboardingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Frosted Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOnboardingOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <SkillTrackLogo mode="auto" size="sm" showText={false} />
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-none">
                      Initialize Profile
                    </h3>
                    <span className="text-xs text-slate-500">Autonomous Track Setup</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOnboardingOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* 1. Full Name / Codename */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Full Name / Codename</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., alex_dev"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all shadow-xs"
                  />
                  <p className="text-[11px] text-slate-400">
                    Neutral placeholder identifier for telemetry records.
                  </p>
                </div>

                {/* 2. Age Input */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Age</span>
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={99}
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="e.g., 18"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all shadow-xs"
                  />
                </div>

                {/* 3. Profession Dropdown */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Profession / Calling</span>
                  </label>
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all shadow-xs cursor-pointer"
                  >
                    <option value="Student">Student</option>
                    <option value="Software Engineer / Developer">Software Engineer / Developer</option>
                    <option value="Athlete / Sports Professional">Athlete / Sports Professional</option>
                    <option value="Designer / Creative Artist">Designer / Creative Artist</option>
                    <option value="Self-Taught Practitioner">Self-Taught Practitioner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* CONDITIONAL STUDENT ACCORDION */}
                <AnimatePresence>
                  {profession === 'Student' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-4 pt-2 border-t border-slate-100"
                    >
                      <div className="rounded-2xl bg-sky-50/70 border border-sky-200/80 p-4 space-y-3.5 text-left">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284C7]">
                          <GraduationCap className="w-4 h-4" />
                          <span>Academic Curriculum Alignment</span>
                        </div>

                        {/* Education Board */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-600">
                            Education Board:
                          </label>
                          <select
                            value={educationBoard}
                            onChange={(e) => setEducationBoard(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                          >
                            <option value="CBSE">CBSE (Central Board)</option>
                            <option value="GSEB">GSEB (Gujarat Board)</option>
                            <option value="ICSE">ICSE / ISC</option>
                            <option value="State Board">Other State Board</option>
                            <option value="University">University Undergraduate</option>
                            <option value="Other">Other Curriculum</option>
                          </select>
                        </div>

                        {/* Standard / Grade */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-600">
                            Standard / Grade:
                          </label>
                          <select
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                          >
                            <option value="Class 11">Class 11 (Higher Secondary - Year 1)</option>
                            <option value="Class 12">Class 12 (Board Examination / JEE / NEET)</option>
                            <option value="Undergraduate">Undergraduate Degree</option>
                            <option value="Postgraduate">Postgraduate</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-primary w-full text-sm font-extrabold py-3.5 shadow-lg shadow-sky-500/25"
                  >
                    <span>⚡ Initialize Autonomous Track</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaunchGatewayPage;
