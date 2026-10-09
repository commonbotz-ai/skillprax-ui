import React, { useState } from 'react';
import { SkillTrackLogo } from '../../components/SkillTrackLogo';
import { CinematicVideoBackground } from '../../components/CinematicVideoBackground';
import {
  Flame,
  Shield,
  Award,
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2,
  Clock,
  Layers,
  Zap,
  Activity,
  Brain,
  Palette,
  Dumbbell,
  UtensilsCrossed,
  Atom,
  X,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface UserProfileData {
  name: string;
  age: number;
  profession: string;
  educationBoard?: string;
  grade?: string;
}

export interface SkillTrackSummary {
  id: string;
  title: string;
  domain: string;
  specialization: string;
  milestonesCount: number;
  completedMilestones: number;
  progressPercent: number;
  badgeColor: string;
  icon: string;
}

export interface ProfilePageProps {
  userProfile?: UserProfileData;
  enrolledTracks?: SkillTrackSummary[];
  onSelectTrack: (trackId: string) => void;
  onEnrollNewTrack: (track: Partial<SkillTrackSummary>) => void;
  onNavigateHome: () => void;
}

const DEFAULT_TRACKS: SkillTrackSummary[] = [
  {
    id: 'ncert-haloalkanes',
    title: 'NCERT Class 12 Chemistry: Haloalkanes and Haloarenes',
    domain: 'Science',
    specialization: 'Nucleophilic Substitution & Stereochemical Inversion',
    milestonesCount: 6,
    completedMilestones: 2,
    progressPercent: 33,
    badgeColor: 'sky',
    icon: 'Atom',
  },
  {
    id: 'sprint-kinematics',
    title: 'Explosive Sprint Kinematics & Stride Frequency',
    domain: 'Athletics',
    specialization: 'Acceleration Drive Phase & Ground Contact Time',
    milestonesCount: 5,
    completedMilestones: 1,
    progressPercent: 20,
    badgeColor: 'amber',
    icon: 'Dumbbell',
  },
];

const CURATED_HORIZONS = [
  {
    id: 'horizon-1',
    domain: 'Athletics',
    affinity: '96% Affinity',
    title: 'Explosive Sprint Kinematics & Stride Frequency',
    specialization: 'Acceleration Drive Phase & Ground Contact Time',
    rationale: 'Complements your physical conditioning track to optimize neuromuscular force production.',
    badgeColor: 'amber',
  },
  {
    id: 'horizon-2',
    domain: 'Cognitive Logic',
    affinity: '92% Affinity',
    title: 'Distributed System Consensus & Fault Tolerance',
    specialization: 'Raft / Paxos State Machine Replication',
    rationale: 'Extends your procedural logic into high-concurrency architecture.',
    badgeColor: 'indigo',
  },
  {
    id: 'horizon-3',
    domain: 'Art',
    affinity: '88% Affinity',
    title: 'Dynamic Figure Drawing & Anatomical Gesture',
    specialization: 'Rapid Line of Action & Fore-shortening',
    rationale: 'Cross-pollinates physical spatial awareness into structural visual draftsmanship.',
    badgeColor: 'rose',
  },
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile = {
    name: 'alex_dev',
    age: 18,
    profession: 'Student',
    educationBoard: 'CBSE',
    grade: 'Class 12',
  },
  enrolledTracks = DEFAULT_TRACKS,
  onSelectTrack,
  onEnrollNewTrack,
  onNavigateHome,
}) => {
  // Cadence Bar Chart state (interactive log session)
  const [cadenceHours, setCadenceHours] = useState<number[]>([2.5, 3.8, 4.2, 5.0, 6.5, 3.2, 4.8]);
  const [streakDays, setStreakDays] = useState(7);
  const [xp, setXp] = useState(3420);

  // Multi-tier Enrollment Modal state
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollDomain, setEnrollDomain] = useState<'Science' | 'Athletics' | 'Art' | 'Homemaking' | 'Cognitive Logic'>('Science');
  const [enrollTopic, setEnrollTopic] = useState('');
  const [enrollSpecialization, setEnrollSpecialization] = useState('');

  const daysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleLogHour = () => {
    setCadenceHours((prev) => {
      const next = [...prev];
      next[6] = Math.round((next[6] + 1.0) * 10) / 10;
      return next;
    });
    setXp((prev) => prev + 120);
  };

  const domainPillOptions: Record<string, string[]> = {
    Football: ['Goalkeeping & Shot Stopping', 'Striker Finishing', 'Central Midfield Playmaking', 'Full-Back Defending'],
    Dance: ['Contemporary Floorwork', 'Hip-Hop Popping/Breaking', 'Classical Ballet Form', 'Latin / Salsa'],
    Art: ['Realistic Portraiture', 'Charcoal & Graphite Sketching', 'Oil Glazing', 'Digital Concept Art'],
    Coding: ['Next.js App Router Architecture', 'Distributed Event Streaming', 'Low-Level Systems C++', 'Kernel Memory Management'],
    Science: ['Organic Reaction Mechanisms', 'Thermodynamic Equilibria', 'Quantum Chemistry', 'Electromagnetic Wave Equations'],
  };

  const currentSuggestedPills = domainPillOptions[enrollTopic] || [
    'Foundational Axioms',
    'Applied Drills & Execution',
    'High-Speed Synthesis',
    'Grandmaster Mastery',
  ];

  const handleOpenCurated = (h: typeof CURATED_HORIZONS[0]) => {
    setEnrollDomain(h.domain as any);
    setEnrollTopic(h.title);
    setEnrollSpecialization(h.specialization);
    setIsEnrollModalOpen(true);
  };

  const handleSynthesizeRoadmap = () => {
    const newTrack: Partial<SkillTrackSummary> = {
      id: `track-${Date.now()}`,
      title: enrollTopic.trim() || 'Custom Autonomous Roadmap',
      domain: enrollDomain,
      specialization: enrollSpecialization || 'Integrated Execution',
      milestonesCount: 6,
      completedMilestones: 0,
      progressPercent: 0,
      badgeColor: 'sky',
      icon: enrollDomain === 'Athletics' ? 'Dumbbell' : enrollDomain === 'Art' ? 'Palette' : 'Atom',
    };
    onEnrollNewTrack(newTrack);
    setIsEnrollModalOpen(false);
  };

  return (
    <div className="relative min-h-screen pb-16 bg-transparent text-slate-800">
      <CinematicVideoBackground />

      {/* =====================================================================
          1. PERSISTENT TOP NAVIGATION BAR
          ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <SkillTrackLogo mode="auto" size="sm" showText={true} onClick={onNavigateHome} />
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
            HUB
          </span>
          <span className="hidden md:inline-block text-xs font-semibold text-slate-400 border-l border-slate-200 pl-3">
            Telemetry & Competency Radar
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Active Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs shadow-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{streakDays} DAYS</span>
          </div>

          {/* Freeze Shield */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 font-bold text-xs shadow-xs">
            <Shield className="w-4 h-4 text-[#0284C7] fill-sky-200" />
            <span className="hidden sm:inline">1/3 🛡️ Armed</span>
            <span className="sm:hidden">1/3</span>
          </div>

          {/* System Admin Link / Exit */}
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Gateway ➔
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8 relative z-10">
        {/* =====================================================================
            2. TELEMETRY ROW
            ===================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Identity Card */}
          <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Axiomatic Learner
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 truncate">
                {userProfile.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {userProfile.profession === 'Student' && userProfile.educationBoard
                    ? `${userProfile.educationBoard} • ${userProfile.grade}`
                    : userProfile.profession}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Age {userProfile.age}
                </span>
              </div>
            </div>
          </div>

          {/* XP Level Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-50/90 to-white/90 backdrop-blur-md border border-indigo-200/80 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Cognitive Progression
              </span>
              <span className="text-xs font-black text-indigo-900">{xp} / 4000 XP</span>
            </div>
            <div>
              <div className="text-lg font-black text-indigo-950 flex items-center gap-1.5">
                <Award className="w-5 h-5 text-indigo-600" />
                <span>LEVEL 14 • MASTER SCHOLAR</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-indigo-100 mt-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp / 4000) * 100}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Momentum Card */}
          <div className="rounded-3xl bg-amber-50/80 backdrop-blur-md border border-amber-200/80 p-5 shadow-sm space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Socratic Momentum
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-950">{streakDays}</span>
              <span className="text-sm font-bold text-amber-800">Consecutive Days</span>
            </div>
            <p className="text-[11px] text-amber-900 font-medium">
              1.4x XP booster active • Zero missed checkpoints
            </p>
          </div>

          {/* Protection Card */}
          <div className="rounded-3xl bg-sky-50/80 backdrop-blur-md border border-sky-200/80 p-5 shadow-sm space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
              Streak Safeguard
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-sky-950">1 / 3</span>
              <span className="text-sm font-bold text-sky-800">Freezes Armed</span>
            </div>
            <p className="text-[11px] text-sky-900 font-medium">
              100% Armed against unplanned interruptions
            </p>
          </div>
        </section>

        {/* 7-DAY STUDY CADENCE VOLUME BAR CHART & MASTERY BADGES */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Volume Bar Chart */}
          <div className="lg:col-span-2 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0284C7]" />
                  <span>7-Day Socratic Study Cadence</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Daily hours dedicated to first-principles deliberate practice
                </p>
              </div>
              <button
                onClick={handleLogHour}
                className="btn-primary text-xs font-bold py-2 px-4 shadow-sm self-start sm:self-auto cursor-pointer"
              >
                <span>+ Log 1h Session</span>
              </button>
            </div>

            {/* Vertical Pillars */}
            <div className="h-44 flex items-end justify-between gap-3 pt-4 border-b border-slate-100">
              {cadenceHours.map((hours, idx) => {
                const maxVal = 8.0;
                const heightPercent = Math.min(100, (hours / maxVal) * 100);
                const isToday = idx === 6;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-[#0284C7] transition-colors">
                      {hours}h
                    </span>
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden flex items-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.4 }}
                        className={`w-full rounded-t-xl transition-all ${
                          isToday
                            ? 'bg-gradient-to-t from-[#0284C7] to-sky-400'
                            : 'bg-gradient-to-t from-slate-300 to-slate-400 group-hover:from-sky-300 group-hover:to-sky-400'
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-bold ${isToday ? 'text-[#0284C7]' : 'text-slate-500'}`}>
                      {daysLabels[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mastery Badges Grid */}
          <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Verified Mastery Badges</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <span className="text-xs font-black text-amber-950 block">⚡ Reaction Velocity</span>
                <span className="text-[10px] text-amber-800 font-medium">Sub-second recall on SN1/SN2</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                <span className="text-xs font-black text-emerald-950 block">🛡️ Zero Misconceptions</span>
                <span className="text-[10px] text-emerald-800 font-medium">No distractor traps tripped</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-1">
                <span className="text-xs font-black text-sky-950 block">🔥 Relentless Momentum</span>
                <span className="text-[10px] text-sky-800 font-medium">7 days deliberate cadence</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1">
                <span className="text-xs font-black text-indigo-950 block">📐 Axiom Architect</span>
                <span className="text-[10px] text-indigo-800 font-medium">Synthesized multi-tier roadmaps</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. ENROLLED SKILL TRACKS GRID
            ===================================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Active Enrolled Skill Tracks
              </h3>
              <p className="text-xs text-slate-500">
                Roadmaps currently in progress with verified milestone progression
              </p>
            </div>
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="btn-primary text-xs font-bold py-2.5 px-4 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Enroll New Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledTracks.map((track) => (
              <div
                key={track.id}
                className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-[#0284C7]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
                      {track.domain}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {track.completedMilestones} / {track.milestonesCount} Milestones
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 leading-snug">
                    {track.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Specialization: {track.specialization}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">Roadmap Progress</span>
                      <span className="text-[#0284C7] font-mono">{track.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0284C7] to-emerald-500 rounded-full"
                        style={{ width: `${track.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectTrack(track.id)}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Launch Track ➔</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            4. NEW SECTION: "CURATED NEXT HORIZONS" (AI SKILL TASTE ENGINE)
            ===================================================================== */}
        <section className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200/80 pt-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Curated Next Horizons
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border border-amber-300">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>AI Taste Engine</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Analyzes your domain history and cognitive trajectory to suggest complementary disciplines
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CURATED_HORIZONS.map((card) => (
              <div
                key={card.id}
                className="rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 shadow-sm hover:shadow-lg hover:border-[#0284C7]/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                      {card.domain}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {card.affinity}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 leading-snug">
                    {card.title}
                  </h4>

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Suggested Specialization
                    </span>
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {card.specialization}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {card.rationale}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleOpenCurated(card)}
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-[#0284C7] bg-white hover:bg-sky-50 text-slate-800 hover:text-[#0284C7] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Enroll in this Track ➔</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* =====================================================================
          5. MODAL: MULTI-TIER SUB-GENRE ENROLLMENT
          ===================================================================== */}
      <AnimatePresence>
        {isEnrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnrollModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl my-8 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-none">
                      Multi-Tier Skill Enrollment
                    </h3>
                    <span className="text-xs text-slate-500">Autonomous Socratic Roadmap Synthesis</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STEP A: DOMAIN SELECTION */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Step A: Select Primary Domain
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { label: 'Science', icon: Atom },
                    { label: 'Athletics', icon: Dumbbell },
                    { label: 'Art', icon: Palette },
                    { label: 'Homemaking', icon: UtensilsCrossed },
                    { label: 'Cognitive Logic', icon: Brain },
                  ].map((dom) => {
                    const isSelected = enrollDomain === dom.label;
                    const IconComp = dom.icon;
                    return (
                      <button
                        key={dom.label}
                        type="button"
                        onClick={() => setEnrollDomain(dom.label as any)}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 border-[#0284C7] text-[#0284C7] shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                        <span className="text-xs font-bold leading-tight">{dom.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP B: SKILL TOPIC INPUT */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Step B: Skill Topic Input
                </label>
                <input
                  type="text"
                  value={enrollTopic}
                  onChange={(e) => setEnrollTopic(e.target.value)}
                  placeholder="e.g., Football, Dance, Pencil Sketching, Full-Stack Development"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all shadow-xs"
                />
              </div>

              {/* STEP C: DYNAMIC SUB-GENRE / SPECIALIZATION SELECTOR */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Step C: Dynamic Sub-Genre & Specialization Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentSuggestedPills.map((pill) => {
                    const isPillActive = enrollSpecialization === pill;
                    return (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => setEnrollSpecialization(pill)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          isPillActive
                            ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-xs'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {pill}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={enrollSpecialization}
                  onChange={(e) => setEnrollSpecialization(e.target.value)}
                  placeholder="Or enter custom specialization..."
                  className="w-full mt-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#0284C7] focus:bg-white"
                />
              </div>

              {/* STEP D: DYNAMIC AI STEP PREVIEW (Variable 3-8 Milestones) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-emerald-50 border border-sky-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">
                    AI Scope Analysis: Detected Complex Multi-Tier Skill
                  </span>
                  <p className="text-slate-600 mt-0.5">
                    Synthesizing 6 Custom Milestones (from Foundational Kinematics & Axioms to Match-Speed Execution).
                  </p>
                </div>
              </div>

              {/* SUBMIT CTA */}
              <div className="pt-2">
                <button
                  onClick={handleSynthesizeRoadmap}
                  className="btn-primary w-full text-sm font-extrabold py-3.5 shadow-lg shadow-sky-500/25"
                >
                  <span>⚡ Synthesize Custom Roadmap</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
