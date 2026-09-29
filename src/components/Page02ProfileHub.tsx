import React, { useState, useEffect } from 'react';
import { UserProfile, SkillTrack, DayCadence } from '../types';
import { SkillpraxLogo } from './SkillpraxLogo';
import {
  Flame,
  Shield,
  Clock,
  ArrowRight,
  Plus,
  CheckCircle2,
  Edit2,
  Calendar,
  Sparkles,
  Zap,
  MoreVertical,
  Activity,
  Layers,
  ChevronRight,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditProfileModal } from './EditProfileModal';

interface Page02ProfileHubProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  tracks: SkillTrack[];
  onSelectTrack: (trackId: string) => void;
  onAddTrack: (track: SkillTrack) => void;
  onNavigate: (page: 'page01' | 'page02' | 'page03' | 'page04') => void;
  onOpenAdmin: () => void;
}

export const Page02ProfileHub: React.FC<Page02ProfileHubProps> = ({
  userProfile,
  onUpdateProfile,
  tracks,
  onSelectTrack,
  onAddTrack,
  onNavigate,
  onOpenAdmin,
}) => {
  const [hoveredDay, setHoveredDay] = useState<DayCadence | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackCategory, setNewTrackCategory] = useState<'Athletics' | 'Programming' | 'Chemistry' | 'Custom'>('Custom');
  const [newTrackTag, setNewTrackTag] = useState('');
  const [editName, setEditName] = useState(userProfile.name);
  const [editProfession, setEditProfession] = useState(userProfile.profession);
  const [editAge, setEditAge] = useState(userProfile.age.toString());

  // Graph Animation trigger state
  const [graphAnimationKey, setGraphAnimationKey] = useState(0);

  // Maximum hours for graph scaling
  const maxHours = Math.max(...userProfile.studyCadence.map((d) => d.hours + d.minutes / 60), 6);

  const handleCreateTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackTitle.trim()) return;

    const newTrack: SkillTrack = {
      id: `track-${Date.now()}`,
      title: newTrackTitle.trim(),
      category: newTrackCategory,
      tags: newTrackTag.split(',').map((t) => t.trim()).filter(Boolean),
      currentStep: 1,
      totalSteps: 5,
      progressPercent: 20,
      colorScheme: newTrackCategory === 'Programming' ? 'blue' : newTrackCategory === 'Chemistry' ? 'amber' : 'emerald',
      icon: newTrackCategory === 'Programming' ? '💻' : newTrackCategory === 'Chemistry' ? '⚗️' : '🎯',
      milestones: [
        {
          id: 'm1',
          stepNumber: 1,
          title: 'Foundational Competency Assessment',
          description: 'Establish baseline axioms and verify prerequisites.',
          status: 'active',
          acus: ['Axiomatic definitions', 'Core syntax & rules'],
        },
        {
          id: 'm2',
          stepNumber: 2,
          title: 'Intermediate Synthetic Workflows',
          description: 'Apply high-yield problem solving heuristics.',
          status: 'locked',
          acus: ['Heuristic synthesis', 'Constraint boundary testing'],
        },
      ],
    };

    onAddTrack(newTrack);
    setNewTrackTitle('');
    setNewTrackTag('');
    setShowAddModal(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProfession.trim() === '/admin') {
      onOpenAdmin();
      setShowEditProfileModal(false);
      return;
    }
    onUpdateProfile({
      name: editName.trim() || userProfile.name,
      profession: editProfession.trim() || userProfile.profession,
      age: parseInt(editAge, 10) || userProfile.age,
    });
    setShowEditProfileModal(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-tech-grid text-slate-800 pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top Header Bar */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-emerald-100/80 px-4 sm:px-8 py-3 flex items-center justify-between"
      >
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('page01')}
        >
          <SkillpraxLogo size="xs" showText={false} />
          <span className="font-heading font-extrabold text-xl tracking-tight transition-transform duration-200 group-hover:scale-105">
            <span className="text-[#0091FF]">Skill</span>
            <span className="text-[#F59E0B]">prax</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => onNavigate('page02')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/90 rounded-lg cursor-pointer shadow-sm shadow-emerald-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Learner Profile</span>
          </button>

          <button
            onClick={() => onNavigate('page03')}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all cursor-pointer group"
          >
            <span>Studio</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <div className="relative p-[1.5px] rounded-xl conic-beam shadow-md shadow-emerald-600/20">
            <button
              onClick={() => onNavigate('page03')}
              className="relative z-10 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[10px] text-xs font-bold tracking-wide shadow-md btn-tactile btn-shimmer cursor-pointer uppercase flex items-center gap-1.5 active:scale-95"
            >
              <span>Get Started</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full space-y-6 pt-4">
        {/* Top Profile Banner Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Active User Credentials Card (4 cols) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/70 shadow-lg shadow-emerald-950/5 wobble-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  Active User
                </span>
                <button
                  onClick={() => setShowEditProfileModal(true)}
                  className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer group"
                  title="Edit Profile or Enter /admin"
                >
                  <Edit2 className="w-4 h-4 transition-transform group-hover:scale-115" />
                </button>
              </div>

              {/* Avatar & User Details */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3 group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 blur-sm opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt={userProfile.name}
                    className="relative w-20 h-20 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `<div class="relative w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 font-bold font-heading text-2xl flex items-center justify-center border-2 border-white">MP</div>`;
                      }
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow" />
                </div>

                <h2 className="text-xl font-heading font-bold text-slate-900">
                  {userProfile.name}
                </h2>
                <p className="text-xs font-medium text-emerald-700 mt-0.5">
                  {userProfile.profession} • {userProfile.age} yrs
                </p>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Daily Goal: {userProfile.targetHours}h {userProfile.targetMinutes}m</span>
                </div>
              </div>
            </div>

            {/* User Stats Row: 22 Active user, 12 Followings, 1 Skills done */}
            <div className="grid grid-cols-3 gap-2 pt-5 border-t border-slate-100 mt-4 text-center">
              <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="text-base font-bold text-slate-900 font-mono">
                  {userProfile.activeDays}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Active days</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="text-base font-bold text-slate-900 font-mono">
                  {userProfile.followingsCount}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Followings</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50/90 border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="text-base font-bold text-emerald-600 font-mono">
                  {userProfile.skillsCompleted}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Skills done</div>
              </div>
            </div>

            {/* Prominent Edit Profile Interface Button */}
            <div className="pt-3">
              <button
                onClick={() => setShowEditProfileModal(true)}
                className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/90 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 btn-tactile cursor-pointer shadow-sm group"
              >
                <Edit2 className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:scale-120" />
                <span>Open Profile Editing Interface</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Telemetry Streak Badges & 7-Day Study Cadence Bar Graph (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
            {/* Top Telemetry Streak Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Flame Streakmeter with Multi-Layered Flame Animation */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-br from-amber-50 to-orange-50/90 border border-amber-200/90 rounded-3xl p-5 shadow-sm wobble-card flex items-center justify-between relative overflow-hidden"
              >
                <div className="space-y-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-heading font-extrabold text-amber-900 tracking-tight">
                      {userProfile.flameStreak} DAYS
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded-full font-mono animate-pulse">
                      FLAME STREAK
                    </span>
                  </div>
                  <p className="text-xs text-amber-700/90 font-medium">
                    Flame streak unbroken • Next tier at 10 days
                  </p>
                </div>

                <div className="relative p-3 bg-amber-500/15 rounded-2xl animate-flame">
                  <Flame className="w-10 h-10 text-amber-500 fill-amber-400" />
                  <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                </div>
              </motion.div>

              {/* Shield Status: 1 Active Freeze with Protective Forcefield Wave */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-br from-sky-50 to-blue-50/90 border border-sky-200/90 rounded-3xl p-5 shadow-sm wobble-card flex items-center justify-between relative overflow-hidden"
              >
                <div className="space-y-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-heading font-bold text-sky-900">
                      {userProfile.activeFreezes} Active Freeze 🧊
                    </span>
                  </div>
                  <p className="text-xs text-sky-700/90 font-medium">
                    Protects 1 missed study session safely
                  </p>
                  <div className="text-[11px] text-sky-600 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Auto-recharges every 14 days</span>
                  </div>
                </div>

                <div className="p-3 bg-sky-500/15 rounded-2xl animate-shield">
                  <Shield className="w-9 h-9 text-sky-600 fill-sky-200" />
                </div>
              </motion.div>
            </div>

            {/* 7-Day Study Cadence Animated Bar Graph */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/70 shadow-lg shadow-emerald-950/5 wobble-card relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <h3 className="text-sm font-heading font-bold text-slate-800">
                    7 Day Study-Time Cadence
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGraphAnimationKey((k) => k + 1)}
                    className="flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg transition-colors font-medium cursor-pointer"
                    title="Re-run bar rise animation"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-animate</span>
                  </button>
                  <span className="text-xs text-slate-500 hidden sm:inline">Avg: 4.3h / day</span>
                </div>
              </div>

              {/* Vertical Bar Chart with Dynamic Spring Growth */}
              <div className="relative pt-6 pb-2" key={graphAnimationKey}>
                {/* Floating Interactive Tooltip */}
                <AnimatePresence>
                  {hoveredDay && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-xl shadow-xl z-20 pointer-events-none flex items-center gap-2 font-sans border border-slate-700"
                    >
                      <span className="font-bold text-emerald-400">{hoveredDay.day}:</span>
                      <span className="font-mono">{hoveredDay.hours}h {hoveredDay.minutes}m</span>
                      <span className="text-slate-400">({hoveredDay.focusArea})</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bars Grid */}
                <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-36 border-b border-slate-100 pb-2">
                  {userProfile.studyCadence.map((cadence, index) => {
                    const totalHours = cadence.hours + cadence.minutes / 60;
                    const heightPercent = Math.min(100, Math.round((totalHours / maxHours) * 100));
                    const isToday = cadence.day === 'Thu';

                    return (
                      <div
                        key={cadence.day}
                        onMouseEnter={() => setHoveredDay(cadence)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="flex flex-col items-center gap-2 group cursor-pointer h-full justify-end select-none"
                      >
                        {/* Live Hour Badge on Top of Bar */}
                        <span className="text-[10px] font-mono font-bold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                          {cadence.hours}h{cadence.minutes > 0 ? `${cadence.minutes}m` : ''}
                        </span>

                        <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex flex-col justify-end p-0.5">
                          {/* Animated Growth Bar with Motion */}
                          <motion.div
                            initial={{ height: '0%' }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.08,
                              ease: [0.34, 1.56, 0.64, 1], // Spring overshoot
                            }}
                            className={`w-full rounded-t-lg transition-all duration-300 origin-bottom group-hover:scale-y-105 group-hover:brightness-110 bar-shimmer ${
                              isToday
                                ? 'bg-gradient-to-t from-emerald-600 via-teal-500 to-sky-400 shadow-md shadow-emerald-500/35'
                                : 'bg-gradient-to-t from-emerald-500 to-teal-400 group-hover:from-emerald-600 group-hover:to-teal-500'
                            }`}
                          />
                        </div>

                        <span
                          className={`text-xs font-semibold transition-colors duration-200 ${
                            isToday ? 'text-emerald-700 font-bold' : 'text-slate-500 group-hover:text-slate-900'
                          }`}
                        >
                          {cadence.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section: Enrolled Skills Grid ("Active skills wobble-cloud") */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-heading font-bold text-slate-900">
                Active Skills <span className="text-xs font-normal text-slate-400">wobble-cloud</span>
              </h2>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold btn-tactile cursor-pointer shadow-sm group"
            >
              <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90" />
              <span>Add Skill Track</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, trackIdx) => {
              return (
                <motion.div
                  key={track.id}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: trackIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/70 shadow-lg shadow-emerald-950/5 wobble-card flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header with Animated Icon and Title */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xl shadow-inner transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6">
                          {track.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-heading font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                            {track.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            {track.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] text-slate-500 font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button className="text-slate-400 hover:text-slate-600 p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Accurate Milestones Ratio: STEP 1/5 with Animated Progress Bar */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">Accurate Milestones</span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          STEP {track.currentStep}/{track.totalSteps}
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${track.progressPercent}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + trackIdx * 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 shadow-sm relative"
                        >
                          <span className="absolute right-0 top-0 bottom-0 w-1.5 bg-white/70 rounded-full animate-ping" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Current Milestone preview */}
                    <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs">
                      <div className="text-[11px] font-semibold text-slate-500">Current Milestone:</div>
                      <div className="font-medium text-slate-800 mt-0.5 truncate">
                        {track.milestones[track.currentStep - 1]?.title || 'Sprint Mechanics & High Velocity Acceleration'}
                      </div>
                    </div>
                  </div>

                  {/* Launch Studio Action with Active Pulse */}
                  <div className="pt-5 mt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        onSelectTrack(track.id);
                        onNavigate('page03');
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-heading font-semibold text-xs tracking-wide shadow-md shadow-emerald-500/25 btn-tactile btn-shimmer cursor-pointer flex items-center justify-center gap-2 group-hover:gap-3"
                    >
                      <span>Launch Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Card: Add New Skill Track Cloud Card with Dash Border Pulse */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setShowAddModal(true)}
              className="rounded-3xl p-6 border-2 border-dashed border-emerald-300/80 bg-emerald-50/30 hover:bg-emerald-50/70 hover:border-emerald-500 transition-all duration-300 wobble-card flex flex-col items-center justify-center text-center cursor-pointer min-h-[260px] group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-120 group-hover:rotate-90 mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-heading font-bold text-slate-800 group-hover:text-emerald-800">
                + Add New Skill Track
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                Synthesize custom curriculum flowchart & evaluation gates
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Add New Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-200 animate-scale-up">
            <h3 className="text-lg font-heading font-bold text-slate-900 mb-1">
              Add New Competency Track
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Initialize a dedicated autonomous milestone graph
            </p>

            <form onSubmit={handleCreateTrack} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Track Title
                </label>
                <input
                  type="text"
                  value={newTrackTitle}
                  onChange={(e) => setNewTrackTitle(e.target.value)}
                  placeholder="e.g. Astrophysics Orbital Dynamics"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newTrackCategory}
                    onChange={(e) => setNewTrackCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Athletics">Athletics</option>
                    <option value="Programming">Programming</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Custom">Custom Domain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newTrackTag}
                    onChange={(e) => setNewTrackTag(e.target.value)}
                    placeholder="Kepler, Gravitation"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md btn-tactile cursor-pointer"
                >
                  Create Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comprehensive Edit Profile Interface Modal */}
      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        userProfile={userProfile}
        onUpdateProfile={onUpdateProfile}
        onOpenAdmin={onOpenAdmin}
      />
    </div>
  );
};

export default Page02ProfileHub;
